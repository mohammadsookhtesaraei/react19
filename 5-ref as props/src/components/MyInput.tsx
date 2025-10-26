import { useEffect } from "react";


const MyInput = ({placeHolder,myInputRef}:{
    placeHolder:string;
    myInputRef: React.RefObject<HTMLInputElement | null>;
}) => {

    useEffect(()=>{
    myInputRef?.current?.focus()
    },[])
  return (
    <input type="text" placeholder={placeHolder} ref={myInputRef}/>
  )
}

export default MyInput