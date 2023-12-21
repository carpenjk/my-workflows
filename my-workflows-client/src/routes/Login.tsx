import LoadingOverlay from "features/loading/LoadingOverlay";
import { FADE_OUT_DELAY, MIN_LOADING } from "features/loading/config";
import { Loading } from "features/loading";
import LoginLoader from "features/login/LoginLoader";

const Login = () => {
      return(
         <Loading
         initialLoadState={true}
         fallback={<LoadingOverlay fadeOut={false}/>}
         config={{delay: FADE_OUT_DELAY, minLoading: MIN_LOADING}}
         >
            <LoginLoader />
         </Loading>
      )
}
 
export default Login;