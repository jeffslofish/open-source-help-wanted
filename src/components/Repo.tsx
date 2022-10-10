import { IRepo } from '../@types/IRepo';
import Avatar from './Avatar';

type Props = {
  repo: IRepo;
};

const Repo = ({ repo }: Props) => {
  return (
    <div className='repo'>
      <div className='repo-header'>
        <Avatar url={repo.owner.avatar_url} user_url={repo.owner.html_url} />
        <div className='main'>
          <div>
            <a href={repo.html_url} target='_blank' rel='noreferrer'>
              {repo.full_name}
            </a>
            <p>{repo.open_issues_count} Open Issues</p>
            <p>{repo.stargazers_count} Stars</p>
            <p>{repo.watchers_count} Watching</p>
            <p>{repo.forks_count} Forks</p>
          </div>
          <p>{repo.description}</p>
          <div>
            <a href={`/?repo=${repo.full_name}`}>Issues</a>
            &nbsp;
            <a
              href={`${repo.html_url}/issues`}
              target='_blank'
              rel='noreferrer'
            >
              (GitHub)
            </a>
          </div>
          <div>Topics: {repo.topics.join(', ')}</div>
        </div>
      </div>
    </div>
  );
};

export default Repo;
