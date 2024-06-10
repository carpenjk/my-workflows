import { twMerge } from "tailwind-merge"

interface Props extends React.ComponentProps<'h1'> {}

const PanelTitle = ({children, className, ...props}:Props) => {
  return ( 
    <h1 {...props} className={twMerge("w-full text-sm text-text-normal dark:text-dk-text-normal font-maven font-bold ", className)}>
      {children}
    </h1> );
}
 
export default PanelTitle;