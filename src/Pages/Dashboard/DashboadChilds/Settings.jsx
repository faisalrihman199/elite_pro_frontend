import React, { useEffect, useState } from 'react';
import EmployeeForm from '../../../Components/Employee/EmployeeForm';
import { useAPI } from '../../../Context/APIContext';
import SignupForm from '../../../Components/Auth/SignupForm';
import LoadingSkeleton from '../../../Components/Dashboards/ChildDashboard/LoadingSkeleton';
import { useLocation } from 'react-router-dom';

const Settings = () => {
  const location=useLocation();
  const employeeId=location?.state?.employeeId;
  
  
  
  const { getUser, profileData } = useAPI();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = getUser();

  useEffect(() => {
    setLoading(true);
    const emp=employeeId || null;
    profileData(emp)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8">
      {loading ? (
        <LoadingSkeleton />
      ) : user && user.role === "admin" && !employeeId  ? (
        profile ? (
          <SignupForm profile={profile} />
        ) : (
          <div>No Data Found</div>
        )
      ) : profile ? (
        <EmployeeForm profile={profile} employeeId={employeeId} />
      ) : (
        <div>No Data Found</div>
      )}
    </div>
  );
};

export default Settings;
