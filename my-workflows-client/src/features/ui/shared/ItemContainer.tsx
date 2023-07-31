import { twMerge } from "tailwind-merge"

interface Props extends React.ComponentProps<'div'> {}

const ItemContainer = ({children, className, ...passProps}: Props) => {
  return ( 
    <div 
      {...passProps} 
      className={twMerge(`container relative max-w-md p-7  mx-auto space-y-2 bg-primary-95 
        text-text-normal dark:bg-dk-primary-7 dark:text-dk-text-normal rounded-md shadow-inner 
        shadow-secondary-8/50 dark:shadow-dk-primary-6 w-fill shrink-0 grow basis-80 `, className)}>
        {children}
    </div>
  );
}
 
export default ItemContainer;