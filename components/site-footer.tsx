import Link from "next/link";

import {
  FileText,
} from "lucide-react";

import {
  siteConfig,
} from "@/lib/site-config";


const productLinks = [
  {
    label: "Home",
    href: "/",
  },

  {
    label: "Pricing",
    href: "/pricing",
  },

  {
    label: "Contact",
    href: "/contact",
  },
];


const legalLinks = [
  {
    label:
      "Terms & Conditions",

    href:
      "/terms",
  },

  {
    label:
      "Privacy Policy",

    href:
      "/privacy",
  },

  {
    label:
      "Refund & Cancellation",

    href:
      "/refund-policy",
  },
];


export default function SiteFooter() {
  return (
    <footer
      className="
        border-t
        border-white/10
        bg-zinc-950
        text-white
      "
    >
      <div
        className="
          mx-auto
          grid
          max-w-7xl
          gap-10
          px-5
          py-12
          sm:px-8
          md:grid-cols-[1.5fr_1fr_1fr]
        "
      >
        <div>
          <Link
            href="/"

            className="
              inline-flex
              items-center
              gap-2
              font-semibold
            "
          >
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                bg-purple-600
              "
            >
              <FileText className="h-4 w-4" />
            </div>


            {siteConfig.productName}
          </Link>


          <p
            className="
              mt-4
              max-w-sm
              text-sm
              leading-6
              text-zinc-500
            "
          >
            AI-powered resume creation,
            improvement, formatting, and
            professional PDF export.
          </p>


          <p
            className="
              mt-4
              text-xs
              text-zinc-600
            "
          >
            Operated by{" "}
            {siteConfig.legalName}
          </p>
        </div>


        <FooterGroup
          title="Product"
          links={
            productLinks
          }
        />


        <FooterGroup
          title="Legal"
          links={
            legalLinks
          }
        />
      </div>


      <div
        className="
          border-t
          border-white/10
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            gap-3
            px-5
            py-5
            text-xs
            text-zinc-600
            sm:px-8
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <p>
            © {new Date().getFullYear()}{" "}
            {siteConfig.legalName}.
            All rights reserved.
          </p>


          <a
            href={`mailto:${siteConfig.supportEmail}`}

            className="
              transition
              hover:text-zinc-300
            "
          >
            {siteConfig.supportEmail}
          </a>
        </div>
      </div>
    </footer>
  );
}


interface FooterGroupProps {
  title: string;

  links: {
    label: string;

    href: string;
  }[];
}


function FooterGroup({
  title,
  links,
}: FooterGroupProps) {
  return (
    <div>
      <h3
        className="
          text-sm
          font-semibold
        "
      >
        {title}
      </h3>


      <ul
        className="
          mt-4
          space-y-3
        "
      >
        {links.map(
          (link) => (
            <li
              key={link.href}
            >
              <Link
                href={
                  link.href
                }

                className="
                  text-sm
                  text-zinc-500
                  transition
                  hover:text-white
                "
              >
                {
                  link.label
                }
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}