import { useEffect, useState } from "react";
import { useLogoutMutation } from "app/services/auth";
import { useNavigate } from "react-router-dom";
import ItemContainer from "features/ui/shared/ItemContainer";

const Logout = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function asyncLogout(){
      try{
        const {message} = await logout().unwrap();
        setMessage(message);
      }catch(e){
  
      }finally{
        // navigate('/login');
      }
    }
    asyncLogout();
  }, [logout,navigate]);

  useEffect(() => {
    if(message){
      setTimeout(() => {navigate('/login')}, 1000 * 10)
    }
  }, [message, navigate]);
  
  if(message){
    return ( 
      <ItemContainer>
        <div className="container min-h-[20rem] flex items-center justify-center mx-auto w-fill">
          {message}
       </div>
      </ItemContainer>
    );
  }
  return <div/>
}
 
export default Logout;