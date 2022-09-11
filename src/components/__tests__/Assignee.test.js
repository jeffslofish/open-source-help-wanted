import renderer from 'react-test-renderer';
import Assignee from '../Assignee';

describe('Assignee', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Assignee
          user={{
            html_url: 'http://example.com/html',
            avatar_url: 'http://example.com/avatar',
          }}
        />
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <a
        href="http://example.com/html"
      >
        <img
          alt="User Avatar"
          src="http://example.com/avatar"
          style={
            Object {
              "maxHeight": "20px",
              "maxWidth": "20px",
            }
          }
        />
      </a>
    `);
  });
});
