# Case studies — what still needs you

The three case studies at `/projects/<slug>` are written from your own READMEs,
your resume data, and copy already on the site. Nothing in them is invented.

Where a section would have required knowledge only you have, I left it out
rather than filling it with plausible-sounding prose. Those gaps are listed in
the `missing` field of each entry in `src/lib/case-studies.ts` and are **not**
rendered on the page — so the live pages read as complete, they are just
thinner than they could be.

## Distributed AI Systems (`/projects/split-inference`) — thinnest

Confirmed with you: both phases are real — the AlexNet split-point profiling
and the YOLO verification. The page now covers both.

1. **Measured latency per AlexNet split point.** The page says you profiled all
   22 and cannot say what you found, or where the minimum landed on each link.
   This is the single biggest gap, and it is also what the parked benchmark
   explorer needs — see MEASUREMENT.md.
2. **The verification tolerance for the AlexNet pipeline.** The old site said
   "within 1e-4"; your resume gives 0.000137 for YOLO. Those are different
   numbers about different runs, so the AlexNet one is currently unstated.
3. **How the link characteristics were obtained** — measured on real WiFi/LTE
   links, or applied as published profiles?
4. **How execution is partitioned in the YOLO phase**, and whether the split
   point is fixed or chosen at runtime.

## resumeGit (`/projects/resumegit`)

1. Whether it was submitted to, or placed at, OpenAI Build Week.
2. Any usage or evaluation numbers.

## WhoSponsors (`/projects/whosponsors`)

Nothing missing — the README carried enough. Worth confirming the 831k filings
figure, which comes from your site copy rather than the README.

## Also worth your attention

- **ValueStop is not featured.** You chose to keep WhoSponsors,
  Split-Inference and resumeGit as the homepage three. Worth revisiting — 100
  active users and 20 paying customers is the strongest traction signal you
  have, and it currently sits on the Projects page.
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
