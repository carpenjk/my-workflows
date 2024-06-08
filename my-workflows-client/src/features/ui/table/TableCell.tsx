interface Props{
  children: React.ReactNode,
}
const TableCell = ({children}: Props) => {
  return ( 
    <div className={` whitespace-normal relative w-full justify-self-stretch self-stretch flex items-center justify-stretch px-1
    text-text-normal dark:text-dk-text-normal text-xs font-maven`}>
      {children}
    </div>
   );
}
 
export default TableCell;