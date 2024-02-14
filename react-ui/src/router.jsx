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
import ObrListBudget from "./components/obligationrequest/ObrListBudget";
import RegisterUser from "./components/users/RegisterUser";
import ObligationRequestPrintPreview from "./components/obligationrequest/ObligationRequestPrintPreview";
import AcctObrView from "./components/accounting/AcctObrView";
import AcctObrViewSelected from "./components/accounting/AcctObrViewSelected";
import AcctLogin from "./components/AcctLogin";
import ImportBudget from "./components/budget/ImportBudget";
import DisplayBudgets from "./components/budget/DisplayBudgets";
import DashboardAccounting from "./components/DashboardAccounting";
import ApprovedObrListBudget  from "./components/obligationrequest/ApprovedObrListBudget";
import DisplayOffices from "./components/offices/DisplayOffices";
import ApprovedOBRPreview from "./components/obligationrequest/ApprovedOBRPreview";
import DynamicInput from "./components/accounting/DynamicInput";
import AcctPaidPreview from "./components/accounting/AcctPaidPreview";
import CreateVoucher from "./components/accounting/CreateVoucher";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Login/>
        // path:'/',
        // element:<DisplayOffices/>
    },
    {
        path:'/obrprintpreview',
        element:<ObligationRequestPrintPreview/>
    },
    {
        path:'/acctlogin',
        element:<AcctLogin />
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
            path:'/dashboardaccounting',
            element:<DashboardAccounting />
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
            path:'/approvedobrlistbudget',
            element:<ApprovedObrListBudget/> 
            },
           {
                path:'/showobrbudget',
                element:<ShowObrBudget/>
           }
           ,
           {
                path:'/approvedobrpreview',
                element:<ApprovedOBRPreview/>
            }
            ,
           {
            path:'/acctobrview',
            element:<AcctObrView/>
           }
           ,
           {
            path:'/acctobrviewselected',
            element:<AcctObrViewSelected/>
           },
           {
            path:'/acctpaidpreview',
            element:<AcctPaidPreview/>
           }
           ,
           {
            path:'/createvoucher',
            element:<CreateVoucher/>
           }
           ,
           {
            path:'/settings',
            element:<Settings/>
           }
           ,
           {
            path:'/importbudget',
            element:<ImportBudget/>
           }
           ,
           {
            path:'/budgets',
            element:<DisplayBudgets/>
           }
           ,
           {
            path:'/register',
            element:<RegisterUser/>
           }
           ,
           {
            path:'/dynamicinput',
            element:<DynamicInput/>
           }
        ]
    }
   
])

export default router;