import { ClassNameValue, twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode,
  className?: ClassNameValue
}

const InputCell = ({children, className}: Props) => {
  return ( 
    <div className={twMerge(` whitespace-normal relative flex items-stretch justify-stretch w-full min-h-[52px] lg:min-h-[58px] 
      pt-2 pb-2 px-3 border border-solid rounded-sm shadow-inner border-primary-8 bg-primary-9
      dark:bg-dk-primary-9 focus-within:outline-2 focus-within:outline focus-within:outline-sky-600/70`, className)}>
      {children}
  </div>
   );
}
 
export default InputCell;