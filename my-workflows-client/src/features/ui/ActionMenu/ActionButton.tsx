import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  onClick: React.MouseEventHandler
}

const ActionButton  = ({onClick}: Props) => {
  return ( 
    <button onClick={onClick} className={`group flex items-center  w-full h-full justify-stretch `}>
      <EllipsisHorizontalCircleIcon className={`w-6 h-6 text-text-normal dark:text-dk-text-normal
      group-hover:fill-link-200/75 dark:group-hover:fill-transparent dark:group-hover:text-link-400 `}/>
    </button>
   );
}
 
export default ActionButton;