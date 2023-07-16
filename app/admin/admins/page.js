'use client';
import SignInButton from "@/components/SignInButton";
import { useSession } from "next-auth/react";
import Image from 'next/image';
import { useState } from 'react';

const page = () => {
    const { data: session } = useSession();
    const username = session?.user?.name;
    const profileImage = session?.user?.image;
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <>
            <div className="relative flex justify-end items-center pr-4">
                <h1 className="text-xl font-bold">WELCOME {username}</h1>
                <div className="relative ml-4">
                    {profileImage &&
                        <Image
                            src={profileImage}
                            width={40}
                            height={40}
                            alt="Picture of the author"
                            className="rounded-full overflow-hidden cursor-pointer"
                            onClick={() => setShowDropdown((prevState) => !prevState)}
                        />
                    }
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-max ">
                            <SignInButton />
                        </div>
                    )}
                </div>
            </div>
            <>
            </>
        </>
    )
}

export default page;
