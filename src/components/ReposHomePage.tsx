import Header from './Header';
import GithubReposState from '../context/githubRepos/GithubReposState';
import ReposMain from './ReposMain';

function ReposHomePage() {
  const authorize = () => {
    const params = new URLSearchParams();
    params.set('type', 'user_agent');
    params.set('client_id', process.env.REACT_APP_CLIENT_ID || '');
    params.set('redirect_url', process.env.REACT_APP_REDIRECT_URI || '');

    window.location.href = `https://github.com/login/oauth/authorize?${params}`;
  };

  const oauthCode = localStorage.getItem('oauthCode');
  if (!oauthCode) {
    return (
      <>
        <Header />
        <button className='authorizeButton' onClick={authorize}>
          Authorize Your Account
        </button>
      </>
    );
  }

  return (
    <GithubReposState>
      <ReposMain />
    </GithubReposState>
  );
}

export default ReposHomePage;
