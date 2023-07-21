import { ItemContainer, Spinner } from "features/ui";

interface Props {
  fadeOut: boolean,

}

const LoadingOverlay = ({fadeOut}: Props) => {
    const animateCard = fadeOut 
  ? "animate__animated animate__zoomOut"
  : ""
  const bgTransitionClasses = fadeOut 
  ? "opacity-0 bg-slate-900"
  : "bg-slate-900 opacity-100"

  return ( 
    <div className={`absolute inset-0 flex items-center justify-center`}>
               <div className={` transition duration-500 ${bgTransitionClasses} absolute inset-0`}/>
               <ItemContainer className={` bg-gradient-to-br from-slate-900/60 via-sky-950/50 to-slate-900/60 ${animateCard} flex items-center justify-center w-full max-w-sm min-h-[18rem]`}>
                  <div className="flex flex-col items-center justify-between w-full h-full p-4 space-y-6">
                     <span><Spinner/></span><span className="text-xl">Loading</span>

                  </div>
               </ItemContainer>
            </div>
   );
}
 
export default LoadingOverlay;