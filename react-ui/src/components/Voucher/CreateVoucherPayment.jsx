import React, { useEffect, useState } from 'react'
import SearchOBR from './SearchOBR'
import axiosClient from '../../axios-client';

const CreateVoucherPayment = () => {
    const [showSearch,setShowSearch]=useState(false);
    const [obrdata,setData] = useState([]);
    const [obrDetails,setObrDetails] = useState([]);

    const handleShowSearch = ()=>{
        setShowSearch(true);
        axiosClient(`obligationrequest/viewapprovedlist`).then(res=>{
            setData(res.data.obrlist);
         
        })
    }

    const handleCloseSearch = ()=>{
        setShowSearch(false);
    }


    const [obrAccounts,setObrAccounts] = useState([]);

    // const [expandedRows, setExpandedRows] = useState([]);
    // const toggleRow = (id) => {
    //     const isRowExpanded = expandedRows.includes(id);
    //     if (isRowExpanded) {
    //       setExpandedRows(expandedRows.filter(rowId => rowId !== id));
    //     } else {
    //       setExpandedRows([...expandedRows, id]);
    //     }
    //   };

    // const data = [
    //     {
    //         id:1,payee:'Juan Dela Cruz',
    //         particulars:'To obligate payment for Juan Dela Cruz',
    //         details:[
    //             {detail_id:1,accountcode:'100-10-001',accountdesc:'Office Supplies',amount:1200 },
    //             {detail_id:2,accountcode:'100-20-002',accountdesc:'Travel Expenses',amount:4000 }
    //         ]
    //     },
    //     {
    //         id:2,payee:'Vicente D. Letran Jr, et. al.',
    //         particulars:'To obligate payment for ABC',
    //         details:[
    //             {detail_id:1,accountcode:'200-10-010',accountdesc:'Internet Subscription',amount:5300},
    //             {detail_id:2,accountcode:'200-20-020',accountdesc:'ICT Equipment',amount:7000},
    //             {detail_id:3,accountcode:'200-30-030',accountdesc:'Communication Networks',amount:3600}
    //         ]
    //     }
    //     ,
    //     {
    //         id:3,payee:'Vincent A. Sabelao',
    //         particulars:'To obligate payment for ABC',
    //         details:[
    //             {detail_id:1,accountcode:'200-10-010',accountdesc:'Internet Subscription',amount:5300},
    //             {detail_id:2,accountcode:'200-20-020',accountdesc:'ICT Equipment',amount:7000},
    //             {detail_id:3,accountcode:'200-30-030',accountdesc:'Communication Networks',amount:3600}
    //         ]
    //     },
    //     {
    //         id:4,payee:'Frederick Gelera, et. al.',
    //         particulars:'To obligate payment for ABC',
    //         details:[
    //             {detail_id:1,accountcode:'200-10-010',accountdesc:'Internet Subscription',amount:5300},
    //             {detail_id:2,accountcode:'200-20-020',accountdesc:'ICT Equipment',amount:7000},
    //             {detail_id:3,accountcode:'200-30-030',accountdesc:'Communication Networks',amount:3600}
    //         ]
    //     }

    // ];

    const [filteredData,setFilteredData]=useState([]);
    

    const handleSelected = (obrid)=>{
        axiosClient(`obligationrequest/getheader/${obrid}`).then(res=>{
            let id = res.data.obr[0].id;
            let payee = res.data.obr[0].payee;
            let particulars = res.data.obr[0].particulars
            axiosClient(`obligationrequest/getdetails/${obrid}`).then(res=>{
              

                 let obrdata = {
                        id : id,
                        payee : payee,
                        particulars : particulars,
                        details: res.data.obrdetails.map((detail)=>({
                            detail_id:detail.id,
                            accountcode:detail.accountcode,
                            accountdesc:detail.accountdesc,
                            amount:detail.amount
                        }))
                    
                    }
                
                setFilteredData([...filteredData,obrdata]);
                
            })
        })
        
        
    }

 

    const handleDisplaySelected = obrAccounts.map((obr,index)=>{
        return(
            <tr key={index}>
                <td>{obr.accountcode}</td>
                <td>{obr.accountdesc}</td>
                <td>{obr.amount}</td>
            </tr>
        )
    });


    
    const handleRemove = (obrid)=>{
       
       setFilteredData(filteredData.filter( obr=>obr.id !== obrid));
    
    }
    
   
    
  return (
    <div className=''>
        <div className='card'>
            <div className='card-header'><h5>Voucher/Payment</h5></div>
            <div className='card-body min-h-[400px] max-h-[800px] overflow-y-scroll'>
                <button onClick={handleShowSearch} className='btn btn-primary btn-sm mb-2'>Search OBR</button>
     

               
                <table border="1" cellPadding="0" cellSpacing="0" width="100%">
                    <tbody>
                        {filteredData.map(obr => (
                        <React.Fragment key={obr.id}>
                            <tr className='p-0 h-8'>
                                <td className='p-0 h-8 w-[200px]'>{obr.payee}</td>
                                <td className='p-0 h-8 w-[800px]'>{obr.particulars} </td>
                                <td className='w-[200px]'><a href="#" className='text-red-600' onClick={(e)=>handleRemove(obr.id)}>Remove</a></td>
                            </tr>
                           
                            <tr>
                            <td colSpan="2" className='p-0 h-8'>
                                <table border="1" cellPadding="5" cellSpacing="0" width="100%">
                                    <thead>
                                        <tr className='p-0 h-8'>
                                            <th>Account Code</th>
                                            <th>Account Description</th>
                                            <th className='text-right'>Amount</th>
                                            <th className='px-4'>Amount Paid</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {obr.details.map((detail) => (
                                            <tr key={detail.detail_id} className='p-0 h-4'>
                                                <td className='w-[200px] p-0 px-2 h-8'>{detail.accountcode}</td>
                                                <td className='w-[400px] p-0 px-2 h-8'>{detail.accountdesc}</td>
                                                <td className='w-[200px] p-0 px-2 h-8 text-right'>{detail.amount}</td>
                                                <td className='p-0 px-4 h-8'><input type='text' className='h-8 text-right p-0 px-2' /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </td>
                            </tr>
                            <tr className='h-10'></tr>
                        </React.Fragment>
                        ))}
                    </tbody>
                    </table>
                   
            </div>
            <SearchOBR className='absolute top-0' visible={showSearch} data={obrdata} onSelect={handleSelected} onClose={handleCloseSearch}/>
        </div>
       
    </div>
    
  )
}

export default CreateVoucherPayment
