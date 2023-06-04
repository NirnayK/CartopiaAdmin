'use client';

import { SessionProvider } from "next-auth/react";

const CustomSessionProvider = ({ children, session }) => (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
)

export default CustomSessionProvider;