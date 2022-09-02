import PropTypes from 'prop-types';

const InputElement = ({ label, placeholder, text, setText, name }) => {
  const onChange = (e) => setText(e);

  return (
    <div className='input-component'>
      <label className='input-label-name' htmlFor={label}>
        {label}
      </label>
      <input
        className='input-element'
        type='text'
        placeholder={placeholder}
        value={text}
        name={name}
        onChange={onChange}
        id={label}
      />
    </div>
  );
};

InputElement.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  name: PropTypes.string,
};

export default InputElement;
