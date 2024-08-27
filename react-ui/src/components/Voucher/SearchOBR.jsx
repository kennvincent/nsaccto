import React, { useEffect,useState } from 'react'

const SearchOBR = ({visible,data,onClose,onSelect}) => {

    if(!visible) return null;

    const [obrData,setObrData] =useState([]);
    useEffect(() =>{
      setObrData(data);
    },[]);


   
    const obrlist = data.map((obr)=>{
        return(
            <tr key={obr.id} className='hover:bg-gray-100'>
                <td>{obr.id}</td>
                <td>{obr.payee}</td>
                <td>{obr.officename}</td>
                <td>{obr.totalamount}</td>
                <td><a href="#" onClick={(e)=>onSelect(obr.id)}>Select</a></td>
            </tr>
        )
        
    })

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center '>

    
    <div className='card w-auto m-auto absolute top-0'>
      <div className='card-header'>Search OBR <button onClick={onClose} className='absolute btn btn-primary btn-sm right-1'>Close</button></div>
      <div className='card-body mb-2'>
        <table className='m-auto'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th className='w-[400px]'>Payee</th>
                    <th>Office Name</th>
                    <th>Total Amount</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {obrlist}
            </tbody>
        </table>
        
      </div>
    </div>
    </div>
  )
}

export default SearchOBR

