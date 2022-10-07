import './App.css';
import ReactGA from 'react-ga4';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import OAuthRedirectHandler from './components/OAuthRedirectHandler';
import ReposMain from './components/ReposMain';
import GithubReposState from './context/githubRepos/GithubReposState';

ReactGA.initialize('G-JFGEYWXQSJ');
ReactGA.send('pageview');

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route
          path='/repos'
          element={
            <GithubReposState>
              <ReposMain />
            </GithubReposState>
          }
        ></Route>
        <Route
          path='/oauth_redirect'
          element={<OAuthRedirectHandler />}
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
