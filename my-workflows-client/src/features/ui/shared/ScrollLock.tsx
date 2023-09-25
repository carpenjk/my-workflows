import ReactDOM from 'react-dom';

interface Props {
  disablePortal?: boolean
}


const Modal = ()=>  (<div className='absolute inset-0 z-50 bg-transparent' />);

const ScrollLock = ({disablePortal}: Props) => {
  if(!disablePortal){
    return ( 
      ReactDOM.createPortal(
      <Modal/>
      , document.body)
     );
  }
  return(<Modal/>)
  
}
 
export default ScrollLock;