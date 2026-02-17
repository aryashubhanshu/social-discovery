'use client';

import { useAuth } from '@/context/auth-context';
import { createClient } from '@/lib/supabase/client';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthPage() {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const supabase = createClient();
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isSignUp) {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                });

                if (error) throw error;
                if (data.user && !data.session) {
                    setError('Please check your email to confirm your account');
                    return;
                }
                setIsSignUp(false);
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (error) throw error;
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && !authLoading) {
            router.push('/');
        }
    }, [user, authLoading, router]);

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-gray-50 dark:bg-black selection:bg-primary/30">
            {/* Ambient Background with Moving Gradients */}
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent-purple/30 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent-blue/30 blur-[120px] animate-pulse delay-1000" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white/70 p-8 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
                    {/* Decorative Elements */}
                    <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br from-primary to-secondary blur-3xl opacity-20" />
                    <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-gradient-to-br from-accent-pink to-accent-orange blur-3xl opacity-20" />

                    <div className="relative flex flex-col items-center">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg"
                        >
                            <Sparkles className="h-8 w-8 text-white" />
                        </motion.div>

                        <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                            {isSignUp ? 'Create Your Account' : 'Welcome Back'}
                        </h1>
                        <p className="mb-8 text-gray-500 dark:text-gray-400 text-center">
                            Discover amazing people and build meaningful
                            connections.
                        </p>

                        <form
                            className="space-y-6 min-w-full"
                            onSubmit={handleAuth}
                        >
                            <div className="space-y-4">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                        className="w-full rounded-md border border-gray-300 bg-white/70 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-gray-500"
                                        placeholder="mail@example.com"
                                    />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                        className="w-full rounded-md border border-gray-300 bg-white/70 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-gray-500"
                                        placeholder="********"
                                    />
                                </motion.div>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-red-500 text-sm"
                                    >
                                        {error}
                                    </motion.div>
                                )}

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    disabled={loading}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full rounded-md bg-gradient-to-r from-primary to-secondary px-4 py-3 text-white font-medium shadow-lg transition-all duration-200 hover:shadow-xl"
                                >
                                    {loading
                                        ? 'Loading...'
                                        : isSignUp
                                          ? 'Sign Up'
                                          : 'Sign In'}
                                </motion.button>
                            </div>
                        </form>

                        <div className="mt-8 flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                            <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
                            <span
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                            >
                                {isSignUp
                                    ? 'Already have an account? Sign in'
                                    : "Don't have an account Sign up"}
                            </span>
                            <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
                        </div>
                    </div>
                </div>

                <p className="mt-6 text-center text-xs">
                    <span className="hover:text-gray-500 transition-colors cursor-pointer">
                        Terms of Service
                    </span>
                    <span className="mx-2">/</span>
                    <span className="hover:text-gray-500 transition-colors cursor-pointer">
                        Privacy Policy
                    </span>
                </p>
            </motion.div>
        </div>
    );
}
