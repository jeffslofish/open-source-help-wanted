import React, { useState, useContext, useEffect } from 'react';
import GithubContext from '../context/github/GithubContext';
import InputElement from './InputElement';
import Pagination from './Pagination';
import Issues from './Issues';
import ReactGA from 'react-ga4';
import Header from './Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormInput } from '../@types/FormInput';

export default function Main() {
  const githubContext = useContext(GithubContext);

  if (!githubContext) {
    console.error('Error: githubContext is falsy');
    return <></>;
  }

  const [expanded, setExpanded] = useState(false);

  const [formInput, setFormInput] = useState<FormInput>({
    labels: '',
    keywords: '',
    language: '',
    sortType: 'created',
    sortOrder: 'desc',
    inTitle: true,
    inBody: true,
    inComments: true,
    issueOrPullRequest: 'issue',
    state: 'open',
    author: '',
    user: '',
    org: '',
    repo: '',
    assignee: '',
    issueAssigned: '+no:assignee',
    filterFake: true,
    upTime: true,
  });

  const [savedSearches, setSavedSearches] = useState(() => {
    const savedSearches = localStorage.getItem('oshw-saved-searches');
    if (savedSearches) {
      return JSON.parse(savedSearches);
    }

    return '';
  });

  useEffect(() => {
    localStorage.setItem('oshw-saved-searches', JSON.stringify(savedSearches));
  }, [savedSearches]);

  const handleSetFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleSetFormCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.checked });
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
    githubContext.search(
      githubContext.page + 1,
      githubContext.resultsPerPage,
      formInput
    );

    ReactGA.event({
      category: 'event',
      action: 'next button clicked',
    });
  };
  const handlePrevButton = () => {
    scrollTop();
    githubContext.search(
      githubContext.page > 1 ? githubContext.page - 1 : githubContext.page,
      githubContext.resultsPerPage,
      formInput
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
    githubContext.search(1, 100, formInput);

    ReactGA.event({
      category: 'event',
      action: 'search submit',
    });
  };

  const handleSaveSearch = () => {
    setSavedSearches(formInput);

    ReactGA.event({
      category: 'event',
      action: 'save search',
    });
  };

  const handleLoadSearch = () => {
    if (savedSearches) {
      setFormInput(savedSearches);
    }

    ReactGA.event({
      category: 'event',
      action: 'load search',
    });
  };

  useEffect(() => {
    githubContext.search(1, 100, formInput);
    // eslint-disable-next-line
  }, []);

  return (
    <div className='App'>
      <Header />
      <div className='App-container'>
        <div className='search-container'>
          <form onSubmit={handleSubmit}>
            <div className='input-elements'>
              <div className='label-search-box'>
                <InputElement
                  label={'GitHub label names'}
                  placeholder={'help wanted, bug'}
                  text={formInput.labels}
                  name='labels'
                  setText={handleSetFormInput}
                />
                <InputElement
                  label={'Keywords'}
                  placeholder={'open source, forms'}
                  text={formInput.keywords}
                  name='keywords'
                  setText={handleSetFormInput}
                />
                <InputElement
                  label={'Language'}
                  placeholder={'javascript'}
                  text={formInput.language}
                  name='language'
                  setText={handleSetFormInput}
                />
              </div>

              {!expanded && (
                <button
                  className='expandButton'
                  type={'button'}
                  onClick={onExpand}
                >
                  Show Advanced Options
                </button>
              )}
              {expanded && (
                <button
                  className='expandButton'
                  type={'button'}
                  onClick={onCollapse}
                >
                  Hide Advanded Options
                </button>
              )}

              {expanded && (
                <div className='advanced-options'>
                  <div className='label-search-box'>
                    <InputElement
                      label={'Author'}
                      placeholder={'jeffslofish'}
                      text={formInput.author}
                      name='author'
                      setText={handleSetFormInput}
                    />

                    <InputElement
                      label={'User'}
                      placeholder={'jeffslofish'}
                      text={formInput.user}
                      name='user'
                      setText={handleSetFormInput}
                    />

                    <InputElement
                      label={'Org'}
                      placeholder={'slofish'}
                      text={formInput.org}
                      name='org'
                      setText={handleSetFormInput}
                    />

                    <InputElement
                      label={'Repo'}
                      placeholder={'jeffslofish/open-source-help-wanted'}
                      text={formInput.repo}
                      name='repo'
                      setText={handleSetFormInput}
                    />

                    <InputElement
                      label={'Assignee'}
                      placeholder={'jeffslofish'}
                      text={formInput.assignee}
                      name='assignee'
                      setText={(e) => {
                        setFormInput({
                          ...formInput,
                          issueAssigned: '',
                          assignee: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <fieldset className='input-component'>
                    <legend className='input-label-name'>
                      Search for keywords in:{' '}
                    </legend>
                    <label>
                      <input
                        type='checkbox'
                        checked={formInput.inTitle}
                        name='inTitle'
                        onChange={handleSetFormCheckbox}
                      />
                      title
                    </label>
                    <label>
                      <input
                        type='checkbox'
                        checked={formInput.inBody}
                        name='inBody'
                        onChange={handleSetFormCheckbox}
                      />
                      body
                    </label>
                    <label>
                      <input
                        type='checkbox'
                        checked={formInput.inComments}
                        name='inComments'
                        onChange={handleSetFormCheckbox}
                      />
                      comments
                    </label>
                  </fieldset>
                  <fieldset className='input-component'>
                    <legend className='input-label-name'>
                      Filter by type/status
                    </legend>
                    <select
                      className='input-element'
                      value={formInput.issueOrPullRequest}
                      name='issueOrPullRequest'
                      onChange={handleSetSelectInput}
                    >
                      <option value={'issue'}>Is Issue</option>
                      <option value={'pr'}>Is Pull Request</option>
                      <option value={'either'}>Is Issue or Pull Request</option>
                    </select>
                    <select
                      className='input-element'
                      value={formInput.state}
                      name='state'
                      onChange={handleSetSelectInput}
                    >
                      <option value={'open'}>Is Open</option>
                      <option value={'closed'}>Is Closed</option>
                      <option value={'either'}>Is Open or Closed</option>
                    </select>
                    <select
                      className='input-element'
                      value={formInput.issueAssigned}
                      name='issueAssigned'
                      onChange={handleSetSelectInput}
                    >
                      <option value='+no:assignee'>Not Assigned</option>
                      <option value=''>Possibly Assigned</option>
                    </select>
                  </fieldset>

                  <fieldset>
                    <legend className='input-label-name'>
                      Sorting Options
                    </legend>
                    <select
                      className='input-element'
                      value={formInput.sortType}
                      name='sortType'
                      onChange={handleSetSelectInput}
                    >
                      <option value={'created'}>Sort by created time</option>
                      <option value={'updated'}>Sort by updated time</option>
                      <option value={'comments'}>
                        Sort by number of comments
                      </option>
                      <option value={'reactions'}>
                        Sort by number of reactions
                      </option>
                      <option value={'interactions'}>
                        Sort by number of interactions
                      </option>
                      <option value={'reactions-+1'}>
                        Sort by number of +1s
                      </option>
                      <option value={'reactions--1'}>
                        Sort by number of -1s
                      </option>
                      <option value={'reactions-smile'}>
                        Sort by number of smiles
                      </option>
                      <option value={'reactions-thinking_face'}>
                        Sort by number of thinking faces
                      </option>
                      <option value={'reactions-heart'}>
                        Sort by number of hearts
                      </option>
                      <option value={'reactions-tada'}>
                        Sort by number of tadas
                      </option>
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

                  <fieldset className='input-component'>
                    <label>
                      <input
                        type='checkbox'
                        checked={formInput.filterFake}
                        name='filterFake'
                        onChange={handleSetFormCheckbox}
                      />
                      Exclude known fake issues
                    </label>
                  </fieldset>

                  <fieldset className='input-component'>
                    <label>
                      <input
                        type='checkbox'
                        checked={formInput.upTime}
                        name='upTime'
                        onChange={handleSetFormCheckbox}
                      />
                      Exclude status issues
                    </label>
                  </fieldset>
                </div>
              )}

              <button className='searchButton' type='submit'>
                Search
              </button>

              <button
                className='searchButton'
                type='button'
                onClick={handleSaveSearch}
              >
                Save Search
              </button>

              <button
                className='searchButton'
                type='button'
                onClick={handleLoadSearch}
              >
                Load Search
              </button>
            </div>
          </form>
        </div>
        <div className='results-container'>
          {githubContext.loading && <div className='loading' />}
          <Pagination
            currentPage={githubContext.page}
            totalCount={githubContext.totalCount}
            resultsPerPage={githubContext.resultsPerPage}
            prevlickHandler={handlePrevButton}
            nextClickHandler={handleNextButton}
          />
          <div>
            <Issues
              issues={githubContext.issues}
              filter={formInput.filterFake}
              upTime={formInput.upTime}
            />
          </div>
          <Pagination
            currentPage={githubContext.page}
            totalCount={githubContext.totalCount}
            resultsPerPage={githubContext.resultsPerPage}
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
