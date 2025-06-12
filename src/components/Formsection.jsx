import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export const Formsection = () => {
    const formik=useFormik({
        initialValues:{
            email:'',
            password:'',
            name:''
        },
        validationSchema:Yup.object({
            email:Yup.string().email('invalid email').required("this field is required"),
            password:Yup.string().min(6,"Too short for password").required("please enter the password"),
            name:Yup.string().min(4,'too short for name').required("name is required for login")
        }),
        onSubmit: values =>{
            alert(`email${values.email}`)
        },

    })
  return (
    <div className='min-h-screen flex items-center justify-center bg-green-300'>
        <form className='max-w-lg w-full space-y-5 bg-white rounded-2xl p-8' onSubmit={formik.handleSubmit}>
            <p>email</p>
            <input 
            className='w-1/2 rounded-2xl h-10 border-gray-200 bg-green-200 text-sm text-black'
            type="email"
            placeholder='   email'
            name='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            />
            {formik.touched?.email && formik.errors?.email && (
  <div className="text-red-500 text-sm">{formik.errors.email}</div>
)}
            <p>password</p>
            <input 
            className='w-1/2 rounded-2xl h-10 border-gray-200 bg-green-200 text-sm text-black'
            type="password" 
            name='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            />
            {formik.touched?.password && formik.errors?.password && (
  <div className="text-red-500 text-sm">{formik.errors.password}</div>
)}
            <p>name</p>
            <input 
            className='w-1/2 rounded-2xl h-10 border-gray-200 bg-green-200 text-sm text-black'
            type="text" 
            name='name'
            onChange={formik.handleChange}
            value={formik.values.name}
            />
            {formik.errors?.name && (<div className="text-red-500 text-sm">{formik.errors.name}</div>)}
            <button
            className='bg-red-300 w-full rounded-2xl h-10' 
            type="submit">Login</button>
        </form>
    </div>
  )
}
