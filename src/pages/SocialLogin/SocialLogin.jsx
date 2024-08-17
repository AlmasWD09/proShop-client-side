import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";






const SocialLogin = () => {
    const { googleLogin } = useAuth();
    const axiosPublic = useAxiosPublic()

    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";


    const handleSocialLogin = (media) => {
        media()
            .then(res => {
                console.log(res);
                toast.success('login successfulled')
                navigate(from, { replace: true })
                const userInfo = {
                    email: res.user.email,
                    name: res.user.displayName,
                    photo: res.user.photoURL,
                
                }
                const { responce } = axiosPublic.put('/user/api/create', userInfo)
                console.log(responce);
            })

    }
    return (
        <>

            <div className="space-y-3">

                <div className="flex justify-center">
                    <button
                        onClick={() => handleSocialLogin(googleLogin)}
                        className=" flex items-center bg-green-200 dark:bg-slate-800 rounded-lg p-1 px-4 my-3">
                        <p className="text-2xl"><FcGoogle className="mr-2" /></p>
                        Continue with Google
                    </button>
                </div>
                <div className="flex items-center">
                </div>
            </div>
        </>
    );
};

export default SocialLogin;