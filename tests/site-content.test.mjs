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
const memGhostTitle =
    'When Claws Remember but Do Not Tell: Stealthy Memory Injection in Persistent Personal Agents';
const publicationItems = [
    ...html.matchAll(/<div class="publication-item">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g),
].map((match) => match[0]);
const memGhostPublication = publicationItems.find((item) =>
    item.includes('When Claws Remember but Do Not Tell')
);
const memGhostNews = html.match(
    /<div class="news-item">[\s\S]*?2607\.05189[\s\S]*?<\/div>/
)?.[0];
const memGhostPressNews = html.match(
    /<div class="news-item">[\s\S]*?thehackernews\.com\/2026\/07\/new-memghost-attack-plants-persistent\.html[\s\S]*?<\/div>/
)?.[0];
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
const experienceSection = html.match(
    /<section id="experience"[\s\S]*?<\/section>/
);
const sidebarSection = html.match(/<aside class="sidebar">[\s\S]*?<\/aside>/);

assert.ok(publicationsSection, 'Selected Publications section should exist.');
assert.ok(experienceSection, 'Experience section should exist.');
assert.ok(sidebarSection, 'Sidebar profile section should exist.');

assert.ok(memGhostPublication, 'MemGhost paper should be listed as a selected publication.');
assert.ok(memGhostNews, 'MemGhost paper should be listed in News.');
assert.ok(memGhostPressNews, 'MemGhost Hacker News coverage should be listed in News.');
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

const memGhostHtml = memGhostPublication;
const videoSealHtml = videoSealPublication;
const openClawHtml = openClawPublication;
const dynamicMaximinHtml = dynamicMaximinPublication;
const promptInjectionHtml = promptInjectionPublication;
const publicationsHtml = publicationsSection[0];
const experienceHtml = experienceSection[0];
const sidebarHtml = sidebarSection[0];

assert.ok(
    publicationsHtml.includes('<p class="section-note"><sup>&dagger;</sup> Corresponding author</p>'),
    'Selected Publications should explain the corresponding-author marker once under the section title.'
);
assert.ok(
    !publicationsHtml.includes('<p class="pub-note">'),
    'Publication entries should not repeat the corresponding-author note.'
);

[
    ['Singapore', 'fas fa-map-marker-alt'],
    ['Website', 'fas fa-globe'],
    ['Email', 'fas fa-envelope'],
    ['Twitter', 'fab fa-twitter'],
    ['LinkedIn', 'fab fa-linkedin'],
    ['DBLP', 'fas fa-database'],
    ['Github', 'fab fa-github'],
    ['Google Scholar', 'fas fa-graduation-cap'],
    ['ORCID', 'fab fa-orcid'],
].forEach(([label, icon]) => {
    assert.ok(sidebarHtml.includes(label), `Sidebar should include ${label}.`);
    assert.ok(sidebarHtml.includes(icon), `Sidebar should show the ${label} icon.`);
});

[
    'https://yechao-zhang.github.io/',
    'mailto:yech.zhang@gmail.com',
    'https://x.com/yechao_zh',
    'https://www.linkedin.com/in/yechao-zhang-1a7928365/',
    'https://dblp.org/pid/304/1238.html',
    'https://github.com/yechao-zhang',
    'https://scholar.google.com/citations?user=tk9ob5EAAAAJ',
    'https://orcid.org/0000-0002-0551-1200',
].forEach((href) => {
    assert.ok(sidebarHtml.includes(href), `Sidebar should link to ${href}.`);
});

