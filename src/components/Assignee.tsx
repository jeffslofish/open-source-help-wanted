type Props = {
  user: {
    html_url: string;
    avatar_url: string;
  };
};

const Assignee = ({ user: { html_url, avatar_url } }: Props) => {
  return (
    <a href={html_url}>
      <img src={avatar_url} style={imgStyle} alt='User Avatar' />
    </a>
  );
};

const imgStyle = {
  maxHeight: '20px',
  maxWidth: '20px',
};

export default Assignee;
