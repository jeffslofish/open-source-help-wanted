import React from 'react';

function HomePage() {
  const authorize = () => {
    window.location.href =
      'https://github.com/login/oauth/authorize?client_id=ac994e1064925b354294&type=user_agent&redirect_uri=https://opensourcehelpwanted.com/oauth_redirect';
  };

  return (
    <>
      <p>Welcome to Open Source Help Wanted</p>
      <button onClick={authorize}>Authorize Your Account</button>
    </>
  );
}

export default HomePage;
