import { useState } from "react";
import Loading from "./Loading";

type Props = {
  initialValue: boolean
}

const useLoading = ({initialValue = false}: Props) => {
  const [isLoading, setIsLoading] = useState(initialValue)
  return ( {
    Loading: Loading,
    trigger: {
      setLoading: (val: boolean)=> setIsLoading(true)
    }
  } );
}
 
export default useLoading;