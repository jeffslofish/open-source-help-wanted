import { IRepo } from '../@types/IRepo';

type Props = {
  repo: IRepo;
};

const Repo = ({ repo }: Props) => {
  return <div>{repo.full_name}</div>;
};

export default Repo;
