# Step 4: Add Free Visitor Analytics

This optional workshop step uses Microsoft Clarity to answer questions such as:

- Which pages do people visit?
- Where do visitors click and how far do they scroll?
- Which device and approximate country or region do they use?
- Where do visitors appear to lose interest or leave?
- Are there dead clicks, repeated clicks, or confusing interactions?

Clarity provides dashboards, session recordings, and click, scroll, area, and
attention heatmaps. It does **not** tell you a visitor's name.

## Before you begin

Finish QA and deploy the portfolio first. You need its final GitHub Pages URL.
Analytics is optional. Ask the workshop facilitator before enabling it if the site
is intended for anyone under 18 or if you are unsure about privacy requirements.

## 1. Create your own Clarity project

1. Go to <https://clarity.microsoft.com/> and sign in.
2. Create a new project.
3. Use your complete GitHub Pages address, including the repository path.
4. Open **Settings -> Setup -> Get tracking code**.
5. Copy the complete tracking code.

Every participant needs a separate project. Do not copy a project ID from the
workshop example or another attendee.

## 2. Ask AI to install it

Use this prompt and paste your tracking code where indicated:

```text
Add my human-approved Microsoft Clarity tracking code to my portfolio.

Tracking code:
[PASTE THE COMPLETE CODE FROM CLARITY]

Requirements:
- Preserve the existing design and content.
- Add the code once inside the <head> of every public HTML entry page.
- Repair Markdown formatting if it changed the script URL; the endpoint must be
  https://www.clarity.ms/tag/ followed by my project ID.
- Do not reuse any project ID already present in workshop examples.
- Do not add account credentials, API keys, or dashboard-sharing links.
- Run the existing QA/build checks.
- Do not deploy until I approve the QA result in a later message.
```

The short project ID inside a Clarity browser tracking snippet is expected to be
public. Your Microsoft password and account credentials are never placed in code.

## 3. Review privacy before publishing

Behavior analytics records interaction details. Depending on where visitors live,
you may need a privacy notice, cookie controls, or consent before tracking begins.
Use Clarity's current consent documentation and follow the rules that apply to your
audience. Keep sensitive content masked, and never intentionally record passwords,
private messages, health information, or confidential workplace material.

## 4. Run QA and deploy

Ask the AI assistant to use Skill 03 again. Review its report, then provide a
separate deployment approval. Analytics installation does not remove the normal QA
and human-approval stop.

## 5. Verify the installation

After deployment:

1. Open the live portfolio in a private browser window.
2. Click a few links and scroll through the page.
3. In browser developer tools, open **Network** and search for `clarity` or `collect`.
4. Confirm requests go to `clarity.ms`.
5. Open the correct Clarity project and check **Recordings**.

Recordings can appear quickly. Heatmap clicks may take about 30 minutes.

## 6. View heatmaps

Use a desktop browser; Clarity's mobile dashboard has fewer features.

1. Open **Heatmaps** in Clarity.
2. Create a heatmap for the exact live page URL.
3. Choose Click, Scroll, Attention, or Area.
4. Set the date to **Today** and clear filters when troubleshooting.
5. Create separate heatmaps for different portfolio template URLs.

Heatmaps need real interactions. A page view without clicks or scrolling produces
very little information.

## How to use the results

- If visitors rarely scroll to projects, shorten the introduction or move projects
  higher.
- If an important button receives no clicks, improve its label or placement.
- If visitors repeatedly click something that is not interactive, change its visual
  treatment or make the expected action clearer.
- If mobile visitors leave early, retest performance and responsive layout.

Use trends across several visits. Do not redesign a portfolio because of one session.

## Remove analytics later

Delete the Clarity script from every public `<head>`, run QA, and redeploy. Removing
the script stops new collection; use the Clarity dashboard for project or retained
data settings.
