import { Suspense } from "react";
import { BASE_URL } from "../services/api"
import FetchedPostList from "./FetchedPostList";


// یک تابع داریم که دیتارو فچ میکنه و هنوز کامل نشده و پرامیس هست پندینگ هست چون در قسمت ری ترن اویت نذاشتیم

const fetchPosts=async()=>{
    const response=await fetch(BASE_URL + "/posts");
    return response.json()
}

const SuspenseWrapper = () => {
  // اینجا اون تابع رو داخل این متغییر کال کردیم که این متغییر خودش یک پرامیس میشه و دادیم به عنوان پراپس به کامپونت فج لیست
  const posts=fetchPosts();
  return (

    // یک ساسپنس اوردیم با فال بک لودینگ تا دیتا بیاد این فال بک اجرا بشه برای استفاده از یوز این باید باشه
    <Suspense fallback={<p>loading...</p>}>
      <FetchedPostList fetchedPosts={posts}/>
    </Suspense>
  )
}

export default SuspenseWrapper