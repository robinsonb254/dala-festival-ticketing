# Dala Festival 2026 — Google visibility monitoring

Updated: 25 November 2026  
Primary market: Kenya, with Nairobi as the priority city  
Search Console property: sc-domain:dalafestivaltickets.com

## Pages to monitor

| Page | Main search intent |
| --- | --- |
| https://dalafestivaltickets.com/ | Dala Festival tickets; Dala Festival Nairobi |
| https://dalafestivaltickets.com/dala-festival-2026-tickets | Dala Festival 2026 tickets; buy Dala Festival tickets |
| https://dalafestivaltickets.com/ferre-gola-nairobi-december-2026 | Ferré Gola Nairobi 2026; Ferré Gola Nairobi tickets |
| https://dalafestivaltickets.com/dala-festival-2026-venue-location | Dala Festival ASK Arena; Dala Festival venue Nairobi |
| https://dalafestivaltickets.com/tickets/regular | Dala Festival Regular tickets |
| https://dalafestivaltickets.com/tickets/vip | Dala Festival VIP tickets |
| https://dalafestivaltickets.com/tickets/vvip | Dala Festival VVIP tickets |
| https://dalafestivaltickets.com/tickets/table-of-4 | Dala Festival Table of 4 |
| https://dalafestivaltickets.com/tickets/table-of-8 | Dala Festival Table of 8 |

## Priority query set

1. ferré gola kenya 2026
2. dala festival nairobi
3. dala festival ask arena
4. dala festival tickets kenya
5. buy dala festival tickets
6. dala festival vvip tickets
7. ferré gola nairobi tickets
8. dala festival vip tickets
9. dala festival 2026 tickets
10. dala festival tickets

Keep the primary reporting market set to Kenya and inspect mobile performance first. Do not treat one manually observed search result as a stable ranking position.

## Weekly Search Console routine

1. Open Performance → Search results for the domain property.
2. Compare the latest complete 7-day period with the previous 7 days, and review a 28-day view for direction. Search data can be delayed; avoid drawing conclusions from incomplete recent dates.
3. Review clicks, impressions, CTR and average position together. Segment by query, page, country and device.
4. Filter country to Kenya, then inspect mobile separately from desktop.
5. Compare the query clusters above with the intended landing pages. If the same query repeatedly shows the wrong page, inspect internal links, titles and page intent before creating another URL.
6. Review Indexing → Pages for excluded, crawled-not-indexed, duplicate and canonical issues.
7. Use URL Inspection after a production deployment for the homepage, ticket guide, Ferré Gola page, venue page and any changed ticket-category pages. Confirm the live URL, Google-selected canonical and rendered content before requesting indexing.
8. Review the submitted sitemap and check that all important public URLs return successfully.
9. Review HTTPS, mobile usability / Core Web Vitals and Search appearance enhancements. Do not add fabricated ratings, reviews, stock, shipping or return-policy data to ticket offers.
10. Record the date, reporting window, query/page movement and next action in the project log.

## Baseline and interpretation

The earlier 21 August–21 November 2026 Search Console report showed no recorded clicks or impressions, but it ended before the main pages were crawled and indexed on 23–24 November. Treat that report as a pre-indexing baseline, not proof that the site has no current visibility. Begin a fresh post-indexing comparison once sufficient complete data is available.

The key event pages and ticket category pages were previously inspected: the important pages were indexed, mobile fetch succeeded and Google canonical matched the declared canonical. Recheck after the next production deployment because pending GitHub commits are not visible to Google until deployed and recrawled.

## Deployment and indexing sequence

1. Finish the planned changes on GitHub main.
2. Wait until the Vercel deployment quota resets; do not deploy repeatedly.
3. Make one coordinated production deployment.
4. Confirm the production domain returns HTTP 200 and the changed pages render correctly.
5. Open the sitemap and confirm updated URLs are present.
6. Inspect the changed URLs in Search Console and request indexing once per important page where appropriate.
7. Recheck rich results and PageSpeed after Google recrawls the deployed version.

## Reporting guardrails

- Search Console clicks and impressions are first-party Google data; third-party rank tools are estimates.
- Report the date range and market with every ranking comparison.
- Separate branded queries from non-branded discovery queries.
- Do not promise a first-place ranking or a specific number of ticket sales from SEO work.
- Do not confuse indexing with ranking or ranking with conversions.
