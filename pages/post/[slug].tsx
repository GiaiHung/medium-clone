/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post as PostProps } from '../../typings'
import PortableText from 'react-portable-text'

interface Props {
  post: PostProps
}

function Post({ post }: Props) {
  const { mainImage, title, description, author, _createdAt, body } = post

  return (
    <main className="max-w-6xl mx-auto">
      <Head>
        <title>Medium Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header />

      <img
        className="w-full md:w-[520px] object-contain mx-auto"
        src={urlFor(mainImage).url()}
        alt="post-main-img"
      />

      <article className="max-w-4xl mx-auto mt-5 p-5">
        <h1 className="text-4xl text-center font-bold mb-3">{title}</h1>
        <h2 className="text-2xl font-light text-gray-500 italic mb-3">{description}</h2>

        <div className="flex gap-3">
          <img
            className="w-14 h-14 object-cover rounded-full"
            src={urlFor(author.image).url()}
            alt=""
          />
          <p className="flex flex-col font-light text-lg text-green-600">
            This blog is created by {author.name}
            <span>Created at {new Date(_createdAt).toLocaleDateString()}</span>
          </p>
        </div>

        <div className='mt-10 leading-7'>
          <PortableText
            className=""
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={body}
            serializers={{
              h1: (props: any) => <h1 className="text-2xl font-bold my-5" {...props} />,
              h2: (props: any) => <h2 className="text-xl font-bold my-5" {...props} />,
              li: ({ children }: any) => <li className="ml-4 list-disc">{children}</li>,
              links: ({ href, children }: any) => <a href={href} className="text-blue-500 hover:underline">{children}</a>,
            }}
          />
        </div>
      </article>
    </main>
  )
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

  return {
    paths,
    fallback: 'blocking', // Make sure next won't show 404 page when page doesn't exist since we will handle it ourselves
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == 'post' && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author -> {
    name,
    image
  },
  description,
  mainImage,
    slug{
    current
  },
  body
  }`
  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
  }
}

export default Post
