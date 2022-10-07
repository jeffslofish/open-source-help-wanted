import React, { useState, useContext, useEffect } from 'react';
import GithubReposContext from '../context/githubRepos/GithubReposContext';
import Pagination from './Pagination';
import ReactGA from 'react-ga4';
import Header from './Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Repos from './Repos';

export default function ReposMain() {
  const githubReposContext = useContext(GithubReposContext);

  if (!githubReposContext) {
    console.error('Error: githubReposContext is falsy');
    return <></>;
  }

  const [expanded, setExpanded] = useState(false);

  function scrollTop() {
    const element = document.querySelector('.results-container');
    const headerHeight = document.querySelector('.App-header')?.scrollHeight;
    const searchHeight =
      document.querySelector('.search-container')?.scrollHeight;

    if (!element || !headerHeight || !searchHeight) {
      return;
    }

    element.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    window.scroll({
      top: headerHeight + searchHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

  const handleNextButton = () => {
    scrollTop();
    githubReposContext.search(
      githubReposContext.page + 1,
      githubReposContext.resultsPerPage
    );

    ReactGA.event({
      category: 'event',
      action: 'next button clicked',
    });
  };
  const handlePrevButton = () => {
    scrollTop();
    githubReposContext.search(
      githubReposContext.page > 1
        ? githubReposContext.page - 1
        : githubReposContext.page,
      githubReposContext.resultsPerPage
    );

    ReactGA.event({
      category: 'event',
      action: 'prev button clicked',
    });
  };

  const onExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    setExpanded(true);

    ReactGA.event({
      category: 'event',
      action: 'expand',
    });
  };

  const onCollapse = (e: React.MouseEvent) => {
    e.preventDefault();
    setExpanded(false);

    ReactGA.event({
      category: 'event',
      action: 'collapse',
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    scrollTop();
    githubReposContext.search(1, 100);

    ReactGA.event({
      category: 'event',
      action: 'search submit',
    });
  };

  useEffect(() => {
    githubReposContext.search(1, 100);
    // eslint-disable-next-line
  }, []);

  return (
    <div className='App'>
      <Header />
      <div className='App-container'>
        <div className='search-container'>
          <form onSubmit={handleSubmit}>
            <div className='input-elements'>
              <div className='label-search-box'></div>
              <button className='searchButton' type='submit'>
                Search
              </button>
            </div>
          </form>
        </div>
        <div className='results-container'>
          {githubReposContext.loading && <div className='loading' />}
          <Pagination
            currentPage={githubReposContext.page}
            totalCount={githubReposContext.totalCount}
            resultsPerPage={githubReposContext.resultsPerPage}
            prevlickHandler={handlePrevButton}
            nextClickHandler={handleNextButton}
          />
          <div>
            <Repos repos={githubReposContext.repos} />
          </div>
          <Pagination
            currentPage={githubReposContext.page}
            totalCount={githubReposContext.totalCount}
            resultsPerPage={githubReposContext.resultsPerPage}
            prevlickHandler={handlePrevButton}
            nextClickHandler={handleNextButton}
          />
        </div>
        <footer>
          <p>
            <a href='https://github.com/jeffslofish/open-source-help-wanted'>
              Fork me on GitHub and contribute!
            </a>
          </p>
        </footer>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
