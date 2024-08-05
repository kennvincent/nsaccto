import React, { useEffect, useState } from 'react'
import { useLocation, useParams,useNavigate } from 'react-router-dom'
import axiosClient from '../../axios-client';
import AddDeduction from './AddDeduction';
import EditDeduction from './EditDeduction';

const EditVoucher = () => {
    const location = useLocation();
    const [totalAmount,setTotalAmount] = useState();
    const [balance,setBalance] = useState();
    const [obrnumber,setObrNumber] = useState('');
    const [payee,setPayee] = useState('');
    const [explanation,setExplanation] = useState('');
    const [address,setAddress] = useState('');
    const [checknumber,setCheckNumber] = useState('');
    const [bank,setBank] = useState('');
    const [officeName,setOfficeName] = useState();
    const [signatory1,setSignatory1] = useState();
    const [signatory1Position,setSignatory1Position] = useState();
    const [signatory2,setSignatory2] = useState();
    const [signatory2Position,setSignatory2Position] = useState();
    const [signatory3,setSignatory3] = useState();
    const [signatory3Position,setSignatory3Position] = useState();
    const [deductions,setDeductions] = useState([]);

    const [showAddDeduction,setShowAddDeduction]=useState(false);
    const [showEditDeduction,setShowEditDeduction]=useState(false);

    const [editdeduction,setEditDeduction]=useState(0);
    const [editamount,setEditAmount]=useState(0);
    const [editindex,setEditIndex]=useState('');

    const { voucher_id } = useParams();
    const navigate = useNavigate();

    const [inputFields, setInputFields] = useState([
      { deduction: '' }
    ])






    // let obrid = location.state.obrid;

    useEffect(()=>{
      axiosClient.get(`/voucher/getobrvoucher/header/${voucher_id}`).then(res =>{
          setPayee(res.data.voucher[0].payee);
          setAddress(res.data.voucher[0].address);
          setExplanation(res.data.voucher[0].explanation);
          setBalance(Number(res.data.voucher[0].voucheramount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
      })

      axiosClient.get(`/voucher/getobrvoucher/deductions/${voucher_id}`).then(res =>{
        setDeductions(res.data.deductions);
        console.log(res.data.deductions);
      })

      // const fetchData = async()=>{
      //   try{
         
      //   }
      //   catch(e){

      //   }
      // }


      // const fetchDeductions = async()=>{
      //   try{
      //     await axiosClient.get(`/voucher/getobrvoucher/deductions/${voucher_id}`).then(res =>{
      //        console.log(res.data.deductions);
      //     })
      //   }
      //   catch(e){

      //   }
      // }

      setSignatory1('ATTY. MARY GRACE S. ROYO, CPA');
      setSignatory1Position('Provincial Accountant')
      setSignatory2('ALLAN G. VALENCIANO');
      setSignatory2Position('Provincial Treasurer')
      setSignatory3('EDWIN MARINO C. ONGCHUAN');
      setSignatory3Position('Governor')

      // fetchData();
    },[])

    const handleDeductionClick = ()=>{
      setShowAddDeduction(true);
    }

    const handleDeductionClose = ()=>{
      setShowAddDeduction(false);
    }

    const removeDeduction = (index)=>{


      let data = [...deductions];
      data.splice(index, 1)
      setDeductions(data)

    }

    const getArrayData =(deduction,amount)=>{
      const cleanedValue = amount.replace(/,/g, '');
      let newfield = { description: deduction, amount: cleanedValue }

      setDeductions([...deductions, newfield])
      setShowAddDeduction(false);

    }

    const getArrayEditData =(index,deduction,amount)=>{
      const cleanedValue = amount.replace(/,/g, '');
      let newfield = { description: deduction, amount: cleanedValue }
      setDeductions([...deductions, newfield])
      setShowEditDeduction(false);

    }

   const handlePayeeInput = (e)=>{
    e.preventDefault();
    setPayee(e.target.value)
   }

   const handleExplanationInput = (e)=>{
    setExplanation(e.target.value)
   }

   const handleAddressInput = (e)=>{
    setAddress(e.target.value);
   }

   const handleBalanceInput = (e)=>{
    // const value = e.target.value;
    // const regex = /^[0-9,]*$/;

    // if (regex.test(value)) {
    //   setBalance(value);
    //   // setError('');
    // } else {
    //   // setError('Please enter a valid numeric value with commas');
    // }

    setBalance(e.target.value)

   }


   const handleBankInput = (e)=>{
    setBank(e.target.value);
   }

   const handleCheckNumber = (e)=>{
    setCheckNumber(e.target.value);
   }



    var totalDeductionsAmmount=0;
    var grandTotal=0;

    const deductionsLists = deductions.map((deduct,index)=>{
      totalDeductionsAmmount += parseFloat(deduct.amount)
      grandTotal = balance - totalDeductionsAmmount
      return(
        <>

          <tr key={index} className='p-0 m-0 w-full'>
            <td className='p-0 m-0 text-sm w-80'>{deduct.description}</td>
            <td className='text-right text-lg p-0 m-0'>{deduct.amount>0?Number(deduct.amount).toLocaleString():''}</td>
            <td className='text-right text-rose-600 p-0 pl-2m-0 w-full'><button onClick={() => removeDeduction(index)}>Remove</button> | <button onClick={() => handleshowEditDeduction(index,deduct.description,deduct.amount)}>Edit</button></td>
          </tr>

        </>


      )
    })

    const updateDisbursementVoucher = ()=>{

      if(payee.trim().length==0){
        alert('Enter Payee name');
        return;
      }

      if(address.trim().length==0){
        alert('Enter Address');
        return;
      }
      if(explanation.trim().length==0){
        alert('Enter Explanation');
        return;
      }

      // if(bank.trim().length==0){
      //   alert('Enter Bank name');
      //   return;
      // }

      // if(deductions.length==0){
      //   alert('Add deduction(s)');
      //   return;
      // }

      const cleanedAmount = balance.replace(/,/g, '');

      const voucherData = {
        'obrnumber' : obrnumber,
        'payee' :payee,
        'explanation':explanation,
        'address' : address,
        'voucheramount':cleanedAmount,
        'checknumber':checknumber,
        'bank' : bank,
        'deductions' : deductions,
        'signatory1' :signatory1,
        'signatory1position':signatory1Position,
        'signatory2' : signatory2,
        'signatory2position' : signatory2Position,
        'signatory3' : signatory3,
        'signatory3position' : signatory3Position
      }

  
      axiosClient.put(`/voucher/update/${voucher_id}`,voucherData).then(res=>{
        if(res.data.voucher>0){
          const voucher_id = res.data.voucher;
          window.localStorage.setItem('voucher_id',voucher_id)
          // const obr ={'obrid': obrid}
          // axiosClient.put(`/voucher/obr/update`,obr).then(res=>{});
          alert('Voucher successfully created');
          navigate('/voucherprintpreview',{state:{voucherData:voucherData}});

        }
      })
    }

    const handleClose = ()=>{
      navigate('/acctobrview');
    }

   const [showEditAmount,setShowEditAmount] =useState(false);
   const handleAmountClose = ()=>{
    setShowEditAmount(false);
   }

   const [dataAmount,setDataAmount] = useState(0);
    const handleShowEditAmount=()=>{
      setShowEditAmount(true);
      setDataAmount(balance);
    }

    const handleUpdateAmount =()=>{
      setShowEditAmount(false);
    }

    const handleNewAmount = (data)=>{
      setBalance(data);
    }

    const handleEditClose = (deduction,amount)=>{
      setShowEditDeduction(false);
    }

    const handleshowEditDeduction= (index,deduction,amount)=>{
      setEditDeduction(deduction);
      setEditAmount(amount);
      setEditIndex(index);
      setShowEditDeduction(true);

    }

  return (
    <div className='w-[full] h-[800px] overflow-scroll'>
      <div className='w-[1024px] border border-black  m-auto bg-white'>
        <div className='text-center p-1 '>
          <p className='p-0 m-0'>Republic of the Philippines</p>
          <p className='p-0 m-0'>PROVINCE OF NORTHERN SAMAR</p>
          <p className='p-0 m-0'>Catarman, Northern Samar</p>
        </div>

        <div className='flex text-xl p-0 h-10'>
          <div className='border-r border-t border-black w-[850px]'><p className='text-center mt-1'>DISBURSEMENT VOUCHER</p></div>
          <div className='border-t border-black w-[274px]'><p>No. {obrnumber}</p></div>
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
            <p className='p-0 mt-2 '><input type="text" value={payee} onChange={handlePayeeInput} name="payee" id="payee" className='w-full' /></p>
          </div>
          <div className='flex p-1  w-[284px]'>
            <p className='p-0 mt-2 '>TIN/Employee No:</p>
            <p className='p-0 px-2 mt-2 '></p>
          </div>
        </div>

        <div className='border-t border-black flex h-14'>
          <div className='p-1 border-r border-black w-[110px]'>
            <p className='p-0 mt-2 '>Address</p>
          </div>
          <div className='p-0 px-1 border-r border-black w-[630px]'>
            <p className='p-0 mt-2 '><p className='p-0 mt-2 '><input type="text" value={address} onChange={handleAddressInput} name="address" id="address" className='w-full' /></p></p>
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
            <textarea value={explanation} onChange={handleExplanationInput} cols="30" rows="10" className='w-full border-0'></textarea>
          </div>
          <div className='p-1  w-[284px] text-right'>

            <input type="text" className='text-right w-full' onChange={handleBalanceInput} value={balance}/>

            {/* <p className='p-0 mt-2 font-sans font-bold text-lg'>{Number(balance).toLocaleString()}</p> */}
          </div>
        </div>

        {/* Deductions */}
        <div className='flex h-[250px]'>

          <div className='p-0 border-r border-black w-[739px] font-sans '>
            <div className='flex h-[220px]  w-[740px] '>
              <div className='w-[370px] h-[220px] text-right after:block'><p>{totalDeductionsAmmount>0?'Less:':''}</p></div>
              <div className='w-[369px] h-[220px] text-4xl px-3'>
                <table className='w-[200px]'>
                  <thead>
                    {/* <tr>
                      <th className='p-0 w-full'>Description</th>
                      <th className='p-0'>Amount</th>
                      <th className='p-0 w-full'>action</th>
                    </tr> */}
                  </thead>
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
            <div className='h-[50px]  w-[740px] text-center'>
              <button onClick={handleDeductionClick} className='btn btn-primary btn-sm'>Add deduction</button>
            </div>
          </div>

          <div className='p-1  w-[284px] text-right font-sans text-lg'>
            <div>
              <p>{totalDeductionsAmmount>0? Number(totalDeductionsAmmount).toLocaleString():''}</p>
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


        <div className='flex w-full h-14 border-t border-black'>
          <div className='flex w-[511px] h-14 border-r border-black'>
            <div className='w-[110px] h-14 border-r border-black px-1'>
              <p>Signature</p>
            </div>
            <div className='w-[402px] h-14'>

            </div>
          </div>

          <div className='flex w-[512px] h-14'>
            <div className='w-[110px] h-14 border-r border-black px-1 relative'>
              <p>Check No</p>
              <input type="text" onChange={handleCheckNumber}  className='w-[100px] absolute h-7 bottom-1'/>
            </div>

            <div className='flex w-[300px] h-14 border-r border-black px-1'>
              <div className='w-[110px]'><p>Bank Name</p></div>
              <div className='w-[190px] h-14 relative'>
                <input type="text" onChange={handleBankInput} name="bankname" id="bankname"  className='w-[190px] absolute right-1 bottom-1 h-7 mt-2' />
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

      <div className='w-[1024px] h-10  m-auto mt-2 text-right'>
        {/* <button onClick={(e)=>createDisbursementVoucher(2)} className='btn btn-primary ml-2'>Full Amount Voucher</button> */}

        <button onClick={(e)=>updateDisbursementVoucher()} className='btn btn-primary ml-2'>Update Voucher</button>
        <button onClick={handleClose} className='btn btn-primary w-[120px] ml-2'>Close</button>
      </div>
      <AddDeduction visible={showAddDeduction} onClose={handleDeductionClose} passArrayData={getArrayData}/>
      <EditDeduction visibleedit={showEditDeduction} onCloseEdit={handleEditClose} editdeduction={editdeduction} index={editindex} editamount={editamount} passArrayEditData={getArrayEditData}/>
    </div>

  )
}

export default EditVoucher