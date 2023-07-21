
interface Props extends React.ComponentProps<'div'> {
  msg: string
}

const ToastMsg:React.FC<Props> = ({msg}: Props) => {
  return ( 
    <div className="flex items-center justify-center w-full">
      {msg}
    </div>
   );
}
 
export default ToastMsg;