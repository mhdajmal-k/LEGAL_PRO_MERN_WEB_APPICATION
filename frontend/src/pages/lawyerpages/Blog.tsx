import React from 'react'
import AdminNavbar from '../../layout/AdminNavbar'
import LegalFooter from '../../layout/footer'
import LawyerBlogListing from '../../components/lawyerComponents/LawyerBlog'

const Blog: React.FC = () => {
    return (
        <div>
            <AdminNavbar />
            <LawyerBlogListing />
            <LegalFooter />
        </div>
    )
}

export default Blog