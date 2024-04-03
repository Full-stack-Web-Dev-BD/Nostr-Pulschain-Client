import { toast } from "react-toastify"

export const logoutAccount=()=>{
    localStorage.removeItem('token')
    toast("Logout success !")
    setTimeout(() => {
        window.location.href="/#/login"
    }, 1000);
}
export function shortenString(fullString) {
    if (fullString) {
      if (fullString.length <= 6) {
        return fullString // If the string is 6 characters or less, return it as it is
      }

      const firstChars = fullString.slice(0, 15)
      const lastChars = fullString.slice(-15)

      return `${firstChars}...${lastChars}`
    } else return ''
  }