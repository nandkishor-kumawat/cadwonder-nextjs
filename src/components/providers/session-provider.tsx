"use client";

import { Session, User } from "lucia";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";

type ISession = Session & {
    user: User;
}

export type SessionContextValue =
    | { session: ISession; status: "authenticated", update: () => void }
    | { session: null; status: "loading" | "unauthenticated", update: () => void };



export const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<ISession | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchSession = useCallback(async () => {
        setIsLoading(true);
        const res = await fetch(`/api/auth/session`).then(res => res.json());
        if (res?.user && res?.session) {
            setSession({ ...res.session, user: res.user });
        } else {
            setSession(null);
        }
    }, []);

    useEffect(() => {
        fetchSession();
    }, [fetchSession]);

    const sessionValue: SessionContextValue = useMemo(() => {
        if (session) {
            return { session: session, status: "authenticated", update: fetchSession };
        } else if (isLoading) {
            return { session: null, status: "loading", update: fetchSession };
        } else {
            return { session: null, status: "unauthenticated", update: fetchSession };
        }
    }, [session, isLoading, fetchSession]);

    return (
        <SessionContext.Provider value={sessionValue}>
            {children}
        </SessionContext.Provider>
    );
}