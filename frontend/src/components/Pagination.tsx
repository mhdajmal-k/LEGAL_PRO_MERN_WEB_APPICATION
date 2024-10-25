import React from 'react';
import { Pagination } from "@nextui-org/react";

interface CommonPaginationProps {
    totalPage: number,
    initialPage: number,
    onChange?: (page: number) => void
}

const CommonPagination: React.FC<CommonPaginationProps> = ({ totalPage, initialPage = 1, onChange }) => {
    return (
        <Pagination
            showControls
            total={totalPage}
            initialPage={initialPage}
            onChange={onChange}
        />
    );
}

export default React.memo(CommonPagination);