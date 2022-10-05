import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function HomePage() {
  const authorize = () => {
    const params = new URLSearchParams();
    params.set('type', 'user_agent');
    params.set('client_id', process.env.REACT_APP_CLIENT_ID || '');
    params.set('redirect_url', process.env.REACT_APP_REDIRECT_URI || '');

    window.location.href = `https://github.com/login/oauth/authorize?${params}`;
  };
  const navigate = useNavigate()
  useEffect(() => {
    const oauthCode = typeof (localStorage?.getItem) === 'function' ? localStorage.getItem('oauthCode') : false
    if (typeof oauthCode === 'string' && oauthCode.length > 0) {
      const params = new URLSearchParams();
      params.set('code', `${oauthCode}`);
      navigate(`/oauth_redirect?${params}`)
    }
  }, []);

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
