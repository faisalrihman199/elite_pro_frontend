import React from 'react'
import EmployeeForm from '../../../Components/Employee/EmployeeForm'
import { useAPI } from '../../../Context/APIContext'
import SignupForm from '../../../Components/Auth/SignupForm';

const Settings = () => {
    const {getUser}=useAPI();
    const user=getUser();
    
    
  return (
    <div className="p-8">
        {
            user && user.role==="admin"?
            <SignupForm />
            :
            <EmployeeForm />
        }
    </div>
  )
}

export default Settings