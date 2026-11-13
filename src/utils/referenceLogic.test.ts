import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  computeLoopArcDashOffset,
  formatReadingProgressPersian,
  filterReferenceEntries,
  getDopamineCurveState,
  computePerspectiveState,
  validateSeoMeta,
  recommendTonightProtocol,
  getAppTourModule,
  filterProFeatureMatrix,
  computeDockRingDashOffset,
  getDockStateGuidance,
  computeHeroParallaxState,
  computeCoverImageBox,
  computeOrbitPoint3D,
  getAppHeroPreviewScreen,
  getCompanionDayMilestone
} from './referenceLogic';

test('computeLoopArcDashOffset calculates quarter-circle progressions accurately', () => {
  assert.equal(computeLoopArcDashOffset(1), 424.11);
  assert.equal(computeLoopArcDashOffset(2), 282.74);
  assert.equal(computeLoopArcDashOffset(3), 141.37);
  assert.equal(computeLoopArcDashOffset(4), 0);
});

test('formatReadingProgressPersian formats percentage in Persian digits', () => {
  assert.equal(formatReadingProgressPersian(0, 1000), '۰٪');
  assert.equal(formatReadingProgressPersian(500, 1000), '۵۰٪');
  assert.equal(formatReadingProgressPersian(1200, 1000), '۱۰۰٪');
});

test('filterReferenceEntries finds matching Persian and English keywords', () => {
  const sample = [
    { id: 'loop', title: 'حلقه فقط یک نگاه', body: 'حالت ناشناس Incognito و فراموشی قیمت واقعی' },
    { id: 'tonight', title: 'چک‌لیست امشب', body: 'محدودکردن مرورگر و DNS امن' }
  ];
  assert.equal(filterReferenceEntries(sample, 'Incognito').length, 1);
  assert.equal(filterReferenceEntries(sample, 'DNS').length, 1);
  assert.equal(filterReferenceEntries(sample, '').length, 0);
});

test('getDopamineCurveState returns valid SVG paths, focal coordinates, and normalized baseline ratios', () => {
  const sup = getDopamineCurveState('supernormal');
  const crash = getDopamineCurveState('crash');
  const rec = getDopamineCurveState('recovery');
  assert.ok(sup.curvePath.startsWith('M '));
  assert.ok(crash.baselineRatio < rec.baselineRatio);
  assert.ok(sup.baselineRatio > rec.baselineRatio);
  assert.ok(sup.dotY < 112);
  assert.ok(crash.dotY > 112);
  assert.equal(rec.telemetryLevel, 'تعادل ۱۰۰٪ پایه');
});

test('computePerspectiveState clamps bounds and categorizes active lens', () => {
  assert.equal(computePerspectiveState(-15).value, 0);
  assert.equal(computePerspectiveState(20).dominantMode, 'willpower');
  assert.equal(computePerspectiveState(50).dominantMode, 'balanced');
  assert.equal(computePerspectiveState(85).dominantMode, 'easypeasy');
  assert.equal(computePerspectiveState(140).curtainRatio, 1);
});

test('validateSeoMeta enforces canonical URLs and snippet length bounds across guide & software showcase pages', () => {
  const okKhod = validateSeoMeta(
    'چطور خودارضایی را ترک کنیم؟ نقشه ۴ هفته و مدیریت تنش شبانه | حاکم ذهن',
    'راهنمای علمی و عملی ترک خودارضایی بدون سرزنش: تفکیک از پورن، قانون تختخواب، مدیریت خستگی شبانه و برنامه چهار هفته بر اساس منابع معتبر.',
    'https://hakemzehn.ir/tark-khod-arzaei.html'
  );
  const okFeatures = validateSeoMeta(
    'امکانات اپلیکیشن حاکم ذهن ۱٫۸ | سپر SOS، روش آسان و مسیر ۱۴۰ روزه',
    'معرفی کامل اپلیکیشن اندروید حاکم ذهن ۱٫۸ در مایکت: ثبت مستقل پورن و خودارضایی، سپر SOS با قانون ۵ دقیقه، ۳۰ فصل روش آسان، ۷ فاز و ۲۱ وظیفه و نقشه ۱۴۰ روزه.',
    'https://hakemzehn.ir/features.html'
  );
  const okPrivacy = validateSeoMeta(
    'حریم خصوصی و نگهداری محلی در حاکم ذهن | رمزنگاری AES-256 و شفافیت',
    'توضیح صادقانه و فنی حریم خصوصی در اپلیکیشن حاکم ذهن: نگهداری محلی داده‌ها روی گوشی بدون حساب کاربری، خروجی رمزنگاری‌شده AES-256-GCM و شفافیت کامل دسترسی‌های نسخهٔ ۱٫۸.',
    'https://hakemzehn.ir/privacy.html'
  );
  assert.deepEqual(okKhod, { validTitle: true, validDescription: true, validCanonical: true });
  assert.deepEqual(okFeatures, { validTitle: true, validDescription: true, validCanonical: true });
  assert.deepEqual(okPrivacy, { validTitle: true, validDescription: true, validCanonical: true });
});

