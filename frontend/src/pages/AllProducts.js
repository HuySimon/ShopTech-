import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
    const [openUploadProduct, setOpenUploadProduct] = useState(false);
    const [allProduct, setAllProduct] = useState([]);

    const fetchAllproducts = async () => {
        const fetchData = await fetch(SummaryApi.all_product.url, {
            method: SummaryApi.all_product.method,
            credentials: 'include',
        });

        const dataResponse = await fetchData.json();
        setAllProduct(dataResponse?.data || []);

        console.log(dataResponse);

        // if (dataResponse.success) {
        //     setAllUsers(dataResponse.data);
        // }

        if (dataResponse.error) {
            toast.error(dataResponse.message);
        }
    };

    useEffect(() => {
        fetchAllproducts();
    }, []);

    return (
        <div>
            <div className="bg-white py-2 px-4 flex justify-between items-center">
                <h2 className="font-bold text-lg">All Product</h2>
                <button
                    className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full"
                    onClick={() => setOpenUploadProduct(true)}
                >
                    Upload Product
                </button>
            </div>

            {/* All product */}
            <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
                {allProduct.map((product, index) => {
                    return <AdminProductCard callFunc={fetchAllproducts} data={product} key={index + 'allProudct'} />;
                })}
            </div>

            {/* UploadProduct component */}
            {openUploadProduct && (
                <UploadProduct fetchData={fetchAllproducts} onCLose={() => setOpenUploadProduct(false)} />
            )}
        </div>
    );
};

export default AllProducts;
