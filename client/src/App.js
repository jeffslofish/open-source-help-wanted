import React from 'react';
import GithubState from './context/github/GithubState';
import Main from './components/Main';
import './App.css';

const App = () => {
  return (
    <GithubState>
      <Main />
    </GithubState>
  );
};

export default App;
