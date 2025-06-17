import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    await signup(values);
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated]);

  

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center bg-gray-900'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md shadow-lg'>
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Register</h1>

        {registerErrors.length > 0 && (
          <div className='text-white bg-red-500 py-2 px-4 rounded mb-4 text-center'>
            {registerErrors}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            {...register("name", { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Username'
          />
          {errors.name && <p className='text-red-400 text-sm'>Username is needed</p>}

          <input
            type="email"
            {...register("email", { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Email'
          />
          {errors.email && <p className='text-red-400 text-sm'>Email is needed</p>}

          <input
            type="password"
            {...register("password", { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Password'
          />
          {errors.password && <p className='text-red-400 text-sm'>Password is needed</p>}

          <button
            type='submit'
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition"
          >
            Register
          </button>
        </form>

        <p className='text-sm text-gray-400 mt-4 text-center'>
          Do you have an account? <Link to="/login" className='text-sky-400 hover:underline'>Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
