import { ChevronDownIcon } from "@heroicons/react/24/outline";
import InlineButton from "./InlineButton";
import { ClassNameValue, twMerge } from "tailwind-merge";

type PropsWithLoading = {
  loadMore: React.MouseEventHandler,
  loadMoreActive: boolean,
  children: React.ReactNode,
  className: ClassNameValue,
  maxHeightClassName?: ClassNameValue,
  actionComponent?: React.ReactNode,
  headers?: React.ReactNode,
  title?:  string
}

type PropsWithoutLoading = {
  children: React.ReactNode,
  className: ClassNameValue,
  maxHeightClassName?: ClassNameValue,
  actionComponent?: React.ReactNode,
  headers?: React.ReactNode,
  title?:  string
}

type Props = PropsWithLoading | PropsWithoutLoading;

const Table = (props: Props) => {
  const {actionComponent, className, children, headers, maxHeightClassName,  title} = props;
  return ( 
    <div className={twMerge('relative flex transition-all truncate duration-300 ease-in-out md:transition-none', maxHeightClassName)}>
      <div className="flex flex-col items-start justify-start w-full pb-12 ">
        {title && (
          <h2 className="flex-none text-sm font-bold xl:text-lg text-text-normal dark:text-dk-text-normal">{title}</h2>
        )}
        
        <div className={ twMerge(`relative flex-1 overflow-auto ${'loadMore' in props ? 'pb-8' : ''}`, className, 'auto-rows-max')}>
          <div className="z-30 contents">
           {headers}
          </div>
          <div className="z-20 contents bg-primary-9">
            {children}
          </div>
          {'loadMore' in props && (
          <div className="absolute transform -translate-x-1/2 bottom-2 left-1/2">
            <InlineButton onClick={props.loadMore} type="button">
              <span>more</span>
              <span className="duration-500 group-hover:animate-bounce-down"><ChevronDownIcon className="w-6 h-5"/></span>
            </InlineButton>
          </div>
        )}
        </div>
      </div>
      
        {actionComponent}
   </ div>
  );
}
 
export default Table;