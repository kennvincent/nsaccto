import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import axiosClient from '../../axios-client';
import PaymentHistory from './PaymentHistory';

export default function AcctObrViewSelected() {
  const location = useLocation();

  const [obr,setObr] = useState([]);
  const [obr2,setObr2] = useState([]);
  let obrid = location.state.obrid;
  
  const [accountcode,setAccountCode] = useState([]);
  const [totalamount,setTotalAmount]=useState(0);
  const [totalamountpaid,setTotalAmountPaid]=useState(0);
  const [totalbalance,setTotalBalance]=useState(0);
  const [amounttopay,setAmountToPay]=useState(0);
  const [checknumber,setCheckNumber] =useState();
  const [bankname,setBankname] =useState();

  let payee="";
  let officedesc="";
  let officename="";
  let officeaddress="";
  let particulars="";
  let officecode="";
  let obrstatus="";
  let amountpaid="";

  const [inputFields, setInputFields] = useState([]);

  useEffect(()=>{
    axiosClient.get(`/obligationrequest/accounting/selected/view/${location.state.obrid}`).then(res=>{
        setObr(res.data.obr);
        setObr2(res.data.obr);
        
      });
  },[]);

  let _total_amount =0;
  let _total_amount_paid=0;
  let _total_balance=0;
  let _total_amount_to_pay=0;

  obr.map((_obr)=>{
    _total_amount = _obr.totalamount;
    _total_amount_paid =_obr.totalamountpaid;
    _total_balance = _obr.totalbalance;
    _total_amount_to_pay = _obr.totalbalance;
  })

  
   

  const checkNumberOnChange = (e)=>{
    setCheckNumber(e.target.value);
  }

  const bankNameOnChange = (e)=>{
    setBankname(e.target.value);
  }

    const handleClickSave=(e)=>{
        e.preventDefault();
        
   
        let paymentDetails =[];
        obr2.map((data)=>{
            
            paymentDetails.push({
                obrid:data.id,
                obr_detail_id:data.obr_detail_id,
                accountcode:data.accountcode,
                amountpaid:data.balance
            })
           
        })

        const payments = {
            'checknumber':checknumber,
            'bankname':bankname,
            'obrid':obrid,
            'details':paymentDetails
        }
        
        axiosClient.post(`obligationrequest/accounting/payment`,payments).then(res=>{
            alert(res.data.message);

        });
        
    }



    const handleAccountCodeChange = (index, event) => {
         let data = [...obr2];
        data[index]['accountcode'] = event.target.value;
        setObr2(data);
        console.log(obr2);
    }

      const handleAmountChange = (index, event) => {
        let data2 = [...obr2];
        data2[index]['balance'] = parseFloat(event.target.value);
      
        setObr2(data2);
   
        let totalamt=0;
        obr2.map((amt)=>{
            
            totalamt = parseFloat(totalamt) + parseFloat(amt.balance)
        })

        _total_amount_to_pay = totalamt;
        setAmountToPay(totalamt);
      }
      
      const handleNoChange = ()=>{

      }
      const addFields = (e) => {
        e.preventDefault();
        
      }

      
     
 
    const obrDetails = obr.map((detail,index)=>{
        return (
            <tr key={index} className='p-0'>
                <td className='p-1'><input type="text" name="accountcode1" value={detail.accountcode1} 
                onChange={(e)=>handleAccountCodeChange(index,e)} className='py-1' /></td>
                
                <td className='p-1'><input type="text" name="accountcode" value={detail.accountcode} 
                onChange={(e)=>handleAccountCodeChange(index,e)} className='py-1' /></td>
                 
                <td className='p-1'><input type="text" name="amount1" value={Number(detail.amount1).toLocaleString()} 
                onChange={(e)=>handleAmountChange(index,e)} className='py-1 text-right' /></td>

                <td className='p-1'><input type="text" name="paid" value={Number(detail.paid).toLocaleString()} 
                onChange={handleNoChange} className='py-1 text-right' /></td>

                <td className='p-1'><input type="text" name="balance1" value={Number(detail.balance1).toLocaleString()} 
                onChange={handleNoChange} className='py-1 text-right' /></td>
                

                <td className='p-1'><input type="text" name="balance" value={detail.balance} 
                onChange={(e)=>handleAmountChange(index,e)} className='py-1  text-right' /></td>
            </tr>
        )
    })

    const paymentHistory = ()=>{
        return(
            <PaymentHistory />
        )
    }
  return (
    <div className='bg-white'>
        <div className='card-body '>
            <div className='text-center p-0'>
                <h4>OBLIGATION REQUEST - PAYMENT</h4>
            </div>

            <div className='flex'>
                <div className='w-[15rem] h-8 items-center border py-0 px-2'>
                    <p>Payee</p>
                </div>
                <div className='w-[85rem] h-8 border px-2'>
                    {obr.map((obr)=>{payee = obr.payee})}
                    <p>{payee}</p>
                </div>
            </div>
            <div className='flex'>
                <div className='w-[15rem] h-8 items-center border py-0 px-2'>
                    <p>Office</p>
                </div>
                <div className='w-[85rem] h-8 border px-2'>
                    {obr.map((obr)=>{officedesc = obr.officedesc})}
                    <p>{officedesc}</p>
                </div>
            </div>
           

                <div className='flex'>
                    <div className='w-[15rem] border px-2'>
                            <p>Account(s)</p>
                    </div>
                   
                    <div className='flex'>
                        <div>
                            <div className='flex'>
                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Budget Account Code</th>
                                                <th>Accounting Account Code</th>
                                                <th className='text-right'>Amount Payable</th>
                                                <th className='text-right'>Paid Amount</th>
                                                <th className='text-right'>balance</th>
                                                <th className='text-right'>Amount to pay</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {obrDetails}
                                            <tr>
                                               
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td> 
                                                
                                                <td className='p-1'><input type="text" onChange={handleNoChange} name="totalamount" value={Number(_total_amount).toLocaleString()} className='py-1 text-right'/></td>
                                                <td className='p-1'><input type="text" onChange={handleNoChange} name="totalamountpaid" value={Number(_total_amount_paid).toLocaleString()} className='py-1 text-right'/></td>
                                                <td className='p-1'><input type="text" onChange={handleNoChange} name="totalamountpaid" value={Number(_total_balance).toLocaleString()} className='py-1 text-right'/></td>
                                                <td className='p-1'><input type="text" onChange={handleNoChange} name="totalamountpaid" value={amounttopay>0? Number(amounttopay).toLocaleString():Number(_total_amount_to_pay).toLocaleString()} className='py-1 text-right'/></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                
                            </div>
                        </div>
                    </div>
                   
                </div>

                <div className='flex'>

               
            </div>
            
         
            <div className='flex'>
                <div className='w-[15rem] h-11 border px-2 '>
                        <p className='font-bold'>Check Number</p>
                </div>
                <div className='w-[85rem] h-11 border  px-1' >
                    <input type="text" name="checknumber" id="checknumber" onChange={checkNumberOnChange}  
                    className='h-9 mt-1 font-bold w-[53rem]' />
                </div>
            </div>


            <div className='flex'>
                <div className='w-[15rem] h-11 border px-2'>
                        <p className='font-bold'>Bank Name</p>
                </div>
                <div className='w-[85rem] h-11 border px-1' >
                    <input type="text" name="bankname" id="bankname" onChange={bankNameOnChange} className='h-9 mt-1 font-bold w-[53rem]' />
                </div>
            </div>

            <div className='flex'>
                <div className='w-[15rem] h-11 border px-2'>
                        
                </div>
                <div className='w-[85rem] h-11 border p-1'>
                    <button onClick={handleClickSave} className='btn btn-primary btn-sm w-[15rem]'>Save</button>
                </div>
            </div>

           
           

        </div>

     
    </div>
  )
}
