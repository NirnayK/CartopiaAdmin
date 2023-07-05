'use client';
import { useSession, signIn, signOut } from "next-auth/react"

const SignInButton = () => {

    const { data: session } = useSession();
    if (session) {
        return (
            <>
                <button className="bg-green-500 text-white hover:bg-green-600 btn mr-2" onClick={() => signOut({ callbackUrl: "/" })}>
                    Log Out
                </button>
            </>
        )
    }
    return (
        <button className="bg-green-500 text-white hover:bg-green-600 btn mr-2" onClick={() => signIn('google', { callbackUrl: "/admin" })}>
            Log In
        </button >
    )
}

export default SignInButton