import { IIssue } from '../@types/IIssue';
import Issue from './Issue';

type Props = {
  issues: IIssue[];
  filter: boolean;
};

const Issues = ({ issues, filter }: Props) => {
  return (
    <>
      {issues.map((issue) => (
        <Issue key={issue.id} issue={issue} filter={filter} />
      ))}
    </>
  );
};

export default Issues;
