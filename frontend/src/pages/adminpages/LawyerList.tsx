// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../../services/store/store';
// import { getPendingApprovalLawyers } from '../../services/store/features/adminServices';
// import { toast } from 'sonner';
// import CustomToast from '../../components/userComponents/CustomToast';
// import { lawyerColumns } from '../../utils/constants/Colums';
// import LawyerTable from '../../components/AdminComponents.tsx/LawyerApprovalTable';

// const LawyerList: React.FC = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const [lawyers, setLawyer] = useState<[] | any>([]);

//   const fetchUsers = async () => {
//     try {
//       const response = await dispatch(getPendingApprovalLawyers()).unwrap();
//       setLawyer(response.result);
//     } catch (error: any) {
//       console.log(error);
//       toast(<CustomToast message={error} type="error" />);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [dispatch]);

//   const refreshLawyers = () => {
//     fetchUsers();
//   };


//   return (
//     <div>
//       <div className='w-auto mt-16 bg-white'>
//         <h1 className='text-center mb-5 font-semibold'>Lawyers List</h1>
//         <LawyerTable columns={lawyerColumns} data={lawyers} onRefresh={refreshLawyers} />
//       </div>
//     </div>
//   );
// };

// export default LawyerList;
