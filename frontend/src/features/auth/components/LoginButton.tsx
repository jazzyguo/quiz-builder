import Link from 'next/link'

type Props = {
    className?: string
}

export const LoginButton = ({ className }: Props) => (
    <Link
        className={className}
        href="/signin"
    >
        Sign In
    </Link >
)

