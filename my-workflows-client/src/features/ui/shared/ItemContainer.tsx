import { twMerge } from "tailwind-merge"

interface Props extends React.ComponentProps<'div'> {}

const ItemContainer = ({children, className, ...passProps}: Props) => {
  return ( 
    <div 
      {...passProps} 
      className={twMerge("container relative max-w-md p-6  mx-auto space-y-2 bg-slate-700 text-gray-200 rounded-md shadow-inner shadow-slate-600 w-fill shrink-0 grow basis-80 ", className)}>
        {children}
    </div>
  );
}
 
export default ItemContainer;