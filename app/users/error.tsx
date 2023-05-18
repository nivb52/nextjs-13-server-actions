'use client'

import { useEffect } from "react"

interface Props {
    error: Error,
    reset: () => void
}
export default function Error(props: Props) {

    useEffect(() => {
        console.error(props.error);
    }, []);

    return (
        <div className="flex justify-center">
            <h2 className="text-center text-3xl pt-8">Oppes Something went wrong !</h2>
            <br />
            <button className="text-lg" role="button" onClick={() => props.reset()}> Try again </button>
        </div>
    )

} 