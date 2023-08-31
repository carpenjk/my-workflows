import { ClassNameValue, twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode,
  className?: ClassNameValue
}

const InputCell = ({children, className}: Props) => {
  return ( 
    <div className={twMerge(`relative flex items-center justify-start w-full min-h-[58px] lg:min-h-[58px] 
      pt-2 pb-2 px-3 border border-solid rounded-sm shadow-inner 
      border-primary-8 bg-primary-9 lg:w-full dark:bg-dk-primary-9`, className)}>
      {children}
  </div>
   );
}
 
export default InputCell;