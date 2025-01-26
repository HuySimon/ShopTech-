import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from 'react-icons/md';
import ChangeUserRole from '../components/ChangeUserRole';

const AllUser = () => {
    const [allUser, setAllUsers] = useState([]);
    const [openUpdateRole, setOpentUpdateRole] = useState(false);
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: '',
        name: '',
        role: '',
        userId: '',
    });

    const fetchAllusers = async () => {
        const fetchData = await fetch(SummaryApi.all_user.url, {
            method: SummaryApi.all_user.method,
            credentials: 'include',
        });

        const dataResponse = await fetchData.json();

        console.log(dataResponse);

        if (dataResponse.success) {
            setAllUsers(dataResponse.data);
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message);
        }
    };

    useEffect(() => {
        fetchAllusers();
    }, []);
    return (
        <div className="bg-white pb-4">
            <table className="w-full userTable">
                <thead>
                    <tr className='bg-black text-white'>
                        <th>Sr.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allUser.map((el, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{el?.name}</td>
                                <td>{el?.email}</td>
                                <td>{el?.role}</td>
                                <td>{moment(el?.createdAt).format('LL')}</td>
                                <td>
                                    <button
                                        className="bg-green-100 p-2 rounded-full hover:bg-green-500 hover:text-white"
                                        onClick={() => {
                                            setUpdateUserDetails(el);
                                            setOpentUpdateRole(true);
                                        }}
                                    >
                                        <MdModeEdit />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {openUpdateRole && (
                <ChangeUserRole
                    onClose={() => setOpentUpdateRole(false)}
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllusers}
                />
            )}
        </div>
    );
};

export default AllUser;
