type Props = {
  children: React.ReactNode
}

const ItemContainer = ({children}: Props) => {
  return ( 
    <div className="container max-w-md p-6 mx-auto space-y-2 text-gray-100 rounded-md shadow-md w-fill shrink-0 grow basis-80 bg-slate-700">
      {children}
    </div>
  );
}
 
export default ItemContainer;