import { useForm } from "react-hook-form";
import InlineLink from "../UI/InlineLink";
import { useRegisterMutation, useGetUserDetailsQuery, RegisterRequest, RegisterRequestSchema } from "../app/services/auth";
import { yupResolver } from '@hookform/resolvers/yup';
import ItemContainer from "../UI/ItemContainer";
import { useNavigate } from "react-router-dom";
import TextInput from "../UI/TextInput";


const Register = () => {
  const { register, handleSubmit, formState: {errors }, getValues } = useForm<RegisterRequest>( {resolver: yupResolver(RegisterRequestSchema)});
  
  console.log('email:',getValues('email'));
  const navigate = useNavigate();

  const [registerUser, registrationError] = useRegisterMutation();
  const {data: loggedInUser} = useGetUserDetailsQuery();
  
  const getErrors = (): string => {
    console.log("🚀 ~ file: Register.tsx:14 ~ Register ~ errors:", errors)  
    if(typeof errors.email?.message === 'string'){
      return errors.email?.message;
    }
    if(errors.password?.message === 'string') {
      return errors.password?.message;
    }
    return "";
  }

  const displayErrors: string = getErrors();

  const handleRegister = async () => {
    try{
      const response = await registerUser({
        email: getValues('email'),
        name: getValues('name'),
        password: getValues('password'),
        confirmPassword: getValues('confirmPassword')
      }).unwrap();
      if(!registrationError){
        navigate('/login');
      }
    } catch(e) {
      console.log(e);
    }
  }
  return (
    <ItemContainer >
      <h1 className="text-gray-100">Welcome Back!</h1>
      <h5>Standardize and track your most important work flows.</h5>
      <div className="w-full max-w-md p-4">
        <form className="w-full" onSubmit={handleSubmit(handleRegister)}>
          <div className="w-full mb-4">
            <TextInput
              id="email"
              label="Email"
              placeholder="example@email.com"
              {...register("email",  { required: true })}
            />
          </div>
          <div className="w-full mb-4">
            <label className="block mb-2 text-sm font-bold" htmlFor="name">
              Full Name
            </label>
            <input
              {...register("name",  { required: true }) } 
              className="w-full " 
              id="name"
              type="text"
              placeholder="John Smith"/>
          </div>
          <div className="mb-4">
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
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold" htmlFor="confirmPassword">
              Verify Password 
            </label>
            <input 
              {...register("confirmPassword",  { required: true }) }
              className="w-full mb-4"
              id="confirmPassword" 
              type="password" 
              placeholder="******************"
            />
            {displayErrors && <p className="text-xs italic font-bold text-red-300">{displayErrors}</p>}
          </div>
          <div className="flex items-center justify-between mt-10 space-x-6">
            <button className="px-4 py-2 font-bold text-white transition-colors duration-300 rounded bg-sky-600/80 hover:bg-sky-700/80" type="submit">
              Register
            </button>
          </div>
        </form>
        </div>
    </ItemContainer>
    );
}
 
export default Register;