


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {


    return (

        <div className="min-h-screen bg-black text-white flex">

            <div className="flex-1">
                <main className="p-8">

                    {children}

                </main>


            </div>


        </div>

    )

}