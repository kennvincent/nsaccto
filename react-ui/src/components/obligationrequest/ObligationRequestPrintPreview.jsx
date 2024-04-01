import React,{Component, useRef,useEffect, useState} from 'react'
import {useReactToPrint} from 'react-to-print'
import axios from 'axios'
import { LuPrinter } from "react-icons/lu";
import { IoMdCloseCircleOutline,IoIosSave  } from "react-icons/io";
import { TiArrowBack } from "react-icons/ti";
import { ImPrinter } from "react-icons/im";
import { useLocation, useNavigate } from 'react-router-dom';
import axiosClient from '../../axios-client';
import { tr } from 'date-fns/locale';
import pgnslogo from '../../images/pgns.png';
import pbologo from '../../images/pbologo.png';

export default function ObligationRequestPrintPreview() {
    const location = useLocation();
    const navigate = useNavigate();
    const win = window.sessionStorage;

    var officename = win.getItem('officename');

    const [obryear,setObrYear] = useState();
    const [officeid,setOfficeId] = useState();
    const [officeName,setOfficeName]=useState();
    const [officeDesc,setOfficeDesc] = useState();
    const [address,setAddress]= useState();
    const [officeCode,setOfficeCode] = useState(); 
    const [responsibilityCenter,setResponsibilityCenter] = useState();
    const [authorizedpersonnel,setAuthorizedPersonnel] = useState();
    const [authorizedposition,setAuthorizedPosition] = useState();
    const [budgetauthorized,setBudgetAuthorized] = useState();
    const [budgetPosition,setBudgetPosition] = useState();
    const [showSave,setShowSave]=useState(true);
    const [showBack,setShowBack]=useState(true);
    const [showPrint,setShowPrint]=useState(false);
    const [showClose,setShowClose]=useState(false);
    
    // const [particulars,setParticulars]= useState();
    const [details,setDetails] = useState([]);
    const [total,setTotal] = useState(0);

    const items = location.state.items;

    const particulars = location.state.particulars;
    const payee = location.state.payee;

    var username = win.getItem('username');
    
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    useEffect(()=>{
        
        axiosClient.get(`signatories`).then(res =>{
            setBudgetAuthorized(res.data.signatories[0].budgetofficer);
        });
         
         const fetchData = async()=>{
 
             try{
                 await axiosClient.get(`/getobryear`).then(res =>{
                     setObrYear(res.data.obryear[0].budgetyear);
                 });
             }catch(e){
     
             }
 
             
             try{
                 await axiosClient.get(`/login/${username}`).then(res =>{
                    
                    console.log(res.data.office[0].authorizedpersonnel);
                     setOfficeId(res.data.office[0].office_id);
                     setOfficeCode(res.data.office[0].officecode);
                     setOfficeName(res.data.office[0].officename);
                     setOfficeDesc(res.data.office[0].officedesc);
                     setAddress(res.data.office[0].officeaddress)
                     setResponsibilityCenter(res.data.office[0].officename);
                     setAuthorizedPersonnel(res.data.office[0].authorizedpersonnel);
                     setAuthorizedPosition(res.data.office[0].position);
                              
                     setBudgetPosition('Provincial Budget Officer');
                 });
             }
             catch(e){
     
             }
 
             try{
                 await axiosClient.get(`/getobryear`).then(res =>{
                   
                     setObrYear(res.data.obryear[0].budgetyear);
                 });
             }catch(e){
 
             }
         }
         
 
         fetchData();
         
         var subtotal=0;
         items.map((item) =>{

             subtotal = subtotal + parseFloat(item.name.amount);
             setTotal(subtotal);
         })
     },[]);

    const handleCreateOBR = ()=>{
    
       
     
        const obr = {
            'payee' : payee,
            'officeid' : officeid,
            'particulars':particulars,
            'address': address,
            'obryear': obryear,
            'signatory1': authorizedpersonnel,
            'position1' : authorizedposition,
            'signatory2' : budgetauthorized,
            'position2' : budgetPosition,
            'obrdetails': items
            
        };
      
     
       
        axiosClient.post(`/obligationrequest`,obr).then(res=>{
            
                const obr_id = res.data.obr_id;

                if(obr_id>0){
                    alert('Obligation Request have been created');
                    setShowSave(false);
                    setShowPrint(true);
                    // window.localStorage.setItem('obrid',obrid);
                    // window.localStorage.setItem('usertype','USR');
                    //setDetails([]);
                    // setTotal(0);
                    // navigate('/obrprintpreview');
                    
                    // navigate('/obrpreviewonly',{state:{obrid:obrid}});
                }
                
          
        }).catch(function(error){ 
            if(error.response){
                if(error.response.status===422){
                } else if(error.response.status===419){
                }else if(error.response.status===500){
                }
            }
        });

        
    }


   

    const handleBack = ()=>{
        navigate('/obrcreate',{state:{items,payee,particulars}});
    }
    
    const handleClose = ()=>{

        navigate('/obrcreate');
    }
    

    
   

  
   
  return (
    
    <div className='mt-8  mb-8'>
        
       <div ref={componentRef} className='overflow-hidden  text-xl w-[1200px] m-auto mb-8'>
            
            <div className='w-[1024px] p-2 m-auto text-center mt-16 text-lg  flex bg-white h-[140px] border border-black'>
                <div className='w-[300px] relative'><img src={pgnslogo} width="115px" height="115px" 
                alt="pgnslogo" className='absolute right-0' /></div>
                <div className='w-[600px] text-center'>
                    <p className='font-bold p-0 m-0'>Republic of the Philippines</p>
                    <p className='font-bold text-3xl p-0 m-0'>PROVINCE OF NORTHERN SAMAR</p>
                    <p className='font-bold p-0 m-0'>Catarman, Northern Samar</p>
                </div>
                <div  className='w-[300px] relative'><img src={pbologo} width="125px" height="125px" 
                alt="" className='absolute left-0 top-0'/></div>
            </div>

            <div className='w-[1024px] text-center p-0 bg-slate-300 m-auto border border-black'>
                <h4>OBLIGATION REQUEST</h4>
            </div>
            <div className='h-auto '>
                
                <div className='flex items-center w-[1024px] m-auto'>
                    <div className='w-[15%] h-10 items-center border py-0 px-2'>
                        <p>Payee</p>
                    </div>

                    <div className='w-[85%] h-10 border p-0  px-2'>
                        <p >{payee}</p>
                    </div>
                </div>

                <div className='flex w-[1024px] m-auto'>
                    <div className='w-[15%] h-10 items-center border py-0 px-2'>
                        <p>Office</p>
                    </div>
                    <div className='w-[85%] h-10 border py-0 px-2'>
                        <p>{officeDesc}</p>
                    </div>
                </div>
                <div className='flex w-[1024px] m-auto'>
                    <div className='w-[15%] h-10 items-center border py-0 px-2'>
                        <p>Address</p>
                    </div>
                    <div className='w-[85%] h-10 border py-0 px-2'>
                        <p>{address}</p>
                    </div>
                </div>

                <div className='flex w-[1024px] m-auto'>
                    <div className='w-[15%] h-16 items-center border py-0 px-2'>
                        <p>Responsibility <br />Center</p>
                    </div>
                    <div className='w-[45%] h-16 border py-0 px-2'>
                        <p>Particulars</p>
                    </div>
                    <div className='w-[10%] h-16 border py-0 px-2'>
                        <p>F.P.P</p>
                    </div>
                    <div className='w-[15%] h-16 border py-0 px-2'>
                        <p>Account Code</p>
                    </div>
                    <div className='w-[15%] h-16 border py-0 px-2'>
                        <p>Amount</p>
                    </div>
                </div>

                <div className='flex w-[1024px] m-auto'>
                    <div className='w-[15%] h-96 items-center border py-0 px-2'>
                        <p>{responsibilityCenter}</p>
                    </div>
                    <div className='w-[45%] h-96  p-0 px-2'>
                        <p>{particulars}</p>
                    </div>
                    <div className='w-[10%] h-96 border py-0 px-2'>
                        <p>{officeCode}</p>
                    </div>
                    <div className='w-[15%] h-96 border py-0 px-2'>
                        {items.map((item,index)=>{
                            return(
                                <p className='p-0 m-0' key={index}>{item.name.accountcode.split(' ')[0]}</p>
                            );
                        })}
                        
                    </div>
                    <div className='w-[15%] h-96 border py-0 px-2'>
                        
                        {items.map((item,index)=>(
                            
                            <p className='p-0 m-0 text-right' key={index}> {Number(item.name.amount).toLocaleString()}</p>
                        
                        ))}
                    </div>
                </div>
                <div className='flex border w-[1024px] m-auto'>
                    <div className='w-[50%] h-12  py-0 px-2'></div>
                    
                    <div className='w-[35%] h-12  py-1 px-2'>
                        
                    </div>
                    <div className='w-[15%] h-12 border py-0 px-2'>
                        <p className='text-right text-xl'> {Number(total).toLocaleString()}</p>
                    </div>
                </div>
                <div className='flex w-[1024px] m-auto'>
                    <div className='w-[50%] h-32 border px-2'>
                        <p>A. Certified</p>
                        <input type="checkbox" />Charges to appropriation/Allotment, necessary, <br />
                        <input type="checkbox" />lawful and under my direct supervision
                    </div>
                    <div className='w-[50%] h-32 border px-2'>
                        <p>B. Certified</p>
                        <p className='text-center'>Existence of available appropriation</p>
                    </div>
                </div>
                <div className='flex w-[1024px] m-auto'>
                    <div className='w-[10%] h-10 border px-2'>
                        <p>Signature</p>
                    </div>
                    <div className='w-[40%] h-10 border px-2'>
                        
                    </div>
                    <div className='w-[10%] h-10 border px-2'>
                        <p>Signature</p>
                    </div>
                    <div className='w-[40%] h-10 border px-2'>
                        
                    </div>
                </div>

                <div className='flex w-[1024px] m-auto'>
                    <div className='w-[10%] h-20 border px-2'>
                        <p>Printed Name</p>
                    </div>
                    <div className='w-[40%] h-20 border px-2'>
                        <p className='text-center mt-8'>{authorizedpersonnel}</p>
                    </div>
                    <div className='w-[10%] h-20 border px-2'>
                        <p>Printed Name</p>
                    </div>
                    <div className='w-[40%] h-20 border px-2'>
                        <p className='text-center mt-8'>{budgetauthorized}</p>
                    </div>
                </div>


                <div className='flex w-[1024px] m-auto'>
                     
                     <div className='w-[50%] h-20 flex'>
                        <div className='w-[20%] h-20 border px-2'>
                            <p>Position</p>
                        </div>
                        
                        <div className='w-[80%] h-[50%] border px-2'>
                            <p className='text-center'>{authorizedposition}</p>
                            <p className='text-center text-sm'>Head, Requisitioning Office/Authorized Representative</p>
                        </div>
                        
                     </div>

                     <div className='w-[50%] h-20 border flex'>
                        <div className='w-[20%] h-20 border px-2'>
                            <p>Position</p>
                        </div>  
                        <div className='w-[80%] h-[50%] border px-2'>
                            <p className='text-center'>{budgetPosition}</p>
                            <p className='text-center text-sm'>Head, Budget Unit/Authorized Representative</p>
                        </div>
                        
                     </div>
                   
                </div>

                <div className='flex w-[1024px] m-auto'>
                    <div className='w-[10%] h-10 border px-2'>
                        <p>Date</p>
                    </div>
                    <div className='w-[40%] h-10 border px-2'>
                        
                    </div>
                    <div className='w-[10%] h-10 border px-2'>
                        <p>Date</p>
                    </div>
                    <div className='w-[40%] h-10 border px-2'>
                        
                    </div>
                </div>

                <div className='flex w-[1024px] m-auto'>
                    <div className='w-[50%]'>
                        <p className='w-fit'>PGNS-PBO-005-FM Rev.00</p>
                    </div>
                    <div className='w-[50%] items-end'>
                        <p className='text-right'>Effectivity Date: July 17, 2023</p>
                    </div>
                </div>

               
            </div>

            <div className='flex w-[1024px] m-auto  pb-4'>
                {/* {showSave?<IoIosSave  onClick={handleCreateOBR} className='absolute right-[22rem] top-20 text-3xl' />:<ImPrinter  onClick={handlePrint} className=' right-[22rem]  text-3xl' />}
                {showSave?<TiArrowBack  onClick={handleBack}className='absolute right-[19rem] top-20 text-3xl'  />:<IoMdCloseCircleOutline  onClick={handleClose}className='absolute right-[19rem] top-20 text-3xl'  />} */}
                
                    {showSave?<button  onClick={handleCreateOBR} className='btn btn-primary btn-sm mr-2' >Create</button>:<button  onClick={handlePrint} className='btn btn-primary btn-sm mr-2' >Print</button>}
                    {showSave?<button  onClick={handleBack}className='btn btn-warning btn-sm mr-2'>Back</button>:<button  onClick={handleClose}className='btn btn-primary btn-warning'>Close</button>}
            </div>
        </div>
       
        
         
    </div>
  )
}
