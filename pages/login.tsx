import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { FormEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Loader from '../components/Loader'
import useAuth from '../hooks/useAuth'
import { FormInput } from '../types/types'

const Login: NextPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { signin, signup, loading } = useAuth()

  const formSubmit: SubmitHandler<FormInput> = async (data: FormInput) => {
    const { email, password } = data
    if (isLogin) {
      await signin(email, password)
    } else {
      await signup(email, password)
    }
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInput>()

  return (
    <>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative flex h-screen w-screen items-center justify-center">
        <Image src="https://rb.gy/p2hphi" layout="fill" />
        <img
          src="https://rb.gy/ulxxee"
          className="absolute left-4 top-4 cursor-pointer object-contain drop-shadow-xl md:left-10 md:top-6"
          width={150}
          height={150}
        />
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="group absolute flex min-w-[300px] flex-col items-start space-y-4 rounded-lg bg-black/30 p-10 backdrop-blur-sm backdrop-opacity-50 transition focus-within:bg-black/50 focus-within:shadow-md focus-within:backdrop-opacity-100 sm:space-y-8"
        >
          <h1 className="w-full text-2xl font-bold text-shadow-md sm:text-center sm:text-4xl">
            Sign In
          </h1>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className="p-1 font-light text-red-500">
                Please Enter a valid Email
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              {...register('password', { minLength: 5, maxLength: 25 })}
            />
            {errors.password && (
              <p className="p-1 font-light text-red-500 text-shadow">
                Password should be atleast 5 characters
              </p>
            )}
          </div>
          <button
            type="submit"
            className="relative flex min-w-full items-center justify-center self-center rounded bg-[#E50914] p-3 font-semibold transition hover:-translate-y-1 hover:bg-opacity-75 sm:min-w-[200px]"
            onClick={() => setIsLogin(true)}
          >
            {loading && (
              <span className="absolute left-10">
                <Loader />
              </span>
            )}
            Sign In
          </button>
          <div className="flex space-x-2 p-4 text-[#efefef] ">
            <p>New To Netflix ?</p>
            <button
              className="font-bold text-white  hover:scale-105 hover:underline"
              type="submit"
              onClick={() => setIsLogin(false)}
            >
              Sign Up Now
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
