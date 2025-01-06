import React, { useEffect, useState } from 'react';
import MenuCard from '../MenuCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBestDeals } from '../../features/slices/bestDealSlices';
import LoadingSkeleton from '../skeleton/LoadingSkeleton';

export default function BestDeals() {
    const { value, loading } = useSelector((state) => state.bestDeal);
    const dispatch = useDispatch();

    useEffect(() => {
        // Only fetch data if it's not already available in Redux
        if (!value || value.length === 0) {
            dispatch(fetchBestDeals());
        }
    }, [dispatch, value]); // Run effect only if 'value' is empty

    if (loading) {
        return <div className='w-[90%] mx-auto my-4'><LoadingSkeleton /></div>;
    }

    return (
        <>
            <div className='max-w-full flex custom-scrollbar no-scrollbar scroll-smooth py-4 overflow-x-scroll gap-4 px-2'>
                {value && value.map((item, index) => (
                    <MenuCard key={index} detail={item} />
                ))}
            </div>
        </>
    );
}
