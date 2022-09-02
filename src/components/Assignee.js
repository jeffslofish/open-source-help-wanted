import PropTypes from 'prop-types';

const Assignee = ({ user: { html_url, avatar_url } }) => {
  return (
    <a href={html_url}>
      <img src={avatar_url} style={imgStyle} alt='User Avatar' />
    </a>
  );
};

let imgStyle = {
  maxHeight: '20px',
  maxWidth: '20px',
};

Assignee.propTypes = {
  user: PropTypes.shape({
    html_url: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Assignee;
