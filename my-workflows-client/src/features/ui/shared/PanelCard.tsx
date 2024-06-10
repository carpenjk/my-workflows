type Props = {
  children: React.ReactNode
}

const PanelCard = ({children}: Props) => {
  return(
    <div className={`panel relative flex flex-col w-full h-full min-h-full max-w-full-[90vh]] p-4 bg-primary-95 
      dark:bg-dk-primary-7 dark:text-dk-text-normal rounded-md shadow-inner 
      shadow-secondary-8/50 dark:shadow-dk-primary-6 `}>
      {children}  
    </div>
  )
}
 
export default PanelCard;