# Case studies — what still needs you

The three case studies at `/projects/<slug>` are written from your own READMEs,
your resume data, and copy already on the site. Nothing in them is invented.

Where a section would have required knowledge only you have, I left it out
rather than filling it with plausible-sounding prose. Those gaps are listed in
the `missing` field of each entry in `src/lib/case-studies.ts` and are **not**
rendered on the page — so the live pages read as complete, they are just
thinner than they could be.

## Split-Inference (`/projects/split-inference`) — thinnest

1. **Measured latency figures per split point.** The page says you profiled all
   22; it cannot say what you found. This is the single biggest gap.
2. **Why AlexNet specifically**, and what architecture comes next.
3. **How the link characteristics were obtained** — measured on real WiFi/LTE
   links, or applied as published profiles?

## resumeGit (`/projects/resumegit`)

1. Whether it was submitted to, or placed at, OpenAI Build Week.
2. Any usage or evaluation numbers.

## WhoSponsors (`/projects/whosponsors`)

Nothing missing — the README carried enough. Worth confirming the 831k filings
figure, which comes from your site copy rather than the README.

## Also worth your attention

- **The Split-Inference card image** currently uses
  `/images/gallery/programming-wlkata-robot.jpg`, which is a photo from the
  earlier Thad Cochran robotics work, not this project. A simple architecture
  diagram (device → edge → cloud) would be both accurate and more legible at
  card size.
- **Record a PageSpeed baseline yourself.** The anonymous API quota was
  exhausted when I tried, so there is no "before" number. Run Home and Projects
  on mobile and desktop at pagespeed.web.dev before deploying, then again after.
- **Verify the domain in Google Search Console and submit the sitemap** — only
  you can do this.
- **The three-person task test** in item 10 of the audit is yours to run.
