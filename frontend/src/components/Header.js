import React, { useContext, useState } from 'react';
import Logo from './Logo';
import { GrSearch } from 'react-icons/gr';
import { FaRegCircleUser } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
    const user = useSelector((state) => state?.user?.user);
    const dispatch = useDispatch();
    const [menuDisplay, setMenuDisplay] = useState(false);
    const context = useContext(Context);

    const handleLogout = async () => {
        const fetchData = await fetch(SummaryApi.logout_user.url, {
            method: SummaryApi.logout_user.method,
            credentials: 'include',
        });

        const data = await fetchData.json();

        if (data.success) {
            toast.success(data.message);
            dispatch(setUserDetails(null));
        }

        if (data.error) {
            toast.error(data.message);
        }
    };

    console.log('header add to cart count', context);
    return (
        <header className="h-16 shadow-md bg-white fixed w-full z-40">
            <div className="h-full container mx-auto flex items-center px-4 justify-between">
                <div className="">
                    <Link to="/">
                        <Logo w={100} h={50} />
                    </Link>
                </div>

                <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
                    <input type="text" placeholder="search products here..." className="w-full outline-none" />
                    <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
                        <GrSearch />
                    </div>
                </div>

                <div className="flex items-center gap-7">
                    <div className="relative flex justify-center">
                        {user?._id && (
                            <div className="text-3xl cursor-pointer" onClick={() => setMenuDisplay((preve) => !preve)}>
                                {user?.profilePic ? (
                                    <img src={user?.profilePic} className="w-10 h-10 rounded-full" alt={user?.name} />
                                ) : (
                                    <FaRegCircleUser />
                                )}
                            </div>
                        )}

                        {menuDisplay && (
                            <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded ">
                                <nav>
                                    {user?.role === ROLE.ADMIN && (
                                        <Link
                                            to={'/Admin-panel/All-products'}
                                            className="whitespace-nowrap hover:bg-slate-100 p-2 hidden md:block z-50"
                                            onClick={() => setMenuDisplay((preve) => !preve)}
                                        >
                                            Admin Panel
                                        </Link>
                                    )}
                                </nav>
                            </div>
                        )}
                    </div>

                    {user?._id && (
                        <div className="text-3xl relative">
                            <span>
                                <FaShoppingCart />
                            </span>
                            <div className="bg-red-500 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                                <p className="text-sm">{context?.cartProductCount}</p>
                            </div>
                        </div>
                    )}

                    <div>
                        {user?._id ? (
                            <button
                                onClick={handleLogout}
                                className="px-2 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link to="/Login" className="px-2 py-1 rounded-full text-white bg-red-600 hover:bg-red-700">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
