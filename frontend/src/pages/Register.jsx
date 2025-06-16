import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
    const { register, handleSubmit, formState: errors } = useForm();
    const {signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() =>{
        if(isAuthenticated) navigate('/')
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values)=> {
                signup(values);
            })
  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
            {
                registerErrors.lenght>0 && (
                    <div className='text-slate-200 bg-red-500 py-2 px-3 text-sm rounded-sm mb-1 my-2'>
                        {registerErrors}
                    </div>
                )
            }
            <h1 className="text-2xl font-bold">Registro</h1>
            <form 
                onSubmit={onSubmit}>
                <input type="text" {... register("name", { required:true })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' 
                    placeholder='Nombre de usuario'
                />
                {
                    errors.username && (
                        <p className='text-red-500'>El usuario es obligatorio</p>
                    )  
                }
                <input type="email" {... register("email", { required:true })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Correo electrónico' 
                />
                {
                    errors.email && (
                        <p className='text-red-500'>El email es obligatorio</p>
                    )  
                }
                <input type="password" {... register("password", { required:true })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' 
                    placeholder='Contraseña'
                />
                {
                    errors.password && (
                        <p className='text-red-500'>La contraseña es obligatoria</p>
                    )  
                }
                <button type='submit'>Registrarse</button>
            </form>
            <p className='flex gap-x-2 justify-between'>
                ¿Ya tienes una cuenta? <Link to="/login" className='text-sky-500'>Login</Link>
            </p>
        </div>
    </div>
  )
}

export default Register