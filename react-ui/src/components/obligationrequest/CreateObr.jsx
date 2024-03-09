import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosClient from '../../axios-client';
import {v4 as uuid} from 'uuid';
import AccountItem from './AccountItem';


const CreateObr = () => {
    const location = useLocation();
    const [officename,setOfficename] = useState();
    const [accounts,setAccounts] = useState([]);
    const [items,setItems] = useState([]);
    const [accountcode,setAccountCode] = useState('');
    const [amount,setAmount] = useState('');
    const [particulars,setParticulars] = useState('');
    const [payee,setPayee] = useState('');
    const [isEditing,setIsEditing] = useState(false);

    const navigate = useNavigate();
    const win = window.sessionStorage;
    useEffect(() => {
      setOfficename(win.getItem('officename'));
      var office = win.getItem('officename')
      axiosClient.get(`/getaccounts/${office}`).then(res =>{
        setAccounts(res.data.accounts);
      });
      
      try{

       
        // const backItems = location.state.items;
        // const backParticulars = location.state.items;
        setItems(location.state.items);
        setParticulars(location.state.particulars);
        setPayee(location.state.payee)
      }catch(e){

      }
      

     
    },[]);

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
        accountcode:accountcode,
        amount:amount
      }

      setItems([...items,{id:uuid(),name:newItem}]);
      console.log(items);
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


    const selectedItems = items.map((item) => {
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
      navigate("/officebudget");
    }

    const handleEditItem = (id,amount) => {
      const updateItems = items.map((item) => {
        if(item.id == id){
          return {...item,amount:amount};
        }

        return item;
      })
    }

    

    const accountsList = accounts.map((account) =>{
      return(
          <option value={account.accountcode + ' ' + account.particulars} key={account.id}>{account.accountcode} - {account.particulars}</option>
      );
  })

  return (
    <div className='w-[1024px] h-[800px] bg-white m-auto p-2 rounded-lg  overflow-y-auto'>
        
        <div className='card'>
          
          <div className='card-header'>
            <h5>Create Oblication Request</h5>
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
                  {items.map((item)=> (<AccountItem key={item.id} item={item} 
                  handleEditItem={handleEditItem} removeItem={removeItem}/>))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CreateObr
