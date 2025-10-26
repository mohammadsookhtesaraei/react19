import { useRef } from "react";
import MyInput from "./components/MyInput";

//  در ری اکت 19 فوروارد رف دیگه حذف شده میتونیم مستقیم رف رو به عنوان پراپس پاس بدیم

const App = () => {
  const myInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <MyInput placeHolder="user name" myInputRef={myInputRef} />
    </>
  );
};

export default App;
