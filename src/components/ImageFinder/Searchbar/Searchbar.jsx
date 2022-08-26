import React, { Component } from 'react';
import RegBtn from '../../common/RegBtn/RegBtn';
import { FiSearch } from 'react-icons/fi';
import s from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handlechange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.props.handlChangeInput(value);
  };

  findImage = e => {
    e.preventDefault();
    this.props.getApiColection();
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.form}>
          <input
            className={s.input}
            type="text"
            autoComplete="off"
            placeholder="Search images and photos"
            onChange={this.handlechange}
            name="query"
            value={this.state.value}
          />
          <RegBtn
            className="searchBtn"
            type={'submit'}
            handleClick={this.findImage}
          >
            <FiSearch />
          </RegBtn>
        </form>
      </header>
    );
  }
}

export default Searchbar;
