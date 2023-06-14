'use client';
import { useSession, signIn, signOut } from "next-auth/react"

const SignInButton = () => {

    const { data: session } = useSession();
    const name = "bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150";

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
        <button className={name} onClick={() => signIn('google')}>
            Log In
        </button >
    )
}

export default SignInButton