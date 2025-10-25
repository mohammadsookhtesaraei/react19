// ایمپورت میشه هوک های مورد نظر
import { useEffect, useState, useTransition } from "react";

// تابعی هست که دیتای فچ شده داخلش هست
//  و فقط کال میشه بهش اند پوینت به عنوان ورودی داده میشه
import { getUsers } from "../constant";
// تایپ داده هایی که فچ میشه
import { type PhotosType } from "./TransitionComponents.type";

const TransitionComponent = () => {
  //  استیت اول برای داده هایی که قرار نیست تغییر کنن 
  //  و فقط فیلتر میشه و فیلتر شدش پاس داده میشه به استیت فیلترید دیتا
  const [user, setUser] = useState<PhotosType[]>([]);

  // استیت دوم برای سرچ در اینپوت و گرفتن مقادیر تایپ شده
  const [input, setInput] = useState("");

  // استیت سوم برای داده هایی که قراره تغییر کنن بعد از سرچ مپ روی این استیت زده میشه
  const [filteredData, setFilteredData] = useState<PhotosType[]>([]);

  // نکته هوک یوز ترنزیشن فقط برای تغییرات استیت استفاده میشه و این تغییرات رو اولویت بندی میکنه
  const [isPending, startTransition] = useTransition();


  // استفاده از یوزافکت برای گرفتن دیتا در حالت مونتینگ  یا رندر اولیه
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUsers("photos");
        // هم به یوزر داده میشه هم به فیلتر
        setUser(res);
        setFilteredData(res);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    };
    fetchData();
  }, []);

  // هوک یوز ترنزیشن برای عملیات کانکارنسی یا همون همزمانی استفاده میشه برای فقل نشدن یو ای و تجربه کاربری روان

  // خب داخل این تمرین ما میخوایم الویت اول با تایپ باشه فیلتر دیتا الویت کمتر باشه تا یو ای قفل نکنه
  // تا تایپ کاربر تموم نشده فیلتر نکنه با استفاده از استارت ترنزیشن میایم اون کار کم الویت تر که
  // همون فیلتر کردن دیتا هست رو داخلش قرار می دیم

  // پس کاربر تایپ میکنه تموم که شد بعد فیلتر میشه

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    startTransition(() => {
      // اگر کاربر هیچی تایپ نکرده بود بیاد لیست اصلی و دست نخرده رو نشون بده و ری ترن کنه
      if (!value.trim()) {
        setFilteredData(user);
        return;
      }

      // اینجا عملیات فیلتر  روی استیت یوزر و پسا دادنش به استیت فیلترد دیتا که روش مپ زده میشه
      const newFilteredData = user.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(newFilteredData);
    });
  };

  return (
    <div>
      <label htmlFor="search">search</label>
      <input type="text" value={input} onChange={changeHandler} />

      {/* ایز پندینگ اگه ترو هست یعنی کاربر داره تایپ میکنه بیاد بجای لیست یک لودینگ نشون بده  */}

      {/* اگر ایزپدینگ ترو هست بیا لودینک نشون بده
       در غیر این صورت چک کن اون چیزی که کاربر تایپ کرد و داخل ارایه نبود و طول ارایه صفر بود بیاد تگ نتیجه یافت نشد بذاره
        و در اخرم لیست رندرینگ و نتیجه سرچ */}
      {isPending ? (
        <h1>Loading...</h1>
      ) : filteredData.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {filteredData.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransitionComponent;
