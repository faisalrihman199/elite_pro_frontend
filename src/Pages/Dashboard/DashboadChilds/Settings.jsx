import React, { useEffect, useState } from 'react';
import EmployeeForm from '../../../Components/Employee/EmployeeForm';
import { useAPI } from '../../../Context/APIContext';
import SignupForm from '../../../Components/Auth/SignupForm';
import LoadingSkeleton from '../../../Components/Dashboards/ChildDashboard/LoadingSkeleton';

const Settings = () => {
  const { getUser, profileData } = useAPI();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = getUser();

  useEffect(() => {
    setLoading(true);
    profileData()
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
      ) : user && user.role === "admin" ? (
        profile ? (
          <SignupForm profile={profile} />
        ) : (
          <div>No Data Found</div>
        )
      ) : profile ? (
        <EmployeeForm profile={profile} />
      ) : (
        <div>No Data Found</div>
      )}
    </div>
  );
};

export default Settings;
