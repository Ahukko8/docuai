/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import {supabaseAdmin} from "@/lib/supabase-server";
import { auth } from "@clerk/nextjs/server";



export async function createResume(data:any){

const {userId}=await auth();


if(!userId){

throw new Error(
"Unauthorized"
);

}


const {data:resume,error}=

await supabaseAdmin
.from("resumes")
.insert({

user_id:userId,

title:
data.title || "Untitled Resume",

template:
data.template || "modern",

personal_info:{
name:data.name,
email:data.email
},

experience:{
content:data.experience
},

education:{
content:data.education
},

skills:{
content:data.skills
}

})
.select()
.single();



if(error){

console.error(error);

throw new Error(
error.message
);

}


return resume;


}