type Props = {
  leftLabel: string;
  rightLabel: string;
  reference: React.RefObject<HTMLInputElement>;
};

const InputToggle = ({ leftLabel, rightLabel, reference }: Props) => {
  return (
    <div className='input-element'>
      <label>{leftLabel}</label>
      <input type='checkbox' ref={reference} />
      <label>{rightLabel}</label>
    </div>
  );
};

export default InputToggle;
