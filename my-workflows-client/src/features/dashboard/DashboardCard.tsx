import { TOAST_ID } from "features/loading";
import { toast } from "react-toastify";
const DashbardCard = () => {
  toast.done(TOAST_ID);
  return ( <div className=" text-primary-1">I'm a dashboard</div> );
}
 
export default DashbardCard;