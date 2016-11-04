#
# Makefile
# disoul, 2016-11-04 14:57
#
ELECTRON_PACKAGER = ./node_modules/.bin/electron-packager

UNAME_S := $(shell uname -s)
ifeq ($(UNAME_S), Darwin)
	PLATFORM = darwin
else
	ifeq ($(UNAME_S),Linux)
		PLATFORM = linux
	else
		PLATFORM = unknow
	endif
endif

UNAME_M := $(shell uname -m)
ifeq ($(UNAME_M), x86_64)
	ARCH = x64
else
	ifeq ($(UNAME_M), x86)
		ARCH = ia32
	else
		ARCH = unknow
	endif
endif

install:
	@npm install

#TODO: icon and ignore files
release:
	./node_modules/.bin/webpack -p
	$(ELECTRON_PACKAGER) . CloudMusic --platform=$(PLATFORM) --arch=$(ARCH) --out=release --overwrite --version=1.4.5 --ignore --icon="./app/assets/icon.icns" --prune

.PHONY: release install
# vim:ft=make
#
