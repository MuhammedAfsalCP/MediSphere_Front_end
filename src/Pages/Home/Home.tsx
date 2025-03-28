import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Userhome from '../User/Home/Home';
import DoctorHome from '../Doctor/Layout/DashboardLayout'
import { FetchUser } from "../../Redux/Slices/AuthSlice";
import { TokenInstance } from '../../lib/AxiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
const Home: React.FC = () => {
    const user = useSelector((state: any) => state.auth)
    const dispatch=useDispatch()
    
    const token = localStorage.getItem("token")
    const navigate=useNavigate()
  const { data, isLoading,error } = useQuery({
    queryKey: ["fetchuser"],
    queryFn: async () => {
      const response = await TokenInstance.get('/userdetailsget/')

      return response.data
    },
    
    enabled: !!token
    
  })
    
    useEffect(() => {

        if (data) {
          dispatch(FetchUser(data))
        }
        
    
    
    
      }, [data])
    
      if(error){
        navigate('/')
      }
  return (
    <>
    {user?.user?.userdetail?.is_doctor?<DoctorHome/>:<Userhome/>}</>
  );
};

export default Home;
