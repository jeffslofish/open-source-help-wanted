type Props = {
  user_url: string;
  url: string;
};

const Avatar = ({ url, user_url }: Props) => {
  return (
    <div className='issue-avatar'>
      <a target='_blank' rel='noopener noreferrer' href={user_url}>
        <img style={imgStyle} src={url} alt='' />
      </a>
    </div>
  );
};

const imgStyle = {
  maxHeight: '100px',
  maxWidth: '100px',
};

export default Avatar;
