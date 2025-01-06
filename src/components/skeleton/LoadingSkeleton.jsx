import { Skeleton } from 'antd';

const LoadingSkeleton = () => <div className='w-full min-h-32'>
    <Skeleton active />
</div>;
export default LoadingSkeleton;