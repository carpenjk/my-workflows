import { twMerge } from "tailwind-merge";

interface Props extends React.ComponentProps<'div'> {}

const ColumnHeader = ({children, className, ...props}: Props) => {
  return ( 
    <div 
    className={twMerge( `font-roboto text-sm lg:text-base text-text-normal font-bold px-4 flex flex-wrap
      justify-start items-center dark:text-dk-text-normal`, className)}
    {...props}>
      {children}
    </div>
   );
}
 
export default ColumnHeader;