import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const indexPath = resolve(rootDir, 'index.html');
const html = readFileSync(indexPath, 'utf8');

const videoSealTitle =
    'VideoSEAL: Mitigating Evidence Misalignment in Agentic Long Video Understanding by Decoupling Answer Authority';
const publicationItems = [
    ...html.matchAll(/<div class="publication-item">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g),
].map((match) => match[0]);
const videoSealPublication = publicationItems.find((item) => item.includes('VideoSEAL:'));
const videoSealNews = html.match(
    /<div class="news-item">[\s\S]*?<strong>VideoSEAL<\/strong>[\s\S]*?<\/div>/
)?.[0];
const openClawPublication = publicationItems.find((item) =>
    item.includes('Mind Your HEARTBEAT')
);
const dynamicMaximinPublication = publicationItems.find((item) =>
    item.includes('Improving Generalization of Universal Adversarial Perturbation')
);
const promptInjectionPublication = publicationItems.find((item) =>
    item.includes('Transferable Direct Prompt Injection')
);
const publicationsSection = html.match(
    /<section id="publications"[\s\S]*?<\/section>/
);

assert.ok(publicationsSection, 'Selected Publications section should exist.');

assert.ok(videoSealPublication, 'VideoSEAL should be listed as a selected publication.');
assert.ok(videoSealNews, 'VideoSEAL should be listed in News.');
assert.ok(openClawPublication, 'OpenClaw heartbeat paper should be listed as a selected publication.');
assert.ok(
    dynamicMaximinPublication,
    'Dynamic maximin UAP paper should be listed as a selected publication.'
);
assert.ok(
    promptInjectionPublication,
    'Transferable Direct Prompt Injection should be listed as a selected publication.'
);

const videoSealHtml = videoSealPublication;
const openClawHtml = openClawPublication;
const dynamicMaximinHtml = dynamicMaximinPublication;
const promptInjectionHtml = promptInjectionPublication;
const publicationsHtml = publicationsSection[0];

assert.ok(
    publicationsHtml.includes('<p class="section-note"><sup>&dagger;</sup> Corresponding author</p>'),
    'Selected Publications should explain the corresponding-author marker once under the section title.'
);
assert.ok(
    !publicationsHtml.includes('<p class="pub-note">'),
    'Publication entries should not repeat the corresponding-author note.'
);

assert.ok(
    videoSealHtml.includes(videoSealTitle),
    'VideoSEAL publication should use the full paper title.'
);
assert.ok(
    videoSealHtml.includes('https://arxiv.org/abs/2605.12571'),
    'VideoSEAL publication should link to the arXiv abstract.'
);
assert.ok(
    videoSealHtml.includes('https://arxiv.org/pdf/2605.12571'),
    'VideoSEAL publication should link to the PDF.'
);
assert.ok(
    videoSealHtml.includes('https://github.com/Echochef/VideoSEAL'),
    'VideoSEAL publication should link to the code repository.'
);
assert.ok(
    videoSealHtml.includes('<strong>Yechao Zhang</strong>'),
    'VideoSEAL publication should highlight Yechao Zhang in the author list.'
);
assert.ok(
    videoSealHtml.includes('<strong>Yechao Zhang</strong><sup>&dagger;</sup>'),
    'VideoSEAL publication should mark Yechao Zhang as the corresponding author.'
);
assert.ok(
    videoSealHtml.includes('ICML 2026'),
    'VideoSEAL publication should show the ICML 2026 venue.'
);
assert.ok(
    videoSealHtml.includes('Under outcome-only GRPO'),
    'VideoSEAL publication should mention the outcome-only GRPO setup.'
);
assert.ok(
    videoSealHtml.includes('training-set accuracy improves'),
    'VideoSEAL publication should qualify the GRPO accuracy gain as training-set accuracy.'
);
assert.ok(
    videoSealHtml.includes('<strong>reward pressure</strong> during training'),
    'VideoSEAL publication should frame reward pressure as a training-time issue.'
);
assert.ok(
    videoSealHtml.includes('<strong>prompt pressure</strong> at inference'),
    'VideoSEAL publication should mention prompt pressure at inference.'
);
assert.ok(
    videoSealHtml.includes(
        'We trace this to two pressures: (1) <strong>reward pressure</strong> during training, where outcome-only rewards encourage the agent to speculate from insufficient evidence rather than reinforce evidence-seeking actions; and (2) <strong>prompt pressure</strong> at inference, where longer search traces saturate context and push planners toward speculative commitment instead of verification.'
    ),
    'VideoSEAL publication should use the polished two-pressure framing.'
);
assert.ok(
    videoSealHtml.includes('frozen inspector with answer authority and abstention'),
    'VideoSEAL publication should mention the decoupled inspector.'
);
assert.ok(
    videoSealHtml.includes('semantic hallucination from 62.1% to 11.3% on LVBench'),
    'VideoSEAL publication should qualify the semantic hallucination result.'
);
assert.ok(
    videoSealHtml.includes('<strong>reward-hacking failure</strong>'),
    'VideoSEAL publication should emphasize reward-hacking failure.'
);
assert.ok(
    videoSealHtml.includes('<strong>reward pressure</strong>'),
    'VideoSEAL publication should emphasize reward pressure.'
);
assert.ok(
    videoSealHtml.includes('<strong>prompt pressure</strong>'),
    'VideoSEAL publication should emphasize prompt pressure.'
);
assert.ok(
    videoSealNews.includes(
        'is now online and accepted to <strong>ICML 2026</strong>, studying evidence misalignment as a <strong>reward-hacking failure</strong> in agentic RL for long-video understanding.'
    ),
    'VideoSEAL news item should frame evidence misalignment as a reward-hacking failure in agentic RL.'
);

