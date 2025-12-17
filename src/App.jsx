import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home";
import LayOut from "./LayOut";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import About from "./Pages/About/About";
import CustomerDashboard from "./DashBoards/users/CustomerDashboard/CustomerDashboard";
import EmployeeDashboard from "./DashBoards/Employees/EmployeesDashBoard/EmployeeDashboard";
import RoleRoute from "./contextAPI/auth/RoleRoute";
import EmployeesLayOut from "./DashBoards/Employees/EmployeesLayOut/EmployeesLayOut";
import EmployeeSetting from "./DashBoards/Employees/EmployeeSetting/EmployeeSetting";
import AllEmployees from "./DashBoards/Employees/AllEmployees/AllEmployees";
import AllCustomersDetails from "./DashBoards/Employees/AllCustomersDetails/AllCustomersDetails";
import AddNewEmployee from "./DashBoards/Employees/AddNewEmployee/AddNewEmployee";
import CustomerLayOut from "./DashBoards/users/CustomerLayOut/CustomerLayOut";
import CustomerCardHistory from "./DashBoards/users/CustomerCardHistory/CustomerCardHistory";
import CustomerRechargePage from "./DashBoards/users/CustomerRechargePage/CustomerRechargePage";
import CustomerProfile from "./DashBoards/users/CustomerProfile/CustomerProfile";
import Demo from "./DashBoards/users/Demo/Demo";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayOut />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "signup", element: <Register /> },
        { path: "signin", element: <Login /> },
        { path: "logout", element: <Login /> },
      ],
    },

    {
      path: "/customer/dashboard",
      element: (
        <RoleRoute allowed={["ROLE_CUSTOMER"]}>
          <CustomerLayOut />
        </RoleRoute>
      ),
      children : [
        {
          index: true,
          element: <CustomerDashboard/>
        },
        {
          path: "cardhistory",
          element: <CustomerCardHistory/>
        },
        {
          path: "cardrecharge",
          element: <CustomerRechargePage/>
        },
        {
          path: "profile",
          element: <CustomerProfile/>
        },
        {
          path: "demo",
          element: <Demo/>
        },
      ]
    },

    {
      path: "/employee/dashboard",
      element: (
        <RoleRoute
          allowed={["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_COUNTER_EXECUTIVE"]}
        >
          <EmployeesLayOut />
        </RoleRoute>
      ),
      children: [
        {
          index: true,
          element: <EmployeeDashboard />,
        },
        {
          path: "settings",
          element: <EmployeeSetting />,
        },
        {
          path: "allemployees",
          element: (
            <RoleRoute allowed={["ROLE_ADMIN", "ROLE_MANAGER"]}>
              <AllEmployees />
            </RoleRoute>
          ),
        },
        {
          path: "allcustomers",
          element: (
            <RoleRoute allowed={["ROLE_ADMIN"]}>
              <AllCustomersDetails />
            </RoleRoute>
          ),
        },
        {
          path: "addnewemployee",
          element: (
            <RoleRoute allowed={["ROLE_ADMIN", "ROLE_MANAGER"]}>
              <AddNewEmployee />
            </RoleRoute>
          ),
        },
      ],
    },

    {
      path: "/unauthorized",
      element: <h2 style={{ textAlign: "center" }}>Unauthorized Access</h2>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
