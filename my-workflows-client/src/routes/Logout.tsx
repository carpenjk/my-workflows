import { useEffect, useState } from "react";
import { useLogoutMutation } from "app/services/auth";
import LoadingOverlay from "features/loading/LoadingOverlay";
import { FADE_OUT_DELAY } from "features/loading/config";
import { InlineLink } from "features/ui";
import { Loader, Loading } from "features/loading";

const Logout = () => {
  const [logout, status] = useLogoutMutation();
  const [message, setMessage] = useState('');
  const [isFadingOut, setIsFadingOut] =useState(false);
  
  useEffect(() => {
    async function asyncLogout(){
      try{
        const {message} = await logout().unwrap();
        setMessage(message);
      }catch(e){
        console.log(e);
      }
    }
    asyncLogout();
  }, [logout]);

  return ( 
  <Loading
  initialLoadState={true}
  fallback={<LoadingOverlay fadeOut={isFadingOut}/>}
  config={{delay: FADE_OUT_DELAY}}
  >
     <Loader
     isLoaded={true}
     onLoaded={()=>setIsFadingOut(true)}
     onMount={()=>setIsFadingOut(false)}
     >
      <div className="container flex flex-col items-center justify-center w-fill">
        <div>
          <h1>
          {message}
          </h1>
          <InlineLink to="/login">Go to login</InlineLink>
        </div>
      </div>
     </Loader>
  </Loading>
  )
}
 
export default Logout;