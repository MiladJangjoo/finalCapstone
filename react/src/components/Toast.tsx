import { TypeOptions, toast } from 'react-toastify';

export const ToastAutoCloseTime: number = 7000;
export const Toast = (type: TypeOptions = "info", message: string = "The process was completed successfully.", autoClose: number = ToastAutoCloseTime) => {
    toast(message, {
        type: type,
        theme: "colored",
        position: "top-left",
        autoClose: autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};