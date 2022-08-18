/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post as PostProps } from '../../typings'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'

interface Props {
  post: PostProps
}

interface FormProps {
  _id: string
  name: string
  email: string
  comment: string
}

function Post({ post }: Props) {
  const { mainImage, title, description, author, _createdAt, body } = post

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>()

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((data) => console.log(data))
      .catch((error) => alert(error))
  }

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

        <div className="mt-10 leading-7">
          <PortableText
            className=""
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={body}
            serializers={{
              h1: (props: any) => <h1 className="text-2xl font-bold my-5" {...props} />,
              h2: (props: any) => <h2 className="text-xl font-bold my-5" {...props} />,
              li: ({ children }: any) => <li className="ml-4 list-disc">{children}</li>,
              links: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>

      <hr className="max-w-lg mx-auto my-5 border border-yellow-500" />

      <form className="max-w-xl mx-auto flex flex-col p-5" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-3xl font-bold">Leave a comment!</h3>
        <hr className="my-2 border border-gray-200" />

        <input {...register('_id')} type="hidden" value={post._id} name="_id" />

        <label className="mt-2">
          <span className="block text-gray-700">Name</span>
          <input
            className="px-4 py-2 rounded w-full border border-gray-400 form-input focus:outline-none focus:ring-yellow-500 focus:ring-1"
            type="text"
            placeholder="Your name"
            {...register('name', { required: true })}
          />
        </label>
        <label className="mt-2">
          <span className="block text-gray-700">Email</span>
          <input
            className="px-4 py-2 rounded w-full border border-gray-400 form-input focus:outline-none focus:ring-yellow-500 focus:ring-1"
            placeholder="Your email"
            type="email"
            {...register('email', { required: true })}
          />
        </label>
        <label className="mt-2">
          <span className="block text-gray-700 my-2">Comment</span>
          <textarea
            className="form-textarea w-full px-2 py-4 mt-2 border border-gray-400 rounded shadow-sm outline-none focus:ring-yellow-500 focus:ring-1"
            placeholder="Your comment"
            rows={8}
            {...register('comment', { required: true })}
          />
        </label>

        <div className="flex flex-col p-5">
          {errors.name && <span className="text-red-500">Please fill your name</span>}
          {errors.email && <span className="text-red-500">Please fill your email</span>}
          {errors.comment && <span className="text-red-500">Please fill your comment</span>}
        </div>

        <input
          type="submit"
          value="Submit"
          className="bg-green-500 px-2 py-3 text-white font-bold cursor-pointer focus:outline-none hover:bg-green-400"
        />
      </form>
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
