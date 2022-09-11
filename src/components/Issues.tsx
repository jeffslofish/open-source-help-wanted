import { IIssue } from '../@types/IIssue';
import Issue from './Issue';

type Props = {
  issues: IIssue[];
  filter: boolean;
  upTime: boolean;
};

const Issues = ({ issues, filter, upTime }: Props) => {
  return (
    <>
      {issues.map((issue) => (
        <Issue key={issue.id} issue={issue} filter={filter} upTime={upTime} />
      ))}
    </>
  );
};

export default Issues;
