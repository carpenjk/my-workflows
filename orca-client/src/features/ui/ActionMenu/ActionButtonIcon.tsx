import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

const ActionButtonIcon = () => {
  return ( 
      <EllipsisHorizontalIcon className={`w-8  h-4 fill-slate-700 dark:fill-slate-300
        group-hover:bg-link-200/75 dark:group-hover:bg-link-700 rounded transition-all duration-500
      `}/>
   );
}
 
export default ActionButtonIcon;