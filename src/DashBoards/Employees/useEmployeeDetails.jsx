import React from 'react'

import { useSelector } from "react-redux";
import avatardefault from "../../assets/avatardefault.png";


const useEmployeeDetails = () => {

    const employeeData = useSelector((state) => state.employee.profile);
  
    return {
      fullName: employeeData?.employee?.fullName,
      email: employeeData?.email,
      password: employeeData?.password,
      roles: employeeData?.roles,
      aadharNumber: employeeData?.employee?.aadharNumber,
      address: employeeData?.employee?.address,
      dateOfBirth: employeeData?.employee?.dateOfBirth,
      department: employeeData?.employee?.department,
      empCode: employeeData?.employee?.empCode,
      gender: employeeData?.employee?.gender,
      hireDate: employeeData?.employee?.hireDate,
      managerEmpCode: employeeData?.employee?.managerEmpCode,
      nationality: employeeData?.employee?.nationality,
      phoneNumber: employeeData?.employee?.phoneNumber,
      avatardefault: avatardefault,
    };

}

export default useEmployeeDetails