import { gql, useMutation } from "@apollo/client"
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import * as Yup from 'yup';

//import { validationSchema } from "graphql";

const REGISTER_MUTATION = gql`
mutation register ($name: String!, $email: String!, $password: String!, $username: String!,  $profilePic: String ){
    register (name : $name, username: $username, email: $email, profilePic: $profilePic, password: $password){
        token
    }
}`

interface RegisterValues{
    name: string
    username:string
    email:string
    password:string
    confirmPassword:string
    profilePic: string
} 
const Register = ()=>{
    const history = useHistory()
    
    const [register, {data}] = useMutation(REGISTER_MUTATION)

    const initialValues: RegisterValues = {
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '', 
        profilePic: ''
    }

const validationSchema = Yup.object({
    email: Yup.string().email("Please enter a valid e-mail address").required("Please enter your e-mail"),
    name: Yup.string().max(30, "Your name shouldn't exceed 30 characters").required("Please enter your name"),
    username: Yup.string().max(15, "Your username shouldn't exceed 15 characters").required("Please enter your username"),
    password: Yup.string().max(30, "Your password shouldn't exceed 30 characters").required("Password required"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')],"Passwords don't match"),
    profilePic: Yup.string().max(15, "Your username shouldn't exceed 15 characters").required("Please upload your image"),
})

    return(
        <div>
            <h2>Register</h2>
 
            <Formik
            initialValues={initialValues}
            validationSchema = {validationSchema}
            onSubmit={async (values, {setSubmitting})=>{
                setSubmitting(true)
                const response = await register({
                    variables: values
                })
                localStorage.setItem('token', response.data.register.token)
                setSubmitting(false)
                history.push('/')
            }}>
            
            <Form>
                <Field name = "name" type = 'text' placeholder = "Jane Doe" />
                <ErrorMessage  name = 'name' component = {'div'} />

                <Field name = "username" type = 'text' placeholder = "jdoe123" />
                <ErrorMessage  name = 'username' component = {'div'} />

                <Field name = "email" type = 'text' placeholder = "janedoe@mail.com" />
                <ErrorMessage  name = 'email' component = {'div'} />

                <Field name = "password" type = 'password' placeholder = "Password" />
                <ErrorMessage  name = 'password' component = {'div'} />

                <Field name = "confirmPassword" type = 'password' placeholder = "Confirm password" />
                <ErrorMessage  name = 'confirmPassword' component = {'div'} />

                <Field name = "profilePic" type = 'text' placeholder = "Image" />
                <ErrorMessage  name = 'profilePic' component = {'div'} />

                <button type = 'submit'> Register</button>
            </Form>
            </Formik>

        </div>
    )
}
export default Register;