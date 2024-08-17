
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import SocialLogin from "../../pages/SocialLogin/SocialLogin";



const Login = () => {
    const { logIn } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    // handle login form value
    const onSubmit = (data) => {
        logIn(data.email, data.password)
            .then(result => {
                console.log(result.user);
          toast.success('login sucessfully')
                navigate(from, { replace: true });
            })
            .then(err => {
              console.log(err);
            })
    }

    return (
        <div>
            <section className="bg-white dark:bg-slate-800">
                <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">

                    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-8 rounded-lg">
                        <div className="">
                            <h2 className="pb-4 font-medium text-center text-gray-800  text-2xl">Please Login</h2>
                        </div>
                        <div className="relative flex items-center mt-6">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>

                            <input type="email" name="email" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" {...register("email", { required: true })} />
                        </div>

                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>

                            <input type="password" name="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password"  {...register("password",
                                {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
                                })} />
                                {/* eye icon setup */}
                            <p className="absolute top-6 right-3 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                            </p>
                        </div>
                        <small>{errors.password?.type === 'require' && <span className="text-red-400">password is required</span>}</small>
                        <small>{errors.password?.type === 'minLength' && <span className="text-red-400">password must be 6 Carecter</span>}</small>
                        <small>{errors.password?.type === 'maxLength' && <span className="text-red-400">password less then 20 Carecter</span>}</small>
                        <small>{errors.password?.type === 'pattern' && <span className="text-red-400">at least one uppercase letter, one lowercase letter, one special characte</span>}</small>

                        <div className="mt-6">
                            <button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg  focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50">
                                Login
                            </button>

                            <div className="mt-6 text-center ">
                                <p className="text-sm ">Already have an account?
                                    <Link to='/sign-up' className="text-primary font-bold"> SignUp</Link> </p>
                            </div>
                        </div>
                        <SocialLogin />
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Login;