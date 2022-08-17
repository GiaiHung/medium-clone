import React from 'react'
import { sanityClient } from '../../sanity'
import { PostProps } from '../../typings'

function Post() {
  return <div></div>
}

export const getStaticPaths = async () => {
  const query = `*[_type == 'post']{
    _id,
    slug{
    current
    }}`

  const posts = await sanityClient.fetch(query)
  const paths = posts.map((post: PostProps) => ({
    params: {
      slug: post.slug.current,
    },
  }))
}

export default Post
