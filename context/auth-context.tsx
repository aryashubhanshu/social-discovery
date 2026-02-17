'use client';

import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const supabase = createClient();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    useEffect(() => {
        async function checkUser() {
            setLoading(true);
            try {
                const {
                    data: { session },
                } = await supabase.auth.getSession();
                setUser(session?.user ?? null);

                const {
                    data: { subscription },
                } = supabase.auth.onAuthStateChange(async (event, session) => {
                    setUser(session?.user ?? null);
                });

                return () => subscription.unsubscribe();
            } catch (error) {
                console.error('Error checking user:', error);
            } finally {
                setLoading(false);
            }
        }

        checkUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
