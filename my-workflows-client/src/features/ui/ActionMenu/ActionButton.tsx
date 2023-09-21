import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  onClick: React.MouseEventHandler
}

const ActionButton  = ({onClick}: Props) => {
  return ( 
    <button type="button" onClick={onClick} className={`group flex items-center justify-center w-full h-full  
      rounded-sm focus:outline-2 focus:outline focus:outline-sky-600/70 focus:-outline-offset-2
    `}>
      <EllipsisHorizontalCircleIcon className={`w-8 h-8 fill-transparent text-text-normal dark:text-dk-text-normal
      group-hover:fill-link-200/75 dark:group-hover:fill-transparent dark:group-hover:text-link-400 transition-all duration-500
      `}/>
    </button>
   );
}
 
export default ActionButton;