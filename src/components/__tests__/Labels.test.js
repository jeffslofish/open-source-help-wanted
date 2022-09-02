import renderer from 'react-test-renderer';
import Labels from '../Labels';

describe('Labels', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Labels
          labels={[
            { name: 'label-test-1', color: '098765' },
            { name: 'label-test-2', color: 'abcdef' },
          ]}
        />
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="issue-labels"
      >
        <span
          className="issue-label"
          style={
            Object {
              "backgroundColor": "#098765",
              "color": "#ffffff",
            }
          }
        >
          label-test-1
        </span>
        <span
          className="issue-label"
          style={
            Object {
              "backgroundColor": "#abcdef",
              "color": "#000000",
            }
          }
        >
          label-test-2
        </span>
      </div>
    `);
  });
});
