import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from "app/services/auth";
import { InlineLink } from "features/ui";

const Logout = () => {
  const [logout, status] = useLogoutMutation();
  console.log("🚀 ~ Logout ~ status:", status)
  const {isSuccess, isUninitialized} = status;
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
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

  // useEffect(() => {
  //  if(!isUninitialized && isSuccess) {
  //   setTimeout(()=> navigate('/login'),1000);
  //  }
  // }, [navigate, isUninitialized, isSuccess]);

  return ( 
      <div className="container flex flex-col items-center justify-center w-fill">
        <div>
          <h1 className=" text-text-normal dark:text-dk-text-normal">
          {message}
          </h1>
          {/* <InlineLink to="/login">Go to login</InlineLink> */}
        </div>
      </div>
  )
}
 
export default Logout;