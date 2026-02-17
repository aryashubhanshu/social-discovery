'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu,
    X,
    Globe,
    Users,
    MessageCircle,
    Sparkles,
    User,
} from 'lucide-react';
import { useAuth } from '@/context/auth-context';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, signOut } = useAuth();

    const navLinks = [
        { name: 'Discover', href: '/matches', icon: Globe },
        { name: 'Matches', href: '/matches/list', icon: Users },
        { name: 'Messages', href: '/chat', icon: MessageCircle },
        { name: 'Profile', href: '/profile', icon: User },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-black/70">
            <div className="container mx-auto px-6">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary shadow-lg transition-transform group-hover:scale-110">
                            <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Social Discovery
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative text-sm font-medium text-gray-600 transition-colors hover:text-primary dark:text-gray-300 dark:hover:text-white group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <Link
                                href="/"
                                onClick={signOut}
                                className="rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2 text-sm font-medium text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:scale-105 active:scale-95"
                            >
                                Log out
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/auth"
                                    className="text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/auth"
                                    className="rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2 text-sm font-medium text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:scale-105 active:scale-95"
                                >
                                    Join Now
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10 transition-colors"
                    >
                        {isOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden overflow-hidden border-t border-gray-200/50 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-black/90"
                    >
                        <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="flex items-center gap-3 rounded-lg p-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-primary dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <link.icon className="h-5 w-5" />
                                    {link.name}
                                </Link>
                            ))}
                            <div className="mt-4 flex flex-col gap-3 border-t border-gray-200/50 pt-4 dark:border-white/10">
                                {user ? (
                                    <Link
                                        href="/auth"
                                        onClick={signOut}
                                        className="flex w-full justify-center rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
                                    >
                                        Log out
                                    </Link>
                                ) : (
                                    <>
                                        {' '}
                                        <Link
                                            href="/auth"
                                            className="flex w-full justify-center rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href="/auth"
                                            className="flex w-full justify-center rounded-lg bg-gradient-to-r from-primary to-secondary py-2.5 text-sm font-medium text-white shadow-lg"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Join Now
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
