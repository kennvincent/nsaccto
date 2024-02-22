import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog,
    HiBriefcase,
    HiOutlineLibrary,
    HiDocumentReport
} from 'react-icons/hi'


export const DASHBOARD_BUDGET_SIDEBAR_LINKS =[
	
	{
		key: 'obrlistbudget',
		label: 'For Approval OBR',
		path: '/obrlistbudget',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'approvedobrlistbudget',
		label: 'Approved OBR',
		path: '/approvedobrlistbudget',
		icon: <HiOutlineDocumentText />
	},
]

export const DASHBOARD_ACCOUNTING_SIDEBAR_LINKS = [
	
	{
		key: 'offices',
		label: 'Offices',
		path: '/offices',
		icon: <HiOutlineLibrary />,
	},
	{
		key: 'accounts',
		label: 'Accounts',
		path: '/accounts',
		icon: <HiBriefcase />,
	},
	{
		key: 'acctobrview',
		label: 'Obligation Request',
		path: '/acctobrview',
		icon: <HiOutlineDocumentText />,
	},
	{
		key: 'acctobrpaidview',
		label: 'Paid Obligation Request',
		path: '/acctobrpaidview',
		icon: <HiOutlineDocumentText />,
	},
	{
		key: 'voucherlist',
		label: 'Vouchers List',
		path: '/voucherslist',
		icon: <HiOutlineDocumentText />,
	},
	{
		key: 'importbudget',
		label: 'Import Budget',
		path: '/importbudget',
		icon: <HiOutlineDocumentText />,
	},
	{
		key: 'register',
		label: 'Register User',
		path: '/register',
		icon: <HiOutlineDocumentText />
	}
	
]

export const DASHBOARD_SIDEBAR_LINKS = [

	{
		key: 'officebudget',
		label: 'Office Budgets',
		path: '/officebudget',
		icon: <HiDocumentReport />,
	},
	{
		key: 'obrcreate',
		label: 'Create OBR',
		path: '/obrcreate',
		icon: <HiDocumentReport />,
	},
	{
		key: 'obrlist',
		label: 'OBR List',
		path: '/obrlist',
		icon: <HiOutlineDocumentText />,
	},
	
]

export const DASHBOARD_OFFICEHEAD_SIDEBAR_LINKS = [

	
	
	{
		key: 'obrforapprovallist',
		label: 'OBR for Approval',
		path: '/obrofficeforapproval',
		icon: <HiOutlineDocumentText />,
	},
	{
		key: 'officeapproveobr',
		label: 'Approved OBR',
		path: '/obrofficeapproved',
		icon: <HiOutlineDocumentText />,
	},
	
]


export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	// {
	// 	key: 'support',
	// 	label: 'Help & Support',
	// 	path: '/support',
	// 	icon: <HiOutlineQuestionMarkCircle />
	// }
]