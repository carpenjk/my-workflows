interface Props{
  children: React.ReactNode,
}
const TableCell = ({children}: Props) => {
  return ( 
    <div className={`relative justify-self-stretch self-stretch flex items-center justify-stretch text-text-normal dark:text-dk-text-normal
       text-sm font-maven`}>
      {children}
    </div>
   );
}
 
export default TableCell;