'use client';
import { experimental_useOptimistic as useOptimistic, useRef } from 'react';
import { upVotePost } from '@/app/blog/[slug]/actions'
import { useSession } from 'next-auth/react';


const doPopUp = (info: string | null) => {

}

interface Props {
    postId: string
    slug: string
    likesCount: number
}

export default function PostLikeForm({ postId, slug, likesCount }: Props) {
    const [optimisticLike, addOptimisticLike] = useOptimistic(
        likesCount,
        (currLikes) => currLikes++,
    );
    const formRef = useRef();
    const session = useSession();
    console.log({ session })

    return (
        <form
            //@ts-ignore
            ref={formRef}
            action={async (formData) => {
                //@ts-ignore
                formRef?.current?.reset();
                addOptimisticLike(null);
                const res = await upVotePost(formData);
                if (res?.code === 409) {
                    alert(res?.info);
                }
            }}
        >
            <input name="postId" hidden type="text" defaultValue={postId} />
            <input name="postSlug" hidden type="text" defaultValue={slug} />
            <input name="user" hidden type="text" defaultValue={session?.data?.user?.email || ''} />
            <button type="submit" className='mr-5'> 👍 </button>
            <button className='' disabled hidden> 👎 </button>
        </form>
    );
}