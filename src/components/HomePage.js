import React from 'react';
import Header from './Header';

function HomePage() {
  const authorize = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&type=user_agent&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
  };

  return (
    <>
      <Header />
      <button className='authorizeButton' onClick={authorize}>
        Authorize Your Account
      </button>
    </>
  );
}

export default HomePage;
