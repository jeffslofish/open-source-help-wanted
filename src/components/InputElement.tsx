import { ChangeEvent } from 'react';

type Props = {
  label: string;
  placeholder: string;
  text: string;
  setText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
};

const InputElement = ({ label, placeholder, text, setText, name }: Props) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setText(e);

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

export default InputElement;
