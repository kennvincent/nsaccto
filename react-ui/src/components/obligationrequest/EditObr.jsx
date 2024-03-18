import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosClient from '../../axios-client';
import {v4 as uuid} from 'uuid';
import AccountItem from './AccountItem';

const EditObr = () => {
    const location = useLocation();
    const [officename,setOfficename] = useState();
    const [accounts,setAccounts] = useState([]);
    const [items,setItems] = useState([]);
    const [details,setDetails] = useState([]);
    const [accountcode,setAccountCode] = useState('');
    const [amount,setAmount] = useState('');
    const [particulars,setParticulars] = useState('');
    const [payee,setPayee] = useState('');
    const [isEditing,setIsEditing] = useState(false);
    const [obrid,setObrid] = useState();
    const navigate = useNavigate();
    const win = window.sessionStorage;

    useEffect(()=>{
        
       

       
    },[]);

    useEffect(() => {
     
      var id = win.getItem('obrid');
      setObrid(id);
    
      axiosClient.get(`/obligationrequest/edit/${id}`).then(res=>{
        setDetails(res.data.obr);
        setPayee(res.data.obr[0].payee);
        setParticulars(res.data.obr[0].particulars);
      });
      
      setOfficename(win.getItem('officename'));
      var office = win.getItem('officename')

      axiosClient.get(`/getaccounts/${office}`).then(res =>{
        setAccounts(res.data.accounts);
      });
      
      
      try{

       
        // const backItems = location.state.items;
        // const backParticulars = location.state.items;
        // setItems(location.state.items);
        // setParticulars(location.state.particulars);
        // setPayee(location.state.payee)
      }catch(e){

      }
      

     
    },[]);


    const displayItems = ()=>{
      details.map((item)=>{
        return(
          console.log(item)
        );
        
      })
    }

    const onClickAdd = () => {
      
      
     
      if(accountcode.trim().length == 0){
        alert("Select account");
        return;
      }

      if(amount.trim().length == 0){
        alert("Enter amount");
        return;
      }

      if(!parseFloat(amount)){
        setAmount('');
        alert("Invalid amount");
        return;
      }

      const newItem = {
        accountcode:accountcode.split(' ')[0],
        amount:amount
      }

      setItems([...items,{id:uuid(),name:newItem}]);
 
      setAmount('');
      setAccountCode('');
    
    }

    function accountExists(accountcode) {
      return items.some(function(el) {
        return true;
        //return el.accountcode === accountcode;
      }); 
    }


    const removeItem = (id) => {
      const filteredItems = items.filter((item) =>item.id !== id);
      setItems(filteredItems);
      // let data = [...items];

      // data.splice(id,1);
      // setItems(data);
    
    }


    const selectedItems = details.map((item) => {
      return(
      
        <tr key={item.id}>
          <td>{item.accountcode}</td>
          <td>{isEditing?<input type="text" name="" id="" />: item.amount}</td>
          
          <td><div>
            <button onClick={(e)=> setIsEditing(true)}>{isEditing?'Save':'Edit'}</button>
            <button onClick={(e) => removeItem (index)}>Remove</button>
          </div></td>
          <td></td>
        </tr>
      )
    });

    const onChangeAccount = (e) =>{
      
      setAccountCode(e);
    }

    const onChangeAmount = (e) => {
      setAmount(e);
    }

    const onChangeParticulars = (e) =>{
      setParticulars(e)
    }

    const onChangePayee = (e) => {
      setPayee(e);
    }

    const onClickNext = ()=>{
      if(particulars.trim().length == 0){
        alert("Enter particulars");
        return;
      }

    
      if(items.length>0){
        navigate('/obrprintpreview',{state:{items,payee,particulars}});
      } else {
        alert('Account details cannot be empty!')
      }
      
    }
    const onClickClose = () => {
      navigate("/obrlist");
    }

    const handleEditItem = (id,amount) => {
        try{
            const updateItems = items.map((item) => {
                if(item.id == id){
                  return {...item,amount:amount};
                }
        
                return item;
              })
        }catch(e){

        }
      
    }

    

    const accountsList = accounts.map((account) =>{
        try{
            return(
                <option value={account.accountcode + ' ' + account.particulars} key={account.id}>{account.accountcode} - {account.particulars}</option>
            );
        }catch(e){

        }
      
  })
  return (
    <div className='w-[1024px] h-[800px] bg-white m-auto p-2 rounded-lg  overflow-y-auto'>
        
        <div className='card'>
          
          <div className='card-header'>
            <h5>Edit Oblication Request</h5>
          </div>
          <div className='card-body'>
            <div>
              <label htmlFor="payee">Payee</label>
              <input type="text" name="payee" id="payee" value={payee} onChange={(e) => setPayee(e.target.value)} className='w-full'/>
            </div>

            <div className='mt-4'>
              <label htmlFor="particulars">Particulars</label>
              <textarea value={particulars} onChange={(e) => onChangeParticulars(e.target.value)}  className='w-full' cols="30" rows="4"></textarea>
            </div>

            <div className='mt-10'>
              <label htmlFor="account">Select Account</label>
              <select  value={accountcode}  className='w-full rounded-md' id='account' onChange={(e)=>onChangeAccount(e.target.value)}>
                <option value=""></option>
                {accountsList}
              </select>
            </div>

            <div className='mt-2'>
              <label htmlFor="amount">Enter Amount</label>
              <input type="text" id='amount' autoComplete='off' value={amount} onChange={(e) => onChangeAmount(e.target.value)} className='w-full'/>
            </div>
            
            <div className='relative'>
              <button onClick={onClickAdd} className='btn btn-primary mt-2 w-[150px]'>Add</button>
              <button onClick={onClickNext} className='btn btn-primary mt-2 ml-2 w-[150px]'>Next</button>
              <button onClick={onClickClose} className='btn btn-primary mt-2 ml-2 w-[150px] right-0 absolute'>Close</button>
            </div>
            

            <div  className='mt-10'>
              <table>
                <tbody>
                  {/* {details.map((item)=> (<AccountItem key={item.id} item={item} 
                  handleEditItem={handleEditItem} removeItem={removeItem}/>))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
  )
}

export default EditObr
