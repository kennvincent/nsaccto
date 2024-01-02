import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Office from "./components/offices/Office";
import Login from "./components/Login";
import OBRList from "./components/obligationrequest/ObligationRequestList";
import MainLayout from "./components/shared/MainLayout";
import Dashboard from "./components/Dashboard";
import Settings from "./views/Settings";
import Accounts from "./components/accounts/Accounts";
import OfficeBudget from "./components/budget/OfficeBudget";
import CreateObligationRequest from "./components/obligationrequest/CreateObligationRequest";
import ShowObrBudget from "./components/obligationrequest/ShowObrBudget";
import ObrListBudget from "./components/ObrListBudget";
import RegisterUser from "./components/users/RegisterUser";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Login/> 
    },
    {
        path: '/',
        element:<MainLayout/>,
        children:[
           {
            path:'/dashboard',
            element:<Dashboard />
            },
           {
            path:'/offices',
            element:<Office />
           },
           {
            path:'/accounts/',
            element:<Accounts />
           },
           {
            path:'/officebudget',
            element:<OfficeBudget />
           }
           ,
           {
            path:'/obrcreate',
            element:<CreateObligationRequest />
           }
           ,
           {
            path:'/obrlist',
            element:<OBRList />
           },
           {
               path:'/obrlistbudget',
               element:<ObrListBudget/> 
           },
           {
                path:'/showobrbudget',
                element:<ShowObrBudget/>
           }
           ,
           {
            path:'/settings',
            element:<Settings/>
           }
           ,
           {
            path:'/register',
            element:<RegisterUser/>
           }
        ]
    }
   
])

export default router;