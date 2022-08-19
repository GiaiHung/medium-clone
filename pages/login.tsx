/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { auth, provider } from '../firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { login } from '../features/userSlice'
import { useRouter } from 'next/router'

function Login() {
  const router = useRouter()
  const dispatch = useDispatch()
  const signin = () => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
        )
      })
      .catch((error) => alert(error))

    router.push('/')
  }

  return (
    <div className="bg-slate-200 w-full min-h-screen flex items-center u">
      <div className="flex flex-col justify-between max-w-xl mx-auto h-80 bg-white p-5">
        <h1 className="text-3xl font-bold my-5">Welcome back!</h1>
        <button
          className="flex items-center px-4 py-3 border border-gray-300 rounded-full hover:border-gray-400 outline-none"
          onClick={signin}
        >
          <span>
            <img className="w-6 h-6 object-contain mr-2" src="/google.png" alt="" />
          </span>
          <h2 className="text-lg">Sign in with google</h2>
        </button>
        <h2 className="max-w-sm text-gray-500">
          Click “Sign In” to agree to{' '}
          <span className="underline gray-600 cursor-pointer">Medium Terms of Service</span> and
          acknowledge that{' '}
          <span className="underline gray-600 cursor-pointer">Medium Privacy Policy</span> applies
          to you.
        </h2>
      </div>
    </div>
  )
}

export default Login
