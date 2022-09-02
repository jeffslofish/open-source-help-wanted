import renderer from 'react-test-renderer';
import Main from '../Main';
import GithubState from '../../context/github/GithubState';

beforeAll(() => {
  Date.now = jest.fn(() => 1487076708000);
});

afterAll(() => {});

describe('Main', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <GithubState>
          <Main />
        </GithubState>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