assert.ok(
    memGhostHtml.includes(memGhostTitle),
    'MemGhost publication should use the full paper title.'
);
assert.ok(
    memGhostHtml.includes('https://arxiv.org/abs/2607.05189'),
    'MemGhost publication should link to the arXiv abstract.'
);
assert.ok(
    memGhostHtml.includes('https://arxiv.org/pdf/2607.05189'),
    'MemGhost publication should link to the PDF.'
);
assert.ok(
    memGhostHtml.includes(
        'https://thehackernews.com/2026/07/new-memghost-attack-plants-persistent.html'
    ),
    'MemGhost publication should link to The Hacker News press coverage.'
);
assert.ok(
    memGhostHtml.includes('Press (The Hacker News)'),
    'MemGhost publication should label the coverage as press.'
);
assert.ok(
    memGhostHtml.includes('<strong>Yechao Zhang</strong>'),
    'MemGhost publication should highlight Yechao Zhang in the author list.'
);
assert.ok(
    memGhostHtml.includes('arXiv 2026'),
    'MemGhost publication should show the arXiv 2026 venue.'
);
assert.ok(
    memGhostHtml.includes('<strong>stealth memory injection</strong>'),
    'MemGhost publication should emphasize stealth memory injection.'
);
assert.ok(
    memGhostHtml.includes('<strong>WhisperBench</strong>'),
    'MemGhost publication should mention WhisperBench.'
);
assert.ok(
    memGhostHtml.includes('<strong>MemGhost</strong>'),
    'MemGhost publication should mention MemGhost.'
);
assert.ok(
    memGhostNews.includes(
        'is now online, studying <strong>stealth memory injection</strong> in persistent personal agents (OpenClaw Hermes).'
    ),
    'MemGhost news item should announce the new arXiv paper.'
);
assert.ok(
    memGhostPressNews.includes(
        'was covered by <strong>The Hacker News</strong>: New MemGhost Attack Plants Persistent False Memories in AI Agents Through One Email.'
    ),
    'MemGhost press news item should summarize The Hacker News coverage.'
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

assert.ok(
    !html.includes('<h2 class="section-title">Selected Research Projects</h2>'),
    'Selected Research Projects section should not be shown.'
);
assert.ok(
    !html.includes('id="projects"'),
    'The page should not include a projects section anchor.'
);
assert.ok(
    !html.includes('href="#projects"'),
    'Top navigation should not link to a removed projects section.'
);
assert.ok(
    !html.includes('<h2 class="section-title">Service & Honors</h2>'),
    'Service & Honors section should not be shown.'
);
assert.ok(
    !html.includes('id="service"'),
    'The page should not include a service section anchor.'
);
assert.ok(
    !html.includes('href="#service"'),
    'Top navigation should not link to a removed service section.'
);
assert.ok(
    !html.includes('Reviewer (2025)') &&
        !html.includes('Reviewer (2024)') &&
        !html.includes('Journal Reviewer') &&
        !html.includes('Outstanding Doctoral Graduate') &&
        !html.includes('China National Scholarship') &&
        !html.includes('Merit PhD Student'),
    'Academic service and honors content should be removed.'
);

const timelineItemCount = [...experienceHtml.matchAll(/<div class="timeline-item">/g)].length;
assert.equal(timelineItemCount, 2, 'Experience should only list two timeline items.');
assert.ok(
    experienceHtml.includes('<div class="timeline-date">Sep 2024 - Dec 2024</div>') &&
        experienceHtml.includes('<h3>Ant Group, Security Department</h3>') &&
        experienceHtml.includes('<p class="role">Research Intern</p>'),
    'Experience should list the Ant Group research internship.'
);
assert.ok(
    experienceHtml.includes('<div class="timeline-date">Apr 2024 - Aug 2024</div>') &&
        experienceHtml.includes('<h3>Tencent AI Lab</h3>') &&
        experienceHtml.includes('<p class="role">Algorithm Intern</p>'),
    'Experience should list the Tencent AI Lab algorithm internship.'
);
assert.ok(
    !experienceHtml.includes('Huazhong University of Science and Technology') &&
        !experienceHtml.includes('Ph.D. Student') &&
        !experienceHtml.includes('GPA: 89.99/100'),
    'Experience should not include the Ph.D. timeline item.'
);
assert.ok(
    !experienceHtml.includes('Researched backdoor attacks and defenses') &&
        !experienceHtml.includes('Built a knowledge-enhanced agent and researched RAG poisoning'),
    'Experience internships should not include detailed work descriptions.'
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
