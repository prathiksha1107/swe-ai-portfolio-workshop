# Profile to Portfolio

## What this skill does

This skill turns a human-approved `PROFILE.md` into a personalized version of an
existing portfolio template. It changes the content while preserving the template's
design, responsiveness, and accessibility.

It never uses the raw resume as its source of truth and never invents missing career
information.

## Prerequisites

- An existing supported portfolio template.
- A completed and carefully reviewed `PROFILE.md`.
- This exact line inside the profile:

  `Status: APPROVED FOR PORTFOLIO GENERATION`

Without that marker, the skill stops before changing the website.

## Example usage

> Use the Profile-to-Portfolio skill to personalize Template 1 using
> `templates/01-minimal-professional/PROFILE.md`. Preserve the existing design. Stop
> after generating the website so I can review it before deployment.

The skill reads the existing template before editing, uses only approved profile
facts, removes unsupported demo content and links, validates its changes, and then
stops for your visual review. It does not deploy, commit, or push automatically.

## Safety model

**Resume → structured profile → human review → website generation → human review →
deployment**

The two human-review checkpoints are intentional. First, you approve the structured
facts. Then you review how those facts appear publicly before choosing to deploy.
