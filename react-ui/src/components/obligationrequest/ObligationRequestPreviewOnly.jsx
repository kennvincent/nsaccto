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
import {v4 as uuid} from 'uuid';
import pgnslogo from '../../images/pgns.png'
import pbologo from '../../images/pbologo.png';

const ObligationRequestPreviewOnly = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const win = window.sessionStorage;

    const [payee,setPayee] = useState();
    const [officename,setOfficeName]=useState();
    const [officeDesc,setOfficeDesc] = useState();
    const [address,setAddress]= useState();
    const [officeCode,setOfficeCode] = useState();
    const [responsibilityCenter,setResponsibilityCenter] = useState();
    const [showPrint,setShowPrint]=useState(false);
    const [showClose,setShowClose]=useState(false);
    const [particulars,setParticulars]= useState();
    const [items,setItems]=useState([]);
    const [details,setDetails] = useState([]);
    const [signatory1,setSignatory1] = useState();
    const [position1,setPosition1] = useState();
    const [signatory2,setSignatory2] = useState();
    const [position2,setPosition2] = useState();

    const [total,setTotal] = useState(0);
    const [userType,setUserType]=useState();

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });



    const handleClose  = ()=>{
        if(userType=="USR"){
            navigate('/obrlist');
        }else if(userType=="APRV"){
            navigate('/obrofficeforapproval');
        }else if(userType=="BDGT"){
            navigate('/obrlistbudget');
        }
    }

    useEffect(()=>{

        
        var obrid = location.state.obrid;
      
        setUserType(win.getItem('usertype'));
        console.log(obrid);
   

         axiosClient.get(`/obligationrequest/printpreview/${obrid}`).then(res=>{
        
             setPayee(res.data.obr[0].payee);
             setOfficeDesc(res.data.obr[0].officedesc);
             setAddress(res.data.obr[0].address);
             setOfficeName(res.data.obr[0].officename);
             setResponsibilityCenter(res.data.obr[0].officename);
             setParticulars(res.data.obr[0].particulars);
             setOfficeCode(res.data.obr[0].officecode);
             setDetails(res.data.obr);
             setSignatory1(res.data.obr[0].signatory1);
             setPosition1(res.data.obr[0].position1);
             setSignatory2(res.data.obr[0].signatory2);
             setPosition2(res.data.obr[0].position2);
             setTotal(res.data.obr[0].totalamount)

         })
        //  computetotal();

     },[]);

     const displayAccountCodes = ()=> {
        details.map((detail,index) => {
            return(
                <p key={uuid()}>{detail.accountcode}</p>
            )
        })
     }


    //  const computetotal = ()=>{
    //     var subtotal=0;
    //     details.map((detail) =>{

    //         subtotal = parseFloat(subtotal) + parseFloat(detail.amount);
    //         setTotal(subtotal);

    //     })
    //  }
  return (
    <div className='bg-white mt-8'>

       <div ref={componentRef} className='overflow-hidden  text-xl w-[1200px] m-auto'>

            <div className='w-[1024px] p-2 m-auto  text-center mt-14 text-lg  flex bg-white h-[140px] border border-black'>
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
            <div className='h-auto'>

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
                        {/* Account Codes here */}
                        {details.map((detail,index) => {
                            return(
                                <p className='p-0 m-0 text-right' key={uuid()}>{detail.accountcode}</p>
                            )
                        })}
                    </div>
                    <div className='w-[15%] h-96 border py-0 px-2'>

                        {details.map((detail,index)=>(

                            <p className='p-0 m-0 text-right' key={uuid()}> {Number(detail.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>

                        ))}
                    </div>
                </div>
                <div className='flex border w-[1024px] m-auto'>
                    <div className='w-[50%] h-12  py-0 px-2'></div>

                    <div className='w-[35%] h-12  py-1 px-2'>

                    </div>
                    <div className='w-[15%] h-12 border py-0 px-2'>
                        {/* <p className='text-right text-xl'> {Number(total).toLocaleString()}</p> */}
                        <p className='text-right text-xl'> {Number(total).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>

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
                    <div className='w-[40%] h-20 border px-2 text-center'>
                           <p className='mt-8'> {signatory1}</p>
                    </div>
                    <div className='w-[10%] h-20 border px-2'>
                        <p>Printed Name</p>
                    </div>
                    <div className='w-[40%] h-20 border px-2 text-center'>
                        <p className='mt-8'>{signatory2}</p>
                    </div>
                </div>


                <div className='flex w-[1024px] m-auto'>

                     <div className='w-[50%] h-20 flex'>
                        <div className='w-[20%] h-20 border px-2'>
                            <p>Position</p>
                        </div>

                        <div className='w-[80%] h-[50%] border px-2 text-center'>
                            <p>{position1}</p>
                        </div>
                     </div>

                     <div className='w-[50%] h-20 border flex'>
                        <div className='w-[20%] h-20 border px-2'>
                            <p>Position</p>
                        </div>
                        <div className='w-[80%] h-[50%] border px-2 text-center'>
                            <p>{position2}</p>
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
        </div>

        <div className='flex w-[1024px] m-auto  pb-4'>
            {userType=="USR"?<button  onClick={handlePrint} className='btn btn-primary btn-sm mr-2' >Print</button>:""}
            <button  onClick={handleClose}className='btn btn-primary btn-warning'>Close</button>
        </div>
        
        


    </div>
  )
}

export default ObligationRequestPreviewOnly
