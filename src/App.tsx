import './App.css';
import ReactGA from 'react-ga4';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import OAuthRedirectHandler from './components/OAuthRedirectHandler';
import ReposHomePage from './components/ReposHomePage';

ReactGA.initialize('G-JFGEYWXQSJ');
ReactGA.send('pageview');

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/repos' element={<ReposHomePage />}></Route>
        <Route
          path='/oauth_redirect'
          element={<OAuthRedirectHandler />}
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
