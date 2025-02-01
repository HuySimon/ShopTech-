import React, { useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import displayVNDCurrency from '../helpers/displayVNDCurrency';

const AdminProductCard = ({ data, callFunc }) => {
    const [openEditProduct, setOpenEditProduct] = useState(false);
    return (
        <div className="bg-white p-4 rounded">
            <div className="w-40">
                <div className='w-32 h-32 flex items-center justify-center'>
                    <img src={data?.productImage[0]} className="h-full object-fill mx-auto" />
                </div>
                <h1 className="text-ellipsis line-clamp-2">{data?.productName}</h1>

                <div>
                    <div className="font-semibold">{displayVNDCurrency(data.sellingPrice)}</div>

                    <div
                        className="w-fit ml-auto bg-green-100 rounded-full p-2 hover:bg-green-600 hover:text-white cursor-pointer"
                        onClick={() => setOpenEditProduct(true)}
                    >
                        <MdModeEditOutline />
                    </div>
                </div>
            </div>
            {/* Edit Product Component */}
            {openEditProduct && (
                <AdminEditProduct callFunc={callFunc} dataProduct={data} onClose={() => setOpenEditProduct(false)} />
            )}
        </div>
    );
};

export default AdminProductCard;
