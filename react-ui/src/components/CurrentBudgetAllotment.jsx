import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { getOrderStatus } from '../lib/helpers'
import axios from 'axios'
import { tr } from 'date-fns/locale'





// const currentBudget = [
// 	{
// 		id: '1',
// 		officecode: '4324',
// 		officeabbr: 'PACCTO',
// 		officename: 'PROVINCIAL ACCOUNTING OFFICE',
// 		allotedbudget: 'Php 0,000,000.00',
// 		augmented: 'Php 0,000,000.00',
// 		totalbudget: 'Php 0,000,000.00',
// 	},
// 	{
// 		id: '2',
// 		officecode: '4324',
// 		officeabbr: 'PTP',
// 		officename: 'PROVINCIAL TREASURER\'S OFFICE',
// 		allotedbudget: 'Php 0,000,000.00',
// 		augmented: 'Php 0,000,000.00',
// 		totalbudget: 'Php 0,000,000.00',
// 	},
//     {
// 		id: '3',
// 		officecode: '4324',
// 		officeabbr: 'MISO',
// 		officename: 'MANAGEMENT INFORMATION SYSTEM\' OFFICE',
// 		allotedbudget: 'Php 0,000,000.00',
// 		augmented: 'Php 0,000,000.00',
// 		totalbudget: 'Php 0,000,000.00',
// 	},
//     {
// 		id: '4',
// 		officecode: '4324',
// 		officeabbr: 'NSPH',
// 		officename: 'NORTHERN SAMAR PROVINCIAL HOSPITAL',
// 		allotedbudget: 'Php 0,000,000.00',
// 		augmented: 'Php 0,000,000.00',
// 		totalbudget: 'Php 0,000,000.00',
// 	},
//     {
// 		id: '5',
// 		officecode: '4324',
// 		officeabbr: 'PGO',
// 		officename: 'PROVINCIAL GOVERNOR\' OFFICE',
// 		allotedbudget: 'Php 0,000,000.00',
// 		augmented: 'Php 0,000,000.00',
// 		totalbudget: 'Php 0,000,000.00',
// 	},
//     {
// 		id: '6',
// 		officecode: '4324',
// 		officeabbr: 'PGO-JAIL',
// 		officename: 'PROVINCIAL JAIL',
// 		allotedbudget: 'Php 0,000,000.00',
// 		augmented: 'Php 0,000,000.00',
// 		totalbudget: 'Php 0,000,000.00',
// 	},
//     {
// 		id: '7',
// 		officecode: '4324',
// 		officeabbr: 'PGO-TOURISM',
// 		officename: 'NORTHERN SAMAR TOURISM OFFICE',
// 		allotedbudget: 'Php 0,000,000.00',
// 		augmented: 'Php 0,000,000.00',
// 		totalbudget: 'Php 0,000,000.00',
// 	},
//     {
// 		id: '8',
// 		officecode: '4324',
// 		officeabbr: 'PIO',
// 		officename: 'PROVINCIAL INFORMATION OFFICE',
// 		allotedbudget: 'Php 0,000,000.00',
// 		augmented: 'Php 0,000,000.00',
// 		totalbudget: 'Php 0,000,000.00',
// 	},
// ]

export default function CurrentBudgetAllotment() {
	const [currentBudget,setCurrentBudget] = useState([]);

	useEffect(()=>{
		axios.get(`http://127.0.0.1:8000/api/budgetallotment/`).then(res =>{
			setCurrentBudget(res.data.budget);
		});
	},[]);


	const budgetList = currentBudget.map((ofc,id) => (
		<tr key={id}>
			<td>{ofc.officecode}</td>
			<td>{ofc.officename}</td>
			<td>{ofc.officedesc}</td>
			<td>{ofc.totalbudget}</td>
		</tr>
	))
	return (
		<div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
			<strong className="text-gray-700 font-medium">Budget Allotment 2023</strong>
            
			<div className="border-x border-gray-200 rounded-sm mt-0 overflow-scroll h-[40rem]">
				<table className="w-full text-gray-700 border-collapse border  border-slate-400">
					<thead className='sticky top-0'>
						<tr>
							<th>Office Code</th>
							<th>Office Abbr</th>
							<th>Office Name</th>
							<th>Alloted Budget</th>
							<th>Augmented</th>
							<th>Total Budget</th>
							<th>Used Budget</th>
						</tr>
					</thead>
					<tbody>
						{budgetList}
					</tbody>
				</table>
			</div>
		</div>
	)
}