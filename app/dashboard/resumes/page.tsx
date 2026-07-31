import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getResumes } from "@/actions/get-resumes";


export default async function Resumes() {

    const resumes =
        await getResumes();



    return (

        <div>


            <h1 className="
text-3xl
font-bold
">

                My Resumes

            </h1>


            <Link href="/dashboard/resumes/new">

                <Button
                    className="
mt-6
bg-purple-600
">

                    + Create Resume

                </Button>

            </Link>



            <div className="
grid
md:grid-cols-3
gap-5
mt-10
">


                {
                    resumes.map((resume) => (


                        <div
                            key={resume.id}
                            className="
rounded-xl
border
border-white/10
bg-white/5
p-5
">


                            <h3 className="
font-semibold
">

                                {resume.title}

                            </h3>


                            <p className="
text-sm
text-zinc-400
mt-2
">

                                Template:
                                {resume.template}

                            </p>


                        </div>


                    ))
                }



            </div>


        </div>

    )

}