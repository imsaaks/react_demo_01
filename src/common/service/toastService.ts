import { toast, Slide } from 'react-toastify'

const options: any = {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Slide
}

const toastService = (type: string, message: string) => {
    let mType: string = 'I';
    if (type) {
        mType = type.toUpperCase().substring(0,1);
    }
    // toast.dismiss();
    switch (mType)
    {
        case 'I':
            toast.info(message, options);
            break;
        case 'S':
            toast.success(message, options);
            break;
        case 'W':
            toast.warning(message, options);
            break;
        case 'E':
            toast.error(message, options);
            break;
        default:
            toast.info(message, options);
            break;
    }
}


export default toastService;