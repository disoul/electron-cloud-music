// 参考 https://github.com/darknessomi/musicbox/wiki/
'use strict'
const crypto = require('crypto');
const Crypto = require('cryptojs');
const BigNumber = require('bignumber.js');
const aesjs = require('aes-js');
const modulus = '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7';
const nonce = '0CoJUm6Qyw8W8jud'
const pubKey = '010001'

String.prototype.hexEncode = function(){
    var hex, i;

    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += (""+hex).slice(-4);
    }

    return result
}

function createSecretKey(size) {
  var secKey = crypto.randomBytes(size).toString().split('').map(function(xx) {
    var ascii = xx.charCodeAt(0)
    return ascii.toString(16);
  }).join('');
  return secKey.slice(0, 16);
}

function aesEncrypt(text, secKey) {
  var _text = text;
  var pad = 16 - _text.length % 16;
  var str = '';
  for (var i = 0;i < pad;i++) {
    str = str + String.fromCharCode(pad);
  }
  _text = text + str;
  console.log(_text);
  var lv = new Buffer('0102030405060708', "binary");
  var _secKey = new Buffer(secKey, "binary");
  var cipher = crypto.createCipheriv('AES-128-CBC', _secKey, lv);
  var encrypted = cipher.update(_text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  console.log(encrypted);
  return encrypted;
}

function zfill(str, size) {
    while (str.length < size) str = "0" + str;
    return str;
}

function rsaEncrypt(text, pubKey, modulus) {
  var _text = text.split('').reverse().join('');
  var rs = new BigNumber(_text.hexEncode(), 16).pow(parseInt(pubKey, 16)).mod(new BigNumber(modulus, 16));
  return zfill(rs.toString(16), 256);
}

function encrypted_request(obj) {
  var text = '{"csrf_token": "", "ids": [37095476], "br": 128000}';
  var secKey = 'df89fcfd19a6da3e';
  console.log(secKey);
  var encText = aesEncrypt(aesEncrypt(text, nonce), secKey);
  var encSecKey = rsaEncrypt(secKey, pubKey, modulus);
  console.log('params=' + encText + '&encSecKey=' + encSecKey);
  return 'params=' + encText + '&encSecKey=' + encSecKey;
}

encrypted_request({
    "ids": [37095476,],
    "br": 128000,
    "csrf_token": '',
});