test('recommendTonightProtocol returns 3 targeted steps per vulnerability scenario', () => {
  const bed = recommendTonightProtocol('night-bed');
  const scroll = recommendTonightProtocol('explore-scroll');
  assert.equal(bed.steps.length, 3);
  assert.equal(scroll.steps.length, 3);
  assert.notEqual(bed.title, scroll.title);
  assert.ok(bed.cueInsight.includes('fMRI'));
});

test('getAppTourModule enforces accurate v1.8 facts and non-medical Behavioral Mirror disclaimer', () => {
  const dash = getAppTourModule('dashboard');
  const sos = getAppTourModule('sos');
  const mirror = getAppTourModule('mirror');
  const ep = getAppTourModule('easypeasy');

  assert.equal(dash.screenshot, '/assets/dashboard.webp');
  assert.ok(dash.highlights[0].includes('فاز ۱') && dash.highlights[0].includes('فاز ۳'));

  assert.equal(sos.screenshot, '/assets/sos-preview.webp');
  assert.ok(sos.highlights[0].includes('قانون ۵ دقیقه'));
  assert.ok(!sos.highlights[0].includes('قانون ۱۰ دقیقه'));

  assert.equal(mirror.screenshot, '/assets/analytics-preview.webp');
  assert.ok(mirror.highlights[1].includes('سنجش پزشکی مغز نیست'));

  assert.ok(ep.highlights[0].includes('۳۰ فصل') && ep.highlights[0].includes('۲۱ وظیفه'));
});

test('filterProFeatureMatrix separates Free vs 99,000 Toman one-time PRO accurately', () => {
  const all = filterProFeatureMatrix('all');
  const freeOnly = filterProFeatureMatrix('free');
  const proOnly = filterProFeatureMatrix('pro');
  assert.equal(all.length, 5);
  assert.ok(freeOnly.length > 0 && proOnly.length > 0);
  const priceRow = all.find((row) => row.id === 'billing-privacy');
  assert.ok(priceRow?.proDetail.includes('۹۹٬۰۰۰ تومان یک‌باره'));
  assert.ok(!priceRow?.proDetail.includes('اشتراک ماهانه'));
});

test('computeDockRingDashOffset & getDockStateGuidance drive interactive mobile dock halo and triage states', () => {
  const full = computeDockRingDashOffset(1, 19);
  const empty = computeDockRingDashOffset(0, 19);
  assert.equal(full, 0);
  assert.ok(empty > 119 && empty < 120);

  const craving = getDockStateGuidance('craving');
  assert.equal(craving.showBreather, true);
  assert.ok(craving.title.includes('قانون ۵ دقیقه'));
  assert.equal(craving.ctaHref, '/features.html#sos-shield');

  const privacy = getDockStateGuidance('privacy');
  assert.equal(privacy.showBreather, false);
  assert.equal(privacy.ctaHref, '/privacy.html');
});

test('theme.css defines deep navy, gold, turquoise tokens, large type scale, spacing scale, and is linked in all 9 HTML pages', () => {
  const rootDir = process.cwd();
  const themeCss = fs.readFileSync(path.join(rootDir, 'public/design-system/theme.css'), 'utf8');

  assert.ok(themeCss.includes('--theme-navy-900: #080e15;'));
  assert.ok(themeCss.includes('--theme-gold-500: #e7c68b;'));
  assert.ok(themeCss.includes('--theme-cyan-500: #72d8db;'));
  assert.ok(themeCss.includes('--theme-text-display:'));
  assert.ok(themeCss.includes('--theme-space-4:'));
  assert.ok(themeCss.includes('--theme-section-py:'));

  const htmlPages = [
    'index.html',
    'features.html',
    'privacy.html',
    'tark-porn.html',
    'tark-khod-arzaei.html',
    'porn-brain.html',
    'relapse.html',
    'habits.html',
    'guides.html'
  ];

  for (const page of htmlPages) {
    const html = fs.readFileSync(path.join(rootDir, page), 'utf8');
    const themeIdx = html.indexOf('/design-system/theme.css');
    const refIdx = html.indexOf('/design-system/reference.css');
    assert.ok(themeIdx !== -1, `${page} must include /design-system/theme.css`);
    assert.ok(refIdx !== -1 && themeIdx < refIdx, `${page} must load theme.css before reference.css`);
  }
});

