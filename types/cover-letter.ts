export type CoverLetterTemplate =
  | "modern"
  | "executive"
  | "professional";


export interface CoverLetterEditorData {
  id: string;

  title: string;

  template:
    CoverLetterTemplate;

  resumeId:
    string | null;

  recipientName:
    string;

  companyName:
    string;

  jobTitle:
    string;

  companyAddress:
    string;

  jobDescription:
    string;

  letterDate:
    string;

  opening:
    string;

  body:
    string;

  closing:
    string;

  signOff:
    string;

  createdAt:
    string;

  updatedAt:
    string;
}


export interface UpdateCoverLetterInput {
  title: string;

  template:
    CoverLetterTemplate;

  resumeId:
    string | null;

  recipientName:
    string;

  companyName:
    string;

  jobTitle:
    string;

  companyAddress:
    string;

  jobDescription:
    string;

  letterDate:
    string;

  opening:
    string;

  body:
    string;

  closing:
    string;

  signOff:
    string;
}


export interface GeneratedCoverLetterContent {
  opening: string;

  body: string;

  closing: string;

  remaining: number;

  monthlyLimit: number;
}