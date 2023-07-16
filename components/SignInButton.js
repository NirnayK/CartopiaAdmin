'use client';
import { useSession, signIn, signOut } from "next-auth/react"

const SignInButton = () => {

    const { data: session } = useSession();
    if (session) {
        return (
            <>
                <button className="purplegradient opacity-80 hover:opacity-100 btn mr-2" onClick={() => signOut({ callbackUrl: "/" })}>
                    Log Out
                </button>
            </>
        )
    }
    return (
        <button className="purplegradient opacity-80 hover:opacity-100 btn mr-2" onClick={() => signIn('google', { callbackUrl: "/admin" })}>
            Log In
        </button >
    )
}

export default SignInButton