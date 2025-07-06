import { useState } from "react";
import logo from "../assets/logo.png";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton, useUser } from '@clerk/clerk-react';
import { useUserContext } from "../context/UserContext";

const Menubar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { credits, isLoading: isUserContextLoading } = useUserContext();
    const { isLoaded } = useUser();

    const CreditsDisplay = ({ isMobile = false }) => {
        const baseClasses = "text-sm font-medium text-slate-700 flex items-center";
        const mobileClasses = isMobile ? "block px-4 py-2 hover:bg-slate-100" : "";

        if (isUserContextLoading) {
            return <span className={`${baseClasses} ${mobileClasses}`}>Loading Credits...</span>;
        }

        if (credits != null) {
            return (
                <span className={`${baseClasses} ${mobileClasses}`}>
                    Credits: {credits}
                </span>
            );
        }

        return null;
    };

    return (
        <nav className="bg-white shadow-sm w-full">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 w-full">
                    {/* Logo and Brand - Extreme Left */}
                    <div className="flex items-center">
                        <img src={logo} alt="Logo" className="h-8 w-auto" />
                        <span className="ml-2 text-xl font-semibold text-slate-900">Remove.bg</span>
                    </div>

                    {/* Desktop Navigation - Extreme Right */}
                    <div className="hidden md:flex items-center space-x-8">
                        {isLoaded && (
                            <>
                                <SignedIn>
                                    <CreditsDisplay />
                                </SignedIn>
                                <a href="/" className="text-slate-600 hover:text-slate-900">Home</a>
                                <a href="/pricing" className="text-slate-600 hover:text-slate-900">Pricing</a>
                                <SignedIn>
                                    <a href="/dashboard" className="text-slate-600 hover:text-slate-900">Dashboard</a>
                                    <UserButton afterSignOutUrl="/" />
                                </SignedIn>
                                <SignedOut>
                                    <SignInButton mode="modal">
                                        <button className="text-slate-600 hover:text-slate-900">Login</button>
                                    </SignInButton>
                                    <SignUpButton mode="modal">
                                        <button className="bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 transition-colors duration-200">Sign Up</button>
                                    </SignUpButton>
                                </SignedOut>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg
                                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50`}>
                <div className="py-1" role="menu" aria-orientation="vertical">
                    {isLoaded && (
                        <>
                            <SignedIn>
                                <CreditsDisplay isMobile={true} />
                            </SignedIn>
                            <a href="/" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100" role="menuitem">Home</a>
                            <a href="/pricing" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100" role="menuitem">Pricing</a>
                            <SignedIn>
                                <a href="/dashboard" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100" role="menuitem">Dashboard</a>
                                {/* UserButton will be elsewhere on mobile - typically not in a dropdown like this */}
                            </SignedIn>
                            <SignedOut>
                                {/* Using buttons inside SignedOut for mobile menu items */}
                                <SignInButton mode="modal">
                                    <button className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 w-full text-left">Login</button>
                                </SignInButton>
                                <SignUpButton mode="modal">
                                    <button className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 w-full text-left">Sign Up</button>
                                </SignUpButton>
                            </SignedOut>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Menubar;