# Graph Report - Crisur-Polarizados  (2026-10-02)

## Corpus Check
- Corpus is ~41,873 words - fits in a single context window. You may not need a graph.

## Summary
- 366 nodes · 702 edges · 16 communities (14 shown, 2 thin omitted)
- Extraction: 90% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 64 edges (avg confidence: 0.88)
- Token cost: 229,750 input · 0 output

## Community Hubs (Navigation)
- Home Page Components
- Surface Briefs & Design Rules
- 3D Film Scene Engine
- Architecture Geometry (House/Storefront)
- Car Loft Geometry
- Film Scene Design Components
- Package Dependencies
- Astro Config, Gallery & SEO Routes
- OG Share Image (Home Hero)
- CLAUDE.md Coding Rules
- Film Glass Materials
- TypeScript Config
- Brand Logo Image
- Brand Asset Guidelines
- Mobile Header Menu
- Archivo Typography

## God Nodes (most connected - your core abstractions)
1. `Crisur Software Design Document (v0.7)` - 17 edges
2. `createFilmScene()` - 16 edges
3. `createScene()` - 14 edges
4. `Product: Crisur Polarizados` - 12 edges
5. `three` - 11 edges
6. `siteSettings` - 11 edges
7. `Film Scene (3D, Service Pages)` - 10 edges
8. `addBox()` - 8 edges
9. `spanProgress()` - 8 edges
10. `createScene()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `createFilmScene Engine Contract` --references--> `createFilmScene()`  [EXTRACTED]
  docs/SDD.md → src/components/film-scene/engine.ts
- `CoinLogo tossOnce Contract` --references--> `tossOnce()`  [EXTRACTED]
  docs/SDD.md → src/components/home/coin.ts
- `GalleryPhoto / galleryFor Contract` --references--> `galleryFor()`  [EXTRACTED]
  docs/SDD.md → src/data/gallery.ts
- `getService / nextServiceOf Contract` --references--> `getService()`  [EXTRACTED]
  docs/SDD.md → src/data/services.ts
- `getService / nextServiceOf Contract` --references--> `nextServiceOf()`  [EXTRACTED]
  docs/SDD.md → src/data/services.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Film Progress Signature (single 0-1 number in CSS and 3D)** — design_squeegee_film_application, design_film_variable, design_service_art_with_film, docs_sdd_film_glass, docs_sdd_film_pane [INFERRED 0.85]
- **Portal View-Transition Chain (portal-<id> shared names)** — design_service_chooser, design_portal, design_film_scene, docs_sdd_view_transitions_portal, docs_sdd_home_hero_contract [INFERRED 0.85]
- **Per-Service 3D Film Scenes** — docs_sdd_car_scene, docs_sdd_house_scene, docs_sdd_storefront_scene, docs_sdd_scene_factory, docs_sdd_film_scene_engine [INFERRED 0.85]
- **Hero Conversion Flow (brand coin -> service pitch -> contact CTAs)** — public_og_image_interactive_coin_hero, public_og_image_hero_headline, public_og_image_whatsapp_cta, public_og_image_instagram_crisur2026 [INFERRED 0.85]
- **Crisur Visual Identity** — src_assets_brand_logo_crisur_logo, src_assets_brand_logo_monogram_emblem, src_assets_brand_logo_red_circular_badge, src_assets_brand_logo_brand_color_palette [INFERRED 0.85]

## Communities (16 total, 2 thin omitted)

### Community 0 - "Home Page Components"
Cohesion: 0.08
Nodes (33): src_assets_brand_logo, facts, choices, year, instagramUrl, siteSettings, FILM_TYPES, FilmType (+25 more)

### Community 1 - "Surface Briefs & Design Rules"
Cohesion: 0.06
Nodes (53): Home Surface Brief (index.astro), Home Direction Contract: Coin Toss + Glass Chooser, Service Pages Surface Brief ([service].astro), Dark Automotive Photo Studio Own-World, Service Direction Contract: Film Applied While Scrolling, Design System: Crisur Polarizados, The Clear Glass Rule, Coin Logo Component (+45 more)

### Community 2 - "3D Film Scene Engine"
Cohesion: 0.08
Nodes (42): three, CameraPose, sampleCameraPath(), smootherStep(), spanProgress(), assertWebGL(), createFilmScene(), apply() (+34 more)

### Community 3 - "Architecture Geometry (House/Storefront)"
Cohesion: 0.07
Nodes (45): addBox(), addCrack(), addGlazing(), addRoom(), addWallWithOpenings(), ArchitectureMaterials, createArchitectureMaterials(), createCrackTexture() (+37 more)

### Community 4 - "Car Loft Geometry"
Cohesion: 0.11
Nodes (30): createLoftGeometry(), createMonotoneCurve(), Curve1D, LoftFaceSample, LoftProfile, loftSurfacePoint(), loftYawAt(), sectionPoint() (+22 more)

### Community 5 - "Film Scene Design Components"
Cohesion: 0.10
Nodes (31): Immersive Planet Portal Interaction Reference, Chapter Index, Service Cover with Display Giant, Film Materials (Smoke, Mirror, Frost, Clear Glass), Film Scene (3D, Service Pages), Film Swatches (Home), --film Custom Property (0-1), The Fit-To-Word Rule (+23 more)

### Community 6 - "Package Dependencies"
Cohesion: 0.08
Nodes (24): dependencies, astro, @fontsource-variable/archivo, motion, three, devDependencies, @astrojs/check, @types/three (+16 more)

### Community 7 - "Astro Config, Gallery & SEO Routes"
Cohesion: 0.15
Nodes (8): env, astro, ref_vite, altFromFileName(), files, galleryFor(), GalleryPhoto, ROUTES

### Community 8 - "OG Share Image (Home Hero)"
Cohesion: 0.31
Nodes (10): Crisur CJ Red Coin Logo, Dark Theme with Brand Red Accent, Godoy Cruz, Mendoza (Service Location), Hero Headline: Polarizados para autos, hogares y negocios, Instagram @crisur2026, Interactive Coin Hero (Toca la moneda), Open Graph Share Image (Home Hero Screenshot), Service Segments: Autos, Hogares, Negocios (+2 more)

### Community 9 - "CLAUDE.md Coding Rules"
Cohesion: 0.25
Nodes (8): Async/Await for I/O Rule, Mandatory Code Output Format, No Hardcoded Credentials / Use Env Vars, CLAUDE.md Project Instructions, SDD Methodology (Specification-Driven Development), Specific Exception Handling / Fail-Fast Rule, Strict Typing Rule, Token Economy & Communication Style

### Community 10 - "Film Glass Materials"
Cohesion: 0.33
Nodes (6): CLEAR_GLASS, FILM_LOOK, FilmAxis, FilmLook, FROST_GLOW, Vec3

### Community 11 - "TypeScript Config"
Cohesion: 0.40
Nodes (4): ./node_modules/astro/tsconfigs/strictest.json, exclude, extends, include

### Community 12 - "Brand Logo Image"
Cohesion: 0.67
Nodes (4): Brand Palette (Red / Black / White), Crisur Polarizados Brand Logo, Interlocking C/J Monogram Emblem, Red Circular Badge with White Ring

### Community 13 - "Brand Asset Guidelines"
Cohesion: 0.50
Nodes (4): Brand Asset Guidelines (Crisur Polarizados), isotipo.svg (symbol, used as favicon), logo-light.svg (dark-background variant), logo.svg (primary logo)

## Ambiguous Edges - Review These
- `Dark Automotive Photo Studio Own-World` → `The Film Scene Rule`  [AMBIGUOUS]
  .impeccable/surfaces/src-pages-service-astro.md · relation: conceptually_related_to
- `Service Categories: Autos, Hogares, Negocios` → `Service Interface`  [AMBIGUOUS]
  docs/SDD.md · relation: conceptually_related_to
- `Crisur Polarizados Brand Logo` → `Interlocking C/J Monogram Emblem`  [AMBIGUOUS]
  src/assets/brand/logo.jpeg · relation: conceptually_related_to

## Knowledge Gaps
- **93 isolated node(s):** `env`, `name`, `type`, `private`, `dev` (+88 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 121 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Dark Automotive Photo Studio Own-World` and `The Film Scene Rule`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Service Categories: Autos, Hogares, Negocios` and `Service Interface`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Crisur Polarizados Brand Logo` and `Interlocking C/J Monogram Emblem`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `createFilmScene()` connect `3D Film Scene Engine` to `Film Scene Design Components`?**
  _High betweenness centrality (0.160) - this node is a cross-community bridge._
- **Why does `createFilmScene Engine Contract` connect `Film Scene Design Components` to `Surface Briefs & Design Rules`, `3D Film Scene Engine`?**
  _High betweenness centrality (0.149) - this node is a cross-community bridge._
- **Why does `Crisur Software Design Document (v0.7)` connect `Surface Briefs & Design Rules` to `Film Scene Design Components`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `createFilmScene()` (e.g. with `handleContextLost()` and `resize()`) actually correct?**
  _`createFilmScene()` has 2 INFERRED edges - model-reasoned connections that need verification._