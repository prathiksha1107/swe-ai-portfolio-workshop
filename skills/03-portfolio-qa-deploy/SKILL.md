---
name: portfolio-qa-deploy
description: Quality-check an already personalized portfolio, safely fix clear technical defects, report deployment readiness, and deploy only after a separate explicit user approval following the QA report.
---

# Portfolio QA & Deploy

Validate an already personalized portfolio, prepare it for deployment, and enforce a
separate human approval before any deployment action. Do not regenerate portfolio
content, read the raw resume unless explicitly requested, or modify `PROFILE.md`.

This skill has two distinct modes:

1. **QA mode:** inspect, validate, make only safe technical fixes, report readiness,
   and stop.
2. **Deployment mode:** available only after a QA report was delivered in a previous
   assistant turn and the user then explicitly approves deployment in a new message.

An initial request that asks for both QA and deployment still runs QA mode only.

## QA mode

### Inspect before editing

Read the complete user-provided portfolio directory and understand its actual
architecture. Inspect relevant HTML, CSS, JavaScript, assets, images, resume files,
navigation, metadata, social and contact links, project links, and existing build or
validation configuration. Do not assume filenames or framework choices.

Do not read the original resume, rewrite `PROFILE.md`, or regenerate approved content.
Do not read or reveal `.env` values or other secret-bearing files.

### Content integrity

Check the public website for:

- template placeholders, Lorem Ipsum, fake projects or links, empty controls, broken
  project links, duplicated sections, and unresolved clarification markers;
- accidental private information or content that appears confidential;
- content/navigation mismatches caused by empty or removed sections.

Do not rewrite approved copy merely to improve style. Flag content concerns for the
user unless copy editing was explicitly requested. Never invent missing URLs,
projects, assets, facts, or personal information.

### Links, assets, and resume

Validate navigation anchors, relative paths, images, contact links, LinkedIn, GitHub,
project and demo links, external-link safety attributes, and download controls. When
an optional URL is missing, ensure its corresponding control is not displayed.

For contact configuration, verify that email links are structurally valid, LinkedIn
and GitHub use valid non-placeholder URLs, and no contact button is empty. If a
contact form is rendered, require a configured non-placeholder action endpoint,
`method="POST"`, visible labels, and required Name, Email, and Message fields with an
email input of `type="email"`. A public static-form endpoint is acceptable; a private
API key, token, password, or backend credential in frontend code is not.

If WhatsApp appears, verify that the approved profile explicitly contains
`Enable WhatsApp: Yes`, the `wa.me` number contains only the approved international
digits, any message is URL-encoded, and the external link uses safe new-tab
attributes. When WhatsApp is disabled, verify that no phone number appears in HTML,
JavaScript, metadata, comments, or hidden attributes. Intentionally disabled contact
forms and WhatsApp are not QA failures.

If a Resume button exists, verify that its target file exists, its path is correct,
and the file appears suitable for public download. Do not create a resume. When no
public resume is configured, report exactly: “Resume download is not configured.”

### Responsive and accessibility QA

Review desktop, tablet, and mobile behavior using available project or browser tools.
Pay particular attention to navigation, hero wrapping, experience timelines, project
cards, long technology labels, buttons, contact content, spacing, and horizontal
overflow.

Check semantic landmarks, heading hierarchy, navigation labels, keyboard-operable
controls, image alternative text, appropriate ARIA, visible focus behavior, skip
navigation, link/button semantics, and safe external-link attributes. Preserve the
existing design.

### Metadata

Verify the document language, viewport, page title, and meta description. Check a
favicon or social metadata only when the site already supports it. Report missing
Open Graph or social-preview metadata as an optional improvement, not a blocker, and
do not invent personal metadata.

### Technical validation and safe fixes

Use existing build, lint, typecheck, test, HTML, CSS, or JavaScript validation tools
when available. For a simple static site, perform lightweight structural checks for
IDs, anchors, paths, markup relationships, CSS integrity, and JavaScript syntax. Do
not install dependencies merely for optional validation.

Make only small, clearly correct technical fixes, such as repairing an obvious local
path to an existing asset, adding a missing safe external-link attribute, correcting
an unambiguous accessibility relationship, or resolving a clear mobile overflow.
Preserve design, approved content, and architecture. Do not broadly refactor working
code. Flag issues that require content choices, unknown URLs, new assets, design
judgment, or destructive changes.

