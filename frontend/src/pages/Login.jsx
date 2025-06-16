import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';


export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => signin(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {loginErrors.length>0 && (
          <p className="text-slate-200 bg-red-500 py-2 px-3 text-sm rounded-sm mb-1 my-2">
            {loginErrors}
          </p>
        )}
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              <button type='submit'>Iniciar sesión</button>
          </form>
          <p className='flex gap-x-2 justify-between'>
            ¿No tienes una cuenta? <Link to="/register" className='text-sky-500'>Registro</Link>
          </p>
      </div>
    </div>
  )
}

export default Login