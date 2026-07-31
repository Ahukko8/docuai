import {
    UserButton
} from "@clerk/nextjs";

import Link from "next/link";


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {


    return (

        <div className="min-h-screen bg-black text-white flex">


            {/* Sidebar */}

            <aside className="
w-64
border-r
border-white/10
p-6
hidden
md:block
">


                <h2 className="
text-xl
font-bold
mb-10
">

                    Career<span className="text-purple-500">
                        AI
                    </span>

                </h2>


                <nav className="
space-y-4
text-zinc-400
">


                    <Link
                        className="block hover:text-white"
                        href="/dashboard"
                    >
                        Overview
                    </Link>


                    <Link
                        className="block hover:text-white"
                        href="/dashboard/resumes"
                    >
                        My Resumes
                    </Link>


                    <Link
                        className="block hover:text-white"
                        href="/dashboard/cover-letters"
                    >
                        Cover Letters
                    </Link>


                    <Link
                        className="block hover:text-white"
                        href="/dashboard/billing"
                    >
                        Billing
                    </Link>


                    <Link
                        className="block hover:text-white"
                        href="/dashboard/settings"
                    >
                        Settings
                    </Link>


                </nav>


            </aside>




            {/* Main */}

            <div className="flex-1">


                <header className="
h-20
border-b
border-white/10
flex
items-center
justify-end
px-8
">


                    <UserButton />


                </header>



                <main className="p-8">

                    {children}

                </main>


            </div>


        </div>

    )

}