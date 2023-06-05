interface Props {
  children: React.ReactNode
}

const TextButton = ({children}: Props) => {
  return ( 
    <button 
      className="text-sm text-teal-300/90 underline underline-offset-4 decoration-transparent transition-colors duration-500 hover:text-teal-500 hover:decoration-teal-500 hover:underline"
      type="button"
    >
      {children}
    </button>
   );
}
 
export default TextButton;