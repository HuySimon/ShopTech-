import React, { useContext, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';
import loginIcons from '../assest/signin.gif';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((preve) => {
            return {
                ...preve,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const dataApi = await dataResponse.json();

        if (dataApi.success) {
            toast.success(dataApi.message);
            navigate('/');
            fetchUserDetails();
            fetchUserAddToCart();
        }

        if (dataApi.error) {
            toast.error(dataApi.message);
        }
    };

    return (
        <section id="login">
            <div className="mx-auto container p-4">
                <div className="bg-white p-5 w-full max-w-md mx-auto">
                    <div className="w-20 h-20 mx-auto">
                        <img src={loginIcons} alt="login icons" />
                    </div>

                    <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
                        <div className="grid">
                            <label>Email: </label>
                            <div className="bg-slate-100">
                                <input
                                    type="email"
                                    placeholder="enter email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className="w-full h-full outline-none bg-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label>Password: </label>
                            <div className="bg-slate-100 flex">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="enter password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleOnChange}
                                    className="w-full h-full outline-none bg-transparent"
                                />
                                <div
                                    className="cursor-pointer text-xl"
                                    onClick={() => setShowPassword((preve) => !preve)}
                                >
                                    <span>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                                </div>
                            </div>
                            <Link
                                to={'/Forgot-password'}
                                className="block w-fit ml-auto hover:underline hover:text-red-600"
                            >
                                Forgot password ?
                            </Link>
                        </div>

                        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 max-w-[150px] w-full rounded-full hover:scale-110 transition-all block mx-auto mt-6">
                            Login
                        </button>
                    </form>

                    <p className="my-5">
                        Don't have account ?{' '}
                        <Link to="/Sign-up" className="text-red-500 hover:text-red-700 hover:underline">
                            Signup
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Login;
