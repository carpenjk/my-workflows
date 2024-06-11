type Props = {
  children: React.ReactNode
}

const PanelHeader = ({children}: Props) => {
  return ( 
    <div className={`relative w-full flex flex-row justify-start mb-4`}>
      {children}
    </div>
   );
}
 
export default PanelHeader;