import React from 'react';
import GithubState from './context/github/GithubState';
import Main from './components/Main';
import './App.css';
import ReactGA from 'react-ga4';

ReactGA.initialize('G-JFGEYWXQSJ');
ReactGA.send('pageview');

const App = () => {
  return (
    <GithubState>
      <Main />
    </GithubState>
  );
};

export default App;
