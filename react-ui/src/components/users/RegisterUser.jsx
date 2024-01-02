import React from 'react'

export default function registeruser() {

    const handClick = (e)=>{
        e.preventDefault();
    }
    
  return (
    <div>
        <div className='card'>
            <div className='card-header'>
                <h5>Register New User</h5>
            </div>
            <div className='card-body'>
                <table>
                    <tbody>
                        <tr className='p-0 h-10'>
                            <td>Username</td>
                            <td ><input className='h-8 rounded-sm w-[20rem]'  type="text" name="username" id="username" placeholder='Username' /></td>
                        </tr>
                        <tr className='p-0 h-10'>
                            <td>Password</td>
                            <td><input className='h-8 rounded-sm w-[20rem]' type="password" name="password" id="username" placeholder='Password' /></td>
                        </tr>
                        <tr className='p-0 h-10'>
                            <td>Email</td>
                            <td><input className='h-8 rounded-sm w-[20rem]' type="email" name="email" id="email" placeholder='Email' /></td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td><input className='h-8 rounded-sm w-[20rem]' type="text" name="lastname" id="lastname" placeholder='Last Name' /></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td><input className='h-8 rounded-sm w-[20rem]' type="text" name="firstname" id="firstname" placeholder='Email' /></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td><button className='btn btn-primary w-[20rem]' onClick={handClick}>Register User</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
