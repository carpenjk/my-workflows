import { PropsWithChildren } from "react";
import CardHeader from "./CardHeader";
import ItemContainer from "./ItemContainer";

interface PropsWithLoading {
  title: string,
  loadMore: React.MouseEventHandler,
  loadMoreActive?: boolean,
}

interface PropsWithoutLoading {
  title: string,
}

type Props = PropsWithLoading | PropsWithoutLoading;

const TableCard = (props :PropsWithChildren<Props>) => {
  const {children, title } = props;
  return(
    <ItemContainer className="w-full h-full max-w-full max-h-[90vh] p-4 md:p-6 min-h-[488px] lg:max-w-5xl">
    <CardHeader>{title}</CardHeader> 
      {children}  
    </ItemContainer>
  )
}
 
export default TableCard;