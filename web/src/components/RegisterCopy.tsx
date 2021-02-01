import React from "react";
import { useHistory } from "react-router-dom";
import {useState} from 'react';
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
const Register = () => {
    const history = useHistory()
    const [values, setValues] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '', 
        profilePic: ''
    }) 

const handleChange = (e : any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      [e.target.username]: e.target.value,
      [e.target.email]: e.target.value,
      [e.target.password]: e.target.value,
      [e.target.confirmPassword]: e.target.value,
      [e.target.profilePic]: e.target.value
    });
  };

  const resetValues = (e : any) => {
    setValues({
      ...values,
      [e.target.name]: "",
      [e.target.username]: "",
      [e.target.email]: "",
      [e.target.password]: "",
      [e.target.confirmPassword]: "",
      [e.target.profilePic]: ""
    });
  };

    return(
        <div>
            <h2>Register</h2>
            <form onSubmit={async (e)=>{
                const user = await prisma.user.create({
                    data:{
                        name: values.name,
                        username: values.username,
                        email: values.email,
                        password: values.password,
                        profilePic: values.profilePic
                      },
                    });
                    console.log(user.name);
                    localStorage.setItem('token', user.token); //but IT IS returning the user.name 
                    resetValues(e)
                    history.push('/')
                  }
            }>
            <label>Name:
            <input
                type="text"
                name="name"
                value={values.name}
                placeholder = "Jane Doe"/>
                onChange={handleChange}
            </label>

                
            <label>Username:
            <input
                type="text"
                name="username"
                value={values.username}
                placeholder = "janedoe123"
                onChange={handleChange}/>
            </label>


            <label>E-mail:
            <input
                type="text"
                name="email"
                value={values.email}
                placeholder = "janedoe@mail.com"
                onChange={handleChange}/>
            </label>

            <label>Password:
            <input
                type="password"
                name="password"
                value={values.password}
                placeholder = "Password required"
                onChange={handleChange}/>
            </label>

            <label>Confirm password:
            <input
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                placeholder = "Please re-enter your password"
                onChange={handleChange}/>
            </label>

            <label>Upload your image:
            <input
                type="text"
                name="profilePic"
                value={values.profilePic}
                placeholder = "I wanna see you"
                onChange={handleChange}/>
            </label>

                <button type = 'submit'> Register</button>
            </form>
            

        </div>
    )
}
export default Register;