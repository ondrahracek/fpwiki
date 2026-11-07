# Study analytics runbook

fpwiki loads Google Analytics only after an explicit choice. The choice is stored for 180 days in
the `fp-analytics-consent` cookie. Unknown and denied choices do not load `gtag.js`, create an event
queue, or dispatch application events. Withdrawing consent clears this integration's `_ga` cookies
and reloads the page to unload the tag. The privacy page is the sole place to reopen preferences or
withdraw after the initial choice.

The privacy-page `Nastavit měření` action opens preferences. An accepted choice stays saved,
so reloading without a new choice hides the banner. A denied choice is cleared when preferences
open, so reloading without a new choice shows the banner again. Explicit refusal in the banner
saves a new denial.

## Event dictionary

`page_view` is sent once for the initial verified public path and once for each later SPA path
change. Dynamic wiki and tag routes are eligible only after their content query succeeds; a
shape-matching soft 404 never initializes the SDK. Query strings and fragments do not create
views. Its application parameters are `page_path`, `page_type` and `course_group`. A multi-course
page uses `shared`; a page without a course uses `unassigned`.

`nav_click` records one native anchor activation. The delegated capture listener does not prevent
navigation, scrolling, keyboard activation, modified clicks, or middle clicks. The event uses:

| Parameter        | Definition                                                                                                                  |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `component_id`   | Stable semantic component, such as `subject_list`, `table_of_contents`, `backlinks`, `related_topics`, or `search_results`. |
| `link_id`        | Stable approved destination or action. It never uses visible text, list position, or coordinates.                           |
| `placement`      | Current rendered region: `site_header`, `left_sidebar`, `right_sidebar`, `page_header`, `article`, `footer`, or `search`.   |
| `nav_layout`     | `inline`, `desktop_sidebar`, or `mobile_drawer`.                                                                            |
| `target_path`    | Approved internal public path without a query or fragment.                                                                  |
| `target_kind`    | `page`, `section`, or `external`.                                                                                           |
| `target_section` | Existing public heading ID for a same-page link or indexed search result.                                                   |
| `target_domain`  | Approved external hostname only. Currently `github.com`.                                                                    |

The source fields are captured before an SPA route changes. Arbitrary prose attributes are not
trusted. Links outside the approved route and external-action registry are ignored. Search text,
rendered labels, e-mail addresses, code, errors, raw URLs, and private source paths are not sent.
An unapproved cross-page fragment is omitted while its verified public page click is retained.

Referrers are reduced to a query-free static internal path (or only the site origin for a dynamic
path) or an exact allowlisted acquisition origin (currently Google, Bing, Seznam, and Facebook
entry points). Unknown external origins are omitted, so referrals from unlisted providers appear
as direct traffic rather than risking a private or identifying subdomain in analytics.

## GA property settings required before release

The web stream currently has enhanced history page views and all seven enhanced categories on.
Production observation on 2026-11-07 showed one initial page view and three page views after one SPA
navigation; two of the three carried the old page title. Before releasing this code:

1. Disable enhanced history-based page views. The application is the only page-view owner.
2. Disable enhanced site search, form interactions, and outbound clicks. The app does not send raw
   search terms or arbitrary outbound URLs.
3. Review the remaining enhanced categories for unsafe automatic payloads. Keep only categories
   whose requests have been inspected.
4. Register event-scoped custom dimensions for `page_type`, `course_group`, `component_id`,
   `link_id`, `placement`, `nav_layout`, `target_path`, and `target_kind`. Register
   `target_section` and `target_domain` only when a saved report uses them.

These dimensions do not backfill. Record the release date and the consent coverage change. Current
verified property settings are Czechia Time (GMT+01), two months for event-data retention, and 14
months for user-data retention.

## Local verification

Use an invalid or local fake measurement ID and intercept both `googletagmanager.com` and GA
collection requests. Never send local test traffic to the production measurement ID. Verify the
prerendered HTML has no tag script. Then check unknown, deny, accept, withdrawal, a blocked tag,
initial load, SPA navigation, same-page TOC navigation, modified clicks, middle clicks, and the
desktop/mobile navigation clones. Browser QA and GA account changes are release tasks, not evidence
provided by the unit suite.
