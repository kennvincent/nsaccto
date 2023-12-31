import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {IoBagHandle,IoBarChartSharp,IoFileTrayStackedSharp,IoAnalyticsSharp} from 'react-icons/io5'


export default function () {

    const [totalBudget1,setTotalBudget1] = useState();
    const [totalBudget2,setTotalBudget2] = useState();
    const [totalBudget3,setTotalBudget3] = useState();
    const [totalBudget4,setTotalBudget4] = useState();

    useEffect(()=>{
     
        axios.get(`http://127.0.0.1:8000/api/budgetalloted/${2020}`).then(res =>{
            setTotalBudget1(res.data.budget);
        });

        axios.get(`http://127.0.0.1:8000/api/budgetalloted/${2021}`).then(res =>{
            setTotalBudget2(res.data.budget);
        });

        axios.get(`http://127.0.0.1:8000/api/budgetalloted/${2022}`).then(res =>{
            setTotalBudget3(NUmber(res.data.budget).toLocaleString());
        });

        axios.get(`http://127.0.0.1:8000/api/budgetalloted/${2023}`).then(res =>{
            setTotalBudget4(Number(res.data.budget).toLocaleString());
        });

       
    },[]);

  return (
    <div className='flex gap-2 w-full'>
        <BoxWrapper>
            <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-500'>
                <IoBagHandle className='text-2xl text-white'/>
            </div>
            <div className='pl-4'>
                <span className='text-sm text-gray-500 font-light'>2020 Budget</span>
                <div className='flex items-center '>
                    <strong className='text-xl text-gray-700 font-semibold'>Php {totalBudget1}</strong>
                    {/* <span className='text-sm text-green-500 pl-2'>+300%</span> */}
                </div>
            </div>
        </BoxWrapper>
        <BoxWrapper>
            <div className='rounded-full h-12 w-12 flex items-center justify-center bg-orange-500'>
                    <IoBarChartSharp className='text-2xl text-white'/>
                </div>
                <div className='pl-4'>
                    <span className='text-sm text-gray-500 font-light'>2021 Budget</span>
                    <div className='flex items-center '>
                        <strong className='text-xl text-gray-700 font-semibold'>Php {totalBudget2}</strong>
                        {/* <span className='text-sm text-green-500 pl-2'>+300%</span> */}
                    </div>
            </div>
        </BoxWrapper>
        <BoxWrapper>
            <div className='rounded-full h-12 w-12 flex items-center justify-center bg-yellow-500'>
                    <IoFileTrayStackedSharp className='text-2xl text-white'/>
                </div>
                <div className='pl-4'>
                    <span className='text-sm text-gray-500 font-light'>2022 Budget</span>
                    <div className='flex items-center '>
                        <strong className='text-xl text-gray-700 font-semibold'>Php {totalBudget3}</strong>
                        {/* <span className='text-sm text-green-500 pl-2'>+300%</span> */}
                    </div>
            </div>
        </BoxWrapper>
        <BoxWrapper>
            <div className='rounded-full h-12 w-12 flex items-center justify-center bg-green-500'>
                    <IoAnalyticsSharp className='text-2xl text-white'/>
                </div>
                <div className='pl-4'>
                    <span className='text-sm text-gray-500 font-light'>2023 Budget</span>
                    <div className='flex items-center '>
                        <strong className='text-xl text-gray-700 font-semibold'>Php {totalBudget4}</strong>
                        {/* <span className='text-sm text-green-500 pl-2'>+300%</span> */}
                    </div>
            </div>
        </BoxWrapper>
    </div>
  )
}


function BoxWrapper({children}){
    return (<div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>);
  }