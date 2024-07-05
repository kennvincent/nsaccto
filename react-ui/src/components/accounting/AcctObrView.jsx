import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import axiosClient from '../../axios-client';
import LoadOfficesDropDown from '../shared/LoadOfficesDropDown';
import { FcViewDetails } from "react-icons/fc";
import VoucherDisplay from '../Voucher/VoucherDisplay';

export default function AcctObrView() {
    const [obrlist,setObrList] = useState([]);
    const navigate = useNavigate();
    const [offices,setOffices]=useState([]);
    const[officename,setOfficeName]=useState();
    const [payee,setPayee] = useState();

    useEffect(()=>{
      axiosClient.get(`/obligationrequest/accounting/payable/view`).then(res =>{
        setObrList(res.data.obrlist);
      });

      axiosClient.get(`/offices`).then(res=>{
        setOffices(res.data.offices);
      }).catch(function(error){
          console.log("ERROR " + error.response.status);
      });
    },[]);


    const handleShowOBR = (obrid)=>{
      navigate("/acctobrviewselected",{state:{obrid:obrid}});
    }


    const handlePaidPreview = (obrid)=>{
      navigate("/acctpaidpreview",{state:{obrid:obrid}});
    }

    const handleCreateVoucher = (obrid)=>{
      navigate("/createvoucher",{state:{obrid:obrid}});
    }

    const [showVoucher,setShowVoucher]=useState(false);
    const [obrdata,setObrData]=useState();
    const [voucherdata,setVoucherData]=useState([]);

    const handleShowVoucher = (obrid)=>{
      axiosClient.get(`/voucher/getobrvoucher/${obrid}`).then(res=>{
          setVoucherData(res.data.vouchers);
      });

     setShowVoucher(true);
    }
 
    const handleCloseVoucher = ()=>{
     setShowVoucher(false);
    }
    


    // const obrWithVoucher = obrlist.filter((obr)=>obr.withvoucher !== '2');

    const payableOBR = obrlist.map((obr)=>{
      return(
        <tr key={obr.id} className='p-0 m-0 border hover:bg-slate-100'> 
          <td className='py-1 text-xs'>{obr.payee}</td>
          <td className='py-1 text-xs'>{obr.officecode}</td>
          <td className='py-1 text-xs'>{obr.officename}</td>
          <td className='py-1 text-xs'>{obr.officedesc}</td>
          <td className='py-1 text-xs overflow-hidden'>{obr.particulars}</td>
          <td className='py-1 text-right text-xs'>{Number(obr.totalamount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          <td className='py-1 text-right text-xs'>{Number(obr.voucher).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          <td className='py-1 text-right text-xs'>{Number(obr.balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          <td className='py-1 text-right text-xs'>{Number(obr.paid).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          <td className='py-1'>
            <button disabled={obr.balance==0?true:false} className='btn btn-success btn-sm  ml-1 text-xs' 
              onClick={()=>handleCreateVoucher(obr.id)}>Voucher</button>
            
            <button onClick={()=>handleShowVoucher(obr.id)} disabled={obr.voucher>0?false:true} className='btn btn-success btn-sm  ml-1 text-xs' >Pay</button>
          </td>

          {/* <td className='py-1'>{obr.balance>0?<button disabled={(obr.withvoucher==2 || obr.withvoucher==1)?false:true}  className='btn btn-success btn-sm ' 
            onClick={()=>handleShowOBR(obr.id)}>Pay</button>:<button className='btn btn-success btn-sm '  
            onClick={()=>handlePaidPreview(obr.id)}>Preview</button>}
            {obr.balance>0?<button disabled={obr.withvoucher==2?true:false} className='btn btn-success btn-sm  ml-1' 
            onClick={()=>handleCreateVoucher(obr.id)}>Voucher</button>:""}</td> */}
        </tr>
      )
    })
  
    const loadOffices = offices.map((office)=>{
      return(
        <option value={office.id}>{office.officename}</option>
      );
    });

    const getOffice = (ofc)=>{
      setOfficeName(ofc);
      if(ofc !=""){
        axiosClient.get(`/obligationrequest/accounting/selectedoffice/view/${ofc}`).then(res =>{
          setObrList(res.data.obrlist);
        });
      }else{
        axiosClient.get(`/obligationrequest/accounting/payable/view`).then(res =>{
          setObrList(res.data.obrlist);
        });
      }
      
    }

   const onChangePayee = (payee)=>{
   console.log(payee);
    axiosClient.get(`/obligationrequest/accounting/selectedpayee/view/${payee}`).then(res =>{
      setObrList(res.data.obrlist);
    });
   }


  
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div>
        <h3 className="text-gray-700 font-medium">Approved Obligation Request</h3>
      </div>
      <div className='flex'>
        <LoadOfficesDropDown onChangeOffice={getOffice}/>
        <input type="text" className='h-8 w-[300px] ml-4' onChange={(e)=>onChangePayee(e.target.value)} />
      </div>
      
      <div className="border-x border-gray-200 rounded-sm mt-0 overflow-scroll h-[40rem]">
        <table className='w-full text-gray-700 border-collapse  border-slate-400 border mt-2'>
          <thead className='sticky top-0 bg-slate-200'>
            <tr >
              <th>Payee</th>
              <th>Office Code</th>
              <th className='w-[100px]'>Responsibility Center</th>
              <th>Office Description</th>
              <th>Particulars</th>
              <th className='text-right'>Total Amount</th>
              <th className='text-right'>Voucher</th>
              <th className='text-right'>Balance</th>
              <th className='text-right'>Paid</th>
              <th className='w-[200px]'></th>
            </tr>
          </thead>
          <tbody>
           {payableOBR}
          </tbody>
        </table>
        
      </div>
      <VoucherDisplay visible={showVoucher} onClose={handleCloseVoucher} data={voucherdata}/>
    </div>
  )
}
