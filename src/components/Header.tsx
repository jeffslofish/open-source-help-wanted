import Logo from '../images/Searching_Logo.png';

function Header() {
  return (
    <div className='App-header'>
      <a href='/'>
        <img src={Logo} className='main-logo' alt='Open Source Help Wanted' />
      </a>
      <a href='/repos'>
        <h5>Search Repositories</h5>
      </a>
      <a href='/'>
        <h5>Search Issues</h5>
      </a>
    </div>
  );
}

export default Header;
