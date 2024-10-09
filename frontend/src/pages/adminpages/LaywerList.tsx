import { useDispatch } from "react-redux"
import { AppDispatch } from "../../services/store/store"
import { useEffect, useState } from "react"
import CustomToast from "../../components/userComponents/CustomToast"
import { toast } from "sonner"
import { lawyerColumns } from "../../utils/constants/Colums"
import LawyerTableList from "../../components/AdminComponents.tsx/LawyerList"
import { getLawyers } from "../../services/store/features/adminServices"

const LawyerList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const [lawyers, setLawyers] = useState<[] | any>([])

    const fetchLawyers = async () => {
        try {
            const response = await dispatch(getLawyers()).unwrap()
            setLawyers(response.result);
        } catch (error: any) {
            toast(<CustomToast message={error} type="error" />);

        }
    }
    useEffect(() => {
        fetchLawyers()
    }, [dispatch])
    const refreshLawyers = () => {
        fetchLawyers();
    };

    return (
        <div>
            <div className='w-auto mt-16 bg-white'>
                <h1 className='text-center mb-5 font-semibold'>User List</h1>

                <LawyerTableList columns={lawyerColumns} data={lawyers} onRefresh={refreshLawyers} />
            </div>
        </div>
    )
}

export default LawyerList