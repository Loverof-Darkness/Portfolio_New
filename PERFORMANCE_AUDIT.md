# Performance audit

The current site already avoids external runtime CDN loads for GalaxyJS by vendoring at deployment time. The main remaining startup cost is sequencing: `shared.js` waits for GalaxyJS before loading the background adapter, while the page also retains the legacy molecule canvas as an inert DOM surface.

The safe optimization target is to overlap loading, give the background host an immediate poster, avoid starting legacy animation work during dynamic mode, and keep advanced Three.js scenes lazy. Changes are being prepared separately from `main` so they can be reviewed before merge.
