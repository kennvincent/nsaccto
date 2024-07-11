import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';
import BudgetAugmentationShow from './BudgetAugmentationShow';

const BudgetAugmentationList = () => {

    const currentYear = new Date().getFullYear();
    const years=[];
    const [selectedYear,setSelectedYear] = useState(currentYear);

    const [selectedOffice,setSelectedOffice] = useState('');

    for(let yr=currentYear;yr>=2023;yr--){
        years.push(yr);
    }
    
    const yearsList = years.map((yr,index)=>{
        return(
            <option key={index}>{yr}</option>
        );
        
    });

    const [offices,setOffices] = useState([]);
    useEffect(()=>{
        axiosClient.get(`/offices`).then(res=>{
            setOffices(res.data.offices);
            
        });
    },[]);

    const officesList = offices.map((office)=>{
        return(
            <option value={office.officename} key={office.id}>{office.officename}</option>
        );
    });


    const handleChangeYear = (e)=>{
        setSelectedYear(e)
    }

    const handleChangeOffice = (e)=>{
        setSelectedOffice(e);
    }

    const [augmentationList,setAugmentationList]=useState([]);
    const handleDisplayAll = ()=>{
      axiosClient.get(`/budgetaugmentation/list/${selectedYear}`).then(res=>{
        setAugmentationList(res.data.augmentation);
      });
    }

    const handleDisplayByOffice = ()=>{
        if(selectedOffice ==''){
            alert('Select Office');
            return;

        }
        axiosClient.get(`/budgetaugmentation/list/${selectedYear}/${selectedOffice}`).then(res=>{
          setAugmentationList(res.data.augmentation);
        });
      }

    const [showAugmentation,setShowAugmention] =useState(false);

    const handleEditClick =(id)=>{
        
    }

    const [selectedAugmentation,setSelectedAugmention]=useState([]);
    const handleShowClick =(id)=>{
        axiosClient.get(`/budgetaugmentation/show/${id}`).then(res=>{
            setSelectedAugmention(res.data.augmentation);
        });

       

        setShowAugmention(true);
    }

    
    const handleCloseShow=()=>{
        setShowAugmention(false);
    }
    

    const displayAugmentationList = augmentationList.map((data)=>{
        return (
            <tr key={data.id}>
                <td className='p-1 border border-gray-300 w-[400px]'>{data.lgu}</td>
                <td className='p-1 border border-gray-300 w-[100px]'>{data.officename}</td>
                <td className='p-1 border border-gray-300 w-[150px]'>{data.ordinanceno}</td>
                <td className='p-1 border border-gray-300 w-[100px]'>{data.dated}</td>
                <td className='p-1 border border-gray-300 w-[100px]'>{data.augmentationno}</td>
                <td className='p-1 border border-gray-300 w-[100px] text-right'>{Number(data.totalamount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            }</td>
                <td className='p-1 border border-gray-300 w-[100px] text-right'>
                    <a href="#" className='p-0' onClick={()=>handleEditClick(data.id)}>Edit</a>&nbsp;|&nbsp; 
                    <a href="#" className='p-0' onClick={()=>handleShowClick(data.id)}>Show</a>
                </td>
            </tr>
        );
    });

    const [selectedOption, setSelectedOption] = useState('all');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        if(event.target.value=="all"){
            axiosClient.get(`/budgetaugmentation/list/${selectedYear}`).then(res=>{
                setAugmentationList(res.data.augmentation);
              });
        }else{
            setAugmentationList([]);
        }
        
        setSelectedOffice('');
      };

  return (
    
    <div className='card w-[80rem] m-auto'>
        <div className='card-header'><h6>BudgetAugmentationList</h6></div>
        <div className='body p-3'>
            <div className='mb-2'>
                <input type="radio" name="displayoption" id="all" value={"all"} checked={selectedOption === 'all'} onChange={handleOptionChange}/>By Year
                <input type="radio" name="displayoption"  id="byoffice" value={"byoffice"} checked={selectedOption === 'byoffice'} onChange={handleOptionChange} className='ml-10'/>By Year/Office
            </div>
         
               {/* All */}
            {selectedOption==='all' && (
                <div>
                <select onChange={(e)=>handleChangeYear(e.target.value)} className='p-0 px-1 h-8 w-20 mr-1'>
                    {yearsList}
                </select>

                {/* <select onChange={(e)=>handleChangeOffice(e.target.value)} className='p-0 px-1 h-8 w-[250px] mr-1'>
                    {officesList}
                </select> */}

                <button onClick={handleDisplayAll} className='btn btn-primary btn-sm h-8 absolute'>Display</button>
            </div>
            )}
            

            {/* Year/Office */}
            {selectedOption === 'byoffice' && (
                 <div>
                 <select onChange={(e)=>handleChangeYear(e.target.value)} className='p-0 px-1 h-8 w-20 mr-1'>
                     {yearsList}
                 </select>
 
                 <select onChange={(e)=>handleChangeOffice(e.target.value)} className='p-0 px-1 h-8 w-[250px] mr-1'>
                    <option value={''}>Select Office</option>
                     {officesList}
                 </select>
 
                 <button onClick={handleDisplayByOffice} className='btn btn-primary btn-sm h-8 absolute'>Display</button>
             </div>
            )}
           
           {augmentationList.length>0 &&(
            <div className='mt-4'>
                <table className='table border-collapse border border-gray-300'>
                    {displayAugmentationList}
                </table>
            </div>
           )}
        
           {augmentationList.length==0 && (
                <h6 className='mt-4'>No record to display</h6>
           )}

        </div>
        <BudgetAugmentationShow visible={showAugmentation} onClose={handleCloseShow} data={selectedAugmentation} />
    </div>
  )
}

export default BudgetAugmentationList