import { twMerge } from "tailwind-merge";

interface Props extends React.ComponentProps<'div'> {}

export const ColumnHeader = ({children, className, ...props}: Props) => {
  return ( 
    <div 
    className={twMerge( `z-10 py-1 sticky top-0 font-roboto text-xs text-text-normal font-bold px-2 flex flex-wrap
      justify-start items-center dark:text-dk-text-normal whitespace-normal`, className)}
    {...props}>
      {children}
    </div>
   );
}
 