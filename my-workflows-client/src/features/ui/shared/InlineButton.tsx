import { twMerge } from "tailwind-merge";

interface Props extends React.ComponentProps<'button'> {};

const InlineButton = ({children, className, ...props}: Props) => {
  return ( 
    <button className={twMerge(`flex items-center text-sm font-bold underline transition-colors duration-500 
      group font-roboto text-link-700 hover:text-link-700/80 dark:text-teal-300/90 underline-offset-4 
      decoration-transparent dark:hover:text-link-300 hover:decoration-link-500 hover:underline`, 
      className)} {...props}>
      {children}
    </button>
   );
}
 
export default InlineButton;