assert.ok(
    openClawHtml.includes(
        'This work shows that persistent personal agents like OpenClaw can suffer <i>unintended memory pollution</i> even without prompt injection: both <i>user-attended foreground tasks</i> and <i>unattended background tasks</i> may absorb ordinary external content into persistent memory.'
    ),
    'OpenClaw heartbeat paper should explain that foreground and background tasks can absorb external content.'
);
assert.ok(
    openClawHtml.includes(
        'Because user-facing conversations and noisy tool-call results share the same session context, such content can lose provenance, be saved into long-term memory <strong><i>even without clear user awareness</i></strong>, and later steer user-facing behavior.'
    ),
    'OpenClaw heartbeat paper should explain how shared session context causes provenance loss and later steering.'
);
assert.ok(
    !openClawHtml.includes('<strong>unintended memory pollution</strong>'),
    'OpenClaw heartbeat paper should not overuse bold on unintended memory pollution.'
);
assert.ok(
    !openClawHtml.includes('<strong>lose provenance</strong>'),
    'OpenClaw heartbeat paper should not overuse bold on lose provenance.'
);
assert.ok(
    !openClawHtml.includes('<strong>long-term memory</strong>'),
    'OpenClaw heartbeat paper should not overuse bold on long-term memory.'
);

assert.ok(
    dynamicMaximinHtml.includes('https://github.com/yechao-zhang/DM-UAP'),
    'Dynamic maximin UAP paper should link to the code repository.'
);
assert.ok(
    dynamicMaximinHtml.includes('<i class="fab fa-github"></i> Code'),
    'Dynamic maximin UAP paper should show a Code button with the GitHub icon.'
);

assert.ok(
    promptInjectionHtml.includes('<strong>Yechao Zhang</strong><sup>&dagger;</sup>'),
    'Transferable Direct Prompt Injection should mark Yechao Zhang as the corresponding author.'
);

assert.match(
    html,
    /<h3><a href="https:\/\/arxiv\.org\/abs\/2605\.12571" target="_blank">VideoSEAL<\/a><\/h3>/,
    'The VideoSEAL project card should link to the arXiv abstract.'
);

assert.ok(
    !publicationsHtml.includes('<div class="pub-thumbnail">'),
    'Publication entries should not include thumbnail blocks.'
);
assert.ok(
    !/<img\s+[^>]*src=/.test(publicationsHtml),
    'Publication entries should not include image tags.'
);
assert.ok(
    !publicationsHtml.includes('thumbnail-placeholder'),
    'Publication entries should not include placeholder thumbnails.'
);

const localImageMatches = [...html.matchAll(/<img\s+[^>]*src="([^"]+)"/g)];
for (const [, src] of localImageMatches) {
    if (/^(https?:)?\/\//.test(src)) {
        continue;
    }

    assert.ok(existsSync(resolve(rootDir, src)), `Local image asset is missing: ${src}`);
}
