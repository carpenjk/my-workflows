

const excecuteWithDelay = ( delay: number, cb: ()=> void): boolean => {
  // if(trigger){
    setTimeout(() => {
      console.log('execute')
      return cb();
    }, delay)
    return true;
  // }
  // return (false);
}
 
export default excecuteWithDelay;