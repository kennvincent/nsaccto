import React, { useEffect } from 'react'
import { useState,useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddParticulars from './AddAccount';
import axiosClient from '../../axios-client';


export default function CreateObligationRequest() {

    const [officeid,setOfficeId] = useState();
    const [tempAccountCode,SetTempAccountCode] =useState();
    const [tempAmount,setTempAmount] = useState();
    const [officeDesc,setOfficeofficeDesc] = useState();
    const [address,setAddress] = useState();
    const [responsibilityCenter,setResponsibilityCenter] = useState();
    const [officeCode,setOfficeCode] = useState();
    const [authorizedPersonnel,setAuthorizedPersonnel] = useState();
    const [personnelPosition,setPersonnelPosition] = useState();
    const [showParticulars,setShowParticulars] = useState(false);
    const [particulars,setParticulars] = useState("");
    const [payee,setPayee] = useState("");
    const [total,setTotal]=useState([]);
    const [details,setDetails] =useState([]);
    const [office,setOffice] = useState([]);    
    const [obryear,setObrYear] = useState([]);
    const navigate = useNavigate();

    const handleShowAddParticulars = ()=>{
        setShowParticulars(true);
    }

    const handleHideAddParticulars = ()=>{
        setShowParticulars(false);
    }

    const handleAddParticulars = ()=>{
        setShowParticulars(false);
    }
1

    const handlePayeeInput = (e)=>{
        e.preventDefault();
        setPayee(e.target.value)
    }
 
    const handleParticularsInput = (e)=>{
        e.preventDefault();
        setParticulars(e.target.value)
    }


    const handleCreateOBR = ()=>{
    
       
        const obr = {
            'payee' : payee,
            'officeid' : officeid,
            'particulars':particulars,
            'obryear': obryear,
            'signatory1':'S1',
            'position1' : 'P1',
            'signatory2' : 'S2',
            'position2' : 'P2',
            'obrdetails': details
            
        };

        

        axiosClient.post(`/obligationrequest`,obr).then(res=>{
            
                const obr_id = res.data.obr_id;

                if(obr_id>0){
                    axiosClient.delete(`/tempobligationrequest/${officeid}`).then(res =>{
                    })
                
                    window.localStorage.setItem('obr_id',obr_id)
                    setDetails([]);
                    setTotal(0);
                    navigate('/obrprintpreview');
                    alert('Obligation Request have been created');
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

    const getArrayData =(particulars,amount)=>{

       let account = [2];
       account = particulars.split(' ');
   
        const temp_obr = {
            office_id:officeid,
            accountcode : account[0],
            amount:amount
          }

            axiosClient.post(`/tempobligationrequest`,temp_obr).then(res =>{
            
            axiosClient.get(`/tempobligationrequest/${officeid}`).then(res =>{
                setDetails(res.data.obr)
            });

            axiosClient.get(`/tempobligationrequest/sum/${officeid}`).then(res =>{
                ///var temptotal = res.data[0];
                setTotal(res.data[0].temptotal)
            });

            })
        .catch(function(error){ 
          
            if(error.response){
                if(error.response.status===422){
                    setInputErrorList(error.response.data.errors);
                } else if(error.response.status===419){
                  //setInputErrorList(error.response.data.errors);
                  console.log("ERROR " + error.response.status);
              }
            }
        });

      

        setShowParticulars(false);
    }
    
    

    const [user,setUser] = useState();
    useEffect(()=>  {
        setUser(window.localStorage.getItem('user'));
        const fetchData = async()=>{
            try{
                await axiosClient.get(`/login/${window.localStorage.getItem('user')}`).then(res =>{
                    setOfficeId(res.data.office[0].office_id);
                    setOfficeCode(res.data.office[0].officecode);
                    setOfficeofficeDesc(res.data.office[0].officedesc);
                    setAddress(res.data.office[0].officeaddress)
                    setResponsibilityCenter(res.data.office[0].officename);
                    setAuthorizedPersonnel(res.data.office[0].authorizedpersonnel);
                    setPersonnelPosition(res.data.office[0].position);

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
    },[]);

   
    
  return (
    <div className='card  overflow-hidden p-2'>
        <h5>Budget Year: {obryear}</h5>
        <div className='card-header text-center bg-white'>
            <p className='font-bold p-0 m-0'>Republic of the Philippines</p>
            <p className='font-bold text-lg p-0 m-0'>PROVINCE OF NORTHERN SAMAR</p>
            <p className='font-bold p-0 m-0'>Republic of the Philippines</p>
        </div>
        <div className='card-body h-[800px] overflow-scroll'>
            <div className='text-center p-0'>
                <h4>OBLIGATION REQUEST</h4>
            </div>
            <div className='flex'>
                <div className='w-[15rem] h-8 items-center border py-0 px-2'>
                    <p>Payee</p>
                </div>
                <div className='w-[85rem] h-8 border p-0'>
                   <input type="text" autocomplete="off" name="payee" id="payee"   className='w-full py-0 px-2' onChange={handlePayeeInput}/>
                </div>
            </div>
            <div className='flex'>
                <div className='w-[15rem] h-8 items-center border py-0 px-2'>
                    <p>Office</p>
                </div>
                <div className='w-[85rem] h-8 border py-0 px-2'>
                    
                    <p>{officeDesc}</p>
                </div>
            </div>
            <div className='flex'>
                <div className='w-[15rem] h-8 items-center border py-0 px-2'>
                    <p>Address</p>
                </div>
                <div className='w-[85rem] h-8 border py-0 px-2'>
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
                <div className='w-[15rem] h-96 items-center border py-0 px-2'>
                    <p>{responsibilityCenter}</p>
                </div>
                <div className='w-[50rem] h-96  p-0'>
                    <textarea name="" id="" cols="30" rows="10" className='w-full h-full' onChange={handleParticularsInput}></textarea>
                </div>
                <div className='w-[10rem] h-96 border py-0 px-2'>
                    <p>{officeCode}</p>
                </div>
                <div className='w-[10rem] h-96 border py-0 px-2'>
                    {details.map((obr,index)=>(
                        <p className='p-0 m-0' key={index}>{obr.accountcode}</p>
                    ))}
                </div>
                <div className='w-[15rem] h-96 border py-0 px-2'>

                    {details.map((obr,index)=>(
                        
                        <p className='p-0 m-0 text-right' key={index}> {Number(obr.amount).toLocaleString()}</p>
                       
                    ))}
                </div>
            </div>
            <div className='flex border'>
                <div className='w-[15rem] h-10  py-0 px-2'></div>
                <div className='w-[60rem] h-10  py-1 px-2'>
                    <button className='btn btn-primary btn-sm' onClick={handleShowAddParticulars}>Add Account</button>
                    <button className='btn btn-primary btn-sm ml-1' onClick={handleCreateOBR}>Create Obligation Request</button>
                </div>
                <div className='w-[10rem] h-10  py-1 px-2'>
                    
                </div>
                <div className='w-[15rem] h-10 border py-0 px-2'>
                    <p className='text-right'> {Number(total).toLocaleString()}</p>
                </div>
            </div>
            <div className='flex'>
                <div className='w-[50rem] h-30 border px-2'>
                    <p>A. Certified</p>
                    <input type="checkbox" />Charges to appropriation/Allotment, necessary, <br />
                    <input type="checkbox" />lawful and under my direct supervision
                </div>
                <div className='w-[50rem] h-30 border px-2'>
                    <p>B. Certified</p>
                    <p className='text-center'>Existence of available appropriation</p>
                </div>
            </div>
            <div className='flex'>
                <div className='w-[10rem] h-8 border px-2'>
                    <p>Signature</p>
                </div>
                <div className='w-[40rem] h-8 border px-2'>
                   
                </div>
                <div className='w-[10rem] h-8 border px-2'>
                    <p>Signature</p>
                </div>
                <div className='w-[40rem] h-8 border px-2'>
                   
                </div>
            </div>

        <div className='flex'>
                <div className='w-[10rem] h-20 border px-2'>
                    <p>Printed Name</p>
                </div>
                <div className='w-[40rem] h-20 border px-2'>
                    <p className='text-center mt-5 uppercase'>{authorizedPersonnel}</p>
                </div>
                <div className='w-[10rem] h-20 border px-2'>
                    <p>Printed Name</p>
                </div>
                <div className='w-[40rem] h-20 border px-2'>
                    
                </div>
            </div>


            <div className='flex'>
                <div className='w-[10rem] h-20 border px-2'>
                    <p>Position</p>
                </div>
                <div className='w-[40rem] h-20 border'>
                    <div className='w-[40rem] h-10 border px-2 text-center uppercase'>{personnelPosition}</div>
                    <div className='w-[40rem] h-10 border px-2'></div>
                </div>
                <div className='w-[10rem] h-20 border px-2'>
                    <p>Position</p>
                </div>
                <div className='w-[40rem] h-20 border'>
                <div className='w-[40rem] h-10 border px-2'></div>
                    <div className='w-[40rem] h-10 border px-2'></div>
                </div>
            </div>

            <div className='flex'>
                <div className='w-[10rem] h-8 border px-2'>
                    <p>Date</p>
                </div>
                <div className='w-[40rem] h-8 border px-2'>
                    
                </div>
                <div className='w-[10rem] h-8 border px-2'>
                    <p>Date</p>
                </div>
                <div className='w-[40rem] h-8 border px-2'>
                    
                </div>
            </div>
            <div className='flex'>
                <div className='w-[50rem]'>
                    <p className='w-fit'>PGNS-PBO-005-FM Rev.00</p>
                </div>
                <div className='w-[50rem] items-end'>
                    <p className='text-right'>Effectivity Date: July 17, 2023</p>
                </div>
            </div>
        </div>

        <AddParticulars visible={showParticulars} onClose={handleHideAddParticulars} 
        onAdd={handleAddParticulars} passArrayData={getArrayData}/>


     
    
    
    </div>
  )
}
