import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import LegalFooter from '../../layout/footer';
import Navbar from '../../layout/Navbar';
import LawyerSlot from '../../components/userComponents/LawyerSlot';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store/store';
import { Lawyer } from '../../utils/type/lawyerType';
import { fetchLawyerById } from '../../services/store/features/userServices';
import CustomToast from '../../components/userComponents/CustomToast';
import { toast } from 'sonner';

const LawyerSlots: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch: AppDispatch = useDispatch();
    const [lawyer, setLawyer] = useState<Lawyer | null>(null);
    // const { loading } = useSelector((state: RootState) => state.user)
    useEffect(() => {
        const fetchLawyerData = async () => {
            if (id) {
                try {
                    const response = await dispatch(fetchLawyerById(id)).unwrap();
                    setLawyer(response.result);
                    console.log(response, "is the response");
                } catch (error: any) {
                    toast(<CustomToast message={error || error.message} type="error" />);
                    console.error('Error fetching lawyer data:', error);
                }
            }
        };
        fetchLawyerData();
    }, []);
    return (
        <div>
            <Navbar />
            <LawyerSlot lawyerId={id} lawyer={lawyer} />
            <LegalFooter />
        </div>
    )

}

export default LawyerSlots