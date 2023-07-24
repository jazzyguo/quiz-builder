import Link from 'next/link'

type Props = {
    className?: string
}

export const SignupButton = ({ className }: Props) => (
    <Link
        className={className}
        href="/signup"
    >
        Sign Up
    </Link >
)

