import React from 'react'
import LawyerProfile from '../../components/lawyerComponents/Profile'
import LegalFooter from '../../layout/footer'
import AdminNavbar from '../../layout/AdminNavbar'

const ProfilePage: React.FC = () => {
    return (
        <div>
            <AdminNavbar />
            <LawyerProfile />
            <LegalFooter />
        </div>
    )
}

export default ProfilePage
