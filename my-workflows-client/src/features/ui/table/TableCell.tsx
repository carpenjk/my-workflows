import { ClassNameValue, twMerge } from "tailwind-merge";

interface Props{
  children: React.ReactNode,
  className?  : ClassNameValue
}
export const TableCell = ({children, className}: Props) => {
  return ( 
    <div className={twMerge(` whitespace-normal relative w-full justify-self-stretch self-stretch flex items-center justify-stretch px-1 py-1
    text-text-normal dark:text-dk-text-normal text-xs font-maven`, className)}>
      {children}
    </div>
   );
}