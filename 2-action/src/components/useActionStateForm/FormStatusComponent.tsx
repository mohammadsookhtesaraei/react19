import { useFormStatus } from "react-dom"

// این هوک درواقع دخل کامپونت استفاده میشه و اون کامپونت باید داخل فرم ما ایپورت بشه
//  این هوک میاد وضعیت فرم مارو مشخص میکنه متدش چیه،پندینگ رو میده و دیتا

// خود هوک یوزاکشن استیت پندینگ روهم داره ولی ما داخلش ازش استفاده نکردیم بجاش از این استفاده کردیم تا کاربرد این هوک رو متوجه بشم


const Button = () => {
    const{method,pending,data}=useFormStatus();
    console.log({method,pending,data});
  return (
   <button type="submit" disabled={pending}>
           {pending ? "Submitting..." : "Submit"}
   </button>
  )
}

export default Button