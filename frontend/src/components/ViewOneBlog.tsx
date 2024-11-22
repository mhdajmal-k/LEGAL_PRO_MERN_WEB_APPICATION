import { Image } from '@nextui-org/react';
import React from 'react'
import { BlogType } from '../utils/type/lawyerType';

interface BlogListingProps {
  blogs: BlogType | undefined
}

const ViewOneBlog: React.FC<BlogListingProps> = ({ blogs }) => {

  const paragraphs = blogs?.content.split(/\r?\n+/) || []; ``

  return (
    <div>
      <article className="max-w-4xl mx-auto py-8 bg-gray-100  my-10 px-10 shadow-lg rounded-lg">

        <header className="space-y-6 mb-8">
          <h1 className="my-5 text-blue-gray-700 text-3xl font-bold">
            {blogs?.title}
          </h1>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10">
              <img
                src={blogs?.author.profile_picture}
                alt="card-image"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
            <div className="flex items-center gap-2 text-l font-bold text-muted-foreground">
              <span>{blogs?.author.userName}</span>

            </div>
            {/* <time className='text-end'>{new Date(blogs?.createdAt).toLocaleDateString()}</time> */}
            {blogs?.createdAt.slice(0, 10)}
          </div>
          <div className='p-3'>
            <span className="text-base w-2/4 text-center   text-black-600 mb-4 mt-1 font-medium bg-gray-400 rounded-md px-2">
              {blogs?.category}            </span>

          </div>
        </header>
        <div className="prose prose-gray max-w-none">
          <Image
            src={blogs?.image}
            alt="Hands holding a small house model over real estate paperwork"
            width={800}
            height={400}
            className="rounded-lg mb-8 w-full object-cover"
          />
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-4 leading-relaxed text-gray-700">
              {paragraph}
            </p>
          ))}

        </div>
      </article>
    </div>
  )
}

export default ViewOneBlog