test('all guide pages expose valid hierarchical JSON-LD with scientific reviewer, citations, and guides collection linkage', () => {
  const rootDir = process.cwd();

  const extractJsonLd = (fileName: string) => {
    const html = fs.readFileSync(path.join(rootDir, fileName), 'utf8');
    const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    assert.ok(match && match[1], `${fileName} must contain a JSON-LD script block`);
    return JSON.parse(match[1]);
  };

  const guidesLd = extractJsonLd('guides.html');
  const guidesTypes = guidesLd['@graph'].map((n: { ['@type']: unknown }) => n['@type']);
  assert.ok(guidesTypes.includes('CollectionPage'));
  assert.ok(guidesTypes.includes('ItemList'));
  assert.ok(guidesTypes.includes('Organization'));
  assert.ok(guidesTypes.includes('Person'));

  const articleGuides = [
    'tark-porn.html',
    'tark-khod-arzaei.html',
    'porn-brain.html',
    'relapse.html',
    'habits.html'
  ];

  for (const file of articleGuides) {
    const ld = extractJsonLd(file);
    const graph = ld['@graph'];
    const articleNode = graph.find(
      (n: { ['@type']: unknown }) =>
        Array.isArray(n['@type']) && n['@type'].includes('Article') && n['@type'].includes('MedicalWebPage')
    );
    assert.ok(articleNode, `${file} must have combined Article + MedicalWebPage node`);
    assert.equal(articleNode.reviewedBy?.['@id'], 'https://hakemzehn.ir/#science-reviewer');
    assert.equal(articleNode.isPartOf?.['@id'], 'https://hakemzehn.ir/guides.html#collection');
    assert.ok(Array.isArray(articleNode.citation) && articleNode.citation.length >= 2, `${file} must include scientific citations`);
  }
});

test('architectural Glass & Brass card system and enriched Fehrest navigation drawer are wired across HTML, CSS, and JS', () => {
  const rootDir = process.cwd();
  const guidesHtml = fs.readFileSync(path.join(rootDir, 'guides.html'), 'utf8');
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
  const refCss = fs.readFileSync(path.join(rootDir, 'public/design-system/reference.css'), 'utf8');
  const refJs = fs.readFileSync(path.join(rootDir, 'public/design-system/reference.js'), 'utf8');

  assert.ok(guidesHtml.includes('id="hz-guides-bento"'));
  assert.ok(guidesHtml.includes('is-bento-wide'));
  assert.ok(guidesHtml.includes('hz-card-arrow-badge'));

  assert.ok(indexHtml.includes('hz-library-head'));
  assert.ok(indexHtml.includes('hz-library-num'));

  assert.ok(refCss.includes('.hz-drawer-nav-card.is-current'));
  assert.ok(refCss.includes('--mx'));
  assert.ok(refCss.includes('.hz-cluster-grid.is-filtered-mode'));

  assert.ok(refJs.includes('hz-nav-backdrop'));
  assert.ok(refJs.includes('hz-drawer-grid'));
  assert.ok(refJs.includes('is-filtered-mode'));
  assert.ok(refJs.includes('--mx'));
});

test('theme.css and reference.css enforce balanced UI scale, 1080px/920px/820px max-width tiers, and tablet+mobile responsive breakpoints', () => {
  const rootDir = process.cwd();
  const themeCss = fs.readFileSync(path.join(rootDir, 'public/design-system/theme.css'), 'utf8');
  const refCss = fs.readFileSync(path.join(rootDir, 'public/design-system/reference.css'), 'utf8');

  assert.ok(themeCss.includes('--theme-container-max: 1080px;'));
  assert.ok(themeCss.includes('--theme-header-h: 56px;'));
  assert.ok(themeCss.includes('--theme-text-display: clamp(1.42rem, 2.2vw, 2.05rem);'));
  assert.ok(themeCss.includes('--theme-card-p: clamp(1.125rem, 1.8vw, 1.5rem);'));

  assert.ok(refCss.includes('max-width: 920px;'));
  assert.ok(refCss.includes('max-width: 820px;'));
  assert.ok(refCss.includes('.hz-subhero-visual:has(.hz-phone-bezel)'));
  assert.ok(refCss.includes('@media (max-width: 1079px)'));
  assert.ok(refCss.includes('@media (max-width: 639px)'));
});

