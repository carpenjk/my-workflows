import { useGetUserDetailsQuery } from "app/services/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DashboardCard } from "features/dashboard";


const Dashboard = () => {
  const navigate = useNavigate();
  const {data: loggedInUser, isLoading: isLoadingUser, isUninitialized: isUninitializedUser, isFetching: isFetchingUser} = useGetUserDetailsQuery();
  
  useEffect(() => {
    if(!loggedInUser?.email){
      navigate('/login')
    }
  }, [loggedInUser, navigate])


  return (  
        <DashboardCard />
  );
}
 
export default Dashboard;