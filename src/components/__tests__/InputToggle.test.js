import renderer from 'react-test-renderer';
import InputToggle from '../InputToggle';

describe('InputToggle', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <InputToggle
          leftLabel='left-lable-test'
          rightLabel='right-label-test'
          reference={{ current: 'test' }}
        />
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
    <div
      className="input-element"
    >
      <label>
        left-lable-test
      </label>
      <input
        type="checkbox"
      />
      <label>
        right-label-test
      </label>
    </div>
  `);
  });
});
