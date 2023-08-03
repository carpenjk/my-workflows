interface Props {
  children: React.ReactNode
}
const TableRow = ({children}: Props) => {
  return ( 
    <div className="flex items-center px-4 h-9 justify-stretch">{children}</div>
   );
}
 
export default TableRow;