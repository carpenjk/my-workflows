import {toast, cssTransition } from "react-toastify";
import ToastMsg from "./ToastMsg";

export const FADE_OUT_DELAY = 400;

export const TOAST_ID = "loading";

export const TRANSITION = {
  zoomIn: cssTransition({
    enter: "animate__animated animate__zoomIn",
    exit: "animate__animated animate__zoomOut"
    })
};

export const makeToast = (msg: string): JSX.Element => {
  return <ToastMsg msg={msg}/>;
}

export const createOrUpdateToast = (toastID: string, msg: string) => {
    toast(makeToast(msg), {
      isLoading: true,
      toastId: toastID,
      type: toast.TYPE.DEFAULT,
      transition: TRANSITION.zoomIn,
    })
    // update if toast is already open
    toast.update(toastID, {
      render: makeToast(msg),
      toastId: toastID,})
}