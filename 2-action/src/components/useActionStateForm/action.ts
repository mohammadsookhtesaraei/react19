// actions/createPost.ts

// نوع state برگشتی از اکشن
export interface PostState {
  data?: any;
  error?: string | null;
}

// نوع داده‌های فرم
export interface PostFormData {
  title: string;
  body: string;
}

// تابع اکشن برای useActionState
export async function createPost(
  previousState: PostState | null,
  formData: FormData /* web api formData */
): Promise<PostState> {
  //  داده‌ها رو به شکل تایپ‌سیف از فرم می‌گیریم با استفاده وب ایپی های فرم دیتا دقت داشته باشید حتما بادی کلید های نیم رو به اینپوت های فرم داده باشید این ایپی ای
//   از طریق نیم اینپوت متوجه میشه کاربر روی کدوم اینپوت کلیک کرده که بیاد اطلاعاتش رو بگیره گت کنه

  const form: PostFormData = {
    title: (formData.get("title") as string) ?? "",
    body: (formData.get("body") as string) ?? "",
  };

  try {
    const result = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    if (!result.ok) throw new Error(`Request failed ${result.status}`);

    const data = await result.json();
    //   نتیجه موفق بود ری ترن میشه بصورت ابجکت و ارور نال میشه چون استیت ما ابجکت هست
    return { data, error: null };
  } catch (error) {
    if (error instanceof Error) {
        // خطا داشته باشیم اگر بخوتیم مقادیر قبلی استیت رو نشون بدیم بعدشم خطارو نشون بدیم باید اسپریت کنیم مقادیر قبلی استیت رو و ارور رو برابر پیامش قرار بدیم
      return { ...previousState, error: error.message };
    }
    // واینجاهم فالبک ارور هست اگر ارور ناشناخته بود این ری ترن شه تایپ اسکریپت گیر نده
    return { ...previousState, error: "Unknown error" };
  }
}

