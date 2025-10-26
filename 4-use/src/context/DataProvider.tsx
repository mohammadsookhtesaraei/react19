import { createContext } from "react"



const data="THIS IS A MOCK DATA";

const DataContext=createContext<string>("");




const DataProvider = ({children}:{
    children:React.ReactNode
}) => {
  return (

    // در  ری اکت 19 دیگه نیاز به پرو وایدره نیست مستقیم ولیو رو میدیم به کانتکس و در ری اکت 19 دپریکیتد شده
    <DataContext value={data}>
        {children}
    </DataContext>
  )
}

export {DataProvider , DataContext}