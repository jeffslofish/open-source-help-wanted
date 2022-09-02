import renderer from 'react-test-renderer';
import InputElement from '../InputElement';

describe('InputElement', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <InputElement
          label='test-label'
          placeholder='test-placeholder'
          text='test-text'
          setText={jest.fn()}
          name='test-name'
        />
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
    <div
      className="input-component"
    >
      <label
        className="input-label-name"
        htmlFor="test-label"
      >
        test-label
      </label>
      <input
        className="input-element"
        id="test-label"
        name="test-name"
        onChange={[Function]}
        placeholder="test-placeholder"
        type="text"
        value="test-text"
      />
    </div>
  `);
  });
});
