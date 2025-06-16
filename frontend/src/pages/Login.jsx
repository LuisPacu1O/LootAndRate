// Login.jsx
import React, { useEffect } from 'react';
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

  const onSubmit = async(data) => await signin(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center bg-gray-900'>
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Iniciar sesión</h1>

        {loginErrors.length > 0 && (
          <p className="text-white bg-red-500 py-2 px-4 rounded mb-4 text-center">
            {loginErrors}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            {...register("email", { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Correo electrónico'
          />
          {errors.email && <p className='text-red-400 text-sm'>El email es obligatorio</p>}

          <input
            type="password"
            {...register("password", { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Contraseña'
          />
          {errors.password && <p className='text-red-400 text-sm'>La contraseña es obligatoria</p>}

          <button
            type='submit'
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
          >
            Iniciar sesión
          </button>
        </form>

        <p className='text-sm text-gray-400 mt-4 text-center'>
          ¿No tienes una cuenta? <Link to="/register" className='text-sky-400 hover:underline'>Regístrate</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
