import { useForm } from "react-hook-form";
import { useRegisterMutation, useGetUserDetailsQuery, RegisterRequest, RegisterRequestSchema } from "../app/services/auth";
import { yupResolver } from '@hookform/resolvers/yup';
import ItemContainer from "../UI/ItemContainer";
import { useNavigate } from "react-router-dom";
import TextInput from "../UI/TextInput";
import SubmitButton from "../UI/SubmitButton";
import { useEffect, useState } from "react";
import { CustomAPIError } from "../error/CustomAPIError";
import { ToastContainer, toast } from "react-toastify";


const Register = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<RegisterRequest>( 
    {resolver: yupResolver(RegisterRequestSchema), mode: 'onTouched'});

  const navigate = useNavigate();
  const [registerUser, status] = useRegisterMutation();
  const {data: loggedInUser} = useGetUserDetailsQuery();

  const [serverError, setServerError] = useState('');
  

  
  const getErrors = (): string => {
    const {error} = status;
    console.log("🚀 ~ file: Register.tsx:26 ~ getErrors ~ status:", status)
    if(error){
      if('data' in error){
        const data = error.data as {msg: string};
        if(data?.msg){
          return data.msg;
        }
      }
    }
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


  // useEffect(() => {
  //   const getErrors = (): string => {
  //     // const {error} = status;
  //     // console.log("🚀 ~ file: Register.tsx:26 ~ getErrors ~ status:", status)
  //     // if(error){
  //     //   if('data' in error){
  //     //     const data = error.data as {msg: string};
  //     //     if(data?.msg){
  //     //       return data.msg;
  //     //     }
  //     //   }
  //     // }
  //     if(typeof errors.email?.message === 'string'){
  //       return errors.email?.message;
  //     }
  //     if(typeof errors.name?.message === 'string') {
  //       return errors.name?.message;
  //     }
  //     if(typeof errors.password?.message === 'string') {
  //       return errors.password?.message;
  //     }
  //     if(typeof errors.confirmPassword?.message === 'string') {
  //       return errors.confirmPassword?.message;
  //     }
  //     return "";
  //   }

  //   if(Object.keys(errors).length > 0){
  //     setDisplayError(getErrors());
  //   }
  // },[errors, errors.email, errors.name, errors.password, errors.confirmPassword])


  const serverToast = (msg: string) => {
    toast(msg, {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  const handleRegister = async () => {
    try{
      const response = await registerUser({
        email: getValues('email'),
        name: getValues('name'),
        password: getValues('password'),
        confirmPassword: getValues('confirmPassword')
      })
      console.log("🚀 ~ file: Register.tsx:60 ~ handleRegister ~ response:", response)
      
      if(!status.isError){
        // navigate('/login');
      }
    } catch(e) {
      if(e){
        console.log('catch');
        console.log("🚀 ~ file: Register.tsx:67 ~ handleRegister ~ e:", e)
        if(typeof e === 'object'){
          if('data' in e && typeof e.data === 'object'){
            if(e.data && 'msg' in e.data){
              if(typeof e.data.msg === 'string'){
                console.log('setting error:', e.data.msg);
                // setServerError(e.data.msg as string)
              }
            }
          }
        }
      }
   }
  }

  return (
    <>
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
              <TextInput
                id="name"
                label="Full Name"
                placeholder="John Smith"
                {...register("name",  { required: true })}
              />
            </div>
            <div className="mb-4">
              <TextInput
                id="password"
                label="Password"
                placeholder="******************"
                type="password"
                {...register("password",  { required: true })}
              />
            </div>
            <div className="relative pb-8">
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
  </>
  );
}

export default Register;