import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axiosClient from '../../axios-client';
import ReactDatePicker from 'react-datepicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const ExportToExcel = () => {

    const currentyr = new Date().getFullYear();
    const endyr= 2023;
    const years=[];

    for (let yr=currentyr;yr>=endyr;yr--){
      years.push(yr);
    }

    const [selectedYear, setSelectedYear] = useState('');

    const handleChange = (event) => {
      setSelectedYear(event.target.value);
    };


 
    const exportToExcel = () => {

      if(selectedYear !=''){
        axiosClient.get(`/obrtoexcel/${selectedYear}`).then(res =>{
          if(res.data.obrlist.length>0){
            const worksheet = XLSX.utils.json_to_sheet(res.data.obrlist);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        
            // Buffer to store the generated Excel file
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
            const filename = "Obligation Request - " + selectedYear + ".xlsx";
            saveAs(blob, filename);
          }else{
            alert('No record found');
          }
        });

       
         
      }else{
        alert("Select Year");
      }

      
    };


    const [selectedOption, setSelectedOption] = useState('bydate');
    
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };

    const exportToExcelSelectedDate = ()=>{
      const formattedDate = selectedDate.toISOString().split('T')[0];
     
      axiosClient.get(`/obrtoexcel/bydate/${formattedDate}`).then(res =>{
        if(res.data.obrlist.length>0){
          const worksheet = XLSX.utils.json_to_sheet(res.data.obrlist);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      
          // Buffer to store the generated Excel file
          const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
          const filename = "Obligation Request - " + selectedDate.toLocaleDateString('en-US') + ".xlsx";
          saveAs(blob, filename);
        }else{
          alert('No record found');
        }
      });
    }

    const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div>
      <div className='card w-[50rem] m-auto'>
        <div className='card-header'>
          <h6>Export Obligation Request Details</h6>
        </div>
        <div className='card-body flex'>
         
          <div className='mb-2'>
                <input type="radio" name="displayoption" id="all" value={"bydate"} checked={selectedOption === 'bydate'} onChange={handleOptionChange}/>&nbsp;Date
                <input type="radio" name="displayoption"  id="byoffice" value={"byyear"} checked={selectedOption === 'byyear'} onChange={handleOptionChange} className='ml-10'/>&nbsp;Year
          
                {selectedOption==='bydate' && (<div className='mt-4 relative'>
                  <DatePicker className='w-[150px] h-8'
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="MM/dd/YYYY"
                    placeholderText="Select a date"
                  />
                  <div className='absolute top-0 left-[155px] w-[150px]'>
                    <button onClick={exportToExcelSelectedDate} className='btn btn-primary btn-sm ml-1  '>Export as Excel</button>
                  </div>
                  
                </div>)}


                {selectedOption==='byyear' && (
                  <div className='mt-4'>
                  <select onChange={handleChange} className='w-[150px] mr-2 h-8 p-0 px-1'>
                    <option value=''>Select Year</option>
                    {years.map((year,index) =>(
                      <option key={index} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>

                  <button onClick={exportToExcel} className='btn btn-primary btn-sm absolute'>Export as Excel</button>
                </div>
              )}

          </div>
         
         
         
         
         
          
      </div>
      </div>
  
      
    </div>
  )
}

export default ExportToExcel
