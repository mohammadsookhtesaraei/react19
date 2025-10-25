import { useTransition } from "react"

import { Base_Url } from "../constant"

const FetchData = () => {
    const [isPending,startTransition]=useTransition();

    const getUser=async()=>{
     const result=await fetch(`${Base_Url}/posts/1`);
     const data=await result.json();
     return data
    };

    const fetchHandler=()=>{
        startTransition(async()=>{
            const result=await getUser();
            console.log(result);
        });
    }


  return (
    <div>
     <h1>fetchData</h1>
     <button onClick={fetchHandler}>
        {isPending ? "loading..." : "fetch"}
     </button>
    </div>
  )
}

export default FetchData