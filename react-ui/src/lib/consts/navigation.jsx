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
import AcctObrView from '../../components/accounting/AcctObrView'



export const DASHBOARD_SIDEBAR_LINKS = [

	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/dashboard',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'offices',
		label: 'Offices',
		path: '/offices',
		icon: <HiOutlineLibrary />
	},
	{
		key: 'accounts',
		label: 'Accounts',
		path: '/accounts',
		icon: <HiBriefcase />
	},
	{
		key: 'obrcreate',
		label: 'Create OBR',
		path: '/obrcreate',
		icon: <HiDocumentReport />
	},
	{
		key: 'obrlist',
		label: 'OBR List',
		path: '/obrlist',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'obrlistbudget',
		label: 'OBR List Budget View',
		path: '/obrlistbudget',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'acctobrview',
		label: 'OBR Accounting View',
		path: '/acctobrview',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'register',
		label: 'Register User',
		path: '/register',
		icon: <HiOutlineDocumentText />
	},
	// {
	// 	key: 'messages',
	// 	label: 'Messages',
	// 	path: '/messages',
	// 	icon: <HiOutlineAnnotation />
	// }
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