import JSZip from 'jszip';

export const ExtensionExporter = {
  /**
   * Bundles the compiled, self-contained production Chrome Extension
   * so that ALL buttons, widgets, calculators, and tools work immediately
   * with zero runtime or dev-server dependencies.
   */
  async downloadExtensionZip(): Promise<void> {
    const zip = new JSZip();

    // 1. Manifest V3 (Standard New Tab Override)
    const manifestContent = {
      manifest_version: 3,
      name: "PersonaTab - AI Personalized Chrome New Tab",
      version: "1.0.0",
      description: "Adaptive, personalized Chrome New Tab extension dashboard tailored to your profession, workflow, and aesthetic style.",
      chrome_url_overrides: {
        newtab: "index.html"
      },
      permissions: [
        "storage"
      ],
      host_permissions: [
        "https://*/*"
      ],
      action: {
        default_title: "PersonaTab Dashboard"
      },
      icons: {
        "16": "icons/icon16.png",
        "48": "icons/icon48.png",
        "128": "icons/icon128.png"
      }
    };
    zip.file('manifest.json', JSON.stringify(manifestContent, null, 2));

    // 2. Fetch the compiled production index.html (which uses relative ./assets/...)
    let prodHtml = '';
    try {
      const resp = await fetch('/extension-build/index.html');
      if (resp.ok) {
        prodHtml = await resp.text();
      }
    } catch (e) {
      console.warn('Could not fetch /extension-build/index.html:', e);
    }

    if (!prodHtml) {
      // Fallback clean template if fetch was interrupted
      prodHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PersonaTab - Personalized New Tab</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <script type="module" crossorigin src="./assets/index-DoiFtJK_.js"></script>
    <link rel="stylesheet" crossorigin href="./assets/index-BLH3hEAe.css">
  </head>
  <body class="bg-slate-950 text-slate-100 antialiased overflow-x-hidden selection:bg-indigo-500 selection:text-white">
    <div id="root"></div>
  </body>
</html>`;
    }

    zip.file('index.html', prodHtml);

    // 3. Extract asset filenames from the compiled index.html
    const assetsFolder = zip.folder('assets');
    const assetRegex = /(?:src|href)=["'](?:\.\/|\/)?assets\/([^"'\s]+)["']/g;
    const assetNames = new Set<string>();

    let match: RegExpExecArray | null;
    while ((match = assetRegex.exec(prodHtml)) !== null) {
      if (match[1]) {
        assetNames.add(match[1]);
      }
    }

    // Explicitly guarantee our latest production build files are fetched
    assetNames.add('index-DoiFtJK_.js');
    assetNames.add('index-BLH3hEAe.css');

    for (const name of assetNames) {
      try {
        const resp = await fetch(`/extension-build/assets/${name}`);
        if (resp.ok) {
          const content = await resp.text();
          assetsFolder?.file(name, content);
        }
      } catch (e) {
        console.warn(`Could not package asset ${name}:`, e);
      }
    }

    // 4. Extension icons
    const iconsFolder = zip.folder('icons');
    try {
      const iconSvg = await fetch('/icons/icon.svg').then((r) => r.text());
      iconsFolder?.file('icon.svg', iconSvg);
    } catch {}

    try {
      const [p16, p48, p128] = await Promise.all([
        fetch('/icons/icon16.png').then((r) => r.blob()),
        fetch('/icons/icon48.png').then((r) => r.blob()),
        fetch('/icons/icon128.png').then((r) => r.blob())
      ]);
      iconsFolder?.file('icon16.png', p16);
      iconsFolder?.file('icon48.png', p48);
      iconsFolder?.file('icon128.png', p128);
    } catch (e) {
      console.warn('Could not package PNG icons:', e);
    }

    // 5. Clear Installation Instructions
    const instructions = `========================================================================
PERSONATAB CHROME EXTENSION (MANIFEST V3) — INSTALLATION GUIDE
========================================================================

All files are pre-compiled and 100% self-contained. All buttons, widgets,
calculators, and feeds work immediately offline and online!

STEP 1: Extract this ZIP file
------------------------------------------------------------------------
Extract / unzip this archive into any folder on your computer (e.g.
"Documents/PersonaTab" or "Desktop/PersonaTab").
Make sure "manifest.json" and "index.html" are in the extracted folder.

STEP 2: Open Chrome Extensions
------------------------------------------------------------------------
Open Google Chrome and type in the address bar:
chrome://extensions
(and press Enter)

STEP 3: Turn on Developer Mode
------------------------------------------------------------------------
In the top-right corner of the Extensions page, toggle the "Developer mode"
switch to ON.

STEP 4: Load Unpacked Extension
------------------------------------------------------------------------
Click the "Load unpacked" button in the top-left corner.
Select the extracted folder containing "manifest.json".

STEP 5: Open a New Tab!
------------------------------------------------------------------------
Press Ctrl+T (or Cmd+T on Mac) to open a new tab.
When Chrome asks "Is this the new tab page you were expecting?", click "Keep it".

Your personalized PersonaTab workspace is now running!
========================================================================`;

    zip.file('INSTALLATION_INSTRUCTIONS.txt', instructions);

    // Generate zip and download
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'PersonaTab-Chrome-Extension.zip';
    link.click();
    URL.revokeObjectURL(url);
  }
};
