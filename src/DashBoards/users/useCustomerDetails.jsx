import React, { useEffect } from 'react'

import { useSelector } from "react-redux";
import avatardefault from "../../assets/avatardefault.png";
import { setCardData } from '../../contextAPI/slices/CardDetailsSlice';


const useCustomerDetails = () => {

    const customerData = useSelector((state) => state.customer.profile);
    const cardData = useSelector((state) => state.card.profile);
    // console.log(cardData);

    // console.log(customerData);

     const metroCards = cardData || [];

    const cardHistory = metroCards.flatMap(
    (card) => card.history || []

    
  );

  
    return {
      fullName: customerData?.customer?.fullName,
      email: customerData?.email,
      password: customerData?.password,
      roles: customerData?.roles,
      aadharNumber: customerData?.customer?.aadharNumber,
      address: customerData?.customer?.address,
      customerCode: customerData?.customer?.customerId,
      phoneNumber: customerData?.customer?.phoneNumber,
      avatardefault: avatardefault,
      metroCards,
      cardHistory
    };

}

export default useCustomerDetails