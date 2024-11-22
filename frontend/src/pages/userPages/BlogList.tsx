import React, { useEffect, useState } from 'react'
import LegalFooter from '../../layout/footer'
// import LawyerBlogListing from '../../components/lawyerComponents/LawyerBlog'
import { BlogListing } from '../../components/BlogListing'
import { useDispatch } from 'react-redux'
import { BlogType } from '../../utils/type/lawyerType'
import { AppDispatch } from '../../services/store/store'
import { fetchAllBlog } from '../../services/store/features/userServices'
import Navbar from '../../layout/Navbar'

import CommonPagination from '../../components/Pagination'

const Blogs: React.FC = () => {
    let [currentPage, setCurrentPage] = useState<number>(1);
    // const [totalPages, setTotalPages] = useState<number>(1);
    const [lawyerPerPage] = useState<number>(6);
    const dispatch: AppDispatch = useDispatch();
    const [blogs, setBlogs] = useState<BlogType[]>([]);
    const handlePageChange = (page: number) => {

        setCurrentPage(page);
    };
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await dispatch(fetchAllBlog({
                    currentPage,
                    limit: lawyerPerPage,
                })).unwrap();

                setBlogs(response.result);
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
            }
        };
        fetchBlogs();
    }, [dispatch, currentPage, lawyerPerPage]);
    return (
        <div>
            <Navbar />
            <BlogListing blogs={blogs} who='user' />
            <LegalFooter />
            {blogs.length > 0 && (
                <div className='mt- flex justify-center'>
                    <CommonPagination
                        totalPage={0}
                        initialPage={currentPage}
                        onChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    )
}

export default Blogs