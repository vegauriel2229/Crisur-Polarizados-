# Graph Report - Crisur-Polarizados  (2026-09-28)

## Corpus Check
- 29 files · ~52,756 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .css 1)

## Summary
- 289 nodes · 537 edges · 14 communities
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 33 edges (avg confidence: 0.85)
- Token cost: 279,501 input · 0 output

## Community Hubs (Navigation)
- SDD & Coding Rules
- Hero Controller & Showroom
- Package Manifest & Scripts
- Diorama Primitives & House
- Motion & Carousel Framing
- Car Diorama & Loft Geometry
- Astro Config, Site Data & Logo
- Studio Environment & Textures
- Hero Init & State Flow
- Brand Identity & Tokens
- Autos Poster
- Hogares Poster
- TypeScript Config
- Locales Poster

## God Nodes (most connected - your core abstractions)
1. `createShowroom()` - 32 edges
2. `addBox()` - 13 edges
3. `initHero()` - 11 edges
4. `ServiceId` - 11 edges
5. `three` - 10 edges
6. `createCar()` - 10 edges
7. `ScalarTween` - 10 edges
8. `Showroom 3D Hero` - 10 edges
9. `createCanvas()` - 9 edges
10. `createStorefront()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `siteSettings` --implements--> `SiteSettings (singleton spec)`  [INFERRED]
  src/config/site.ts → docs/SDD.md
- `Brand Palette (tinted-glass graphite + logo red)` --shares_data_with--> `BRAND_RED`  [INFERRED]
  docs/SDD.md → src/components/hero/showroom/materials.ts
- `Showroom API Contract (createShowroom/Showroom/ShowroomOptions)` --references--> `createShowroom()`  [EXTRACTED]
  docs/SDD.md → src/components/hero/showroom/showroom.ts
- `Framing Zone via setViewOffset` --references--> `FramingZone`  [EXTRACTED]
  docs/SDD.md → src/components/hero/showroom/types.ts
- `Static Poster Fallback` --references--> `WebGLUnavailableError`  [EXTRACTED]
  docs/SDD.md → src/components/hero/showroom/types.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Keystatic Content Model** — docs_sdd_keystatic_cms, docs_sdd_service, docs_sdd_galleryitem, docs_sdd_sitesettings, docs_sdd_imageasset, docs_sdd_servicecategory [EXTRACTED 1.00]
- **Hero Showroom Progressive Enhancement & Fallback** — docs_sdd_showroom_3d_hero, docs_sdd_deferred_threejs_loading, docs_sdd_static_poster_fallback, docs_sdd_render_posters_script, src_components_hero_showroom_types_webglunavailableerror [EXTRACTED 1.00]
- **Fail-Fast WhatsApp Number Validation** — claude_specific_exception_handling_rule, docs_sdd_build_time_phone_validation, docs_sdd_buildwhatsappurl_contract, src_lib_whatsapp_invalidphonenumbererror, docs_sdd_argentina_whatsapp_9_prefix [INFERRED 0.85]
- **Service Category Pedestals in Hero Carousel** — src_assets_hero_posters_autos_car_pedestal, src_assets_hero_posters_autos_commercial_storefront, src_assets_hero_posters_autos_residential_house, src_assets_hero_posters_autos_3d_service_carousel [INFERRED 0.85]
- **Hero carousel of service categories (autos, hogares, comercios) on glowing pedestals** — src_assets_hero_posters_hogares_car_model, src_assets_hero_posters_hogares_modern_house_model, src_assets_hero_posters_hogares_storefront_model, src_assets_hero_posters_hogares_pedestal_carousel [INFERRED 0.85]
- **Crisur Polarizados service lineup (locales, hogares, autos) on hero podiums** — src_assets_hero_posters_locales_commercial_storefront, src_assets_hero_posters_locales_residential_house, src_assets_hero_posters_locales_automotive_car, src_assets_hero_posters_locales_podium_carousel [INFERRED 0.85]

## Communities (14 total, 0 thin omitted)

### Community 0 - "SDD & Coding Rules"
Cohesion: 0.06
Nodes (43): Async/Await for I/O Rule, Mandatory Code Output Format, No Hardcoded Credentials / Use Env Vars, CLAUDE.md Project Instructions, SDD Methodology (Specification-Driven Development), Specific Exception Handling / Fail-Fast Rule, Strict Typing Rule, Token Economy & Communication Style (+35 more)

### Community 1 - "Hero Controller & Showroom"
Cohesion: 0.09
Nodes (25): Showroom API Contract (createShowroom/Showroom/ShowroomOptions), HeroConfig, initMenu(), requireElement(), Side, createPedestal(), Pedestal, PEDESTAL_RADIUS (+17 more)

### Community 2 - "Package Manifest & Scripts"
Cohesion: 0.06
Nodes (34): dependencies, astro, @fontsource-variable/archivo, three, devDependencies, @astrojs/check, puppeteer-core, @types/three (+26 more)

### Community 3 - "Diorama Primitives & House"
Cohesion: 0.15
Nodes (30): three, addBox(), addContactShadow(), addGlow(), addPane(), addShrub(), addTree(), BoxOptions (+22 more)

### Community 4 - "Motion & Carousel Framing"
Cohesion: 0.12
Nodes (18): clamp(), easeInOutCubic(), easeOutExpo(), lerp(), ScalarTween, smoothstep(), createShowroom(), computeFraming() (+10 more)

### Community 5 - "Car Diorama & Loft Geometry"
Cohesion: 0.14
Nodes (21): addPlate(), addWheelWell(), BODY_BASE, BODY_MATERIAL, BODY_TOP, bodyProfile, CABIN_MATERIAL, cabinProfile (+13 more)

### Community 6 - "Astro Config, Site Data & Logo"
Cohesion: 0.13
Nodes (14): astro, Crisur Polarizados Brand Logo, Circular Badge Container with White Ring, Brand Palette (Red / Black / White), Interlocking C/J Monogram Mark, config, initialIndex, initialSlide (+6 more)

### Community 7 - "Studio Environment & Textures"
Cohesion: 0.27
Nodes (15): createStudioEnvironment(), PanelSpec, createMaterialLibrary(), WARM_LIGHT, createCanvas(), createConcreteTexture(), createFloorAlphaTexture(), createPavingTexture() (+7 more)

### Community 8 - "Hero Init & State Flow"
Cohesion: 0.33
Nodes (9): initHero(), applyState(), framingZone(), positionLabels(), show(), sideOf(), startShowroom(), step() (+1 more)

### Community 9 - "Brand Identity & Tokens"
Cohesion: 0.28
Nodes (9): Archivo Variable Typography, Brand Palette (tinted-glass graphite + logo red), Design Tokens (src/styles/tokens.css), Pending Items (logo, palette confirmation, address, hours, photos, domain), Brand Asset Guidelines (Crisur Polarizados), isotipo.svg (symbol, used as favicon), logo-light.svg (dark-background variant), logo.svg (primary logo) (+1 more)

### Community 10 - "Autos Poster"
Cohesion: 0.29
Nodes (7): Autos Hero Poster, 3D Service Category Carousel, Automotive Window Tinting Service, Silver Sedan on Central Pedestal, Commercial Storefront on Side Pedestal, Dark Background with Red Neon Glow Style, Residential House on Side Pedestal

### Community 11 - "Hogares Poster"
Cohesion: 0.40
Nodes (6): Hero Poster: Hogares (Homes), Sedan Car Model (Automotive Tinting, side slot), Dark Background with Red Neon Glow Brand Palette, Low-poly Modern Two-Story House (Residential Window Film), 3D Pedestal Carousel Layout (center focus, flanking previews), Commercial Storefront Model (Business Glazing, side slot)

### Community 12 - "TypeScript Config"
Cohesion: 0.40
Nodes (4): astro/tsconfigs/strictest, exclude, extends, include

### Community 13 - "Locales Poster"
Cohesion: 0.40
Nodes (5): Hero Poster: Locales (Commercial Storefront), Automotive Car 3D Model (Autos service, side), Commercial Storefront 3D Model (Locales service, focused), 3D Podium Carousel Hero Layout (dark bg, red neon rings), Residential House 3D Model (Hogares service, side)

## Knowledge Gaps
- **77 isolated node(s):** `name`, `type`, `private`, `dev`, `check` (+72 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 111 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `three` connect `Diorama Primitives & House` to `Hero Controller & Showroom`, `Package Manifest & Scripts`, `Car Diorama & Loft Geometry`, `Studio Environment & Textures`?**
  _High betweenness centrality (0.172) - this node is a cross-community bridge._
- **Why does `createShowroom()` connect `Motion & Carousel Framing` to `Hero Controller & Showroom`, `Studio Environment & Textures`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Why does `Showroom 3D Hero` connect `SDD & Coding Rules` to `Hero Controller & Showroom`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `createShowroom()` (e.g. with `easeInOutCubic()` and `.start()`) actually correct?**
  _`createShowroom()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `type`, `private` to the rest of the system?**
  _77 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `SDD & Coding Rules` be split into smaller, more focused modules?**
  _Cohesion score 0.06262626262626263 - nodes in this community are weakly interconnected._
- **Should `Hero Controller & Showroom` be split into smaller, more focused modules?**
  _Cohesion score 0.08819345661450925 - nodes in this community are weakly interconnected._