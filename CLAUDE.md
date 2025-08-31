# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the website for Cui-Cui Association, a French organization focused on wildlife diversity awareness and preservation through fanzines, workshops, and animations. The site is built with 11ty (Eleventy) static site generator.

## Development Commands

- **Install dependencies**: `npm i`
- **Development server**: `npm run dev` (starts Eleventy with live reload)
- **Build for production**: `npm run build`
- **Linting**: `eslint` (ESLint is configured but no npm script defined)
- **Code formatting**: `prettier` (Prettier is configured but no npm script defined)

## Architecture

### Static Site Generation
- Built with 11ty (Eleventy) v2.x
- Source files in `src/` directory
- Output to `_site/` directory (configured in `.eleventy.js`)

### Template Structure
- **Layout**: `src/_includes/layout.njk` - Base Nunjucks template
- **Partials**: `src/_includes/_partials/` - Reusable HTML components (head, header, footer, etc.)
- **Main page**: `src/index.njk` - Single-page site with content blocks defined in frontmatter

### Content Management
- Content is managed via YAML frontmatter in `src/index.njk`
- Structured as blocks with titles, bodies, and optional images
- Uses markdown filter for rich text content
- Dynamic color theming based on time of day (implemented in head.html JavaScript)

### Styling
- SCSS compilation configured in `.eleventy.js` using Sass
- Main stylesheet: `src/css/style.scss`
- Custom fonts in `src/font/` (Courier Prime family)

### Assets
- Images stored in `src/images/`
- Fonts in `src/font/`
- All assets copied through Eleventy passthrough

## Key Configuration Files

- `.eleventy.js` - Eleventy configuration with SCSS compilation, custom filters, and shortcodes
- `package.json` - Dependencies and build scripts
- `src/_includes/layout.njk` - Base HTML template structure

## French Content Note

The site content is entirely in French, targeting a French-speaking audience interested in wildlife and environmental education in Brittany.