import ToastMsg from "./ToastMsg";

const makeToast = (msg: string): JSX.Element => {
  return <ToastMsg msg={msg}/>;
}
 
export default makeToast;