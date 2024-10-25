import { useDispatch } from "react-redux"
import { AppDispatch } from "../../services/store/store"
import { useEffect, useState } from "react"
import CustomToast from "../../components/userComponents/CustomToast"
import { toast } from "sonner"
import { lawyerColumns } from "../../utils/constants/Colums"
import LawyerTableList from "../../components/AdminComponents.tsx/LawyerList"
import { getLawyers } from "../../services/store/features/adminServices"
import CommonPagination from "../../components/Pagination"

const LawyerList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const [lawyers, setLawyers] = useState<[] | any>([])
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalLawyer, setTotalLawyer] = useState<number>(1);
    const [usersPerPage] = useState<number>(5);

    const fetchLawyers = async (page: number) => {
        try {
            const response = await dispatch(getLawyers({ page, limit: usersPerPage })).unwrap()
            setLawyers(response.result);
            setTotalPages(response.result.totalPages);
            setTotalLawyer(response.result.totalUsers)
        } catch (error: any) {
            toast(<CustomToast message={error || error.message} type="error" />);

        }
    }
    const handlePageChange = (page: number) => {
        // alert(page)
        setCurrentPage(page);
    };
    useEffect(() => {
        fetchLawyers(currentPage)
    }, [dispatch])
    const refreshLawyers = () => {
        fetchLawyers(currentPage);
    };

    return (
        <div>
            <div className='w-auto mt-16 bg-white'>
                <h1 className='text-center mb-5 font-semibold'>User List</h1>
                <div className='text-end m-8 pr-6'>
                    <h5 className='text-end  inline-block bg-gray-300 p-1 rounded-lg'>TotalUsers:</h5>
                    <span className='text-xl font-semibold '> {totalLawyer}</span>
                </div>
                <LawyerTableList columns={lawyerColumns} data={lawyers} onRefresh={refreshLawyers} />
            </div>
            {lawyers.length > 0 && (
                <div className='text-center mx-auto flex justify-center mt-7'>
                    <CommonPagination
                        totalPage={totalPages}
                        initialPage={currentPage}
                        onChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    )
}

export default LawyerList