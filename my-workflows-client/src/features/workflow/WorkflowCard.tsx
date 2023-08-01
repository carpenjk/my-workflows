import { ItemContainer } from "features/ui";
import CardHeader from "features/ui/shared/CardHeader";
import ColumnHeader from "features/ui/table/ColumnHeader";

const WorkflowCard = () => {
  return ( 
      <ItemContainer className=" max-w-fit w-full p-6 lg:p-9 min-h-[486px]">
        <CardHeader>My Workflows</CardHeader> 
        <div className="flex items-start justify-start w-full overflow-x-auto max-w-fit">
          <div className={`grid w-fit 
            grid-cols-[3rem_minmax(8rem,10rem)_minmax(9rem,13rem)_minmax(5rem,7rem)_minmax(5rem,8rem)_minmax(5rem,8.5rem)_minmax(5rem,8rem)]
            lg:grid-cols-[3rem_minmax(8rem,10rem)_minmax(11rem,13rem)_minmax(6rem,7rem)_minmax(6rem,8rem)_minmax(6rem,8.5rem)_minmax(6rem,8rem)] 
            
          `}>
            <div className=""></div>
              <ColumnHeader>Name</ColumnHeader>
              <ColumnHeader>Description</ColumnHeader>
              <ColumnHeader>Status</ColumnHeader>
              <ColumnHeader>Duration</ColumnHeader>
              <ColumnHeader>Owner</ColumnHeader>
              <ColumnHeader>Last Modified</ColumnHeader>
          </div>
        </div>
      </ItemContainer>
   );
}
 
export default WorkflowCard;