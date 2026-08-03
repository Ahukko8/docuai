export type ResumeTemplate =
  | "modern"
  | "executive"
  | "creative";


export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
}


export interface ResumeExperience {
  id: string;

  company: string;

  position: string;

  startDate: string;

  endDate: string;

  description: string;
}


export interface ResumeEducation {
  id: string;

  school: string;

  degree: string;

  startDate: string;

  endDate: string;
}


export interface ResumeEditorData {
  id: string;

  title: string;

  template: ResumeTemplate;

  personalInfo: PersonalInfo;

  summary: string;

  experience: ResumeExperience[];

  education: ResumeEducation[];

  skills: string[];
}


export interface UpdateResumeInput {
  title: string;

  template: ResumeTemplate;

  personalInfo: PersonalInfo;

  summary: string;

  experience: ResumeExperience[];

  education: ResumeEducation[];

  skills: string[];
}