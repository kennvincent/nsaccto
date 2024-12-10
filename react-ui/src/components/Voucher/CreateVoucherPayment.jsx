import React, { useEffect, useState } from 'react'
import SearchOBR from './SearchOBR'
import axiosClient from '../../axios-client';
import { all } from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Container } from '@mui/material';


const CreateVoucherPayment = () => {
    const win = window.sessionStorage;
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


    const [filteredData,setFilteredData]=useState([]);
  

    const handleSelected = (obrid)=>{

        axiosClient(`obligationrequest/getheader/${obrid}`).then(res=>{
            let id = res.data.obr[0].id;
            let payee = res.data.obr[0].payee;
            let obrnumber = res.data.obr[0].obrnumber;
            let particulars = res.data.obr[0].particulars
            axiosClient(`obligationrequest/getdetails/${obrid}`).then(res=>{

                 let obrdata = {
                        id : id,
                        payee : payee,
                        obrnumber : obrnumber,
                        particulars : particulars,
                        details: res.data.obrdetails.map((detail)=>({
                            obrid:obrid,
                            detail_id:detail.id,
                            budgetid : detail.budgetid,
                            accountcode:detail.accountcode,
                            accountdesc:detail.accountdesc,
                            amount:detail.amount,
                            amountpayment:detail.amount,
                            vat:0,
                            pt:0,
                            ewt1:0,
                            ewt2:0,
                            retention:0,
                            recompensate:0,
                            aggregate:0,
                            penalties:0,
                            others:0
                           
                        }))
                    
                    }
             
                setFilteredData([...filteredData,obrdata]);
                
                setShowSearch(false);
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
    

    const handleAmountChange = (e,id,detail_id,index,column)=>{
        const indexObr = filteredData.findIndex(item => item.id === id);
       
        // console.log(index);
        // // console.log(id,detail_id,index,column);
        // // console.log(filteredData);
        // // const {value} = e.target.value;
        // // setFilteredData(prevData => {
        // //     const newData = [...prevData];
        // //     newData[index][column] = e.target.value;
        // //     return newData;
        // //   });
        // // console.log(filteredData);

        const cleanedValue = e.target.value.replace(/,/g, '');
        const parsedValue= parseFloat(cleanedValue);
        const finalValue = isNaN(parsedValue)?0:parsedValue;

        filteredData[indexObr].details[index][column] = finalValue;
        // console.log(filteredData[indexObr].details[index]);
        filteredData[indexObr].details[index]['netamount'] = filteredData[indexObr].details[index]['amountpayment'] - filteredData[indexObr].details[index]['vat'];
      
    }
    
    function formatAmount(amount) {
        return Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    

    const [alldetails,setAllDetails] = useState([]);
    const [payments,setPayments] = useState([]);

    const handSavePayment = ()=>{
      
        // console.log(filteredData);
        setPayments([]);

        
        filteredData.map((obr)=>{
            obr.details.map((details)=>{
                let newDetails = {
                    userid: win.getItem('userid'),
                    obrid : details.obrid,
                    detail_id : details.detail_id,
                    budgetid : details.budgetid,
                    accountcode : details.accountcode,
                    accountdesc : details.accountdesc,
                    amount : details.amount,
                    amountpayment: details.amountpayment,
                    vat : details.vat,
                    pt : details.pt,
                    ewt1 : details.ewt1,
                    ewt2 : details.ewt2,
                    retention : details.retention,
                    recompensate : details.recompensate,
                    aggregate : details.aggregate,
                    penalties : details.penalties,
                    others : details.others
                }
                
            
                payments.push(newDetails);
                
                // console.log(payments);
                
                // console.log(details.obrid,details.detail_id,details.budgetid,details.accountcode,
                //     details.accountdesc,details.amount,details.vat,details.pt,
                //     details.ewt1,details.ewt2,details.retention,details.recompensate,
                //     details.aggregate,details.penalties,details.others);
            })
        }); 
        
        
        axiosClient.post('/obligationrequest/accounting/payment',payments).then(res=>{
            // console.log(res.data);
        });
        
    }

    const handleKeyDown = (e) => {
        // console.log(e.keyCode);
        const charCode = e.keyCode || e.which;
        // Prevent non-numeric characters, but allow comma (44) and period (46)
        if ((charCode < 48 || charCode > 57) && (charCode < 96 || charCode >105) && 
         charCode !== 188 && charCode !== 190 && charCode !== 110 && charCode !=8 && charCode !=37 && charCode !=39) {
          e.preventDefault(); // Prevent input if it's not a number, comma, or period
        }
      };
    
  return (
    <div className=''>
        <div className='card overflow-y-scroll'>
            <div className='card-header'><h5>Voucher/Payment</h5></div>
              <div className='card-body min-h-[400px] max-h-[800px] overflow-y-scroll'>
                <button onClick={handleShowSearch} className='btn btn-primary btn-sm mb-2'>Search OBR</button>
                <table border="1" cellPadding="0" cellSpacing="0" width="100%">
                    <table>
                        <thead>
                            {filteredData.length>0 && (
                              <tr>
                                
                                   <th style={{backgroundColor:'green'}} >Payee</th>
                                   <th>OBR Number</th>
                                   <th></th>
                                   <th></th>
                                   <th></th>
                                   <th></th>
                                   <th></th>
                                   <th></th>
                                   <th></th>
                                   <th></th>
                                   <th></th>
                                   <th></th>
                                   <th></th>
                               </tr> 
                            )}
                            
                        </thead>
                        <tbody>
                        {filteredData.map(obr => (
                        <React.Fragment key={obr.id}>
                            <tr className='p-0 h-8'>
                                <td  style={{backgroundColor:'red'}} colSpan={1}>{obr.payee} </td>
                                <td >{obr.obrnumber}</td>
                                <td><a href="#" className='text-red-600' onClick={(e)=>handleRemove(obr.id)}>Remove</a></td>
                                {/* <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td> */}
                            </tr>
                           
                            <tr>
                            <td colSpan="2" className='p-0 h-8'>
                                <table border="1" cellPadding="5" cellSpacing="0" width="100%">
                                    <thead>
                                        <tr className='p-0 h-8'>
                                            <th>Account Code</th>
                                            <th>Account Description</th>
                                            <th className='text-right'>Amount</th>
                                            <th className='px-4'>Amount to be paid</th>
                                            <th>VAT (5%)</th>
                                            <th>PT (3%)</th>
                                            <th>EWT 1(%)</th>
                                            <th>EWT 2(%)</th>
                                            <th>Retention (10%)</th>
                                            <th>Recompensate</th>
                                            <th>Aggregate</th>
                                            <th>Penalties</th>
                                            <th>Others</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {obr.details.map((detail,index) => (
                                            <tr key={detail.detail_id} className='p-0 h-4'>
                                                <td className='w-[200px] p-0 px-2 h-8'>{detail.accountcode}</td>
                                                <td className='w-[400px] p-0 px-2 h-8'>{detail.accountdesc}</td>
                                                <td className='w-[200px] p-0 px-2 h-8 text-right'>{Number(detail.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                <td className='w-[150px] h-8 text-right p-0 px-2'><input type='text' className='w-[120px] h-8 text-right p-0 px-2'  onKeyDown={handleKeyDown}  onChange={(e)=>handleAmountChange(e,obr.id,detail.detail_id,index,'amountpayment')}  /></td>
                                                <td className='w-[150px] h-8 text-right p-0 px-2'><input type='text' className='w-[120px] h-8 text-right p-0 px-2'  onKeyDown={handleKeyDown} onChange={(e)=>handleAmountChange(e,obr.id,detail.detail_id,index,'vat')}  /></td>
                                                <td className='w-[150px] h-8 text-right p-0 px-2'><input type='text' className='w-[120px] h-8 text-right p-0 px-2'  onKeyDown={handleKeyDown} onChange={(e)=>handleAmountChange(e,obr.id,detail.detail_id,index,'pt')}  /></td>
                                                <td className='w-[150px] h-8 text-right p-0 px-2'><input type='text' className='w-[120px] h-8 text-right p-0 px-2'  onKeyDown={handleKeyDown} onChange={(e)=>handleAmountChange(e,obr.id,detail.detail_id,index,'ewt1')}  /></td>
                                                <td className='w-[150px] h-8 text-right p-0 px-2'><input type='text' className='w-[120px] h-8 text-right p-0 px-2'  onKeyDown={handleKeyDown} onChange={(e)=>handleAmountChange(e,obr.id,detail.detail_id,index,'ewt2')}  /></td>
                                                <td className='w-[150px] h-8 text-right p-0 px-2'><input type='text' className='w-[120px] h-8 text-right p-0 px-2'  onKeyDown={handleKeyDown} onChange={(e)=>handleAmountChange(e,obr.id,detail.detail_id,index,'retention')}  /></td>
                                                <td className='w-[150px] h-8 text-right p-0 px-2'><input type='text' className='w-[120px] h-8 text-right p-0 px-2'  onKeyDown={handleKeyDown} onChange={(e)=>handleAmountChange(e,obr.id,detail.detail_id,index,'recompensate')}  /></td>
                                                <td className='w-[150px] h-8 text-right p-0 px-2'><input type='text' className='w-[120px] h-8 text-right p-0 px-2'  onKeyDown={handleKeyDown} onChange={(e)=>handleAmountChange(e,obr.id,detail.detail_id,index,'aggregate')}  /></td>
                                                <td className='w-[150px] h-8 text-right p-0 px-2'><input type='text' className='w-[120px] h-8 text-right p-0 px-2'  onKeyDown={handleKeyDown} onChange={(e)=>handleAmountChange(e,obr.id,detail.detail_id,index,'penalties')}  /></td>
                                                <td className='w-[150px] h-8 text-right p-0 px-2'><input type='text' className='w-[120px] h-8 text-right p-0 px-2'  onKeyDown={handleKeyDown} onChange={(e)=>handleAmountChange(e,obr.id,detail.detail_id,index,'others')}  /></td>
                                            </tr>
                                            
                                        ))}
                                        
                                        
                                    </tbody>
                                </table>
                            </td>
                            </tr>
                            <tr className='h-10'></tr>
                            
                        </React.Fragment>
                        ))}
                        {filteredData.length>0  && (
                          <tr>
                          <td><button className='btn btn-primary btn-sm' onClick={handSavePayment}>Create Voucher</button></td>
                       </tr>
                            
                        )}
                       
                       
                    </tbody>
                    </table>
                    
                </table>
                   
                   
            </div>
            <SearchOBR className='absolute top-0' visible={showSearch} data={obrdata} onSelect={handleSelected} onClose={handleCloseSearch}/>
        </div>
       
    </div>
    
  )
}

export default CreateVoucherPayment
