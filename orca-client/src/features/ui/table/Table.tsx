import { ClassNameValue, twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode,
  className: ClassNameValue,
  maxHeightClassName?: ClassNameValue,
  headers?: React.ReactNode,
  title?:  string
}

export const Table = (props: Props) => {
  const { className, children, headers, maxHeightClassName,  title} = props;
  return ( 
    <div className={twMerge('relative flex h-full transition-all truncate duration-300 ease-in-out md:transition-none', maxHeightClassName)}>
      <div className="flex flex-col items-start justify-start w-full h-full">
        {title && (
          <h2 className="flex-none mb-1 text-xs font-bold text-text-normal dark:text-dk-text-normal">{title}</h2>
        )}
        
        <div className={ twMerge(`relative flex-1 h-full overflow-auto auto-rows-max p-2 bg-primary-9 dark:bg-dk-primary-8 rounded-sm`, className)}>
          <div className="z-30 contents">
           {headers}
          </div>
          <div className="z-20 contents">
            {children}
          </div>
        </div>
      </div>
   </ div>
  );
}
 