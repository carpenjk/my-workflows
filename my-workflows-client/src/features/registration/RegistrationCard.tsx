import { useForm } from "react-hook-form";
import { useRegisterMutation, RegisterRequest, RegisterRequestSchema } from "app/services/auth";
import { yupResolver } from '@hookform/resolvers/yup';
import ItemContainer from "features/ui/shared/ItemContainer";
import { useNavigate } from "react-router-dom";
import TextInput from "features/ui/shared/TextInput";
import SubmitButton from "features/ui/shared/SubmitButton";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

const RegistrationCard = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<RegisterRequest>( 
    {resolver: yupResolver(RegisterRequestSchema), mode: 'onTouched'});
  const [registerUser, status] = useRegisterMutation();
  

  const handleRegister = async () => {
    try{
      await registerUser({
        email: getValues('email'),
        name: getValues('name'),
        password: getValues('password'),
        confirmPassword: getValues('confirmPassword')
      });
    
    } catch(e) {
      if(e){
        console.log(e);
      }
   }
  }

  useEffect(() => {
    if(status.isSuccess){
      setTimeout(()=>navigate('/login'), 3000);
    }
  }, [status.isSuccess, navigate]);
  
  const getErrors = (): string => {
    if(typeof errors.email?.message === 'string'){
      return errors.email?.message;
    }
    if(typeof errors.name?.message === 'string') {
      return errors.name?.message;
    }
    if(typeof errors.password?.message === 'string') {
      return errors.password?.message;
    }
    if(typeof errors.confirmPassword?.message === 'string') {
      return errors.confirmPassword?.message;
    }
    return "";
  }
  return ( 
      <ItemContainer >
      <h1 className="text-gray-100">Welcome Back!</h1>
      <h5>Standardize and track your most important work flows.</h5>
      <div className="w-full max-w-md p-4">
        <form className="w-full" onSubmit={handleSubmit(handleRegister)}>
          <div className="w-full mb-4 sm:mb-6">
            <TextInput
              id="email"
              label="Email"
              placeholder="example@email.com"
              {...register("email",  { required: true })}
            />
          </div>
          <div className="w-full mb-4 sm:mb-6">
            <TextInput
              id="name"
              label="Full Name"
              placeholder="John Smith"
              {...register("name",  { required: true })}
            />
          </div>
          <div className="mb-4 sm:mb-6">
            <TextInput
              id="password"
              label="Password"
              placeholder="******************"
              type="password"
              {...register("password",  { required: true })}
            />
          </div>
          <div className="relative pb-8 sm:pb-10">
            <TextInput
              id="confirmPassword"
              label="Confirm Password"
              placeholder="******************"
              type="password"
              {...register("confirmPassword",  { required: true }) }
            />
            <div className="absolute bottom-1">
              <p className="text-xs italic font-bold text-red-300">{getErrors()}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-10 space-x-6">
            <SubmitButton>Register</SubmitButton>
          </div>
        </form>
        </div>
        <ToastContainer
          className="content-centered"
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
    </ItemContainer>
   );
}
 
export default RegistrationCard;