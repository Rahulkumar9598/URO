const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const api = {
    user : {
        signup:BASE_URL + "/user/signup",
        signin:BASE_URL + "/user/signin",
        cart:BASE_URL+ "/user/cart",
        handleGetDetails:BASE_URL + "/user/handle-get-details",
        googlelogin :BASE_URL + "/user/handleGoogleLogin"
    },
    image:{
        uploadImage :BASE_URL + "/image/user-image"
    }
}

export default api
