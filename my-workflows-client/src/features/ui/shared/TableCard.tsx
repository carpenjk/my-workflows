import { ChevronDownIcon } from "@heroicons/react/24/outline";
import CardHeader from "./CardHeader";
import InlineButton from "./InlineButton";
import InlineLink from "./InlineLink";
import ItemContainer from "./ItemContainer";

interface Props {
  title: string,
  table: React.ReactNode
}

const TableCard = ({title, table}:Props) => {
  const Table = table;
  return(
    <ItemContainer className=" max-w-fit w-full p-6 lg:p-9 min-h-[488px]">
    <CardHeader>{title}</CardHeader> 
    <div className="flex items-start justify-start w-full overflow-x-auto max-w-fit w-">
      {Table}
    </div>
    <div className="flex items-center justify-center w-full py-4">
        <InlineButton>
          <span>more</span>
          <span className="duration-500 group-hover:animate-bounce-down"><ChevronDownIcon className="w-6 h-5 "/></span>
        </InlineButton>
        <InlineLink to={'/workflow/new'} className="absolute right-4 sm:right-20">New Workflow</InlineLink>
    </div>
  </ItemContainer>
  )
}
 
export default TableCard;