import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUser = () => {
    const [allUser, setAllUsers] = useState([]);

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
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created Date</th>
                    <th>Action</th>
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
                                  <button className='bg-green-100 p-2 rounded-full hover:bg-green-500 hover:text-white'>
                                    <MdModeEdit />
                                  </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <ChangeUserRole />
        </div>
    );
};

export default AllUser;
