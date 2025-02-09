import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductDetails = () => {
    const [data, setData] = useState({
        productName: '',
        brandName: '',
        category: '',
        productImage: [],
        description: '',
        price: '',
        sellingPrice: '',
    });

    const params = useParams();
    const [loading, setLoading] = useState(false);

    const fetchProductDetails = async () => {
        setLoading(true);
        const fetchData = await fetch(SummaryApi.productDetails.url, {
            method: SummaryApi.productDetails.method,
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                productId: params?.id,
            }),
        });
        setLoading(false);
        const dataResponse = await fetchData.json();
        setData(dataResponse?.data);

        console.log(dataResponse);

        if (dataResponse.success) {
            setData(dataResponse.data);
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message);
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, []);
    return <div>ProductDetails</div>;
};

export default ProductDetails;
