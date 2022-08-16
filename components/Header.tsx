/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

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
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="text-white bg-green-600 px-4 py-1 rounded-full">Follow</h3>
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
