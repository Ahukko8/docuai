import {
    currentUser
} from "@clerk/nextjs/server";

import {
    Button
} from "@/components/ui/button";


export default async function Dashboard() {


    const user =
        await currentUser();


    return (

        <div>


            <h1 className="
text-4xl
font-bold
">

                Welcome back, {user?.firstName}

            </h1>


            <p className="
text-zinc-400
mt-3
">

                Create professional resumes powered by AI.

            </p>




            <div className="
grid
md:grid-cols-3
gap-6
mt-10
">


                <div className="
rounded-xl
border
border-white/10
bg-white/5
p-6
">

                    <h3 className="font-semibold">
                        Resumes
                    </h3>

                    <p className="
text-3xl
mt-4
">
                        0
                    </p>

                </div>




                <div className="
rounded-xl
border
border-white/10
bg-white/5
p-6
">

                    <h3 className="font-semibold">
                        AI Credits
                    </h3>

                    <p className="
text-3xl
mt-4
">
                        5
                    </p>

                </div>




                <div className="
rounded-xl
border
border-white/10
bg-white/5
p-6
">

                    <h3 className="font-semibold">
                        Plan
                    </h3>

                    <p className="
text-xl
mt-4
text-purple-400
">
                        Free
                    </p>

                </div>


            </div>




            <Button
                className="
mt-10
bg-purple-600
"
            >

                Create Resume

            </Button>



        </div>

    )

}