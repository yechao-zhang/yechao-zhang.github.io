# AcademicPages-Inspired Homepage Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restyle Yechao Zhang's homepage to match the compact AcademicPages visual language shared by the two supplied reference sites without migrating frameworks or changing research content.

**Architecture:** Keep the existing static `index.html`, `style.css`, and `script.js`. Replace the visual contract in CSS, simplify only the research-interest markup, and preserve existing semantic sections, links, and mobile navigation behavior.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js built-in test runner, local HTTP server, browser-based visual verification.

### Task 1: Define the new visual contract

**Files:**
- Modify: `tests/site-content.test.mjs`

**Step 1: Write the failing tests**

Replace the assertions for the restored legacy stylesheet with assertions for Trebuchet MS at 15px, a centered 1280px two-column layout, compact navigation and headings, flat profile styling, simplified list components, a 900px responsive breakpoint, and removal of Google font imports and interest cards.

**Step 2: Run the test to verify it fails**

Run: `node --test tests/site-content.test.mjs`

Expected: FAIL because the page still uses Inter/Playfair, a fixed 300px sidebar, cards, and the old spacing contract.

### Task 2: Implement the reference-inspired typography and layout

**Files:**
- Modify: `index.html`
- Modify: `style.css`

**Step 1: Implement the minimum markup changes**

Remove the Google Fonts imports. Replace the three `.interest-card` blocks with a semantic `.research-directions` list while preserving all three titles and descriptions.

**Step 2: Implement the new stylesheet**

Use `Trebuchet MS`, Helvetica, and sans-serif at 15px/1.5. Center the page at 1280px, use 240px plus flexible columns, flatten the sidebar, tighten navigation and sections, and restyle News, Publications, Experience, buttons, and footer as compact academic lists.

**Step 3: Run the test to verify it passes**

Run: `node --test tests/site-content.test.mjs`

Expected: PASS with zero failures and no warnings.

### Task 3: Verify responsive and interactive behavior

**Files:**
- Verify: `index.html`
- Verify: `style.css`
- Verify: `script.js`

**Step 1: Serve the site locally**

Run: `python3 -m http.server 8765 --bind 127.0.0.1`

**Step 2: Verify desktop layout**

At a wide viewport, confirm a centered two-column layout, compact section density, readable advisor links, no card chrome, and no horizontal overflow.

**Step 3: Verify mobile layout and menu**

At a narrow viewport, confirm the single-column profile/article order, readable publication entries, no horizontal overflow, and that the hamburger opens and closes the navigation.

### Task 4: Review and publish

**Files:**
- Review: `index.html`
- Review: `style.css`
- Review: `tests/site-content.test.mjs`

**Step 1: Run final verification**

Run: `git diff --check && node --test tests/*.test.mjs`

Expected: PASS, zero test failures, and no whitespace errors.

**Step 2: Review the diff**

Confirm that copy, publication data, profile URLs, and JavaScript behavior remain unchanged except for the requested advisor sentence and the intentional research-interest markup simplification.

**Step 3: Commit and push**

Commit the complete homepage update with a focused message, push `main`, and verify the deployed GitHub Pages site after the workflow completes.
