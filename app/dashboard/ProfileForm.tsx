'use client'
import { Prisma } from "@prisma/client";
type UserFullType = Prisma.UserGetPayload<{ select: { [K in keyof Required<Prisma.UserSelect>]: true } }>

interface Props {
    user: Prisma.UserMinAggregateOutputType
}
export default function ProfilForm({ user }: Props) {

    return (
        <div className="max-w-lg  p-10">
            <h2 className="text-2xl text-center  underline inset-8 shadow-md" >Edit Your Profile</h2>
            <form onSubmit={alert} className="flex flex-col pt-10 ">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" defaultValue={user?.name ?? ''} />
                <label htmlFor="bio">Bio</label>
                <textarea
                    name="bio"
                    cols={30}
                    rows={10}
                    defaultValue={user?.bio ?? ''}
                ></textarea>
                <label htmlFor="age" defaultValue={user?.age ?? 0}>Age</label>
                <input type="text" name="age" />
                <label htmlFor="image">Profile Image URL</label>
                <input type="text" name="image" defaultValue={user?.image ?? ''} />

                <button type="submit" className="bg-green-700 text-white">Save</button>
            </form>
        </div>
    )

}