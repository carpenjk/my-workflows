import { PropsWithChildren } from "react";
import CardHeader from "./CardHeader";
import ItemContainer from "./ItemContainer";

interface PropsWithLoading {
  title: string,
  loadMore: React.MouseEventHandler,
  loadMoreActive?: boolean,
  actionComponent?: React.ReactNode
}

interface PropsWithoutLoading {
  title: string,
  actionComponent?: React.ReactNode
}

type Props = PropsWithLoading | PropsWithoutLoading;

const TableCard = (props :PropsWithChildren<Props>) => {
  const {actionComponent, children, title } = props;

  return(
    <ItemContainer className=" max-w-fit w-full p-6 lg:p-9 min-h-[488px]">
    <CardHeader>{title}</CardHeader> 
      {children}  
    </ItemContainer>
  )
}
 
export default TableCard;