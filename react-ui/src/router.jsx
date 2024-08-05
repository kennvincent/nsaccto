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
import CreateVoucher from "./components/voucher/CreateVoucher";
import AccObrPaidView from "./components/accounting/AccObrPaidView";
import VoucherPrintPreview from "./components/Voucher/VoucherPrintPreview";
import VoucherList from "./components/Voucher/VoucherList";
import OfficeForApprovalObligationRequestList from "./components/obrofficeapproval/OfficeForApprovalObligationRequestList";
import OfficeApprovedObligationRequest from "./components/obrofficeapproval/OfficeApprovedObligationRequest";
import Payments from "./components/accounting/Payments";
import Utilization from "./components/accounting/Utilization";
import CreateObr from "./components/obligationrequest/CreateObr";
import OBRRejectedList from "./components/obligationrequest/OBRRejectedList";
import DisplayOfficeBudget from "./components/accounting/DisplayOfficeBudget";
import ObligationRequestPreviewOnly from "./components/obligationrequest/ObligationRequestPreviewOnly";
import EditObr from "./components/obligationrequest/EditObr";
import BudgetRealignment from "./components/budget/BudgetRealignment";
import ExportToExcel from "./components/exportdata/ExportToExcel";
import UpdateObligationRequest from "./components/obligationrequest/UpdateObligationRequest";
import BudgetAugmentation from "./components/budget/BudgetAugmentation";
import BudgetAugmentationList from "./components/budget/BudgetAugmentationList";
import BudgetAugmentationEdit from "./components/budget/BudgetAugmentationEdit";
import EditVoucher from "./components/Voucher/EditVoucher";

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
        path:'/updateobrpreview',
        element:<UpdateObligationRequest/>
    },
    {
        path:'voucherprintpreview',
        element:<VoucherPrintPreview />
    },
    {
        path:'/obrpreviewonly',
        element:<ObligationRequestPreviewOnly />
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
            // element:<CreateObligationRequest />
            element:<CreateObr />
           }
           ,
           {
            path:'/obredit',
            // element:<CreateObligationRequest />
            element:<EditObr />
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
            path:'/budgetrealignment',
            element:<BudgetRealignment/>
            },
            {
                path:'/budgetaugmentation',
                element:<BudgetAugmentation/>
            }
            ,
            {
                path:'/budgetaugmentationlist',
                element:<BudgetAugmentationList/>
            }
            ,
            {
                path:'/budgetaugmentationedit',
                element:<BudgetAugmentationEdit/>
            }
            ,
           {
                path:'/approvedobrpreview',
                element:<ApprovedOBRPreview/>
            }
            ,
            {
                path:'/obrrejectedlist',
                element:<OBRRejectedList/>
            }
            ,
           {
            path:'/acctobrview',
            element:<AcctObrView/>
           }
           ,
           {
            path:'/acctobrpaidview',
            element:<AccObrPaidView/>
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
            path:'/exporttoexcel',
            element:<ExportToExcel />
           }
           ,
           {
            path:'/displayofficebudget',
            element:<DisplayOfficeBudget/>
           }
           ,
           {
            path:'/obrofficeforapproval',
            element:<OfficeForApprovalObligationRequestList/>
           },
           {
            path:'/obrofficeapproved',
            element:<OfficeApprovedObligationRequest/>
           }
           ,
           {
            path:'/createvoucher',
            element:<CreateVoucher/>
           }
           ,
           {
            path:'/voucherslist',
            element:<VoucherList/>
           }
           ,
           {
            path:'/vouchereditreview/:voucher_id',
            element:<EditVoucher/>
           }
           ,
           {
            path:'/payments',
            element:<Payments/>
           }
           ,
           {
            path:'/utilization',
            element:<Utilization/>
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