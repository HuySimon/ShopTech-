import React from 'react';
import CategoryList from '../components/CategoryList';
import BannerProuduct from '../components/BannerProuduct';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import VerticalCardProduct from '../components/VerticalCardProduct';

const Home = () => {
    return (
        <div>
            <CategoryList />
            <BannerProuduct />
            <HorizontalCardProduct category={'airpodes'} heading={"Top's Airpodes"} />
            <HorizontalCardProduct category={'watches'} heading={"Popular's Watches"} />

            <VerticalCardProduct category={'mobiles'} heading={'Mobiles'} />
            <VerticalCardProduct category={'mouse'} heading={'Mouses'} />
            <VerticalCardProduct category={'televisions'} heading={'Televisions'} />
            <VerticalCardProduct category={'camera'} heading={'Camera & Photography'} />
            <VerticalCardProduct category={'earphones'} heading={'Wired Earphones'} />
            <VerticalCardProduct category={'speakers'} heading={'Speakers'} />
            <VerticalCardProduct category={'refrigerator'} heading={'Refrigerator'} />
            <VerticalCardProduct category={'trimmers'} heading={'Trimmers'} />
        </div>
    );
};

export default Home;
