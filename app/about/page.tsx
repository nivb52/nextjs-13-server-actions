export const dynamic = 'force-static';
import type { Metadata } from "next/types"


export const metadata: Metadata = {
    title: 'About Us',
    description: 'We are a social media company'
}

export default async function About() {
    return (
        <section>
            <h1 className="">About</h1>
            <p>We are a social media company</p>
        </section>
    )

}