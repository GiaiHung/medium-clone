/* eslint-disable @next/next/no-img-element */
import React from 'react'

function Hero() {
  return (
    <div className="px-10 py-5 flex justify-between items-center bg-yellow-400 border border-black">
      <div className='max-w-xl font-serif capitalize'>
        <h1 className="text-5xl md:text-7xl">Stay curious.</h1>
        <h2 className='text-2xl md:text-3xl'>Discover stories, thinking, and expertise from writers on any topic.</h2>
      </div>
      <img
        className="hidden md:inline-flex h-32 lg:h-64"
        src="https://iconape.com/wp-content/png_logo_vector/medium-m.png"
        alt="hero"
      />
    </div>
  )
}

export default Hero
