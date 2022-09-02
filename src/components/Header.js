import React from 'react';
import Logo from '../images/Searching_Logo.png';

function Header() {
  return (
    <div className='App-header'>
      <a href='/'>
        <img src={Logo} className='main-logo' alt='Open Source Help Wanted' />
      </a>
      <a href='/'>
        <h5>Find issues you can work on in GitHub. Be a contributor!</h5>
      </a>
    </div>
  );
}

export default Header;