### Secrets and privacy gate

Before readiness can be `READY`, check filenames, tracked files, configuration, and
public references for potential API keys, tokens, passwords, credentials, `.env`
files, internal URLs, private repository URLs, confidential documents, or other
secret-bearing artifacts. Never print a suspected secret's value.

If a potential secret or confidential artifact is found, stop further fixes and mark
the QA status `BLOCKED`. Identify only the issue type and file location. Do not deploy.
Contact configuration blocks deployment only when it creates a broken control,
exposes an unapproved phone number, or places a secret/private credential in public
code. Missing intentionally disabled optional contact features do not block.

### Optional analytics gate

Analytics is optional and should normally be configured only after the participant
has a working public URL. If analytics is absent, report it as an optional next step,
not a QA failure.

When Microsoft Clarity or another analytics service is present:

- confirm the participant explicitly approved analytics and owns the project;
- verify the tracking ID is real and is not copied from a workshop example;
- treat a public Clarity project ID as configuration, not a secret, but never expose
  account credentials, API keys, access tokens, or dashboard-sharing links;
- verify the tracking script uses the provider's HTTPS endpoint, loads asynchronously,
  appears once per public page, and does not use a malformed Markdown URL;
- check that the configured project URL matches the final public site;
- report that analytics identifies aggregate behavior and approximate location, not
  a visitor's real-world identity;
- require the participant to consider applicable cookie-consent and privacy-notice
  rules before enabling tracking, especially for consent-required regions;
- do not enable behavioral analytics on a site directed to children or an audience
  prohibited by the provider's current terms;
- after deployment, verify the live page contains the expected tracking ID and that
  the provider script loads successfully without claiming dashboard data is present.

Use `../../guides/04-add-free-analytics.md` as the participant-facing workshop
procedure.

### QA report and mandatory stop

After checks and safe fixes, provide:

## Portfolio QA

**Status: READY / NEEDS REVIEW / BLOCKED**

### Checked

Summarize navigation, links, responsive structure, accessibility, placeholders,
assets, metadata, resume, privacy, and technical validation.

### Issues fixed

List only changes actually made.

### Remaining issues

List items requiring human input or blocking deployment.

### Optional improvements

Keep non-blocking suggestions separate.

Then stop and ask exactly: “Portfolio QA is complete. Would you like me to deploy
it?” Do not deploy, commit, push, configure hosting, or otherwise publish in this
same run.

## Deployment mode

Enter this mode only when all of the following are true:

- a completed QA report was delivered in a previous assistant turn;
- the user explicitly approves deployment in a new message, such as “Deploy,” “Yes,
  deploy it,” “Publish it,” or “Proceed with deployment”;
- the prior status was `READY`, or the user has resolved every `NEEDS REVIEW` item;
- no `BLOCKED` issue remains.

If prior QA completion cannot be verified, run QA mode and stop again. If files
changed after QA, revalidate the affected site; if the changes are material or create
new issues, provide a new QA report and require another later approval.

### Deployment preparation

Prefer GitHub Pages for static HTML/CSS/JavaScript unless the user explicitly selects
another supported provider. Before changing external state:

1. Determine whether the site is in a Git repository, the current branch, configured
   remotes, repository visibility when available, and the exact directory intended
   for publication.
2. Confirm that the deployment will not overwrite or publish unrelated files,
   private artifacts, or another repository.
3. Identify required authentication, repository, owner, branch, Pages source, and
   authorization. Report missing information instead of inventing configuration.
4. Explain or request any additional authorization required by the environment before
   performing the external mutation.

Keep a static site’s existing `index.html`, `style.css`, `script.js`, and `assets/`
structure where possible. Do not add a framework or build system solely for hosting.
Make only the smallest necessary GitHub Pages configuration change.

### Deployment result

After an actually completed deployment, report:

- provider;
- repository, when applicable;
- deployed branch or Pages source;
- public URL, when available;
- remaining configuration;
- post-deployment validation result.

Do not claim success without evidence that deployment completed. If deployment fails,
report the failure and preserve the last known safe state; do not repeatedly retry an
external mutation without a clear, safe reason.
