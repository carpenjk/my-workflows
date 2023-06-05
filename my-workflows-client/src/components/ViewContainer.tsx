interface Props {
  children: React.ReactNode
}

const ViewContainer = ({children}: Props) => {
  return ( 
    <div 
    className="w-full max-w-7xl mx-auto "
    >
      {children}
    </div>
   );
}
 
export default ViewContainer;