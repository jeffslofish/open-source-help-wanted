import * as chromatism from 'chromatism';

type Props = {
  labels: [
    {
      color: string;
      name: string;
    }
  ];
};

const Labels = ({ labels }: Props) => {
  return (
    <div className='issue-labels'>
      {labels.map((label, i) => {
        const style = {
          backgroundColor: '#' + label.color,
          color: chromatism.contrastRatio('#' + label.color).hex,
        };
        return (
          <span key={i} className='issue-label' style={style}>
            {label.name}
          </span>
        );
      })}
    </div>
  );
};

export default Labels;
