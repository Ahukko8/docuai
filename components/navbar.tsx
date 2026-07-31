import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
    SignInButton,
    SignUpButton,
    UserButton
} from "@clerk/nextjs";


export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">

            <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-6">

                <Link
                    href="/"
                    className="text-xl font-bold tracking-tight"
                >
                    Career<span className="text-purple-500">AI</span>
                </Link>


                <div className="hidden md:flex gap-8 text-sm text-zinc-400">

                    <Link href="/features">
                        Features
                    </Link>

                    <Link href="/pricing">
                        Pricing
                    </Link>

                    <Link href="/templates">
                        Templates
                    </Link>

                    <Link href="/blog">
                        Blog
                    </Link>

                </div>


                <div className="flex gap-3">


                    <SignInButton>

                        <Button variant="ghost">
                            Login
                        </Button>

                    </SignInButton>


                    <SignUpButton>

                        <Button
                            className="
bg-purple-600
hover:bg-purple-700
">

                            Start Free

                        </Button>
                    </SignUpButton>
                    <UserButton />
                </div>
            </div>
        </nav>
    );
}