import renderer from 'react-test-renderer';
import Avatar from '../Avatar';

describe('Avatar', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Avatar
          url='http://example.com/url'
          user_url='http://example.com/html_url'
        />
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="issue-avatar"
      >
        <a
          href="http://example.com/html_url"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            alt=""
            src="http://example.com/url"
            style={
              Object {
                "maxHeight": "100px",
                "maxWidth": "100px",
              }
            }
          />
        </a>
      </div>
    `);
  });
});
