import { useEffect, useState,useOptimistic } from "react"
import { BASE_URL } from "../constant/api"

interface PostData {
    userId: number;
    id:number;
    title: string;
    body:string;
};

interface NewPost {
  title: string;
  body: string;
};


// کاربرد این هوک چیه میاد حالت خوشبینانه رو برای ما اعمال میکنه
// فرض کنید ما یک فرم داریم کاربر دیتا رو میفرسته سمت سروز و اون دیتا باید داخل یوی ای نشون داده بشه
// خب این درخواست تا بره بیاد طول میکشه
// اینجا این هوک میاد میگه اوکی این دیتای جدیدی که ایجاد شده رو بده به من من داخل یو ای نشون بدم بعد درخواست رفت سمت سرو با موفقیت انجام شد
// دیتای واقعی رو میذارم جاش نشون میدم
// پشت پرده ریکویست میره این هوک مستقیم اون دیتای که کاربر وارد کرده رو نشون میده  تا یوی ای سریع ابدیت بشه بدون لگ
// جواب دیتا اومد از سمت سرور اونو میذاره جاش





const OptimisticForm = () => {
    // یک استیت داریم که دیتای اولیه میره داخلش و در یوز افکت استفاده میشه و در حالت مونتیگ دیتا از سرور گرفته میشه و داخلش قرار داده میشه
    const [data,setData]=useState<PostData[]>([]);
    // اینجا این هوک میاد یک استیت اولیه داره یک فانکشن ابدیتر خب استیت اولیه میشه همون استیت دیتا که بهش بهعنوان ورودی دادیم
    // ورودی دومش یک تابع است که مقدار قبلی دیتا رو میگیره با دیتای اپتمیک شده
    // و ری ترن میکنه یک ارایه که مقادیر قبلی استیت دیتا داخلش هست و دیتای جدیدی که کاربر قراره بفرسته سمت سرو قبل از فچ
    // مقادیر قبلی و دیتای که کاربر وارد کرده قبل از فچ داخل اپتمیکس دیتا قرار میگره ما باید اون رو روش مپ بزنیم
     const [optimisticData, setOptimisticData] = useOptimistic<PostData[], PostData>(data, (currentData,optimisticData)=>{
       return [...currentData,optimisticData]
     });
    //  اینجا دیتای اصلی یبار فچ میشه میره داخل استیت دیتا
    useEffect(()=>{
     fetch(`${BASE_URL}/posts`).then((response)=>response.json()).then((json)=>setData(json))
    },[]);


    // این تابع مقادیر فرم رو از اکشن میگیره اول میده به استیت اپتمیکس دیتا که روش مپ بزنیم و توی یوی ای نشون بدیم
    // بعدش ریکویست میفرستم سمت سرور و این دیتا رو فچ میکنیم و می ریزیم داخل استیت دیتا

    const submitAction=async(formData:FormData)=>{
    const form:NewPost={
        title:(formData.get('title') as string) ?? "",
        body:(formData.get('body') as string) ?? "",
    };

    const newPost:PostData={
     id:Date.now(),
     userId:0,
     ...form
    }
    setOptimisticData(newPost);


    try {
        const result=await fetch(`${BASE_URL}/posts`,{
            method:"POST",
            body:JSON.stringify(newPost),
            headers:{"Content-Type":"application/json"}
        });

        const json=await result.json();
        setData((prev)=>([...prev,json]))

    }catch(error:unknown){
     if(error instanceof Error){
        console.log(error);
     }
    }
    };


  return (
    <div>
        <form action={submitAction}>
            <label htmlFor="title">title</label>
            <input type="text" id="title" name="title" placeholder="title"/>
            <label htmlFor="body">body</label>
            <input type="text" id="body" name="body" placeholder="body" />
            <button type="submit">submit</button>
        </form>
     <ul>
        {optimisticData?.map((post,index)=>(
            <li key={index}>
             {post.title}
            </li>
        ))}
     </ul>
    </div>
  )
}

export default OptimisticForm