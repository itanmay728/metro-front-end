import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../contextAPI/slices/authSlice";
import employeeReducer from "../contextAPI/slices/EmployeeDetailsSlice";
import customerReducer from "../contextAPI/slices/CustomerDetailsSlice";
import cardReducer from '../contextAPI/slices/CardDetailsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    customer: customerReducer,
    card : cardReducer,
  },
});
