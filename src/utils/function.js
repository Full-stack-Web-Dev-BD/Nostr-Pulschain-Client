import { toast } from "react-toastify"

export const logoutAccount=()=>{
    localStorage.removeItem('token')
    toast("Logout success !")
    setTimeout(() => {
        window.location.href="/#/login"
    }, 1000);
}