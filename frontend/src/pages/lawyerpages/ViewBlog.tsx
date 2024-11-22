import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../layout/AdminNavbar'
import LegalFooter from '../../layout/footer'
import ViewOneBlog from '../../components/ViewOneBlog'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../services/store/store'
import CustomToast from '../../components/userComponents/CustomToast'
import { toast } from 'sonner'
import { BlogType } from '../../utils/type/lawyerType'
import { fetchOneBlog } from '../../services/store/features/lawyerServices'

const ViewBlog: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { blogId } = useParams()
    const [blogs, setBlogs] = useState<BlogType>();
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                // Assuming you have an action creator `crateBlog` for fetching a blog
                const response = await dispatch(fetchOneBlog(blogId as string)).unwrap();
                setBlogs(response.result)
                toast(<CustomToast message={response.message} type="success" />);
            } catch (error: any) {
                toast(<CustomToast message={error.message || 'Failed to fetch blog'} type="error" />);
            }
        };

        if (blogId) {
            fetchBlog();
        }
    }, [blogId, dispatch]);

    return (
        <div>
            <AdminNavbar />
            <ViewOneBlog blogs={blogs} />
            <LegalFooter />
        </div>
    )
}

export default ViewBlog
