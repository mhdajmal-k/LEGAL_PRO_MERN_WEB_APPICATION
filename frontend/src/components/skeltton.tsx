import { Skeleton } from '@nextui-org/react'
import React from 'react'

const CustomSkelton: React.FC = () => {
    return (
        <div className=" m-2 p-2  flex items-center gap-3">
            <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            <div className="w-full flex-grow   gap-2">
                <div className='flex justify-between'>
                    <Skeleton className="h-3 w-full rounded-lg" />
                    <Skeleton className="h-3 w-full rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
            </div>
        </div>
    )
}

export default CustomSkelton