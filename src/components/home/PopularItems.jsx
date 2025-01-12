import React, { useEffect, useState } from 'react';
import MenuCard from '../MenuCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularItem } from '../../features/slices/popularSlices';
import axios from 'axios';
import { api_path_url, authToken } from '../../secret';
import LoadingSkeleton from '../skeleton/LoadingSkeleton';

export default function PopularItems() {

    const dispatch = useDispatch();
    const { value, loading } = useSelector((state) => state.popularItem);
    const [items, setItems] = useState(null);

    useEffect(() => {
        if (!value || value.length === 0) {
            dispatch(fetchPopularItem());
        }
    }, [dispatch]);




    if (loading) {
        return <div className='w-[90%] mx-auto my-4'><LoadingSkeleton /></div>;
    }

    return (
        <div className='max-w-full lg:w-4/5 lg:gap-8 mx-auto flex lg:grid lg:grid-cols-4 custom-scrollbar no-scrollbar scroll-smooth py-4 overflow-x-scroll gap-4 px-2'>
            {value && value.map((item, index) => (
                <MenuCard key={index} detail={item} />
            ))}
        </div>
    );
}
