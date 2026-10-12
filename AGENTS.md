# Project Instructions for Google Antigravity

## Role

Act as a senior frontend architect, Next.js engineer, UI/UX designer, and quality assurance engineer.

## Source of Truth

- Read `SPEC.md` before implementing the application.
- Treat `SPEC.md` as the authoritative product specification.
- If requirements are unclear, identify the ambiguity instead of inventing property details.
- Keep `README.md` updated as implementation progresses.

## Mandatory Technology Constraints

- Next.js App Router.
- JavaScript only; do not use TypeScript.
- React and Tailwind CSS.
- Vercel-compatible static deployment.
- No backend, database, authentication, API routes, server actions, Supabase, Firebase, payment gateways, or WhatsApp functionality.
- No unnecessary external services.

## Architecture

- Keep all editable rental information in `src/data/propertyData.js`.
- Treat that file as the single source of truth for prices, availability, rental-space descriptions, images, facilities, rules, charges, and terms.
- Build reusable React components rather than duplicating content.
- Do not store permanent shared property data in localStorage or sessionStorage.
- Do not create a fake admin dashboard.
- Do not hardcode the same property information in multiple components.

## Development Practices

- Inspect the existing workspace before modifying files.
- Preserve useful existing work.
- Plan major implementation steps before coding.
- Use clear, maintainable naming conventions.
- Keep components small and focused.
- Use semantic HTML and accessible controls.
- Validate configuration values and handle missing media gracefully.
- Never invent property features, photographs, prices, or legal terms.
- Do not leave essential buttons or features non-functional.
- Do not silently omit requirements from `SPEC.md`.

## Testing and Verification

- Install only necessary dependencies.
- Run the available lint checks and production build.
- Fix errors before declaring the project complete.
- Verify prices, availability indicators, empty states, and individual rental-space pages.
- Test the mobile layout.
- Confirm that the project works without a backend.
- Never claim a test passed unless it was actually executed.
- Clearly report any tests that could not be performed.

## Deployment

- Follow the static deployment requirements in `SPEC.md`.
- Document setup, local development, GitHub, and Vercel deployment in `README.md`.
- Do not deploy, purchase services, or expose credentials without explicit authorization.
- Never commit API keys, secrets, or private personal information.

## Final Deliverables

Deliver the complete working project, maintainable source code, centralized property configuration, and accurate documentation.

Before finishing, summarize what was implemented, which tests were run, and how the owner can update the property information and redeploy the site.