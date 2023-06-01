export const dynamic = 'force-static';
import type { Metadata } from "next/types"


export const metadata: Metadata = {
    title: 'About Us',
    description: 'We are a social media company'
}

export default async function About() {
    return (
        <section className="mt-4">
            <h1 className="text-3xl text-center">About</h1>
            <p className="text-center">We are a social media company</p>
        </section>
    )

}