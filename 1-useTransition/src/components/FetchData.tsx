// در ری اکت 19 هوک یوزترنزیشن استارت ترنزیشن میتونه ایسینک باشه
// توی این تمرین اومدیم ابدیت جدید رو تست کردیم تمرین قبلی برای درک هوک بود

// دیتا فچ کردیم گفتیم این عملیات فچ الویت کم تری داره چون ای سینک بود داخل استارت ترنزیشن کال کردیم تابعشو
//  و در داخل استارت ترنزیشن از ایسنک استفاده کردیم و تابع رو کال کردیم تا فچ بشه داده

import { useTransition } from "react";

import { Base_Url } from "../constant";

const FetchData = () => {
  const [isPending, startTransition] = useTransition();

  const getUser = async () => {
    const result = await fetch(`${Base_Url}/posts/1`);
    const data = await result.json();
    return data;
  };

  const fetchHandler = () => {
    startTransition(async () => {
      const result = await getUser();
      console.log(result);
    });
  };

  return (
    <div>
      <h1>fetchData</h1>
      {/* اینجاهم گفتیم اگه ایز پدینگ ترو هه یک متن لودینگه اگه نه یک فچ */}
      <button onClick={fetchHandler}>
        {isPending ? "loading..." : "fetch"}
      </button>
    </div>
  );
};

export default FetchData;
