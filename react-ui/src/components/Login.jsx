import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from "../api/axios";


export default function handleLogin() {
  const [useraccount,setUserAccount] = useState([]);
  const navigate = useNavigate();

  const logged = window.localStorage.getItem('isLoggedIn');
  useEffect(()=>{
    if(logged){
      navigate("/dashboard");
    }
  });
  
  // const onLogin = async (e)=>{
  //   e.preventDefault();
  //   try{
  //     await axios.post('/login',{email,password});
  //     setEmail("");
  //     setPassword("");
  //     navigate("/dashboard");
  //   }catch(e){
  //     console.log(e);
  //   }

  //  }

  const handleInput = (e)=>{
    e.persist();
    setUserAccount({...useraccount,[e.target.name]: e.target.value});
  }
   
    const userlogin = {
      username : useraccount.username,
      password : useraccount.password,
    }

   

 const handleLogin =  async()=>{
  // axios.post(`http://127.0.0.1:8000/api/login`,userlogin).then(res=>{
  //   alert(res.data.message);
    
  // });
  console.log(userlogin);
  try{
        await axios.post(`http://127.0.0.1:8000/api/login`,userlogin).then(res=>{
          // await axios.post(`https://api.nsaccto.com/login`,userlogin).then(res=>{
            if(res.data.login=='success'){
              window.localStorage.setItem('user',userlogin.username)
              window.localStorage.setItem('isLoggedIn',true)

              axios.get(`http://127.0.0.1:8000/api/login/${userlogin.username}`).then(res=>{
                window.localStorage.setItem('usertype',res.data.office[0].usertype);
                window.localStorage.setItem('officename',res.data.office[0].officename);
              });

              navigate("/dashboard");
             
            }else{
              alert(res.data.login);
            }
            
          });
        
        

      }catch(e){
        //console.log(e);
      }
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
            <h2 className="mt-10 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Login to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
           
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={useraccount?useraccount.username:''} onChange={handleInput} 
                      onKeyDown={(e)=>{
                        if(e.key==="Enter"){
                          handleLogin();
                        }
                      }}
                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    {/* <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a> */}
                  </div>
                </div>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={useraccount?useraccount.password:''} onChange={handleInput}  
                      onKeyDown={(e)=>{
                        if(e.key==="Enter"){
                          handleLogin();
                        }
                      }}
                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  onClick={handleLogin}
                  className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 
                    text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2"
                >
                    <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                        <LockClosedIcon className="h-5 w-5 text-gray-300 group-hover:text-orange-300" 
                        aria-hidden="true" />
                    </span>
                    Login
                </button>

               
              </div>
  
           
          </div>
        </div>
  )
}

