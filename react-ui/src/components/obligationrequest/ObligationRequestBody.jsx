import React from 'react'

const ObligationRequestBody = () => {
  return (
    <>
         <div className='text-center bg-white mt-16 text-lg'>
                <p className='font-bold p-0 m-0'>Republic of the Philippines</p>
                <p className='font-bold text-lg p-0 m-0'>PROVINCE OF NORTHERN SAMAR</p>
                <p className='font-bold p-0 m-0'>Republic of the Philippines</p>
            </div>
            <div className='h-[1500px]'>
                <div className='text-center p-0'>
                    <h4>OBLIGATION REQUEST</h4>
                </div>
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
                        
                    </div>
                    <div className='w-[10%] h-20 border px-2'>
                        <p>Printed Name</p>
                    </div>
                    <div className='w-[40%] h-20 border px-2'>
                        
                    </div>
                </div>


                <div className='flex w-[1024px] m-auto'>
                     
                     <div className='w-[50%] h-20 flex'>
                        <div className='w-[20%] h-20 border px-2'>
                            <p>Position</p>
                        </div>
                        
                        <div className='w-[80%] h-[50%] border px-2'>

                        </div>
                     </div>

                     <div className='w-[50%] h-20 border'>
                        <div className='w-[20%] h-20 border px-2'>
                            <p>Position</p>
                        </div>
                        <div className='w-[80%] h-[50%] border px-2'>
                            
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
    </>
  )
}

export default ObligationRequestBody
