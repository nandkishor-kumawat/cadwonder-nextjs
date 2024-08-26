"use client";

import { Session, User } from "lucia";
import { createContext, useEffect, useMemo, useState } from "react";

type ISession = Session & {
    user: User;
}

export type SessionContextValue =
    | { session: ISession; status: "authenticated" }
    | { session: null; status: "loading" | "unauthenticated" };



export const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<ISession | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchSession = async () => {
            setIsLoading(true);
            const res = await fetch(`/api/auth/session`).then(res => res.json());
            if (res?.user && res?.session) {
                setSession({ ...res.session, user: res.user });
            } else {
                setSession(null);
            }
        };

        fetchSession();
    }, []);

    const sessionValue: SessionContextValue = useMemo(() => {
        if (session) {
            return { session: session, status: "authenticated" };
        } else if (isLoading) {
            return { session: null, status: "loading" };
        } else {
            return { session: null, status: "unauthenticated" };
        }
    }, [session, isLoading]);

    return (
        <SessionContext.Provider value={sessionValue}>
            {children}
        </SessionContext.Provider>
    );
}