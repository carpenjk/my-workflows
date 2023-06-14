import { useForm } from "react-hook-form";
import TextButton from "./TextButton";
import { LoginRequest, LoginRequestSchema, useLoginMutation } from "../app/services/auth";
import { yupResolver } from '@hookform/resolvers/yup';




const LoginCard = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>( {resolver: yupResolver(LoginRequestSchema)});
  const [logIn] = useLoginMutation();

  const handleLogin = () => {
    logIn({email: 'guest1@example.com', password:'password'})
  }

  const getErrors = (): string => {
    if(typeof errors.email?.message === 'string'){
      return errors.email?.message;
    }
    if(errors.password?.message === 'string') {
      return errors.password?.message;
    }
    return "";
  }

  const displayErrors: string = getErrors();

  return ( 
    <div className="container space-y-2 w-full max-w-md mx-auto p-4 rounded-md shadow-md md:p-6 bg-slate-700 md:max-w-3xl">
      <h1 className="text-gray-100">Welcome Back!</h1>
      <h5>Standardize and track your most important work flows.</h5>
      <div className="w-full max-w-md p-4">
        <form className="w-full" onSubmit={handleSubmit(handleLogin)}>
          <div className="w-full mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              {...register("email",  { required: true }) } 
              className=" w-full " 
              id="email"
              type="text"
              placeholder="example@email.com"/>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input 
              {...register("password",  { required: true }) }
              className="w-full mb-4"
              id="password" 
              type="password" 
              placeholder="******************"
            />
            {displayErrors && <p className="text-red-300 text-xs font-bold italic">{displayErrors}</p>}
          </div>
          <div className="mb-6 flex flex-col justify-center items-center space-y-2">
              <span className="text-sm">Or</span>
              <TextButton>Login as Guest</TextButton>
          </div>
          <div className="flex items-center justify-between mt-10 space-x-6">
            <button onClick={handleLogin} className="bg-sky-600/80 hover:bg-sky-700/80 transition-colors duration-300 text-white font-bold py-2 px-4 rounded" type="submit">
              Sign In
            </button>
            <div className="md:w-18">
              <TextButton>
                Don't have an account? Sign Up!
              </TextButton>
            </div>
          </div>
        </form>
        </div>
    </div>
  );
}
 
export default LoginCard;