test('computeHeroParallaxState drives cinematic scroll zoom, depth drift, and reduced-motion safety', () => {
  const top = computeHeroParallaxState(0, 900);
  assert.equal(top.progress, 0);
  assert.equal(top.mediaScale, 1);
  assert.equal(top.mediaTranslateY, 0);
  assert.equal(top.copyTranslateY, 0);

  const mid = computeHeroParallaxState(450, 900);
  assert.equal(mid.progress, 0.5);
  assert.equal(mid.mediaScale, 1.065);
  assert.equal(mid.mediaTranslateY, 34);
  assert.equal(mid.copyTranslateY, -14);
  assert.ok(mid.mediaOpacity < 1 && mid.copyOpacity < 1);

  const reduced = computeHeroParallaxState(450, 900, true);
  assert.equal(reduced.mediaScale, 1);
  assert.equal(reduced.mediaTranslateY, 0);
  assert.equal(reduced.copyOpacity, 1);

  const indexHtml = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf8');
  assert.ok(indexHtml.includes('hero_sovereign_brain_1794567948769.jpg'));
});

test('living sovereign brain projection helpers and homepage SEO standards stay valid', () => {
  const wideBox = computeCoverImageBox(1440, 844, 1408, 768, 0.18, 0.5);
  assert.ok(wideBox.renderedWidth >= 1440 && wideBox.renderedHeight >= 844);
  assert.ok(wideBox.offsetX <= 0);

  const mobBox = computeCoverImageBox(412, 340, 1408, 768, 0.22, 0.4);
  assert.ok(mobBox.renderedHeight === 340 && mobBox.renderedWidth > 412);

  const pFront = computeOrbitPoint3D(300, 300, 200, 180, Math.PI / 2, 0.2);
  const pBack = computeOrbitPoint3D(300, 300, 200, 180, -Math.PI / 2, 0.2);
  assert.ok(pFront.zDepth > 0.9 && pBack.zDepth < -0.9);

  const rootDir = process.cwd();
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
  const titleMatch = indexHtml.match(/<title>([^<]+)<\/title>/);
  const descMatch = indexHtml.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  const h1Count = (indexHtml.match(/<h1[\s>]/g) || []).length;

  assert.ok(titleMatch && titleMatch[1].length >= 25 && titleMatch[1].length <= 75);
  assert.ok(descMatch && descMatch[1].length >= 100 && descMatch[1].length <= 175);
  assert.equal(h1Count, 1);
  assert.ok(indexHtml.includes('id="hz-brain-neural-canvas"'));
  assert.ok(indexHtml.includes('fetchpriority="high"'));
  assert.ok(indexHtml.includes('application/ld+json'));
});

