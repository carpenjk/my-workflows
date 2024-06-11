import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from "app/services/auth";
import { TOAST_ID, createOrUpdateToast } from "features/loading";

const Logout = () => {
  const [logout, status] = useLogoutMutation();
  const navigate = useNavigate();
  
  useEffect(() => {
    async function asyncLogout(){
      try{
        const {message} = await logout().unwrap();
        createOrUpdateToast(TOAST_ID, message)
        setTimeout(()=>navigate('/login'), 500);
      }catch(e){
        console.log(e);
      }
    }
    asyncLogout();
  }, [logout, navigate]);

  

  return ( 
      <div className="container flex flex-col items-center justify-center w-fill"/>
  )
}
 
export default Logout;