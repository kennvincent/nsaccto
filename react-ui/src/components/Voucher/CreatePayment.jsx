import React, { useEffect, useState } from 'react'
import SearchOBR from './SearchOBR'
import axiosClient from '../../axios-client';
const CreatePayment = () => {
    const [showSearch,setShowSearch]=useState(false);
    const [obrdata,setData] = useState([]);
    const [filteredData,setFilteredData]=useState([]);
    const [payments,setPayments] = useState([]);
    const [netamount,setNetAmount] = useState(0);
    const win = window.sessionStorage;

    const handleShowSearch = ()=>{
        setShowSearch(true);
        axiosClient(`obligationrequest/viewapprovedlist`).then(res=>{
            setData(res.data.obrlist);
           
        })
    }

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
                            balance:detail.amount,
                            amountpayment:detail.amount,
                            vat:0,
                            pt:0,
                            ewt1:0,
                            ewt2:0,
                            retention:0,
                            recompensate:0,
                            aggregate:0,
                            penalties:0,
                            others:0,
                            netamount :detail.amount
                        }))
                    
                    }
             
                setFilteredData([...filteredData,obrdata]);
             
                setShowSearch(false);
            })
        })
        
        
    }

    const handleCloseSearch = ()=>{
        setShowSearch(false);
    }

    const handleRemove = (obrid)=>{
       
        setFilteredData(filteredData.filter( obr=>obr.id !== obrid));
     
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
        
        let vat = filteredData[indexObr].details[index]['vat'];
        let selectednetamount = filteredData[indexObr].details[index]['netamount']
        // console.log(filteredData[indexObr].details[index]);
       
        selectednetamount = selectednetamount - vat
        filteredData[indexObr].details[index]['netamount'] = selectednetamount;
        console.log(filteredData);
          
      
    }

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
                    balance : details.amount,
                    amountpayment: details.amountpayment,
                    vat : details.vat,
                    pt : details.pt,
                    ewt1 : details.ewt1,
                    ewt2 : details.ewt2,
                    retention : details.retention,
                    recompensate : details.recompensate,
                    aggregate : details.aggregate,
                    penalties : details.penalties,
                    others : details.others,
                    netamount:details.amount
                }
                
            
                payments.push(newDetails);
                
                console.log(payments);
                
                // console.log(details.obrid,details.detail_id,details.budgetid,details.accountcode,
                //     details.accountdesc,details.amount,details.vat,details.pt,
                //     details.ewt1,details.ewt2,details.retention,details.recompensate,
                //     details.aggregate,details.penalties,details.others);
            })
        }); 
        
        
        axiosClient.post('/obligationrequest/accounting/payment',payments).then(res=>{
            console.log(res.data);
        });
        
    }
  return (
    
    <div className='card'>
        <div className='card-header'><h5>Payment Details</h5></div>
        <div className='card-body max-h-[45rem] overflow-y-scroll'>
            <button onClick={handleShowSearch} className='btn btn-primary btn-sm mb-2'>Search OBR</button>
            <table className='table table-bordered'>
                <tbody>
                   
                    {filteredData.map((obr)=>{
                        return(
                            <>
                                <tr key={obr.obrid}>
                                    <td className='fw-bold'>Payee</td>
                                    <td className='fw-bold' colSpan={2}>{obr.payee}</td>
                                    <td className='fw-bold' colSpan={2}>OBR Number</td>
                                    <td className='fw-bold' colSpan={2}>{obr.obrnumber}</td>
                                    <td colSpan={9} className='text-right'><a href="#" className='text-red-600' onClick={(e)=>handleRemove(obr.id)}>Remove</a></td>
                                </tr>
                                <tr>
                                    <td>Account Code</td>
                                    <td >Account Description</td>
                                    <td className='text-right'>Amount</td>
                                    <td className='text-right'>Balance</td>
                                    <td className=''>Amount to pay</td>
                                    <td>VAT (5%)</td>
                                    <td>PT (3%)</td>
                                    <td>EWT 1(%)</td>
                                    <td>EWT 2(%)</td>
                                    <td>Ret. (10%)</td>
                                    <td>Recompensate</td>
                                    <td>Aggregate</td>
                                    <td>Penalties</td>
                                    <td>Others</td> 
                                    <td>Net Amount</td>
                                </tr>
                                {obr.details.map((detail,index)=>{
                                  return(
                                    <>
                                        <tr>
                                            <td className='w-[160px] p-0 px-2 h-8 align-middle'>{detail.accountcode}</td>
                                            <td className='w-[200px] p-0 px-2 h-8 align-middle' >{detail.accountdesc}</td>
                                            <td className='w-[100px] p-0 px-2 h-8 align-middle text-right'>{Number(detail.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                            <td className='w-[100px] p-0 px-2 h-8 align-middle text-right'>{Number(detail.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                            <td className='w-[100px] h-8 text-right p-1 px-2'><input type='text' className='w-[100px] h-8 text-right p-0 px-1'  onKeyDown={handleKeyDown}  onChange={(e)=>handleAmountChange(e,obr.id,detail.detail_id,index,'amountpayment')}  /></td>
                                            <td className='w-[75px] h-8 text-right p-1 px-2'><input type='text' className='w-[75px] h-8 text-right p-0 px-1'  onKeyDown={handleKeyDown} onChange={(e)=>handleAmountChange(e,obr.id,detail.detail_id,index,'vat')}  /></td>
                                            <td className='w-[75px] h-8 text-right p-1 px-2'><input type='text' className='w-[75px] h-8 text-right p-0 px-1'  onKeyDown={handleKeyDown} onChange={(e)=>handleAmountChange(e,obr.id,detail.detail_id,index,'pt')}  /></td>
                                            <td className='w-[75px] h-8 text-right p-1 px-2'><input type='text' className='w-[75px] h-8 text-right p-0 px-1'  onKeyDown={handleKeyDown} onChange={(e)=>handleAmountChange(e,obr.id,detail.detail_id,index,'ewt1')}  /></td>
                                            <td className='w-[75px] h-8 text-right p-1 px-2'><input type='text' className='w-[75px] h-8 text-right p-0 px-1'  onKeyDown={handleKeyDown} onChange={(e)=>handleAmountChange(e,obr.id,detail.detail_id,index,'ewt2')}  /></td>
                                            <td className='w-[75px] h-8 text-right p-1 px-2'><input type='text' className='w-[75px] h-8 text-right p-0 px-1'  onKeyDown={handleKeyDown} onChange={(e)=>handleAmountChange(e,obr.id,detail.detail_id,index,'retention')}  /></td>
                                            <td className='w-[75px] h-8 text-right p-1 px-2'><input type='text' className='w-[75px] h-8 text-right p-0 px-1'  onKeyDown={handleKeyDown} onChange={(e)=>handleAmountChange(e,obr.id,detail.detail_id,index,'recompensate')}  /></td>
                                            <td className='w-[75px] h-8 text-right p-1 px-2'><input type='text' className='w-[75px] h-8 text-right p-0 px-1'  onKeyDown={handleKeyDown} onChange={(e)=>handleAmountChange(e,obr.id,detail.detail_id,index,'aggregate')}  /></td>
                                            <td className='w-[75px] h-8 text-right p-1 px-2'><input type='text' className='w-[75px] h-8 text-right p-0 px-1'  onKeyDown={handleKeyDown} onChange={(e)=>handleAmountChange(e,obr.id,detail.detail_id,index,'penalties')}  /></td>
                                            <td className='w-[75px] h-8 text-right p-1 px-2'><input type='text' className='w-[75px] h-8 text-right p-0 px-1'  onKeyDown={handleKeyDown} onChange={(e)=>handleAmountChange(e,obr.id,detail.detail_id,index,'others')}  /></td>
                                            <td className='w-[100px] h-8 text-right p-1 px-2'><input type='text' className='w-[100px] h-8 text-right p-0 px-2'  onKeyDown={handleKeyDown} onChange={(e)=>handleAmountChange(e,obr.id,detail.detail_id,index,'net')} value={Number(detail.netamount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} readOnly/></td> 
                                        </tr>
                                       
                                    </>
                                  )
                                })}
                                <tr className='h-8'>
                                    <td colSpan={14}></td>
                                </tr>
                                
                            </>
                            
                        )
                        
                    })}
                   
                    
                </tbody>
            </table>
            {filteredData.length>0 && (
                <button className='btn btn-primary btn-sm' onClick={handSavePayment}>Save Payment</button>
            )}
        </div>
        
        

        <SearchOBR className='absolute top-0' visible={showSearch} data={obrdata} onSelect={handleSelected} onClose={handleCloseSearch}/>
    </div>
   
  )
}

export default CreatePayment
