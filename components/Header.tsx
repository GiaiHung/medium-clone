/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, logout } from '../features/userSlice'
import { auth } from '../firebase-config'
import { signOut } from 'firebase/auth'

import { MdOutlineNotifications, MdOutlineMessage } from 'react-icons/md'
import { GrApps } from 'react-icons/gr'

interface UserProps {
  displayName: string
  email: string
  photoURL: string
}

function Header() {
  const user: UserProps = useSelector(selectUser)
  const dispatch = useDispatch()

  const signout = () => {
    signOut(auth).then(() => dispatch(logout()))
  }

  return (
    <header className="flex justify-between items-center max-w-7xl mx-auto p-5">
      <div className="flex gap-x-5 items-center">
        <Link href="/">
          <img
            className="w-44 object-contain cursor-pointer"
            src="https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png"
            alt="header-logo"
          />
        </Link>
        <div className="hidden md:inline-flex gap-x-5 items-center [&>*]:cursor-pointer">
          <Link href="/">
            <h3 className="hover:underline">Home</h3>
          </Link>
          <Link href="/about">
            <h3 className="hover:underline">About</h3>
          </Link>
          <h3 className="hover:underline">Contact</h3>
        </div>
      </div>
      {!user ? (
        <div className="flex items-center space-x-5 text-green-600 [&>*]:cursor-pointer">
          <Link href="/login">
            <h3 className="px-4 py-1 border border-green-600 rounded-full hover:bg-green-600 hover:text-white ease-in-out duration-300">
              Sign in
            </h3>
          </Link>
          <h3 className="hidden md:inline-flex px-4 py-1 border border-green-600 rounded-full hover:bg-green-600 hover:text-white ease-in-out duration-300">
            Get started
          </h3>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <MdOutlineMessage className="text-2xl cursor-pointer" />
          <GrApps className="text-2xl cursor-pointer" />
          <MdOutlineNotifications className="text-2xl cursor-pointer" />
          <img
            className="h-12 w-12 object-contain rounded-full cursor-pointer"
            src={user.photoURL}
            alt=""
            onClick={signout}
          />
        </div>
      )}
    </header>
  )
}

export default Header
