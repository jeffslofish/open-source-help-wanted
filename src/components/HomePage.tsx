import Header from './Header';

function HomePage() {
  const authorize = () => {
    const params = new URLSearchParams();
    params.set('type', 'user_agent');
    params.set('client_id', process.env.REACT_APP_CLIENT_ID || '');
    params.set('redirect_url', process.env.REACT_APP_REDIRECT_URI || '');

    window.location.href = `https://github.com/login/oauth/authorize?${params}`;
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
