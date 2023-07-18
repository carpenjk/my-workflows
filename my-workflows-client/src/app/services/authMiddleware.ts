import { createListenerMiddleware } from '@reduxjs/toolkit'
import { authApi } from './auth'
import { toast } from "react-toastify";

// Create the middleware instance and methods
export const authListenerMiddleware = createListenerMiddleware()
const TOAST_QUERY_ID = "register";
// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
authListenerMiddleware.startListening({
  matcher: authApi.endpoints.register.matchPending,
  effect: async (action, listenerApi) => {
    
    toast("Loading", {
      isLoading: true,
      toastId: TOAST_QUERY_ID,
      type: toast.TYPE.DEFAULT,
    });
  },
})

authListenerMiddleware.startListening({
  matcher: authApi.endpoints.register.matchFulfilled,
  effect: async (action, listenerApi) => {
    console.log("🚀 ~ file: authMiddleware.ts:25 ~ effect: ~ action:", action)
    toast.update(TOAST_QUERY_ID, {
      render: `${action}`,
      isLoading: false,
      toastId: TOAST_QUERY_ID,
      type: toast.TYPE.SUCCESS,
      autoClose: 5000
    });
  },
})
authListenerMiddleware.startListening({
  matcher: authApi.endpoints.register.matchRejected,
  effect: async (action, listenerApi) => {
    console.log("🚀 ~ file: authMiddleware.ts:25 ~ effect: ~ action:", action)
    if(action.payload?.data){
      const {data} = action.payload;
      if(typeof data === 'object' && 'msg' in data){
        toast.update(TOAST_QUERY_ID, {
          render: "Error: ",
          isLoading: false,
          toastId: TOAST_QUERY_ID,
          type: toast.TYPE.ERROR,
        });
      }
    } else {
      console.log(JSON.stringify(action.payload))
      toast.update(TOAST_QUERY_ID, {
        render: "An unexpected error occurred.",
        isLoading: false,
        toastId: TOAST_QUERY_ID,
        type: toast.TYPE.ERROR,
      });
    }
  },
})