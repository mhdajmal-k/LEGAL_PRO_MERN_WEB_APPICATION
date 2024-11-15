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
    let [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [lawyerPerPage] = useState<number>(6);
    const [searchText, setSearchText] = useState("")
    const [experience, setExperience] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [designation, setDesignation] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [courtPracticeArea, setCourtPracticeArea] = useState<string>('');
    const [languagesSpoken, setLanguagesSpoken] = useState<string[]>([]);
    const { loading, } = useSelector((state: RootState) => state.user)
    const handlePageChange = (page: number) => {

        setCurrentPage(page);
    };
    const fetchLawyers = async (page: number) => {
        try {
            const response = await dispatch(fetchLawyer({
                page,
                limit: lawyerPerPage,
                searchText,
                experience,
                gender,
                languagesSpoken,
                designation,
                courtPracticeArea,
                city
            })
            ).unwrap();

            setLawyers(response.result.lawyers);
            setTotalPages(response.result.totalPages);
            console.log(totalPages, "is the response")
        } catch (error: any) {
            toast(<CustomToast message={error || error.message} type="error" />);

            console.error('Error fetching lawyers:', error);
        }
    };
    const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setLanguagesSpoken((prev) =>
            checked ? [...prev, value] : prev.filter((lang) => lang !== value)
        );
    };
    const handileSearch = async (page: number) => {

        const urlParams = new URLSearchParams(window.location.search)
        urlParams.set('searchTerm', searchText)
        const response = await dispatch(fetchLawyer({
            page,
            limit: lawyerPerPage,
            searchText,
            experience,
            gender,
            languagesSpoken,
            designation,
            courtPracticeArea,
            city
        })
        ).unwrap();

        setLawyers(response.result.lawyers);
        setTotalPages(response.result.totalPages);
    }
    const handileClear = () => {
        setSearchText("")
        setExperience("")
        setGender("")
        setDesignation("")
        setCity("")
        setCourtPracticeArea("")
        setLanguagesSpoken([])
        fetchLawyers(currentPage = 1);
    }
    useEffect(() => {
        fetchLawyers(currentPage);
    }, [dispatch, currentPage, lawyerPerPage]);

    return (
        <div className='container p-5 min-h-screen'>
            <div className='my-5 sm:max-w-[65%]     h-16 rounded-lg shadow-lg bg-primary mx-auto flex justify-evenly items-center'>
                <div className='flex justify-between w-2/3 space-x-4 '>
                    <Input type="text" placeholder="Lawyer Name Or legal Issue..." className='w-full' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)} />
                    <Input type="text" placeholder="City" className='w-2/3' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)} />
                </div>

                <Button className='bg-white text-base font-normal sm:font-medium' onClick={() => handileSearch(currentPage)}>Search</Button>

            </div>
            <div className='my-7 text-center'>
                <h3 className='font-semibold text-lg'>Search Lawyers by Practice Areas</h3>
            </div>
            <div className='grid grid-cols-1 max-w-[95%] mx-auto sm:grid-cols-2 md:grid-cols-4 gap-5 rounded-lg cursor-pointer ' >
                <div className='w-full ' onClick={() => setSearchText("Family Law")}>
                    <h5 className='font-semibold text-xl my-2 text-center'>Family Law</h5>
                    <img src={FamilyLaw} className='rounded-2xl shadow-xl ' />
                </div>
                <div className='w-full ' onClick={() => setSearchText("Property Law")}>
                    <h5 className='font-semibold text-xl my-2 text-center'>Property Law </h5>
                    <img src={PropertyLaw} className='rounded-2xl shadow-xl ' />
                </div>
                <div className='w-full ' onClick={() => setSearchText("Intellectual Property Law")}>
                    <h5 className='font-semibold text-xl my-2 text-center'>Intellectual Property Law</h5>
                    <img src={Intellectual} className='rounded-2xl shadow-xl ' />
                </div>
                <div className='w-full ' onClick={() => setSearchText("Corporate Law")}>
                    <h5 className='font-semibold text-xl my-2 text-center'>Corporate Law</h5>
                    <img src={corporateLaw} className='rounded-2xl shadow-xl ' />
                </div>
            </div>
            <h1 className="text-center font-bold text-3xl my-10">Lawyers</h1>
            <div className='flex flex-col lg:flex-row m-5 gap-8 mx-auto max-w-full'>

                {!loading && <aside className='bg-gray-100 shadow-lg rounded-lg p-6 lg:w-1/6'>
                    <h4 className='font-semibold text-lg mb-4'>Filter by:</h4>

                    <label className='block text-sm font-medium'>Experience</label>
                    <select className='w-full mt-2 p-2 border rounded mb-4 bg-white' value={experience} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setExperience(e.target.value);
                    }}>
                        <option value="" disabled>Select Experience</option>
                        <option value="0+">1+ years</option>
                        <option value="2">2+ years</option>
                        <option value="3">3+ years</option>
                        <option value="4">4+ years</option>
                        <option value="5">5+ years</option>
                        <option value="10">10+ years</option>
                    </select>


                    <label className='block text-sm font-medium'>Gender</label>
                    <select className='w-full mt-2 p-2 border rounded mb-4' value={gender}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {

                            setGender(e.target.value)
                        }}>
                        <option value="" disabled>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <label className='block text-sm font-medium'>Designation</label>
                    <select
                        name="designation"
                        className="w-full mt-2 p-2 border rounded mb-4"
                        value={designation}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setDesignation(e.target.value)
                        }}
                    >
                        <option value="" disabled>Designation</option>
                        <option value="junior Advocate">Junior Advocate</option>
                        <option value="senior Advocate">Senior Advocate</option>
                    </select>
                    <label className='block text-sm font-medium'>Court Practice Area</label>
                    <select
                        name="courtPracticeArea"
                        value={courtPracticeArea}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setCourtPracticeArea(e.target.value)
                        }}
                        className="w-full mt-2 p-2 border rounded mb-4"
                    >
                        <option value="" disabled>Court Practice Area</option>
                        <option value="district Court">District Court</option>
                        <option value="high Court">High Court</option>
                        <option value="supreme Court">Supreme Court</option>
                    </select>


                    <label className='block text-sm font-medium'>Languages Spoken</label>
                    <div className='flex flex-wrap gap-3 mt-2'>
                        {['English', 'Hindi', 'Malayalam', 'Kannada', 'Tamil', 'Telugu'].map((lang) => (
                            <label key={lang} className="inline-flex items-center">
                                <input type="checkbox" value={lang}
                                    checked={languagesSpoken.includes(lang)}
                                    onChange={handleLanguageChange} />
                                <span className="ml-2">{lang}</span>
                            </label>
                        ))}
                    </div>
                    <div className='flex justify-between my-7'>
                        <Button color='default' onClick={() => handileClear()}>Clear</Button>
                        <Button className='bg-white text-base font-normal' onClick={() => handileSearch(currentPage)}> Search</Button>
                    </div>

                </aside>}


                <section className='lg:w-5/6'>

                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
                        {loading ? (
                            Array.from({ length: 4 }).map((_, index) => <CardSkelton key={index} />)
                        ) : (
                            lawyers.length > 0 ? (
                                lawyers.map((lawyer) => (
                                    <CommonCard key={lawyer._id} lawyer={lawyer} />
                                ))
                            ) : (
                                <p className="text-center font-semibold text-lg col-span-full">No Lawyer found</p>
                            )
                        )}
                    </div>


                    {lawyers.length > 0 && (
                        <div className='mt-10 flex justify-center'>
                            <CommonPagination
                                totalPage={totalPages}
                                initialPage={currentPage}
                                onChange={handlePageChange}
                            />
                        </div>
                    )}
                </section>
            </div>



        </div >


    )
}

export default FindLawyer