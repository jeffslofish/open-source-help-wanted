import './App.css';
import Helmet from "react-helmet";
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
    <Helmet>

          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta property="og:type" content="website" />
          <meta name="twitter:site" content="@teladochealth" />


          <title>Open Source Help Wanted</title>
          <meta name="og:title" content="Open Source Help Wanted" />
          <meta name="twitter:title" content="Open Source Help Wanted" />


          <meta name="description" content="Search GitHub for open source issues to work on" />
          <meta name="og:description" content="Search GitHub for open source issues to work on" />
          <meta name="twitter:description" content="Search GitHub for open source issues to work on" />

          <meta name="url" content="https://www.opensourcehelpwanted.com/" />
          <meta name="og:url" content="https://www.opensourcehelpwanted.com/" />
          <meta name="twitter:url" content="https://www.opensourcehelpwanted.com/" />

          <meta name="keywords" content="open source projects, github, open source issues" />

          <link rel="canonical" href="https://www.opensourcehelpwanted.com/" />

          <link rel="icon" href="/assets/icons/favicon.ico" type="image/x-icon" />

      </Helmet>
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
