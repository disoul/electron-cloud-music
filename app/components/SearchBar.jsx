import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor(props: any) {
    super(props);
  }

  _onSubmit() {
    console.log(this.refs.search.value);
  }

  render() {
    return (
      <section className="header__searchbar">
        <form action="#" id="search-form" onSubmit={e => this._onSubmit(e)}>
          <label htmlFor="search"><i className="fa fa-search"></i></label>
          <input type="text" id="search" placeholder="搜索音乐" ref="search" />
          <input type="submit" hidden />
        </form>
      </section>
    );
  }
}
