# Portfolio QA & Deploy

## What this skill does

This skill handles the final workshop stage:

**Finished portfolio → QA → human approval → deployment**

It checks an existing personalized site, makes only small and clearly safe technical
fixes, and reports whether the portfolio is ready to publish. It does not regenerate
portfolio content or change `PROFILE.md`.

## What it checks

- Content placeholders and accidental private information
- Navigation, internal links, social links, and project links
- Desktop, tablet, and mobile structure
- Accessibility and keyboard use
- Images, assets, and relative paths
- Resume download configuration
- Page title and metadata
- Secrets and privacy risks
- Existing builds, tests, linting, or lightweight static validation
- GitHub Pages readiness for static sites
- Optional analytics configuration, ownership, consent, and privacy disclosure

## Safety

The skill **never deploys during the initial QA run**. It first gives you a QA report
and asks whether you want to deploy.

Deployment requires a separate, explicit approval in a new message. A potential
secret or confidential file blocks deployment. Missing repository, authentication,
branch, or hosting information is reported rather than invented.

After deployment, analytics remains optional. Use the
[free analytics guide](../../guides/04-add-free-analytics.md) to create a
participant-owned Clarity project, add its tracking code, and rerun this skill before
publishing that change.

## Example usage

> Use the Portfolio QA & Deploy skill on `templates/01-minimal-professional/`.
> Run QA only. Do not deploy until I approve it.

After reviewing the QA report and resolving any issues, you can reply with a clear
instruction such as “Deploy it.” The skill will then verify the repository and
deployment details before publishing anything.
