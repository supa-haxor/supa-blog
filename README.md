# supa-blog

A fully custom personal blog engine built with `React`, powered by the `Blogger API`, and **deployed on `Microsoft Azure`**, using handcrafted `CSS` for complete control over layout and responsiveness.

Created out of necessity: existing Blogger templates were too rigid, visually constrained, and hostile to precise UI control.

This project replaces templates entirely and treats Blogger strictly as a **content backend**, while the frontend is designed, structured, rendered, and deployed from scratch.

![supa-blog-lookaround](src/assets/images/lookaround.png)

---

## Overview

`supa-blog` is a read-only blog frontend that consumes posts from Blogger and renders them through a custom React application.

The goal is not to be a drop-in theme or a generic framework. The goal is **total control**:
- layout
- typography
- responsiveness
- content-specific rendering rules

The project also serves as a concrete example of:
- API consumption
- UI-driven content logic
- fine-grained responsive design without utility frameworks
- cloud deployment on Azure

---

## Key Features

### Custom Content Rendering
- Blogger posts are rendered dynamically via the Blogger API (read-only).
- Specific tags control how posts are displayed.
  - Example: posts tagged with `#scripture` are rendered as highlighted statements with:
    - gold typography
    - bordered containers
    - subtle shining animation effect

### Embedded Mood via Music
- YouTube links included in posts are transformed into a **play-button UI element**.
- Clicking the button opens the track in a new tab.
- Used to convey the emotional tone of a post without embedding heavy players.

### Fully Responsive by Design
- No CSS frameworks.
- No Tailwind.
- No shortcuts.

The layout adapts deliberately across:
- mobile
- tablet
- desktop

Columns, spacing, font sizes, and structure change intentionally—not just scaled down.

### Minimalist Navigation
- Navigation bar is hidden by default.
- Revealed via interaction with the logo.
- Keeps focus on content while remaining accessible.

---

## Tech Stack

- **React**
- **Blogger API** (read-only)
- **Custom CSS** (handwritten, responsive-first)
- **Microsoft Azure** (deployment — currently private)

---

## Project Status

- Deployed on Microsoft Azure.
- Taken offline due to privacy (personal diary content).
- Codebase remains intact.
- Planned future redeployment with reduced personal content.

This repository reflects a **real, deployed system**, not a mock or tutorial.

---

## Intended Audience

- Personal use as a custom blog engine
- Developers interested in:
  - replacing hosted blog templates with custom frontends
  - consuming Blogger as a headless CMS
  - UI-driven rendering based on content tags
- UI-focused engineers who value control over abstraction

---

## Customization Notes

- Rendering behavior is driven by tags defined in Blogger posts.
- Logic is tailored to the author’s content structure.
- Core ideas are transferable, but this is **not a plug-and-play template**.

If you fork it, expect to adapt:
- API keys
- tag logic
- styling rules

---

## Why This Exists

Most blog platforms optimize for convenience.  
This project optimizes for **intentional design**, **ownership**, and **control**.

If that resonates, you’ll understand the code.
