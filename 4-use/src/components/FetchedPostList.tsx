import { use } from "react"
import { DataContext } from "../context/DataProvider";

interface PostData {
    userId:number;
    id:number;
    title:string;
    body:string;
};

// یوز چیه یک ای پی ای که اجازه میده یک پرامیس رو بخونیم و ازش استفاده کنیم

// اینجا اون پراپسی که پرامیس هست رو دادیم به یوز ساسپنس اجرا میشه
//  یوز دیتا رو از پرامیس میگیره و ما می  تونیم روش مپ بزنیم
// یوز میتونه مقادیر کانتکس رو هم بگیره که ما اومدیم دیتا کانتکسی که ایجاد کردیم رو بهش دادیم بدون اینکه از یوزکانتکس استفاده کرده باشیم
// نکته در این حالت باید ساسپسن وجود داشته باشه و کامپونتی که داره از یوز استفاده میکنه حتما دورش یک ساسپنس  رپ شده باشه



const FetchedPostList = ({fetchedPosts}:{
    fetchedPosts:Promise<any>
}) => {
     const posts:PostData[]=use(fetchedPosts);
     console.log(posts);
     const data=use(DataContext);
     console.log(data);
  return (
   
    <div>
        <h1>FetchedPostList-react19-use</h1>
        <ul>
            {posts.map((post)=>(
                <li key={post.id}>
                    {post.title}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default FetchedPostList