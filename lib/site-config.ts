function requiredPublicEnv(
  name: string,
  value: string | undefined
) {
  const cleaned =
    value?.trim();


  if (!cleaned) {
    throw new Error(
      `Missing required environment variable: ${name}`
    );
  }


  return cleaned;
}


function removeTrailingSlash(
  value: string
) {
  return value.replace(
    /\/+$/,
    ""
  );
}


const siteUrl =
  removeTrailingSlash(
    requiredPublicEnv(
      "NEXT_PUBLIC_SITE_URL",
      process.env
        .NEXT_PUBLIC_SITE_URL
    )
  );


const supportEmail =
  requiredPublicEnv(
    "NEXT_PUBLIC_SUPPORT_EMAIL",
    process.env
      .NEXT_PUBLIC_SUPPORT_EMAIL
  );


const businessAddress =
  process.env
    .NEXT_PUBLIC_BUSINESS_ADDRESS
    ?.trim() || null;


export const siteConfig = {
  productName:
    "DocuAI",

  legalName:
    "ClickBuyHub LLC",

  siteUrl,

  supportEmail,

  businessAddress,

  description:
    "DocuAI is an AI-powered resume creation platform that helps users create, improve, format, save, and export professional resumes.",

  lastUpdated:
    "August 9, 2026",
} as const;