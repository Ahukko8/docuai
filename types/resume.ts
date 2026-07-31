export type ResumeTemplate =
"modern"
|
"executive"
|
"creative";


export interface ResumeExperience {

company:string;

position:string;

startDate:string;

endDate:string;

description:string[];

}



export interface Education {

school:string;

degree:string;

year:string;

}



export interface Resume {

id:string;

userId:string;

title:string;

template:ResumeTemplate;

summary:string;

experience:ResumeExperience[];

education:Education[];

skills:string[];

createdAt:string;

updatedAt:string;

}