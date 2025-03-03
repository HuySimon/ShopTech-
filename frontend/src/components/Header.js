import React, { useContext, useEffect, useState } from 'react';
import Logo from './Logo';
import { GrSearch } from 'react-icons/gr';
import { FaRegCircleUser } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
    const [menuCartDisplay, setMenuCartDisplay] = useState(false);
    const context = useContext(Context);
    const navigate = useNavigate();
    const searchInput = useLocation();
    const URLSearch = new URLSearchParams(searchInput?.search);
    const searchQuery = URLSearch.getAll('q');
    const [search, setSearch] = useState(searchQuery);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    console.log(URLSearch);
    console.log(searchQuery);

    const handleLogout = async () => {
        const fetchData = await fetch(SummaryApi.logout_user.url, {
            method: SummaryApi.logout_user.method,
            credentials: 'include',
        });

        const data = await fetchData.json();

        if (data.success) {
            toast.success(data.message);
            dispatch(setUserDetails(null));
            navigate('/');
        }

        if (data.error) {
            toast.error(data.message);
        }
    };

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearch(e.target.value);
        if (value) {
            navigate(`/Search?q=${value}`);
        } else {
            navigate('/Search');
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(search);
        }, 500); // Chờ 500ms mới cập nhật state

        return () => {
            clearTimeout(handler); // Xóa timeout nếu user nhập tiếp
        };
    }, [search]);

    useEffect(() => {
        if (debouncedSearchTerm && debouncedSearchTerm !== searchQuery) {
            navigate(`/Search?q=${debouncedSearchTerm}`);
        }
    }, [debouncedSearchTerm]);
    return (
        <header className="h-16 shadow-md bg-white fixed w-full z-40">
            <div className="h-full container mx-auto flex items-center px-4 justify-between">
                <div className="">
                    <Link to="/">
                        <Logo w={100} h={50} />
                    </Link>
                </div>

                <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
                    <input
                        onChange={handleSearch}
                        value={search}
                        type="text"
                        placeholder="search products here..."
                        className="w-full outline-none"
                    />
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
                        <div
                            className="text-3xl relative cursor-pointer"
                            onClick={() => setMenuCartDisplay((preve) => !preve)}
                        >
                            <span>
                                <FaShoppingCart />
                            </span>
                            <div className="bg-red-500 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                                <p className="text-sm">{context?.cartProductCount}</p>
                            </div>

                            {menuCartDisplay && (
                                <div className="absolute bg-white bottom-0 top-11 -left-32 h-fit p-2 rounded shadow-lg">
                                    <nav>
                                        <Link
                                            to={'/Cart'}
                                            className="whitespace-nowrap p-2 md:block text-base hover:underline z-50"
                                            onClick={() => setMenuCartDisplay((preve) => !preve)}
                                        >
                                            View and edit shopping cart
                                        </Link>
                                    </nav>
                                </div>
                            )}
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
