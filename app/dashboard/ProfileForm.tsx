'use client'
import { Prisma } from "@prisma/client";
type UserFullType = Prisma.UserGetPayload<{ select: { [K in keyof Required<Prisma.UserSelect>]: true } }>

interface Props {
    user: Prisma.UserMinAggregateOutputType
}
export default function ProfilForm({ user }: Props) {

    const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault;
        const fromData = new FormData(e.currentTarget);
        const body = {
            name: fromData.get('name'),
            age: fromData.get('age'),
            bio: fromData.get('bio'),
            image: fromData.get('image')
        }
        const res = await fetch('/api/users', {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        await res.json();
    }

    return (
        <section className="p-6 dark:bg-gray-800 dark:text-gray-50 bg-slate-50">
            <form onSubmit={updateUser} className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
                <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900 bg-slate-200">
                    <div className="space-y-2 col-span-full lg:col-span-1">
                        <p className="font-medium">Profile</p>
                        <p className="text-xs">Edit Your Profile</p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="name" className="text-sm">Username</label>
                            <input name="name" type="text" defaultValue={user?.name ?? ''} placeholder="Username" className="underl w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="age" className="text-sm">Age</label>
                            <input name="age" type="text" defaultValue={user?.age ?? 0} placeholder="0" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="bio" defaultValue={user?.bio ?? ''} className="text-sm">Bio</label>
                            <textarea name="bio" placeholder="" cols={30}
                                rows={10} className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"></textarea>
                        </div>
                        <div className="col-span-full sm:col-span-5">
                            <label htmlFor="image" className="text-sm">Profile Image URL</label>
                            <input name="image" type="text" defaultValue={user?.image ?? ''} placeholder="https://" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
                        </div>
                        <div className="col-span-full">
                            <div className="flex items-center space-x-2">
                                <button type="submit" role="button" className="px-4 py-2 border rounded-md dark:border-gray-100 border-fuchsia-700">Save</button>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
        </section>
    )

}