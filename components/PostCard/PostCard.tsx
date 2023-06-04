

import Link from 'next/link';

interface Props {
    post: {
        slug: string
        id: string
        title: string
        createdAt: Date
        author: {
            image: string | null
            name: string | null
        }
        likes: { userId: string }[]

    }
}

export default function PostCard({ post }: Props) {
    return (
        <div className="h-full flex flex-col items-start relative">
            <Link href={`/blog/${post.slug}`}>

                <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                    <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">  {new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex-grow pl-6">
                    <h1 className="title-font text-xl font-medium text-gray-900 mb-3">{post.title}</h1>
                    <p className="leading-relaxed mb-5">More Info ...</p>
                    <a className="inline-flex items-center">
                        <img
                            className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"
                            alt={`${post.author.name}'s profile`}
                            src={post.author.image ?? '/no-profile-picture-15257.svg'}
                        />
                        <span className="flex-grow flex flex-col pl-3">
                            <span className="title-font font-medium text-gray-900">{post.author.name}</span>
                        </span>
                    </a>
                </div>

            </Link >

            <div className="text-center leading-none ms-6 py-4">
                <span className="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>1.2K (demo)
                </span>
                <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                    <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>{post.likes.length}
                </span>
            </div>

        </div>
    );
}


