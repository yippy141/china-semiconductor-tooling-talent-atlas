# Final QA checklist

## Build checks

Run:

```bash
npm run build:data
npm run lint
npm run build
```

All must pass before deploy.

## Click path

Open the deployed site and test:

```text
/ 
/firms
/firms/amec
/firms/piotech
/segments/deposition
/monitor
/explorer
/sources
/methodology
/essay
```

## Homepage test

A first-time reader should understand these within 10 seconds:

- The subject is China's semiconductor-equipment workforce.
- The question is whether Chinese toolmakers can staff customer-site support and production use.
- The site uses public records.
- Firm pages and source trails are available.

## Language test

Search the codebase for these terms:

```bash
grep -Rni "look for scarce\|directional, not\|actually\|surface\|sharpens\|leverage\|robust\|nuanced\|landscape\|why this matters\|visibility is not depth" app components data/editorial
```

Replace any user-facing instance unless it appears in a quoted source or developer note.

## Caveat placement test

Caveats may appear in:

- footer notes
- methodology page
- source ledger
- chart notes

Caveats should not appear in:

- title
- deck
- card headings
- primary buttons

## Data integrity test

Check:

- No internal SharePoint URLs are exposed on the public site.
- No client meeting notes are exposed.
- No individual scientist profiles are used.
- No page claims exact segment headcount unless the source says it.
- No page claims capability parity or technical readiness.
- All firm claims point to public sources.

## Product test

Ask a tester to answer after two minutes:

1. What is this site for?
2. Who would use it?
3. What is the main claim?
4. What would they click next?

If they cannot answer, the homepage still reads too much like a database.

## Deployment checklist

Before sending to your boss:

- Confirm Vercel deployment is the latest commit.
- Open the site in an incognito browser.
- Test mobile width.
- Test all links in the hero and firm cards.
- Take three screenshots: hero, workforce chart, firm dossier.
- Prepare the one-minute demo script.
