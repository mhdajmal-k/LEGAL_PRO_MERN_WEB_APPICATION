import React from 'react';
import { Lawyer } from "../utils/type/lawyerType";
import { useNavigate } from 'react-router-dom';

interface LawyerCardProps {
    lawyer: Lawyer;
}

const CommonCard: React.FC<LawyerCardProps> = ({ lawyer }) => {

    const navigate = useNavigate()
    return (
        <div className="bg-white shadow-md border border-gray-200 w-full rounded-lg overflow-hidden  transition-transform transform hover:scale-105 ease-in  hover:shadow-lg">
            <div className="h-64 overflow-hidden ">
                <img
                    className="w-[90%] mx-auto  rounded-lg  h-full object-contain"
                    src={lawyer.profile_picture}
                    alt="profile-picture"
                />
            </div>
            <div className="px-5 text-center font-medium">
                <h4 className="text-xl font-semibold text-gray-800 mt-3 uppercase">
                    {lawyer.userName}
                </h4>
                <div>
                    <p className=" uppercase w-full text-black   font-semibold rounded-sm text-l">
                        {lawyer.designation}
                    </p>
                </div>

                <p className="text-base text-black-600 mt-2 font-semibold  ">
                    {lawyer.practice_area.join(", ")}
                </p>
                <p className="text-sm text-black-600 ">
                    <span className='text-black font-medium text-xl'> {lawyer.years_of_experience} </span> year of Experience
                </p>
                <p className="text-sm text-black-600  ">
                    {lawyer.city},{lawyer.state}
                </p>
            </div>
            <div className="p-4 flex justify-center">

                <button className="bg-primary text-white font-medium text-sm px-5 py-2 rounded-md shadow  transition-transform transform hover:scale-105 hover:shadow-lg" onClick={() => navigate(`/viewLawyer/${lawyer._id ? lawyer?._id : null}`)} >
                    View Profile
                </button>
            </div>
        </div>
    );
};

export default CommonCard;
