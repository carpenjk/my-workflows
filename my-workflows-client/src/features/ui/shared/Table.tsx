import { ChevronDownIcon } from "@heroicons/react/24/outline";
import InlineButton from "./InlineButton";

type PropsWithLoading = {
  loadMore: React.MouseEventHandler,
  loadMoreActive: boolean,
  children: React.ReactNode,
  actionComponent?: React.ReactNode
}

type PropsWithoutLoading = {
  children: React.ReactNode,
  actionComponent?: React.ReactNode
}

type Props = PropsWithLoading | PropsWithoutLoading;

const Table = (props: Props) => {
  const {actionComponent, children} = props;
  return ( 
    <>
      <div className="flex items-start justify-start w-full overflow-x-auto max-w-fit w-">
        {children}
      </div>
      {'loadMore' in props && (
          <div className="flex items-center justify-center w-full py-4">
            <InlineButton onClick={props.loadMore}>
              <span>more</span>
              <span className="duration-500 group-hover:animate-bounce-down"><ChevronDownIcon className="w-6 h-5 "/></span>
            </InlineButton>
            {actionComponent} 
          </div>
        )}
   </>
  );
}
 
export default Table;