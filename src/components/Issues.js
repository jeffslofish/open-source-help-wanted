import Issue from './Issue';
import PropTypes from 'prop-types';

const Issues = ({ issues, filter }) => {
  return issues.map((issue) => (
    <Issue key={issue.id} issue={issue} filter={filter} />
  ));
};

Issue.propTypes = {
  issues: PropTypes.arrayOf(
    PropTypes.shape({
      issue: PropTypes.shape({
        id: PropTypes.isRequired,
        html_url: PropTypes.string.isRequired,
        user: PropTypes.shape({
          avatar_url: PropTypes.string.isRequired,
          html_url: PropTypes.string.isRequired,
        }).isRequired,
        title: PropTypes.string.isRequired,
        assignee: PropTypes.shape({
          html_url: PropTypes.string.isRequired,
          avatar_url: PropTypes.string.isRequired,
        }),
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
        labels: PropTypes.arrayOf(
          PropTypes.shape({
            color: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
          })
        ),
        body: PropTypes.string,
        draft: PropTypes.bool,
        state: PropTypes.string.isRequired,
      }).isRequired,
    })
  ),
  filter: PropTypes.bool.isRequired,
};

export default Issues;
