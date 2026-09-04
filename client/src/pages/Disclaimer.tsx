// Split Signal privacy page: warm editorial paper, cobalt navigation accents, and quiet technical copy.
import { FaArrowLeft, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link } from "wouter";

const sections = [
  {
    title: "1. Information We Collect",
    body: "When you use the contact form, you may provide your contact details and an optional message. The portfolio itself does not maintain a contact database. Hosting, analytics, fonts, image providers, and other infrastructure may also process technical request information such as browser, device, approximate location, referral, and page-usage data according to their own configurations and policies.",
  },
  {
    title: "2. How We Use Your Information",
    body: "Contact information and message content are used to respond to portfolio enquiries. Technical usage information may be used to understand how the portfolio is used, maintain the site, improve performance, and identify technical issues. Information is not used by this portfolio for automated decision-making or unsolicited marketing campaigns.",
  },
  {
    title: "3. Contact Form",
    body: "The Contact field is required and the Message field is optional. Submitting the form opens a message in your device’s email client using a mailto link addressed to rishebs123456@gmail.com. The contents are then handled by the email services used by you and by the recipient. Please avoid sending passwords, payment details, or other sensitive information through this form.",
  },
  {
    title: "4. Cookies and Analytics",
    body: "This portfolio includes an Umami analytics script configured through the site deployment. Analytics may process technical usage information depending on the active configuration. The site also contains browser theme-storage logic, although the current interface uses a fixed presentation. If non-essential cookies or similar device technologies are enabled in a future configuration, the consent and control options required by applicable law will be provided before those technologies are used.",
  },
  {
    title: "5. Third-Party Services",
    body: "The portfolio may request resources from third-party services including analytics infrastructure, Google Fonts, image providers such as Unsplash, GitHub, LinkedIn, hosting and content-delivery infrastructure, and your email provider when you submit an enquiry. Those services operate under their own privacy notices and terms.",
  },
  {
    title: "6. Data Retention",
    body: "The portfolio does not intentionally store contact submissions in its own database. Enquiry messages may remain in the recipient’s mailbox and in email-service backups according to the retention practices of those services. Hosting, analytics, CDN, and security logs may be retained for the periods configured by the relevant providers and for legitimate operational or security purposes.",
  },
  {
    title: "7. Data Security",
    body: "The portfolio is designed to minimize direct collection and does not request account passwords or payment information. Reasonable technical and organizational measures are used for the site and its hosting environment. No internet transmission or storage system can be guaranteed to be completely secure, so please share only information needed to start a conversation.",
  },
  {
    title: "8. Your Rights",
    body: "Depending on where you live and which privacy law applies, you may have rights to request access to, correction of, deletion of, restriction of, or objection to the processing of your personal information. You may also have rights relating to portability or opting out of certain data uses. Contact rishebs123456@gmail.com to make a request; applicable law may limit the response or require identity verification.",
  },
  {
    title: "9. External Links",
    body: "This portfolio links to external websites including GitHub and LinkedIn. Once you leave this site, the external service’s privacy policy, security practices, and terms apply. We are not responsible for the content or privacy practices of external websites.",
  },
  {
    title: "10. Changes to This Privacy Policy",
    body: "This page may be updated when the portfolio’s data practices, analytics configuration, vendors, or legal obligations change. The latest version will be published on this page with its updated date. Material changes should be reviewed before you continue to use the contact or analytics features.",
  },
  {
    title: "11. Contact",
    body: "For privacy questions, rights requests, or concerns about this portfolio, contact Rishebs at rishebs123456@gmail.com. The portfolio is a personal professional site operated from India, and the applicable legal requirements may depend on your location and the nature of the interaction.",
  },
];

export default function Disclaimer() {
  return (
    <div className="site-shell min-h-screen bg-[#f5f1e8] text-[#1f1d1a]">
      <main className="pt-32 sm:pt-40">
        <section className="container pb-20 sm:pb-28">
          <div className="flex flex-col gap-8 border-b border-black/10 pb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-12">
            <div className="max-w-3xl">
              <p className="eyebrow">LEGAL / PRIVACY</p>
              <h1 className="display-title mt-5 max-w-3xl text-[clamp(1.9rem,6vw,3.4rem)] tracking-[-0.07em] whitespace-normal md:whitespace-nowrap break-words">
                Privacy, without the fog.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#1f1d1a]/65 sm:text-lg sm:leading-8">
                A plain-language explanation of what this portfolio collects, why it may be used, and where third-party services enter the picture.
              </p>
            </div>
            <p className="max-w-[13rem] text-xs uppercase leading-5 tracking-[0.12em] text-[#1f1d1a]/45">Last updated · September 2026</p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-[0.42fr_1fr] lg:gap-16">
            <aside className="h-fit rounded-[1.5rem] border border-black/10 bg-[#fbf8f1] p-5 shadow-[0_8px_22px_rgba(87,69,52,0.05)] lg:sticky lg:top-28"
            >
              <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-[#1f1d1a]/45">At a glance</p>
              <p className="mt-4 text-sm leading-6 text-[#1f1d1a]/70">This is a personal portfolio, not an account-based product. The main visitor-initiated data flow is the optional conversation started through your email client.</p>
              <a className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--cobalt)] transition hover:gap-3" href="mailto:rishebs123456@gmail.com">
                Ask a privacy question <FaArrowUpRightFromSquare aria-hidden="true" size={11} />
              </a>
            </aside>

            <div className="grid gap-4">
              {sections.map((section) => (
                <section className="rounded-[1.5rem] border border-black/10 bg-[#fbf8f1] p-6 shadow-[0_8px_22px_rgba(87,69,52,0.05)] sm:p-8" key={section.title}>
                  <h2 className="font-display text-xl font-semibold tracking-[-0.045em] text-[#1f1d1a] sm:text-2xl">{section.title}</h2>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-[#1f1d1a]/65 sm:text-base sm:leading-8">{section.body}</p>
                </section>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-black/10 pt-6">
            <Link className="inline-flex items-center gap-2 text-sm font-semibold text-[#1f1d1a] transition hover:text-[var(--cobalt)]" href={import.meta.env.BASE_URL}>
              <FaArrowLeft aria-hidden="true" size={12} />
              Back to profile
            </Link>
            <a className="inline-flex items-center gap-2 text-sm text-[#1f1d1a]/55 transition hover:text-[#1f1d1a]" href="#top">
              Back to top <FaArrowUpRightFromSquare aria-hidden="true" className="rotate-[-45deg]" size={10} />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
