import {
    getResumeAction
}
    from "@/actions/resumes/get-one";


export default async function EditResume({

    params

}: {

    params: {
        id: string
    }

}) {


    const resume =
        await getResumeAction(
            params.id
        );



    return (

        <div>


            <h1 className="
text-3xl
font-bold
">

                Edit Resume

            </h1>


            <pre className="
mt-8
bg-white/5
p-5
rounded-xl
">

                {JSON.stringify(
                    resume,
                    null,
                    2
                )}

            </pre>


        </div>

    )

}