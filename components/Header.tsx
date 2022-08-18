/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

function Header() {
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
          <Link href='/'><h3 className='hover:underline'>Home</h3></Link>
          <Link href='/about'><h3 className='hover:underline'>About</h3></Link>
          <h3 className='hover:underline'>Contact</h3>
        </div>
      </div>
      <div className="flex items-center space-x-5 text-green-600 [&>*]:cursor-pointer">
        <h3>Sign in</h3>
        <h3 className="px-4 py-1 border border-green-600 rounded-full hover:bg-green-600 hover:text-white ease-in-out duration-300">
          Get started
        </h3>
      </div>
    </header>
  )
}

export default Header
