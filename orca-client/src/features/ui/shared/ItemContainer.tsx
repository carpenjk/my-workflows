import { forwardRef } from "react";
import { twMerge } from "tailwind-merge"

interface Props extends React.ComponentPropsWithRef<'div'> {}

const ItemContainer = forwardRef<HTMLDivElement, Props>(({children, className, ...passProps}, ref) => {
  return ( 
    <div 
      ref={ref}
      {...passProps} 
      className={twMerge(`container relative  p-7  mx-auto bg-primary-95 
        text-text-normal dark:bg-dk-primary-7 dark:text-dk-text-normal rounded-md shadow-inner 
        shadow-secondary-8/50 dark:shadow-dk-primary-6 w-fill shrink-0 grow basis-80 `, className)}>
        {children}
    </div>
  );
})
 
export default ItemContainer;