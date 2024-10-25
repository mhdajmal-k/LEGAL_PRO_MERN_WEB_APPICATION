import { Button, Input } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import FamilyLaw from "../../assets/images/FamilyLaw.jpg"
import PropertyLaw from "../../assets/images/PropertyLaw.jpg"
import Intellectual from "../../assets/images/Intellectual Property Law.jpg"
import corporateLaw from "../../assets/images/business laws.jpg"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../services/store/store'
import { fetchLawyer } from '../../services/store/features/userServices'
import CustomToast from './CustomToast'
import { toast } from 'sonner'
import { Lawyer } from '../../utils/type/lawyerType'
import CommonCard from '../ProfileCard'
import CardSkelton from '../CardSkeltton'
import CommonPagination from '../Pagination'

const FindLawyer: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const [lawyers, setLawyers] = useState<Lawyer[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [lawyerPerPage] = useState<number>(4);
    const { loading, error } = useSelector((state: RootState) => state.user)
    const handlePageChange = (page: number) => {
        // alert(page)
        setCurrentPage(page);
    };
    const fetchLawyers = async (page: number) => {
        try {
            const response = await dispatch(fetchLawyer({ page, limit: lawyerPerPage })).unwrap()

            setLawyers(response.result.lawyers);
            setTotalPages(response.result.totalPages);
            console.log(totalPages, "is the response")
        } catch (error: any) {
            toast(<CustomToast message={error || error.message} type="error" />);

            console.error('Error fetching lawyers:', error);
        }
    };
    useEffect(() => {
        fetchLawyers(currentPage);
    }, [dispatch, currentPage, lawyerPerPage]);
    return (
        <div className='container p-5 min-h-screen'>
            <div className='my-5 max-w-[65%] h-16 rounded-lg shadow-lg bg-primary mx-auto flex justify-evenly items-center'>
                <div className='flex justify-between w-2/3 space-x-4 '>
                    <Input type="text" placeholder="Lawyer Name Or legal Issue..." className='w-full' />
                    <Input type="text" placeholder="City" className='w-2/3' />
                </div>

                <Button className='bg-white text-base font-medium' >Search</Button>

            </div>
            <div className='my-7 text-center'>
                <h3 className='font-semibold text-lg'>Search Lawyers by Practice Areas</h3>
            </div>
            <div className='grid grid-cols-1 max-w-[95%] mx-auto sm:grid-cols-2 md:grid-cols-4 gap-5 rounded-lg'>
                <div className='w-full ' >
                    <h5 className='font-semibold text-xl my-2 text-center'>Family Law</h5>
                    <img src={FamilyLaw} className='rounded-2xl shadow-xl ' />
                </div>
                <div className='w-full ' >
                    <h5 className='font-semibold text-xl my-2 text-center'>Property Law </h5>
                    <img src={PropertyLaw} className='rounded-2xl shadow-xl ' />
                </div>
                <div className='w-full ' >
                    <h5 className='font-semibold text-xl my-2 text-center'>Intellectual Property Law</h5>
                    <img src={Intellectual} className='rounded-2xl shadow-xl ' />
                </div>
                <div className='w-full ' >
                    <h5 className='font-semibold text-xl my-2 text-center'>Corporate Law</h5>
                    <img src={corporateLaw} className='rounded-2xl shadow-xl ' />
                </div>
            </div>
            <h1 className="text-center font-bold text-3xl mt-20">Lawyers</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 my-10  max-w-[90%] mx-auto">
                {loading
                    ? Array.from({ length: 4 }).map((_, index) => <CardSkelton key={index} />)
                    : lawyers.length > 0
                        ? lawyers.map((lawyer) => <CommonCard key={lawyer._id} lawyer={lawyer} />)
                        : <p className="text-center font-semibold text-3xl">No Lawyer found</p>}
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

export default FindLawyer