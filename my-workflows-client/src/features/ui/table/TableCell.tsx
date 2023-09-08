interface Props{
  children: React.ReactNode,
}
const TableCell = ({children}: Props) => {
  return ( 
    <div className={`flex items-center min-h-[3rem] px-2 py-1 sm:px-4 sm:py-2 justify-stretch text-text-normal dark:text-dk-text-normal
       text-sm font-maven`}>
      {children}
    </div>
   );
}
 
export default TableCell;