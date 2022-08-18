/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'
import { PostProps } from '../typings'
import { urlFor } from '../sanity'

function Post({ slug, mainImage, title, description, author }: PostProps) {
  return (
    <Link passHref href={`/post/${slug.current}`}>
      <div className="cursor-pointer group rounded-lg">
        <div>
          <img
            className="w-full h-60 object-cover group-hover:scale-105 ease-in-out duration-300 rounded-tl-lg rounded-tr-lg"
            src={urlFor(mainImage).url()}
            alt="main-image"
          />
        </div>
        <div className="flex items-center justify-between py-5">
          <div className="w-72">
            <p className="text-lg font-bold truncate">{title}</p>
            <p className="text-s truncate">
              {description} is created by {author.name}
            </p>
          </div>
          <div>
            <img
              className="w-12 h-12 object-cover rounded-full"
              src={urlFor(author.image).url()}
              alt="author-img"
            />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Post
