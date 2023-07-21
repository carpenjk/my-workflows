import { ComponentProps } from "react";

interface Props extends ComponentProps<"button"> {} 

const SubmitButton = ({children, ...props}: Props) => {
  return ( 
    <button className="px-4 py-2 font-bold text-white transition-colors duration-300 rounded shadow-inner shadow-sky-500/40 hover:shadow-sky-800 bg-sky-600/80 hover:bg-sky-700/80" type="submit" {...props}>
        {children}
    </button>
   );
}
 
export default SubmitButton;