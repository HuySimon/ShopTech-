import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';
import loginIcons from '../assest/signin.gif';
import { Await, Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        profilePic: '',
    });
    const navigate = useNavigate()

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

        if (data.password === data.confirmPassword) {
            const dataResponse = await fetch(SummaryApi.signUp.url, {
                method: SummaryApi.signUp.method,
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const dataApi = await dataResponse.json();

            if (dataApi.success) {
                toast.success(dataApi.message);
                navigate("/Login")
            }

            if (dataApi.error) {
                toast.error(dataApi.message);
            }
        } else {
            console.log('Please check password and confirm password');
        }
    };

    const handleChangePic = async (e) => {
        const file = e.target.files[0];

        const imagePic = await imageTobase64(file);
        console.log('file', imagePic);

        setData((preve) => {
            return {
                ...preve,
                profilePic: imagePic,
            };
        });
    };

    return (
        <section id="login">
            <div className="mx-auto container p-4">
                <div className="bg-white p-5 w-full max-w-md mx-auto">
                    <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
                        <div>
                            <img src={data.profilePic || loginIcons} alt="login icons" />
                        </div>
                        <form>
                            <label>
                                <div className="text-xs opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                                    Upload Photo
                                </div>
                                <input type="file" className="hidden" onChange={handleChangePic} />
                            </label>
                        </form>
                    </div>

                    <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
                        <div className="grid">
                            <label>Name: </label>
                            <div className="bg-slate-100 p-2">
                                <input
                                    type="text"
                                    placeholder="enter name"
                                    name="name"
                                    value={data.name}
                                    onChange={handleOnChange}
                                    required
                                    className="w-full h-full outline-none bg-transparent"
                                />
                            </div>
                        </div>
                        <div className="grid">
                            <label>Email: </label>
                            <div className="bg-slate-100 p-2">
                                <input
                                    type="email"
                                    placeholder="enter email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleOnChange}
                                    required
                                    className="w-full h-full outline-none bg-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label>Password: </label>
                            <div className="bg-slate-100 flex p-2">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="enter password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleOnChange}
                                    required
                                    className="w-full h-full outline-none bg-transparent"
                                />
                                <div
                                    className="cursor-pointer text-xl"
                                    onClick={() => setShowPassword((preve) => !preve)}
                                >
                                    <span>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label>Confirm Password: </label>
                            <div className="bg-slate-100 flex p-2">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="enter confirm password"
                                    name="confirmPassword"
                                    value={data.confirmPassword}
                                    onChange={handleOnChange}
                                    required
                                    className="w-full h-full outline-none bg-transparent"
                                />
                                <div
                                    className="cursor-pointer text-xl"
                                    onClick={() => setShowConfirmPassword((preve) => !preve)}
                                >
                                    <span>{showConfirmPassword ? <FaEye /> : <FaEyeSlash />}</span>
                                </div>
                            </div>
                        </div>

                        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 max-w-[150px] w-full rounded-full hover:scale-110 transition-all block mx-auto mt-6">
                            Sign up
                        </button>
                    </form>

                    <p className="my-5">
                        Already have account ?{' '}
                        <Link to="/Login" className="text-red-500 hover:text-red-700 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Signup;