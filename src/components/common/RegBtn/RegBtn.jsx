import React from 'react';
import './RegBtn.css';

import PropTypes from 'prop-types';

function RegBtn({ handleClick, type, name, children, className }) {
  //console.log(handleClick);
  return (
    <button name={name} onClick={handleClick} type={type} className={className}>
      {children}
    </button>
  );
}

export default RegBtn;

RegBtn.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  handleClick: PropTypes.func,
};
