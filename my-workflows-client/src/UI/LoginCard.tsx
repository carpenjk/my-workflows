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
    <div className="container max-w-md p-6 mx-auto space-y-2 rounded-md shadow-md w-fill shrink-0 grow basis-80 bg-slate-700">
      <h1 className="text-gray-100">Welcome Back!</h1>
      <h5>Standardize and track your most important work flows.</h5>
      <div className="w-full max-w-md p-4">
        <form className="w-full" onSubmit={handleSubmit(handleLogin)}>
          <div className="w-full mb-4">
            <label className="block mb-2 text-sm font-bold" htmlFor="email">
              Email
            </label>
            <input
              {...register("email",  { required: true }) } 
              className="w-full " 
              id="email"
              type="text"
              placeholder="example@email.com"/>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold" htmlFor="password">
              Password
            </label>
            <input 
              {...register("password",  { required: true }) }
              className="w-full mb-4"
              id="password" 
              type="password" 
              placeholder="******************"
            />
            {displayErrors && <p className="text-xs italic font-bold text-red-300">{displayErrors}</p>}
          </div>
          <div className="flex flex-col items-center justify-center mb-6 space-y-2">
              <span className="text-sm">Or</span>
              <TextButton>Login as Guest</TextButton>
          </div>
          <div className="flex items-center justify-between mt-10 space-x-6">
            <button onClick={handleLogin} className="px-4 py-2 font-bold text-white transition-colors duration-300 rounded bg-sky-600/80 hover:bg-sky-700/80" type="submit">
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