import { useState } from "react"


const Form = () => {
    const [data,setData]=useState({
        title:"",
        body:""
    });
    const [isPending,setIsPending]=useState(false);
    const [error,setError]=useState("");

    const changeHandler=(e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;
        setData((prevData)=>({...prevData,[name]:value}))
    };

    const submitHandler=async(e: React.MouseEvent<HTMLFormElement, MouseEvent>)=>{
        e.preventDefault();
        setIsPending(true);
       
        try{
         const result=await fetch("https://jsonplaceholder.typicode.com/posts",{
            method:"POST",
            body:JSON.stringify({title:data.title,body:data.body}),
            headers:{"Content-Type":"application/json"}
         });

         if(!result.ok) throw new Error(`request field ${result.status}`)

         const json=await result.json();
         console.log("success",json);

        }catch(error:unknown){
            if(error instanceof Error){
                console.log(error.message);
                setError(error.message)
            }
        }finally {
            setIsPending(false)
        }
    }


  return (
    <div>
        <h1>simple form</h1>
        <form onSubmit={submitHandler}>
        <label htmlFor="title">title</label>
        <input type="text" name="title" value={data.title} onChange={changeHandler} placeholder="title" /><br />
        <label htmlFor="body">body</label>
        <input type="text" name="body" value={data.body} onChange={changeHandler} placeholder="body" />
        <button type="submit" disabled={isPending}>
            {isPending ? "submitted..." : "submit"}
        </button>
        </form>

        {error&& <p>{error}</p>}
    </div>
  )
}

export default Form