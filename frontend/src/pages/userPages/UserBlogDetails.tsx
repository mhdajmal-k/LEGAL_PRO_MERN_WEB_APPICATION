import React, { useEffect, useState } from 'react'
import LegalFooter from '../../layout/footer'
import ViewOneBlog from '../../components/ViewOneBlog'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../services/store/store'
import CustomToast from '../../components/userComponents/CustomToast'
import { toast } from 'sonner'
import { BlogType } from '../../utils/type/lawyerType'
import { fetchOneBlogUserSide } from '../../services/store/features/userServices'
import Navbar from '../../layout/Navbar'

const ViewBlogUserSide: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { blogId } = useParams()
    const [blogs, setBlogs] = useState<BlogType>();
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                // Assuming you have an action creator `crateBlog` for fetching a blog
                const response = await dispatch(fetchOneBlogUserSide(blogId as string)).unwrap();
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
            <Navbar />
            <ViewOneBlog blogs={blogs} />
            <LegalFooter />
        </div>
    )
}

export default ViewBlogUserSide
