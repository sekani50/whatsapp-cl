import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const failed = (param) => toast.error(param,{position:"top-center", theme:"colored"})
export const success = (param) => toast.success(param,{position:"top-center", theme:"colored"})
export const warning = (param) => toast.warning(param,{position:"top-center", theme:"colored"})
