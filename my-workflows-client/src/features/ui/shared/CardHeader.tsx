import { twMerge } from "tailwind-merge"

interface Props extends React.ComponentProps<'h1'> {}

const CardHeader = ({children, className, ...props}:Props) => {
  return ( 
    <h1 {...props} className={twMerge("w-full text-lg lg:text-2xl text-text-normal font-maven font-bold mb-4 lg:mb-8 dark:text-dk-text-normal", className)}>
      {children}
    </h1> );
}
 
export default CardHeader;