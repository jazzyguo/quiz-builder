"use client"

import Link from 'next/link'

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center">
            <h1>Oops! Something went wrong.</h1>
            <p>We're sorry, but there was an error processing your request.</p>
            <Link href="/" className="text-[#90caf9] mt-4">
                Go back to the home page
            </Link>
        </div>
    );
};

export default ErrorPage;
