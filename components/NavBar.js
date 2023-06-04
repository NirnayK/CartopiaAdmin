import Link from "next/link";
import SignInButton from "./SignInButton";

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between bg-green-100 p-4">
            <div className="flex items-center">
                <Link href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd" />
                        <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
                    </svg>
                </Link>
                <Link href="/">
                    <h1 className="ml-4 text-lg font-semibold">Cartopia</h1>
                </Link>
            </div>
            {/* <input
                type="text"
                className="bg-white flex-grow ml-4 text-gray-900 rounded-md px-4 py-2 mr-4 focus:outline-none"
                placeholder="Search"
            /> */}
            <div className="relative flex items-center flex-grow rounded-full">
                <input
                    type="text"
                    className="bg-white flex-grow ml-4 text-gray-900 rounded-l-full px-4 py-2 focus:outline-none"
                    placeholder="Search"
                />
                <button className="flex items-center justify-center bg-gray-200 rounded-r-full w-10 h-10 mr-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <div className="hidden md:flex items-center">
                <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md mr-4 px-4 py-2">Account</button>
                <SignInButton className="ml-4" />
            </div>
        </nav >
    );
};

export default Navbar;
