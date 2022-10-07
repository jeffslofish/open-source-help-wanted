import { IRepo } from '../@types/IRepo';
import Repo from './Repo';

type Props = {
  repos: IRepo[];
};

const Repos = ({ repos }: Props) => {
  return (
    <>
      {repos.map((repo) => (
        <Repo key={repo.id} repo={repo} />
      ))}
    </>
  );
};

export default Repos;
