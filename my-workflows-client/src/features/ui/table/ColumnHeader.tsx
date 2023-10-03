import { twMerge } from "tailwind-merge";

interface Props extends React.ComponentProps<'div'> {}

const ColumnHeader = ({children, className, ...props}: Props) => {
  return ( 
    <div 
    className={twMerge( `z-10 sticky top-0 bg-primary-95 dark:bg-dk-primary-95 font-roboto text-sm xl:text-base text-text-normal font-bold px-2 flex flex-wrap
      justify-start items-center dark:text-dk-text-normal`, className)}
    {...props}>
      {children}
    </div>
   );
}
 
export default ColumnHeader;