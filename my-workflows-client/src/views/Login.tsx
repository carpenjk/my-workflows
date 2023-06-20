import Header from "../components/Header";
import LoginCard from "../UI/LoginCard";
import Logo from "../UI/Logo";

const Login = () => {
  return ( 
      <>
         <Header logo={<Logo/>}></Header>
         <div className="container w-fill pt-20 flex justify-center mx-auto">
            <div className="">
               <LoginCard/>
            </div>
         </div>
      </>
   );
}
 
export default Login;