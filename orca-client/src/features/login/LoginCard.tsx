import { useForm } from "react-hook-form";
import {InlineButton, InlineLink} from "features/ui/shared";
import { LoginRequest, LoginRequestSchema, useLoginMutation } from "app/services/auth";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";
import { ItemContainer } from "features/ui/shared";
import {TextInput} from "features/ui/shared";
import { SubmitButton } from "features/ui/shared";

const LoginCard = () => {
  const navigate = useNavigate();

  const [logIn, status] = useLoginMutation();
  const { register, handleSubmit, formState: {errors: inputErrors }, getValues } = useForm<LoginRequest>( {resolver: yupResolver(LoginRequestSchema)});

  const getErrors = (): string => {
    const {error} = status;
    if(error){
      if('data' in error && error?.data === 'Unauthorized'){
        return 'The email and password provided are invalid.'
      } else {
        return "Something went wrong."
      }
    }
    
    if(typeof inputErrors.email?.message === 'string'){
      return inputErrors.email?.message;
    }
    if(typeof inputErrors.password?.message === 'string') {
      return inputErrors.password?.message;
    }
    return "";
  }
  
  const handleLogin = async (credentials: LoginRequest) => {
    try{
      const {user} = await logIn(credentials).unwrap();
      if(user)
        navigate('/')
      }
    catch(e){
      console.log(e);   
    } 
  }
  return ( 
    <div className="flex items-center justify-center w-full h-full">
        <ItemContainer className="max-w-md space-y-2 ">
          <h1 className="text-3xl font-maven">Welcome Back!</h1>
          <h5 className="text-base font-maven">Standardize and track your most important work flows.</h5>
          <div className="w-full max-w-md p-4 ">
            <form className="w-full" onSubmit={handleSubmit(()=>handleLogin({email: getValues("email"), password:getValues("password")}))}>
              <div className="w-full mb-4 sm:mb-6">
                <TextInput
                  id="email"
                  label="Email"
                  placeholder="example@email.com"
                  {...register("email",  { required: true }) }
                  tabIndex={1}
                />
              </div>
              <div className="relative pb-6 sm:pb-8">
                <TextInput
                  id="password"
                  label="Password"
                  placeholder="******************"
                  type="password"
                  {...register("password",  { required: true }) }
                  tabIndex={2}
                />
                <div className="absolute bottom-1">
                  <p className="text-xs italic font-bold text-red-300">{getErrors()}</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center mb-6 space-y-2">
                  <span className="text-sm">Or</span>
              <InlineButton type='button' onClick={()=>handleLogin({email:process.env.REACT_APP_GUEST_ACC || '' , password:process.env.REACT_APP_GUEST_PASSWORD || ''})}>
                Login as Guest
              </InlineButton>
              </div>
              <div className="flex items-center justify-between mt-10 space-x-6">
              <SubmitButton tabIndex={3}>Sign In</SubmitButton>
                <div className="md:w-18">
                  <InlineLink to="/register" tabIndex={4}>
                    Don't have an account? Sign Up!
                  </InlineLink>
                </div>
              </div>
            </form>
            </div>
        </ItemContainer>
        </div>
  );
}
 
export default LoginCard;