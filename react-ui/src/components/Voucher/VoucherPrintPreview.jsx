
import React, { useEffect, useState,useRef } from 'react'
import axiosClient from '../../axios-client';
import AddDeduction from './AddDeduction';
import { useNavigate,useLocation } from 'react-router-dom';
import {useReactToPrint} from 'react-to-print'
import { ImPrinter } from "react-icons/im";
import { IoMdCloseCircleOutline,IoIosSave  } from "react-icons/io";


export default function VoucherPrintPreview() {

    const [totalAmount,setTotalAmount] = useState();
    const [obrnumber,setObrNumber] = useState();
    const [payee,setPayee] = useState();
    const [explanation,setExplanation] = useState();
    const [address,setAddress] = useState();
    const [bank,setBank] = useState();
    const [officeName,setOfficeName] = useState();
    const [signatory1,setSignatory1] = useState();
    const [signatory1Position,setSignatory1Position] = useState();
    const [signatory2,setSignatory2] = useState();
    const [signatory2Position,setSignatory2Position] = useState();
    const [signatory3,setSignatory3] = useState();
    const [signatory3Position,setSignatory3Position] = useState();
    const navigate = useNavigate();
    const [deductions,setDeductions] = useState([]);
    const [voucherid,setVoucherId] =useState();
    const [voucher,setVoucher] = useState([]);
    const location = useLocation();

    let voucher_id = location.state.voucher_id;

    useEffect(()=>{
        setSignatory1('ATTY. MARY GRACE S. ROYO, CPA');
        setSignatory1Position('Provincial Accountant')
        setSignatory2('ALLAN G. VALENCIANO');
        setSignatory2Position('Provincial Treasurer')
        setSignatory3('EDWIN MARINO C. ONGCHUAN');
        setSignatory3Position('Governor')
        let voucher_id = window.localStorage.getItem('voucher_id');

        
        axiosClient.get(`voucher/${voucher_id}`).then(res=>{
          setVoucher(res.data.voucher);
          setPayee(res.data.voucher[0].payee);
          setAddress(res.data.voucher[0].address);
          setBank(res.data.voucher[0].bank);
          setExplanation(res.data.voucher[0].explanation);
          setTotalAmount(res.data.voucher[0].obramount)
          console.log(totalAmount);

        });


    },[])
    
    


    var totalDeductionsAmmount=0;
    var grandTotal=0;

    const deductionsLists = voucher.map((deduct,index)=>{
        totalDeductionsAmmount += parseFloat(deduct.amount)
        grandTotal = totalAmount - totalDeductionsAmmount
        return(
          <>
            
            <tr key={index} className='p-0 m-0'>
              <td className='p-0 m-0 text-lg'>{deduct.description}</td>
              <td className='text-right text-lg p-0 m-0'>{deduct.amount>0?Number(deduct.amount).toLocaleString():''}</td>
            </tr>
           
          </>
          
         
        )
      })
    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleClose = ()=> {
      navigate('/acctobrview');
    }

  return (
    <div  className='w-[full] h-auto pt-10 mt-16 '>
      <div ref={componentRef} className='font-serif w-[1024px] border border-black  m-auto mt-16  bg-white'>
        <div className='text-center p-1 mt-16 '>
          <p className='p-0 m-0'>Republic of the Philippines</p>
          <p className='p-0 m-0'>PROVINCE OF NORTHERN SAMAR</p>
          <p className='p-0 m-0'>Catarman, Northern Samar</p>
        </div>

        <div className='flex text-xl p-0 h-10'>
          <div className='border-r border-t border-black w-[850px]'><p className='text-center mt-1'>DISBURSEMENT VOUCHER</p></div>
          <div className='border-t border-black w-[274px]'><p>No.</p></div>
        </div>

        <div className='border-t border-black flex h-14'>
          <div className='p-1 border-r border-black w-[110px]'>
            <p className='p-0 m-0'>Mode of</p>
            <p className='p-0 m-0'>Payment</p>
          </div>
          <div className='w-[914px] text-center'>
            &nbsp;&nbsp;<p>_____ Check &nbsp;&nbsp;&nbsp; _____ Cash &nbsp;&nbsp;&nbsp; _______________ Others</p>
          </div>
        </div>
      
        <div className='border-t border-black flex h-14'>
          <div className='p-1 border-r border-black w-[110px]'>
            <p className='p-0 mt-2 '>Payee</p>
          </div>
          <div className='p-0 px-1 border-r border-black w-[630px]'>
            <p className='p-0 mt-2 '>{payee}</p>
          </div>
          <div className='p-1  w-[284px]'>
            <p className='p-0 mt-2 '>Oblication Request No</p>
          </div>
        </div>

        <div className='border-t border-black flex h-14'>
          <div className='p-1 border-r border-black w-[110px]'>
            <p className='p-0 mt-2 '>Address</p>
          </div>
          <div className='p-0 px-1 border-r border-black w-[630px]'>
            <p className='p-0 mt-2 '>{address}</p>
          </div>
          <div className='flex p-1 w-[284px]'>
            <p className='p-0 mt-2'>Responsibility Center</p>
            <p className='px-2 mt-2 font-bold'>{officeName}</p>
          </div>
        </div>

        <div className='border-t border-black flex h-10 text-center'>
          <div className='p-0 px-1 border-r border-black w-[740px] font-sans font-bold text-2xl'>
            <p className='p-0 mt-0 '>EXPLANATION</p>
          </div>
          <div className='p-1  w-[284px]'>
            <p className='p-0 mt-2 '>Amount</p>
          </div>
        </div>

        

        <div className='border-t border-black flex h-[250px]'>
          <div className='p-0  border-r border-black w-[740px] font-sans '>
            <p>{explanation}</p>
          </div>
          <div className='p-1  w-[284px] text-right'>
            <p className='p-0 mt-2 font-sans font-bold text-lg'>{Number(totalAmount).toLocaleString()}</p>
          </div>
        </div>

        {/* Deductions */}
        <div className='flex h-[250px]'>

          <div className='p-0 border-r border-black w-[739px] font-sans '>
            <div className='flex h-[220px]  w-[740px] '>
              <div className='w-[370px] h-[220px] text-right after:block'><p>{totalDeductionsAmmount>0?'Less:':''}</p></div>
              <div className='w-[369px] h-[220px] text-4xl px-3'>
                <table className='w-[200px]'>
                  <tbody>
                    {deductionsLists}
                    
                    <tr>
                      <td className='p-0 m-0 text-lg'>{totalDeductionsAmmount>0?'Total:':''}</td>
                      <td className='text-right text-lg p-0 m-0'>{totalDeductionsAmmount>0?Number(totalDeductionsAmmount).toLocaleString():''}</td>
                    </tr>
                  </tbody>
                </table>
                
              </div>
            </div>
            
          </div>

          <div className='p-1  w-[284px] text-right font-sans text-lg'>
            <div>
              <p>{totalDeductionsAmmount>0?'-' + Number(totalDeductionsAmmount).toLocaleString():''}</p>
            </div>
            <div>
              <p>{grandTotal>0?Number(grandTotal).toLocaleString():''}</p>
            </div>
          </div>
        </div>

        <div className='flex border-top  border-black h-18'>
          <div className='w-[512px] border-r border-black' >
            <div className='w-full h-6 flex'>
              <div className='w-6 px-1 border-r border-b border-black'>A.</div>
              <div className='px-1'><p>Certified</p></div>
            </div>
            <div className='px-4'>
              <p className='p-0 m-0'>____ Allotment obligated for the purpose as indicated below</p>
              <p className='p-0 m-0'>____ Supporting documents are complete</p>
            </div>
          </div>
          <div className='w-[512px]' >
            <div className='w-full h-6 flex'>
              <div className='w-6 px-1 border-r border-b border-black'>B.</div>
              <div className='px-1'><p>Certified</p></div>
            </div>
            <div className='text-center'>
              <p>Funds Available</p>
            </div>
          </div>
        </div>


        <div className='flex h-12 border-t border-black'>
          <div className='flex w-[511px] border-r border-black h-12'>
            <div className='w-[110px] h-12 border-r border-black px-1'>
              <p>Signature</p>
            </div>
            <div className='w-[402px] h-12 '></div>
           
          </div>
          
          <div className='flex w-[511px] h-12'>
            <div className='w-[110px] h-12 border-r border-black px-1'>
              <p>Signature</p>
            </div>
            <div className='w-[402px] h-12'></div>
         
          </div>
        </div>


        <div className='flex h-12 border-t border-black'>
          <div className='flex w-[511px] border-r border-black h-12'>
            <div className='w-[110px] h-12 border-r border-black px-1'>
              <p>Printed Name</p>
            </div>
            <div className='w-[300px] h-12 border-r border-black text-center py-3'>
              <p>{signatory1}</p>
            </div>
            <div className='w-[33px]'><p>Date</p></div>
          </div>
          
          <div className='flex w-[511px] h-12'>
            <div className='w-[110px] h-12 border-r border-black px-1'>
              <p>Printed Name</p>
            </div>
            <div className='w-[300px] h-12 border-r border-black text-center py-3'>
              <p>{signatory2}</p>
            </div>
            <div className='w-[93px]'><p>Date</p></div>
          </div>
        </div>


        <div className='flex w-full h-16 border-t border-black'>
          <div className='flex w-[511px] h-16 border-r  border-black'>
            <div className='w-[110px] h-16 border-r border-black px-1 py-3'>
              <p>Position</p>
            </div>

            <div className='w-[403px] h-16'>
              <div className='w-full h-8 border-b border-black text-center'>
                <p>{signatory1Position}</p>
              </div>
              <div className='w-full h-8 text-center'>
                <p>Head, Acctg. Dept./Authorize Representative</p>
              </div>
            </div>
          </div>


          <div className='flex w-[511px] h-16'>
            <div className='w-[110px] h-16 border-r border-black px-1 py-3'>
              <p>Position</p>
            </div>
            <div className='w-[403px] h-16'>
              <div className='w-full h-8 border-b border-black text-center'>
                <p>{signatory2Position}</p>
              </div>
              <div className='w-full h-8 text-center'>
                <p>Treasurer/Authorized Representative</p>
              </div>
            </div>
          </div>
        </div>


        <div className='flex w-full h-7 border-t border-black'>
          <div className='flex w-[512px] h-7 border-r border-black'>
            <div className='w-[28px] h-7 border-r border-black px-1'>
              <p>C.</p>
            </div>
            <div className='px-1'>
              <p>Approved for Payment</p>
            </div>
          </div>

          <div className='flex w-[512px] h-8'>
            <div className='w-[28px] h-7 border-r border-black px-1'>
                <p>D.</p>
            </div>
            <div className='px-1'>
                <p>Approved for Payment</p>
            </div>
          </div>
        </div>


        <div className='flex w-full h-7 border-t border-black'>
          <div className='flex w-[511px] h-7 border-r border-black'>
            <div className='w-[110px] h-7 border-r border-black px-1'>
              <p>Signature</p>
            </div>
            <div className='w-[402px] h-7'>

            </div>
          </div>

          <div className='flex w-[512px] h-7'>
            <div className='w-[110px] h-7 border-r border-black px-1'>
              <p>Check No</p>
            </div>
            <div className='flex w-[300px] h-7 border-r border-black px-1'>
              <div className='w-[90px]'><p>Bank Name:</p></div>
              <div className='w-[210px] h-7'>
                <p>{bank}</p>
              </div>

            </div>
            <div className='w-[93px] h-7'><p>Date</p></div>
          </div>
        </div>

        <div className='flex h-12 border-t border-black'>
          <div className='flex w-[511px] border-r border-black h-12'>
            <div className='w-[110px] h-12 border-r border-black px-1'>
              <p>Printed Name</p>
            </div>
            <div className='w-[300px] h-12 border-r border-black text-center py-3'>
              <p>{signatory3}</p>
            </div>
            <div className='w-[93px]'><p>Date</p></div>
          </div>
          
          <div className='flex w-[511px] h-12'>
            <div className='w-[109px] h-12 border-r border-black'>
              <div className='w-[109px] h-6 border-b border-black px-1'>
                <p>Signature</p>
              </div>
              <div className='w-[109px] h-6 border-b border-black px-1'>
                <p>Printed Name</p>
              </div>
            </div>

            <div className='w-[302px] h-12 border-r border-black'>
              <div className='w-full h-6 border-b border-black'></div>
              <div className='w-full h-6 border-b border-black'></div>
            </div>

            <div className='w-[93px]'><p></p></div>
          </div>
        </div>

        <div className='flex w-full h-14 border-t border-black '>
          <div className='flex w-[511px] h-14 border-r border-black'>
            <div className='w-[110px] h-14 border-r border-black px-1'>
              <p className='mt-4'>Position</p>
            </div>
            <div className='w-[402px] h-14'>
              <div className='w-full h-7 border-b border-black text-center'>
                <p>{signatory3Position}</p>
              </div>
              <div className='w-full h-7 border-b border-black text-center'>
                <p>Agency Head/Authorized Representative</p>
              </div>
            </div>
          </div>

          <div className='flex w-[512px] h-14 '>
            <div className='w-[171px]  h-14 border-r border-black'>
              <p>OR/Other Documents</p>
            </div>
            <div className='w-[171px]  h-14 border-r border-black'>
              <p>JEV No.</p>
            </div>
            <div className='w-[170px]  h-14 border-r border-black'>
              <p>Date</p>
            </div>
          </div>
        </div>
        
        
      </div>

      <ImPrinter  onClick={handlePrint} className='absolute right-[22rem] top-20 text-3xl' />
      <IoMdCloseCircleOutline  onClick={handleClose}className='absolute right-[19rem] top-20 text-3xl'  />
    </div>
  )
}
