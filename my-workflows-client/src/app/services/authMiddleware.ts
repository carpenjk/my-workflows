import { createListenerMiddleware } from '@reduxjs/toolkit'
import { redirect } from "react-router-dom"
import { authApi } from './auth'
import { cssTransition, toast } from "react-toastify";
import makeToast from 'features/ui/shared/makeToast';


const zoomIn = cssTransition({
  enter: "animate__animated animate__zoomIn",
  exit: "animate__animated animate__zoomOut"
});


// Create the middleware instance and methods
export const authListenerMiddleware = createListenerMiddleware()
const TOAST_QUERY_ID = "register";
// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
authListenerMiddleware.startListening({
  matcher: authApi.endpoints.register.matchPending,
  effect: async (action, listenerApi) => {
    toast(makeToast('Loading'), {
      isLoading: true,
      toastId: TOAST_QUERY_ID,
      type: toast.TYPE.DEFAULT,
      transition: zoomIn,
    });
  },
})


authListenerMiddleware.startListening({
  matcher: authApi.endpoints.register.matchFulfilled,
  effect: async (action, listenerApi) => {
    console.log("🚀 ~ file: authMiddleware.ts:25 ~ effect: ~ action:", action)
    toast.update(TOAST_QUERY_ID, {
      // render: `${action}`,
      render: makeToast(`${action.meta.arg.originalArgs.email} has been signed up!`),
      isLoading: false,
      toastId: TOAST_QUERY_ID,
      type: toast.TYPE.SUCCESS,
      autoClose: 5000,
      transition: zoomIn,
      onClose: ()=>redirect('/login')
    });
    console.log('fullfilled');
    // redirect('/login');
  },
})
authListenerMiddleware.startListening({
  matcher: authApi.endpoints.register.matchRejected,
  effect: async (action, listenerApi) => {
    console.log("🚀 ~ file: authMiddleware.ts:25 ~ effect: ~ action:", action)
    if(action.payload?.data){
      const {data} = action.payload;
      if(typeof data === 'object' && 'msg' in data && typeof data.msg === 'string'){
        toast.update(TOAST_QUERY_ID, {
          // render: "Error: ",
          render: makeToast(data.msg),
          isLoading: false,
          toastId: TOAST_QUERY_ID,
          type: toast.TYPE.ERROR,
          transition: zoomIn,
        });
      }
    } else {
      console.log(JSON.stringify(action.payload))
      toast.update(TOAST_QUERY_ID, {
        render: "An unexpected error occurred.",
        isLoading: false,
        toastId: TOAST_QUERY_ID,
        type: toast.TYPE.ERROR,
        transition: zoomIn
      });
    }
  },
})