test('all 9 HTML pages meet strict Google indexability, SERP bounds, sitemap/robots sync, and complete Schema.org graphs', () => {
  const rootDir = process.cwd();
  const robotsTxt = fs.readFileSync(path.join(rootDir, 'public/robots.txt'), 'utf8');
  const sitemapXml = fs.readFileSync(path.join(rootDir, 'public/sitemap.xml'), 'utf8');

  assert.ok(robotsTxt.includes('Allow: /'));
  assert.ok(robotsTxt.includes('Sitemap: https://hakemzehn.ir/sitemap.xml'));
  assert.ok(sitemapXml.includes('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'));

  const pages = [
    { file: 'index.html', canonical: 'https://hakemzehn.ir/' },
    { file: 'features.html', canonical: 'https://hakemzehn.ir/features.html' },
    { file: 'privacy.html', canonical: 'https://hakemzehn.ir/privacy.html' },
    { file: 'guides.html', canonical: 'https://hakemzehn.ir/guides.html' },
    { file: 'tark-porn.html', canonical: 'https://hakemzehn.ir/tark-porn.html' },
    { file: 'tark-khod-arzaei.html', canonical: 'https://hakemzehn.ir/tark-khod-arzaei.html' },
    { file: 'porn-brain.html', canonical: 'https://hakemzehn.ir/porn-brain.html' },
    { file: 'relapse.html', canonical: 'https://hakemzehn.ir/relapse.html' },
    { file: 'habits.html', canonical: 'https://hakemzehn.ir/habits.html' }
  ];

  const titles = new Set<string>();
  const descriptions = new Set<string>();

  for (const { file, canonical } of pages) {
    const html = fs.readFileSync(path.join(rootDir, file), 'utf8');

    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    assert.ok(titleMatch && titleMatch[1], `${file} missing <title>`);
    const title = titleMatch[1].trim();
    assert.ok(
      title.length >= 25 && title.length <= 65,
      `${file} title length (${title.length}) should stay inside 25..65 chars to avoid SERP truncation`
    );
    assert.ok(!titles.has(title), `${file} has duplicate <title>`);
    titles.add(title);

    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
    assert.ok(descMatch && descMatch[1], `${file} missing description`);
    const desc = descMatch[1].trim();
    assert.ok(
      desc.length >= 110 && desc.length <= 160,
      `${file} description length (${desc.length}) should stay inside 110..160 chars`
    );
    assert.ok(!descriptions.has(desc), `${file} has duplicate meta description`);
    descriptions.add(desc);

    assert.ok(
      html.includes('<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />'),
      `${file} missing full robots directive`
    );
    assert.ok(
      html.includes('<meta name="googlebot" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />'),
      `${file} missing googlebot directive`
    );
    assert.ok(html.includes(`<link rel="canonical" href="${canonical}" />`), `${file} missing exact canonical`);
    assert.ok(sitemapXml.includes(`<loc>${canonical}</loc>`), `${file} canonical URL missing from sitemap.xml`);

    // OpenGraph & Twitter cards completeness
    assert.ok(html.includes(`<meta property="og:url" content="${canonical}" />`), `${file} missing matching og:url`);
    assert.ok(html.includes('property="og:image:alt"'), `${file} missing og:image:alt`);
    assert.ok(html.includes('name="twitter:title"'), `${file} missing twitter:title`);
    assert.ok(html.includes('name="twitter:description"'), `${file} missing twitter:description`);
    assert.ok(html.includes('name="twitter:image"'), `${file} missing twitter:image`);

    // Single H1 and LCP hero priority
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${file} must have exactly one <h1>`);
    assert.ok(html.includes('fetchpriority="high"'), `${file} must mark primary hero asset with fetchpriority="high"`);

    // JSON-LD validity & core site graph nodes
    const ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    assert.ok(ldMatch && ldMatch[1], `${file} missing JSON-LD`);
    const ld = JSON.parse(ldMatch[1]);
    assert.ok(Array.isArray(ld['@graph']) && ld['@graph'].length >= 3, `${file} JSON-LD @graph incomplete`);
    const ids = ld['@graph'].map((n: { ['@id']?: string }) => n['@id']).filter(Boolean);
    assert.ok(ids.includes('https://hakemzehn.ir/#org'), `${file} JSON-LD missing #org`);
    assert.ok(ids.includes('https://hakemzehn.ir/#website'), `${file} JSON-LD missing #website`);
  }
});

test('getAppHeroPreviewScreen and getCompanionDayMilestone return accurate v1.8 companion data and progressive 140-node trajectory', () => {
  const dash = getAppHeroPreviewScreen('dashboard');
  const sos = getAppHeroPreviewScreen('sos');
  const journey = getAppHeroPreviewScreen('journey');
  const cortex = getAppHeroPreviewScreen('cortex');
  const mirror = getAppHeroPreviewScreen('mirror');

  assert.equal(dash.imageSrc, '/assets/dashboard.webp');
  assert.equal(sos.imageSrc, '/assets/sos-preview.webp');
  assert.equal(journey.imageSrc, '/assets/app-journey-mountain.jpg');
  assert.equal(cortex.imageSrc, '/assets/app-neural-cortex.jpg');
  assert.equal(mirror.imageSrc, '/assets/analytics-preview.webp');
  assert.ok(sos.badge.includes('قانون ۵ دقیقه'));
  assert.ok(cortex.insight.includes('سنجش پزشکی مغز نیست'));
  assert.equal(journey.overlayMode, 'journey');
  assert.equal(cortex.overlayMode, 'cortex');

  const milestones = (['night1', 'day7', 'day28', 'day49', 'day98', 'day140'] as const).map(
    getCompanionDayMilestone
  );
  for (let i = 1; i < milestones.length; i++) {
    assert.ok(milestones[i].progressPercent > milestones[i - 1].progressPercent);
    assert.ok(milestones[i].litNodes > milestones[i - 1].litNodes);
  }
  assert.equal(milestones[5].litNodes, 140);
  assert.equal(milestones[5].progressPercent, 100);
  assert.ok(milestones[2].title.includes('هیولای کوچک'));
  assert.ok(milestones[1].slipSafetyRule.includes('پاک نمی‌شود'));
});


