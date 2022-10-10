import React, { useContext, useEffect, useState } from 'react';
import GithubReposContext from '../context/githubRepos/GithubReposContext';
import Pagination from './Pagination';
import ReactGA from 'react-ga4';
import Header from './Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Repos from './Repos';
import { RepoFormInput } from '../@types/RepoFormInput';
import InputElement from './InputElement';

export default function ReposMain() {
  const githubReposContext = useContext(GithubReposContext);

  if (!githubReposContext) {
    console.error('Error: githubReposContext is falsy');
    return <></>;
  }

  const searchQuery = new URLSearchParams(location.search);
  const keywords = decodeURIComponent(searchQuery.get('keywords') ?? '');
  const sortOrder =
    decodeURIComponent(searchQuery.get('sortOrder') ?? 'desc') === 'desc'
      ? 'desc'
      : 'asc';
  const sortType = decodeURIComponent(searchQuery.get('sortType') ?? 'stars');
  const topics = decodeURIComponent(
    searchQuery.get('topics') ?? 'hacktoberfest'
  );

  const [formInput, setFormInput] = useState<RepoFormInput>({
    keywords: keywords ?? '',
    sortOrder: sortOrder ?? 'desc',
    sortType: sortType ?? 'created',
    topics: topics ?? 'hacktoberfest',
  });

  const handleSetFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleSetSelectInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

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
      githubReposContext.resultsPerPage,
      formInput
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
      githubReposContext.resultsPerPage,
      formInput
    );

    ReactGA.event({
      category: 'event',
      action: 'prev button clicked',
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    scrollTop();
    githubReposContext.search(1, 100, formInput);

    ReactGA.event({
      category: 'event',
      action: 'search submit',
    });
  };

  useEffect(() => {
    githubReposContext.search(1, 100, formInput);
    // eslint-disable-next-line
  }, []);

  history.replaceState(
    null,
    '',
    `?topics=${encodeURIComponent(
      formInput.topics
    )}&keywords=${encodeURIComponent(
      formInput.keywords
    )}&sortType=${encodeURIComponent(
      formInput.sortType
    )}&sortOrder=${encodeURIComponent(formInput.sortOrder)}`
  );

  return (
    <div className='App'>
      <Header />
      <div className='App-container'>
        <div className='search-container'>
          <form onSubmit={handleSubmit}>
            <div className='input-elements'>
              <div className='label-search-box'>
                <InputElement
                  label={'Topics'}
                  placeholder={'hacktoberfest, javascript'}
                  text={formInput.topics}
                  name='topics'
                  setText={handleSetFormInput}
                />
                <InputElement
                  label={'Keywords'}
                  placeholder={'open source'}
                  text={formInput.keywords}
                  name='keywords'
                  setText={handleSetFormInput}
                />

                <fieldset>
                  <legend className='input-label-name'>Sorting Options</legend>
                  <select
                    className='input-element'
                    value={formInput.sortType}
                    name='sortType'
                    onChange={handleSetSelectInput}
                  >
                    <option value={'stars'}>Sort by number of stars</option>
                    <option value={'forks'}>Sort by number of forks</option>
                  </select>

                  <select
                    className='input-element'
                    value={formInput.sortOrder}
                    name='sortOrder'
                    onChange={handleSetSelectInput}
                  >
                    <option value='desc'>Sort Descending</option>
                    <option value='asc'>Sort Ascending</option>
                  </select>
                </fieldset>
              </div>
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
