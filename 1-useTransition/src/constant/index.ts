

export const Base_Url="https://jsonplaceholder.typicode.com";



const getUsers=async(endPoint:string)=>{
    const res=await fetch(`https://jsonplaceholder.typicode.com/${endPoint}`);
    const data=await res.json();
    return data
};


export {getUsers};