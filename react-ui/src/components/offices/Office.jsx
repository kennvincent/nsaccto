import { useEffect, useReducer, useState } from 'react'
import axios from 'axios';
import AddNewOffice from './AddNewOffice';
import EditOffice from './EditOffice';

import { useNavigate,Link } from 'react-router-dom';

export default function Office() {
  
  const [offices,setOffices] = useState([]);
  const [office,setOffice] = useState({});
  const [showAddOffice,setShowAddOffice] = useState(false);
  const [showEditOffice,setShowEditOffice]= useState(false);
  const [reducer,setReducer] = useReducer(x => x + 1,0);
  const navigate = useNavigate();

  const handleAddNewOffice = ()=>{
    setShowAddOffice(true);
  }

  const handleCloseAddNewOffice = ()=>{
    setShowAddOffice(false);
    setReducer();
  }
  


  const handleShowEditOffice = (id,officecode,officename,officedesc)=>{
    setShowEditOffice(true);

     const data = {'id':id,'officecode':officecode,'officename':officename,'officedesc':officedesc};
     setOffice(data);
  }


  const handleCloseEditOffice = ()=>{
    setShowEditOffice(false);
    setReducer();
  }

  const handleShowBudget = (id,ofc)=>{
    navigate("/officebudget",{state:{id:id,office:ofc}});
  }
  
  useEffect(()=>{

    axios.get(`http://127.0.0.1:8000/api/offices`).then(res=>{
      setOffices(res.data.offices);
    });
  },[reducer]);

 
  var officeList = offices.map((ofc) => {
    return(
      <tr key={ofc.id} className='border border-indigo-600'>
        <td>{ofc.officecode}</td>
        <td>{ofc.officename}</td>
        <td>{ofc.officedesc}</td>
        <td className='px-0'><button onClick={() => handleShowEditOffice(ofc.id,ofc.officecode,ofc.officename,ofc.officedesc)} 
            className='btn btn-primary btn-sm w-16 p-0'>Edit</button></td>
        <td className='w-fixed p-0'><button onClick={()=>handleShowBudget(ofc.id,ofc.officedesc)}
            className='btn btn-primary btn-sm w-16 p-0' >Budget</button></td>
      </tr>
    )
    
  });
 

  return (
    <section>
      <div className="card w-full">
        <div className="card-header flex">
          <h5>List of Offices/Departments</h5>
          <span className='absolute right-5 mt-1'>
            <button className='btn btn-primary btn-sm' onClick={handleAddNewOffice}>Add New Office</button>
          </span>
        </div>
        <div className="card-body mt-0 p-0 overflow-scroll h-[50rem]">
          <table className="w-full text-gray-700 border-collapse border  border-slate-400">
            <thead className='sticky -top-1'>
              <tr>
                <th>Office Code</th>
                <th>Office Abbr</th>
                <th>Office Name</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {officeList}
            </tbody>
          </table>
        </div>
      </div>

      <AddNewOffice  onClose={handleCloseAddNewOffice}  visible={showAddOffice}/>
      <EditOffice onClose={handleCloseEditOffice} visible={showEditOffice}  data={office} />
    </section>


  )
}
