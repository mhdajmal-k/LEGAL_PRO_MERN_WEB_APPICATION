
import ViewLawyerProfile from '../../components/userComponents/LawyerProfile';
import Navbar from '../../layout/Navbar'
import LegalFooter from '../../layout/footer'
import { useParams } from 'react-router-dom';

const LawyerProfile = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <div>
            <Navbar />
            <ViewLawyerProfile id={id} />
            <LegalFooter />
        </div>
    )
}

export default LawyerProfile