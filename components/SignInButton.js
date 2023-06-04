'use client';
import { useSession, signIn, signOut } from "next-auth/react"

const SignInButton = () => {

    const { data: session } = useSession()

    if (session) {
        return (
            <>
                <button className="bg-gray-500 hover:bg-gray-600 rounded-md px-4 py-2 text-white" onClick={() => signOut()}>LogOut</button>
            </>
        )
    }
    return (
        <button className="bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2" onClick={() => signIn('google')}>
            LogIn
        </button >
    )
}

export default SignInButton