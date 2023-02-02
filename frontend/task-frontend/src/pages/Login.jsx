import {useEffect, useState } from 'react';

const Login = () => {

useEffect(() => {
    
})


    return (
        <div className="container">
            <form className='form'>
            <label htmlFor="">Name or Email</label>
            <input id='text-box' type="text"   required/>
            <label htmlFor="">Password</label>
            <input id='text-box' type="password" required/>
            <button type='submit'>Submit</button>
        </form>
        </div>
    )
}

export default Login;