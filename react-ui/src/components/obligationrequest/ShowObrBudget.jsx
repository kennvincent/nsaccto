import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import axiosClient from '../../axios-client';
import OBRRejectRemarks from './OBRRejectRemarks';

export default function ShowObrBudget() {
 const location = useLocation();
 const navigate =useNavigate();

 const [obr,setObr] = useState([]);
 const [obrtotal,setObrTotal]=useState([]);
 const [obrnumber,setObrNumber] = useState();
 const [showRemarks,setShowRemarks] =useState(false);
 const [showApproveReject,setShowApproveReject] = useState(true);
 const [lastobrid,setLastObrId]=useState();
 const obrid = location.state.obrid;

 let payee="";
 let officedesc="";
 let officename="";
 let address="";
 let particulars="";
 let officecode="";
 let totalamount=0;
 let obrstatus="";


 

 useEffect(()=>{
    axiosClient.get(`/obligationrequest/getobrid`).then(res=>{
        var id = parseInt(res.data.obrid[0].obrid) + 1
        setLastObrId(id);
        const obrnum = generate_obr_number(id);
        setObrNumber(obrnum);
      }).catch(error=>{
        console.log('Error fetching last obr id');
      });
 },[]);

 useEffect(()=>{
    
    

    const fetchData = async()=>{
        axiosClient.get(`/obligationrequest/budgetview/selected/${obrid}`).then(res=>{
            setObr(res.data.obr);
          });
          
         
        axiosClient.get(`/obligationrequest/budgetview/selected/sum/${location.state.obrid}`).then(res=>{
            setObrTotal(res.data[0].obrtotal);
          });
          
       
         
    };

    fetchData();
 },[]);



 
 const generate_obr_number = ($lastobrid)=>{
    try{
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1 ;
        var strMonth=currentMonth.toString();
        if(strMonth.length==1){
            strMonth  = "0" + strMonth;
        }

        if($lastobrid.toString().length==1){
            var strNum =  currentYear + "-" + strMonth +"-00000" + $lastobrid;
            
        } else if($lastobrid.toString().length==2){
            var strNum =  currentYear + "-" + strMonth +"-0000" + $lastobrid;
            
        }else if($lastobrid.toString().length==3){
            var strNum =  currentYear + "-" + strMonth +"-000" + $lastobrid;
            
        }else if($lastobrid.toString().length==4){
            var strNum =  currentYear + "-" + strMonth +"-00" + $lastobrid;
            
        }else if($lastobrid.toString().length==5){
            var strNum =  currentYear + "-" + strMonth +"-0" + $lastobrid;
            
        }else if($lastobrid.toString().length==6){
            var strNum =  currentYear + "-" + strMonth +"-" + $lastobrid;
            
        }
        

    }
    catch(e){
        console.log(e.message);
    }
  
    return (strNum);
 }


 const handleApproveObr = ()=>{
    const data = {
        'obrid':obrid,
        'obrnumber' : obrnumber,
        'lastobrid':lastobrid
    }


    axiosClient.put(`/obligationrequest/budgetview/selected/approve`,data).then(res=>{
        alert(res.data.message)
        setShowApproveReject(false);
    });

    // axiosClient.get(`/obligationrequest/budgetview/selected/approve/${location.state.obrid}`).then(res=>{
    //     alert(res.data.message)
    // });
   

 }

 const handleShowReject = ()=>{
   
    setShowRemarks(true);

 }


 const handleCloseRemarks = ()=>{
    setShowRemarks(false);
 }

 const handleRejectOBR = (remarks)=>{
    if(remarks.trim().length==0){
        alert("Enter remarks");
        return;
    }

    const data = {
        'obrid': obrid,
        'remarks':remarks
    }
    
   
    axiosClient.put(`/obligationrequest/budgetview/selected/reject`,data).then(res=>{
        alert(res.data.message)
        navigate('/obrlistbudget');
    });

    setShowRemarks(false);
    
 }
 const handleObrNumberInput = (e)=>{
    setObrNumber(e.target.value);
 }

 const handleclose =()=>{
    navigate('/obrlistbudget');
 }
  return (
    <div>
        <div className='card-body h-[800px] overflow-scroll bg-white p-2'>
            <div className='text-center p-0'>
                <h4>OBLIGATION REQUESTS</h4>
            </div>
            <div className='flex'>
                <div className='w-[15rem] h-8 items-center border py-0 px-2'>
                    <p>Payee</p>
                </div>
                <div className='w-[70rem] h-8 border px-2'>
                    {obr.map((obr)=>{payee = obr.payee})}
                    <p>{payee}</p>
                </div>
                <div className='flex w-[15rem] h-8 border p-0'>
                    <div className='w-[5rem]'><p>No.</p></div>
                    <div className='w-[10rem]'><input type="text" name="obrnumber" id="" value={obrnumber} onChange={handleObrNumberInput} className='h-7 w-full' /></div>
                </div>
            </div>

            <div></div>
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
                <div className='w-[15rem] h-8 items-center border py-0 px-2'>
                    <p>Address</p>
                </div>
                <div className='w-[85rem] h-8 border py-0 px-2'>
                    {obr.map((obr)=>{address = obr.address})}
                    <p>{address}</p>
                </div>
            </div>

            <div className='flex'>
                <div className='w-[15rem] h-8 items-center border py-0 px-2'>
                    <p>Responsibility Center</p>
                </div>
                <div className='w-[50rem] h-8 border py-0 px-2'>
                    <p>Particulars</p>
                </div>
                <div className='w-[10rem] h-8 border py-0 px-2'>
                    <p>F.P.P</p>
                </div>
                <div className='w-[10rem] h-8 border py-0 px-2'>
                    <p>Account Code</p>
                </div>
                <div className='w-[15rem] h-8 border py-0 px-2'>
                    <p>Amount</p>
                </div>
            </div>

            <div className='flex'>
                <div className='w-[15rem] h-96 items-center border p-2'>
                    {obr.map((obr)=>{officename = obr.officename})}
                    <p>{officename}</p>
                </div>
                <div className='w-[50rem] h-96  p-2'>
                    {obr.map((obr)=>{particulars = obr.particulars})}
                    <p>{particulars}</p>
                </div>
                <div className='w-[10rem] h-96 border p-0'>
                    {obr.map((obr)=>{officecode = obr.officecode})}
                    <p>{officecode}</p>
                </div>
                <div className='w-[10rem] h-96 border py-0 px-2'>
                    {obr.map((obr,index)=>(
                        <p className='p-0 m-0' key={index}>{obr.accountcode}</p>
                    ))}
                </div>
                <div className='w-[15rem] h-96 border py-0 px-2'>
                    {obr.map((obr,index)=>(
                        <p className='p-0 m-0 text-right' key={index}> {Number(obr.amount).toLocaleString()}</p>
                    ))}
                </div>

            </div>

            <div className='flex'>
                <div className='w-[85rem] h-8 border p-1 text-right'>
                        
                </div>
                <div className='w-[15rem] h-8 border p-1 text-right'>
                    <p className='text-right font-bold'> {Number(obrtotal).toLocaleString()}</p>
                </div>
            </div>
            <div className='flex'>
                <div className='w-[100rem] border p-1 text-right'>
                    {showApproveReject?<button className='btn btn-primary btn-sm w-40' onClick={handleApproveObr}>Approve</button>:''}    
                    {showApproveReject?<button className='btn btn-primary btn-sm w-40 ml-2' onClick={handleShowReject}>Reject</button>:''}
                        
                        <button className='btn btn-primary btn-sm w-40 ml-2' onClick={handleclose}>Close</button>
                </div>
            </div>

            

           
        </div>
        
        <OBRRejectRemarks visible={showRemarks} onClose={handleCloseRemarks} 
         handleRejectOBR={handleRejectOBR}/>
    </div>
  )
}
