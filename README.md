# Rishebs Portfolio

A responsive personal portfolio for **Rishebs**, a full-stack engineer focused on AI systems, SaaS products, and useful business workflows.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- GSAP + ScrollTrigger for page choreography
- Framer Motion for component-level transitions
- React Icons for iconography
- Wouter-ready static web scaffold

## Design direction

The visual system is **Split Signal**: a dark technical hero transitions into warm editorial case-study surfaces. Space Grotesk carries display typography and DM Sans supports readable body copy. Signal Cobalt connects links, project numerals, focus states, primary actions, and the vertical project rail across both dark and light themes.

## Content structure

Featured work is organized around three real project stories:

1. **Nurturely** — multi-module SaaS business suite covering CRM, HR, invoicing, and accounts.
2. **Sneaket** — AI-powered sneaker commerce platform with LLM tool-calling and gated checkout.
3. **FIFAC Studio Admin** — client operations dashboard covering leads, students, attendance, and payments.

The page also includes experience, skills, supporting work, direct contact links, and a downloadable PDF resume at `/resume/Risheb.s_Resume.pdf`.

## Development

```bash
npm install
npm run dev
```

Run quality checks with:

```bash
npm run check
npm run build
```

Hosting and deployment are intentionally left to the owner.

## Asset handling

Generated visual assets use the project-scoped `/manus-storage/` URLs. The temporary avatar is the user-provided SVG uploaded as `rishebs-avatar`. The current resume download is a truthful text export of the supplied CV and can be replaced with a final PDF later.

## Cloudflare Pages

Deploy the Vite site through Cloudflare Pages with `npm run build` as the build command and `dist/public` as the output directory. The `client/public/_redirects` file preserves client-side routes such as `/disclaimer`.
