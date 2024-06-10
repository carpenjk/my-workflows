import { User } from "app/services/user";
import { Workflow } from "app/services/workflow";
import { PanelTitle } from "features/ui";

type Props = {
  title: string,
  workflow: Workflow,
  users: User[]
}


const getDisplayUsers = (users: User[]) => users.map((user) => ({
  value: user.userID , displayValue: user.name
}))


const PanelHeader = ({title, workflow, users}: Props) => {
  return ( 
    <div className={`relative w-full flex flex-row justify-start mb-4`}>
        <div className="relative flex-row w-full ">
        <PanelTitle>{title}</PanelTitle> 
          <div></div>
        </div>
  </div>
   );
}
 
export default PanelHeader;