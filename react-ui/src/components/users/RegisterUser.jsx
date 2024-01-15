
import React, { useEffect } from 'react'
import { useState,useReducer } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function registeruser() {

    const [useraccount,setNewUserAccount] = useState([]);
    const [offices,setOffices] = useState([]);
    const [officeid,setOfficeId] = useState();
    const navigate = useNavigate();

    const handleInput = (e)=>{
      e.persist();
      setNewUserAccount({...useraccount,[e.target.name]: e.target.value});
    }

    const handleSelectValue = (e)=>{
        e.preventDefault();
        setNewUserAccount({...useraccount,[e.target.name]: e.target.value});
    }

    
    const handClick = (e)=>{
        e.preventDefault();

        const newUser = {
            username : useraccount.username,
            password : useraccount.password,
            lastname : useraccount.lastname,
            firstname : useraccount.firstname,
            usertype :useraccount.usertype,
            email : useraccount.email,
            office_id : useraccount.office_id
          }
      
          
          
          axios.post(`http://127.0.0.1:8000/api/register`,newUser).then(res =>{
              alert(res.data.message);
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
    }
    
  

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/offices`).then(res=>{
            setOffices(res.data.offices);
        }).catch(function(error){
            console.log("ERROR " + error.response.status);
        });
    },[]);
  return (
    <div>
       
        <div className='card'>
            <div className='card-header'>
                <h5>Register New User</h5>
                <h1>{officeid}</h1>
            </div>
            <form action="">
            <div className='card-body'>
                <table>
                    <tbody>
                        <tr className='p-0 h-10'>
                            <td>Username</td>
                            <td ><input value={useraccount.username || ''} onChange={handleInput} 
                            className='h-8 rounded-sm w-[20rem]' required  type="text" name="username" id="username" placeholder='Username' /></td>
                        </tr>
                        <tr className='p-0 h-10'>
                            <td>Password</td>
                            <td><input value={useraccount.password ||''} onChange={handleInput} 
                            className='h-8 rounded-sm w-[20rem]' type="password" name="password" id="password" placeholder='Password' /></td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            {/* <td><input value={useraccount?useraccount.lastname:''} onChange={handleInput}  */}
                            <td><input value={useraccount.lastname || ''} onChange={handleInput} 
                            className='h-8 rounded-sm w-[20rem]' type="text" name="lastname" id="lastname" placeholder='Last Name' /></td>
                        </tr>
                        <tr>
                            <td>First Name</td>
                            <td><input value={useraccount.firstname || ''} onChange={handleInput} 
                            className='h-8 rounded-sm w-[20rem]' type="text" name="firstname" id="firstname" placeholder='First Name' /></td>
                        </tr>
                        
                        <tr className='p-0 h-10'>
                            <td>Email</td>
                            <td><input value={useraccount.email || ''} onChange={handleInput} 
                            className='h-8 rounded-sm w-[20rem]' type="email" name="email" id="email" placeholder='Email' /></td>
                        </tr>
                        <tr className='p-0 h-10'>
                            <td>Department</td>
                            <td>
                                <select className='h-10 rounded-sm w-[20rem]' name='office_id' id='office_id' onChange={handleSelectValue}>
                                    <option value=""></option>
                                    {offices.map((office) =>(
                                        <option value={office.id} key={office.id}>{office.officename}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr className='p-0 h-10'>
                            <td>User type</td>
                            <td>
                                <select name='usertype' id='usertype' onChange={handleSelectValue}>
                                    <option value=""></option>
                                    <option value="USR">USR</option>
                                    <option value="ACTG">ACTG</option>
                                    <option value="BDGT">BDGT</option>
                                    <option value="VWR">VWR</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td>&nbsp;</td>
                            <td><button className='btn btn-primary w-[20rem]' onClick={handClick}>Register User</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </form>
        </div>
    </div>
  )
}
