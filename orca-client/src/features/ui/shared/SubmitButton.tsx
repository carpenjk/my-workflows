import { ComponentProps } from "react";

interface Props extends ComponentProps<"button"> {} 

const SubmitButton = ({children, ...props}: Props) => {
  return ( 
    <button className={`px-4 py-2 font-maven text-sm md:text-base font-bold text-primary-9 transition-colors duration-300 rounded-md 
      shadow-inner bg-secondary-3 hover:bg-secondary-4 dark:bg-dk-secondary-7 
      dark:hover:bg-dk-secondary-6 shadow-secondary-4 hover:shadow-secondary-6/50 
      dark:shadow-dk-secondary-6 dark:hover:shadow-dk-secondary-4/50 `} type="submit" {...props}>
        {children}
    </button>
   );
}
 
export default SubmitButton;