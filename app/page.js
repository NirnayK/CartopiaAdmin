import SignInButton from "@/components/SignInButton"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-grow flex-col p-2 space-y-5 items-center">
        <h1 className=" flex items-center  text-center mt-2 gap-2 text-3xl font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
          </svg>
          Cartopia Admin Panel
        </h1>
        <h2 className="text-xl text-center font-semibold">Your one-stop destination for managing your eCommerce business with ease.</h2>
        <h3 className="text-lg text-center font-medium">Log in to get started</h3>
        <SignInButton />
        <Link className="text-xl text-blue-500 text-center font-semibold" href="/admin">
          Go To Admin Panel
        </Link>
      </div>
    </div>
  )
}
