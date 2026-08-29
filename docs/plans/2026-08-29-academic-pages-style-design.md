# AcademicPages-Inspired Homepage Design

## Goal

Bring the homepage's typography, spacing, and information hierarchy close to the shared visual language of `kevin-zh-cs.github.io` and `xiaogeng-liu.com`, while keeping the existing static HTML structure, content, links, and GitHub Pages deployment.

## Direction

Both reference sites use the same restrained academic-page system: Trebuchet MS at 15px, dark gray text, a centered two-column desktop layout, a slim top navigation, a compact left profile rail, and dense text-first research content. The homepage will adopt those characteristics rather than migrate to their Jekyll theme. This avoids theme dependencies and preserves the current single-file editing workflow.

The desktop page will sit in a centered container with a roughly 240px profile column and a flexible article column. The sidebar will lose its full-height panel and divider, the avatar will use a quiet border instead of a shadow, and profile links will be left aligned. The main article will use smaller sans-serif headings with full-width hairline rules. Navigation, section spacing, and footer spacing will be tightened.

The existing research-interest cards are the largest visual mismatch, so they will become a plain three-item list. News will become a compact bullet list instead of a timeline. Publications will remain text-first, but separators, title sizes, descriptions, and action links will be made denser and flatter. Experience will become a simple date/content list. All current copy, publications, profile links, and the new HUST supervision sentence will remain intact.

## Responsive Behavior

Below 900px, the two columns collapse into one. The profile block becomes a centered header, contact links remain readable, and the existing hamburger menu continues to control navigation. Content padding and heading sizes reduce without changing the information order.

## Verification

Static content tests will assert the reference typography, centered two-column layout, simplified research-interest markup, compact component styling, retained advisor links, and responsive breakpoint. Browser verification will cover a wide desktop viewport and a narrow mobile viewport, including menu interaction and visual overflow checks.
