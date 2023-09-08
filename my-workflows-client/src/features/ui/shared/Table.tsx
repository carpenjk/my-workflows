import { ChevronDownIcon } from "@heroicons/react/24/outline";
import InlineButton from "./InlineButton";
import { ClassNameValue } from "tailwind-merge";

type PropsWithLoading = {
  loadMore: React.MouseEventHandler,
  loadMoreActive: boolean,
  children: React.ReactNode,
  className: ClassNameValue,
  actionComponent?: React.ReactNode
  title?:  string
}

type PropsWithoutLoading = {
  children: React.ReactNode,
  className: ClassNameValue,
  actionComponent?: React.ReactNode,
  title?:  string
}

type Props = PropsWithLoading | PropsWithoutLoading;

const Table = (props: Props) => {
  const {actionComponent, className, children, title} = props;
  return ( 
    <div className="relative flex">
      <div className="flex flex-col items-start justify-start w-full overflow-x-auto">
        {title && (
          <h2 className="text-sm font-bold lg:text-lg text-text-normal dark:text-dk-text-normal">{title}</h2>
        )}
        <div className={className as string}>
          {children}
        </div>
      </div>
      {'loadMore' in props && (
          <div className="absolute transform -translate-x-1/2 -translate-y-1/2 -bottom-8 left-1/2">
            <InlineButton onClick={props.loadMore}>
              <span>more</span>
              <span className="duration-500 group-hover:animate-bounce-down"><ChevronDownIcon className="w-6 h-5"/></span>
            </InlineButton>
          </div>
        )}
        {actionComponent}
   </ div>
  );
}
 
export default Table;