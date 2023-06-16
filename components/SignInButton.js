'use client';
import { useSession, signIn, signOut } from "next-auth/react"

const SignInButton = () => {

    const { data: session } = useSession();
    const name = "bg-green-500 text-white active:bg-green-600";

    if (session) {
        return (
            <>
                <button className={name} onClick={() => signOut()}>
                    Log Out
                </button>
            </>
        )
    }
    return (
        <button className={name} onClick={() => signIn('google', { callbackUrl: "/admin" })}>
            Log In
        </button >
    )
}

export default SignInButton