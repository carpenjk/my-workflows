import { useEffect, useState } from "react";
import { useLogoutMutation } from "app/services/auth";
import { useNavigate } from "react-router-dom";
import ItemContainer from "features/ui/shared/ItemContainer";
import Loading from "features/loading/Loading";
import LoadingOverlay from "features/loading/LoadingOverlay";
import { FADE_OUT_DELAY, MIN_LOADING } from "features/loading/config";
import { InlineLink } from "features/ui";

const Logout = () => {
  const [logout, status] = useLogoutMutation();
  const [isFadingOut, setIsFadingOut] =useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  
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
  }, [logout,navigate]);
  
  return ( 
    <Loading
    fallback={<LoadingOverlay fadeOut={isFadingOut}/>}
    trigger={(!status.isUninitialized && !status.isLoading) as boolean}
    delay={FADE_OUT_DELAY}
    minLoading={MIN_LOADING}
    onTrigger={() => setIsFadingOut(true)}
  >
    <ItemContainer>
      <div  className="flex flex-col items-center justify-center ">
        <div className="container min-h-[10rem] flex items-center justify-center p-6 mx-auto w-fill">
          {message}
        </div>
        <div>
          <InlineLink to="/login">Go to login</InlineLink>
        </div>
      </div>

    </ItemContainer>
  </Loading>
  )
}
 
export default Logout;