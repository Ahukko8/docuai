"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero(){

return (

<section className="relative pt-40 pb-24 overflow-hidden">


<div className="max-w-5xl mx-auto text-center px-6">


<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{duration:.6}}
>


<div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">

✨ AI-powered career assistant

</div>



<h1 className="text-5xl md:text-7xl font-bold tracking-tight">

Create a resume that
<br/>

<span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">

gets you hired

</span>

</h1>



<p className="mt-8 text-lg text-zinc-400 max-w-2xl mx-auto">

Build ATS-friendly resumes, generate personalized cover letters,
and optimize your job applications with artificial intelligence.

</p>



<div className="mt-10 flex justify-center gap-4">


<Button
size="lg"
className="bg-purple-600 hover:bg-purple-700"
>

Create your resume

</Button>


<Button
size="lg"
variant="outline"
>

View templates

</Button>


</div>


</motion.div>


</div>


</section>

)

}