import React,{Component, useRef,useEffect, useState} from 'react'
import {useReactToPrint} from 'react-to-print'
import axios from 'axios'
import { LuPrinter } from "react-icons/lu";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
export default function ObligationRequestPrintPreview() {

    
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const navigate = useNavigate();
    const handleClose = ()=>{
        navigate('/obrcreate');
    }
    const [payee,setPayee] = useState();
    const [officeDesc,setOfficeDesc] = useState();
    const [address,setAddress]= useState();
    const [officeName,setOfficeName]= useState();
    const [officeCode,setOfficeCode] = useState(); 
    const [particulars,setParticulars]= useState();
    const [details,setDetails] = useState([]);
    const [total,setTotal] = useState();

    useEffect(()=>{
        const obr_id = window.localStorage.getItem('obr_id');
    
        axios.get(`http://127.0.0.1:8000/api/obligationrequest/printpreview/${obr_id}`).then(res=>{
            setPayee(res.data.obr[0].payee);
            setOfficeDesc(res.data.obr[0].officedesc);
            setAddress(res.data.obr[0].officeaddress);
            setOfficeName(res.data.obr[0].officename);
            setParticulars(res.data.obr[0].particulars);
            setOfficeCode(res.data.obr[0].officecode);
            setDetails(res.data.obr);
        })

        axios.get(`http://127.0.0.1:8000/api/obligationrequest/obrsum/${obr_id}`).then(res =>{
            ///var temptotal = res.data[0];
            setTotal(res.data[0].obrtotal)
        });
    },[]);

   
  return (
    
    <div >
         
      

       <div ref={componentRef} className='card  overflow-hidden'>
       
     
            <div className='card-header text-center bg-white mt-16'>
                <p className='font-bold p-0 m-0'>Republic of the Philippines</p>
                <p className='font-bold text-lg p-0 m-0'>PROVINCE OF NORTHERN SAMAR</p>
                <p className='font-bold p-0 m-0'>Republic of the Philippines</p>
                <LuPrinter onClick={handlePrint} className='absolute right-[22rem] top-20 text-3xl' />
                <IoMdCloseCircleOutline onClick={handleClose}className='absolute right-[19rem] top-20 text-3xl'  />
            </div>
            <div className='card-body h-[1000px] '>
                <div className='text-center p-0'>
                    <h4>OBLIGATION REQUEST</h4>
                </div>
                <div className='flex items-center w-[1500px] m-auto'>
                    <div className='w-[15%] h-8 items-center border py-0 px-2'>
                        <p>Payee</p>
                    </div>

                    <div className='w-[85%] h-8 border p-0  px-2'>
                        <p>{payee}</p>
                    </div>
                </div>

                <div className='flex w-[1500px] m-auto'>
                    <div className='w-[15%] h-8 items-center border py-0 px-2'>
                        <p>Office</p>
                    </div>
                    <div className='w-[85%] h-8 border py-0 px-2'>
                        
                        <p>{officeDesc}</p>
                    </div>
                </div>
                <div className='flex w-[1500px] m-auto'>
                    <div className='w-[15%] h-8 items-center border py-0 px-2'>
                        <p>Address</p>
                    </div>
                    <div className='w-[85%] h-8 border py-0 px-2'>
                        <p>{address}</p>
                    </div>
                </div>

                <div className='flex w-[1500px] m-auto'>
                    <div className='w-[15%] h-14 items-center border py-0 px-2'>
                        <p>Responsibility <br />Center</p>
                    </div>
                    <div className='w-[50%] h-14 border py-0 px-2'>
                        <p>Particulars</p>
                    </div>
                    <div className='w-[10%] h-14 border py-0 px-2'>
                        <p>F.P.P</p>
                    </div>
                    <div className='w-[10%] h-14 border py-0 px-2'>
                        <p>Account Code</p>
                    </div>
                    <div className='w-[15%] h-14 border py-0 px-2'>
                        <p>Amount</p>
                    </div>
                </div>

                <div className='flex w-[1500px] m-auto'>
                    <div className='w-[15%] h-96 items-center border py-0 px-2'>
                        <p>{officeName}</p>
                    </div>
                    <div className='w-[50%] h-96  p-0 px-2'>
                        <p>{particulars}</p>
                    </div>
                    <div className='w-[10%] h-96 border py-0 px-2'>
                        <p>{officeCode}</p>
                    </div>
                    <div className='w-[10%] h-96 border py-0 px-2'>
                        {details.map((obr,index)=>(
                            <p className='p-0 m-0' key={index}>{obr.accountcode}</p>
                        ))}
                    </div>
                    <div className='w-[15%] h-96 border py-0 px-2'>
                        
                        {details.map((obr,index)=>(
                            
                            <p className='p-0 m-0 text-right' key={index}> {Number(obr.amount).toLocaleString()}</p>
                        
                        ))}
                    </div>
                </div>
                <div className='flex border w-[1500px] m-auto'>
                    <div className='w-[50%] h-10  py-0 px-2'></div>
                    
                    <div className='w-[35%] h-10  py-1 px-2'>
                        
                    </div>
                    <div className='w-[15%] h-10 border py-0 px-2'>
                        <p className='text-right'> {Number(total).toLocaleString()}</p>
                    </div>
                </div>
                <div className='flex w-[1500px] m-auto'>
                    <div className='w-[50%] h-30 border px-2'>
                        <p>A. Certified</p>
                        <input type="checkbox" />Charges to appropriation/Allotment, necessary, <br />
                        <input type="checkbox" />lawful and under my direct supervision
                    </div>
                    <div className='w-[50%] h-30 border px-2'>
                        <p>B. Certified</p>
                        <p className='text-center'>Existence of available appropriation</p>
                    </div>
                </div>
                <div className='flex w-[1500px] m-auto'>
                    <div className='w-[10%] h-8 border px-2'>
                        <p>Signature</p>
                    </div>
                    <div className='w-[40%] h-8 border px-2'>
                        
                    </div>
                    <div className='w-[10%] h-8 border px-2'>
                        <p>Signature</p>
                    </div>
                    <div className='w-[40%] h-8 border px-2'>
                        
                    </div>
                </div>

                <div className='flex w-[1500px] m-auto'>
                    <div className='w-[10%] h-20 border px-2'>
                        <p>Printed Name</p>
                    </div>
                    <div className='w-[40%] h-20 border px-2'>
                        
                    </div>
                    <div className='w-[10%] h-20 border px-2'>
                        <p>Printed Name</p>
                    </div>
                    <div className='w-[40%] h-20 border px-2'>
                        
                    </div>
                </div>


                <div className='flex w-[1500px] m-auto'>
                     
                     <div className='w-[50%] h-20 flex'>
                        <div className='w-[20%] h-20 border px-2'>
                            <p>Position</p>
                        </div>
                        
                        <div className='w-[80%] h-[50%] border px-2'>

                        </div>
                     </div>

                     <div className='w-[50%] h-20'>
                        <div className='w-[20%] h-20 border px-2'>
                            <p>Position</p>
                        </div>
                        <div className='w-[80%] h-[50%] border px-2'>
                            
                        </div>
                     </div>
                    {/* <div className='w-[15%] h-20 border px-2'>
                        <p>Position</p>
                    </div>

                    <div className='w-[40%] h-20 border'>
                        <div className='w-[100%] h-10 border px-2'></div>
                        <div className='w-[100%] h-10 border px-2'></div>
                    </div>
                    <div className='w-[10%] h-20 border px-2'>
                        <p>Position</p>
                    </div>
                    <div className='w-[100%] h-20 border'>
                    <div className='w-[100%] h-10 border px-2'></div>
                        <div className='w-[100%] h-10 border px-2'></div>
                    </div> */}
                </div>

                <div className='flex w-[1500px] m-auto'>
                    <div className='w-[10%] h-8 border px-2'>
                        <p>Date</p>
                    </div>
                    <div className='w-[40%] h-8 border px-2'>
                        
                    </div>
                    <div className='w-[10%] h-8 border px-2'>
                        <p>Date</p>
                    </div>
                    <div className='w-[40%] h-8 border px-2'>
                        
                    </div>
                </div>

                <div className='flex w-[1500px] m-auto'>
                    <div className='w-[50%]'>
                        <p className='w-fit'>PGNS-PBO-005-FM Rev.00</p>
                    </div>
                    <div className='w-[50%] items-end'>
                        <p className='text-right'>Effectivity Date: July 17, 2023</p>
                    </div>
                </div>
            </div>
            </div>
    </div>
  )
}