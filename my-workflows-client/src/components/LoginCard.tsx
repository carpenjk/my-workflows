import TextButton from "./TextButton";

const LoginCard = () => {
  const isError = false;
  return ( 
    <div className="container space-y-2 w-full max-w-md mx-auto p-4 rounded-md shadow-md md:p-6 bg-slate-700 md:max-w-3xl">
      <h1 className="text-gray-100">Welcome Back!</h1>
      <h5>Standardize and track your most important work flows.</h5>
      <div className="w-full max-w-md p-4">
        <form className="w-full">
          <div className="w-full mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input className=" w-full " id="email" type="text" placeholder="example@email.com"/>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className="w-full mb-4" id="password" type="password" placeholder="******************"/>
            {isError && <p className="text-red-300 text-xs font-bold italic">Please choose a password.</p>}
          </div>
          <div className="mb-6 flex flex-col justify-center items-center space-y-2">
              <span className="text-sm">Or</span>
              <TextButton>Login as Guest</TextButton>
          </div>
          <div className="flex items-center justify-between mt-10 space-x-6">
            <button className="bg-sky-600/80 hover:bg-sky-700/80 transition-colors duration-300 text-white font-bold py-2 px-4 rounded" type="button">
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