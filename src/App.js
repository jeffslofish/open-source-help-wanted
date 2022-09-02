import GithubState from './context/github/GithubState';
import Main from './components/Main';
import './App.css';
import ReactGA from 'react-ga4';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';

ReactGA.initialize('G-JFGEYWXQSJ');
ReactGA.send('pageview');

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path='/'
          element={
            <>
              <HomePage />
            </>
          }
        ></Route>
        <Route
          path='/oauth_redirect'
          element={
            <GithubState>
              <Main />
            </GithubState>
          }
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
