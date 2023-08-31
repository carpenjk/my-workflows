import { ChevronDownIcon } from "@heroicons/react/24/outline";
import InlineButton from "./InlineButton";

type PropsWithLoading = {
  loadMore: React.MouseEventHandler,
  loadMoreActive: boolean,
  children: React.ReactNode,
  actionComponent?: React.ReactNode
  title:  string
}

type PropsWithoutLoading = {
  children: React.ReactNode,
  actionComponent?: React.ReactNode,
  title:  string
}

type Props = PropsWithLoading | PropsWithoutLoading;

const Table = (props: Props) => {
  const {actionComponent, children, title} = props;
  return ( 
    <>
      <div className="flex flex-col items-start justify-start w-full overflow-x-auto">
        <h2 className="text-sm font-bold lg:text-lg text-text-normal dark:text-dk-text-normal">{title}</h2>
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