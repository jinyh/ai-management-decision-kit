import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const { marked }=await import(process.env.MARKED_MODULE || 'marked');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const scan=dir=>fs.readdirSync(path.join(root,dir),{withFileTypes:true}).flatMap(e=>e.isDirectory()?scan(`${dir}/${e.name}`):e.name.endsWith('.md')?[`${dir}/${e.name}`]:[]);
const sources=[...scan('docs'),...scan('templates'),'knowledge.md','sources.md'];
const dest=s=>'pages/'+s.replace(/\.md$/,'.html');
const titles=Object.fromEntries(sources.map(s=>[s,read(s).match(/^# (.+)$/m)?.[1] || s]));
const links=(s,from='index.html')=>path.posix.relative(path.posix.dirname(from),dest(s));
function frame(title,body,file,extra='') {
 const home=path.posix.relative(path.posix.dirname(file),'index.html') || 'index.html';
 const asset=n=>path.posix.relative(path.posix.dirname(file),'assets/'+n);
 return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="企业管理者的AI课程学习资料：数据、知识、行动授权与投资证据。"><meta name="theme-color" content="#233b51"><title>${esc(title)}｜AI时代的数据治理</title><link rel="icon" href="${asset('decision-mark.svg')}"><link rel="stylesheet" href="${asset('site.css')}"><script src="${asset('site.js')}" defer></script></head><body><a class="skip" href="#main">跳到正文</a><header><div class="wrap topbar"><a class="brand" href="${home}">AI时代的数据治理<span>管理者学习资料</span></a><nav aria-label="主导航"><a href="${home}#paths">学习路径</a><a href="${home}#library">知识卡</a><a href="${path.posix.relative(path.posix.dirname(file),'wef.html')}">WEF与知识图谱</a><a href="${links('docs/student-guide.md',file)}">学习指南</a></nav></div></header>${body}<footer><div class="wrap"><p>金耀辉 教授 · 上海交通大学 计算机学院 / 人工智能研究院</p><div><span>课程辅助资料 · 2026</span><a href="${links('sources.md',file)}">来源与更新</a><a href="https://github.com/jinyh/ai-management-decision-kit">源码仓库</a></div></div></footer>${extra}</body></html>`;
}
const write=(p,s)=>{fs.mkdirSync(path.dirname(path.join(root,p)),{recursive:true});fs.writeFileSync(path.join(root,p),s)};
for(const s of sources){
 const file=dest(s); const text=read(s).replace(/^---\n[\s\S]*?\n---\n/,'');
 let html=marked.parse(text);
 html=html.replace(/href="([^"]+)"/g,(full,href)=>{
  if (/^(https?:|mailto:|#)/.test(href)) return full;
  const [p,...frag]=href.split('#'); const resolved=path.posix.normalize(path.posix.join(path.posix.dirname(s),p));
  if(sources.includes(resolved)) return `href="${links(resolved,file)}${frag.length?'#'+frag.join('#'):''}"`;
  return full;
 });
 html=html.replace(/<table>/g,'<div class="table-scroll" tabindex="0" role="region" aria-label="可横向滚动的表格"><table>').replace(/<\/table>/g,'</table></div>');
 let toc=[];let n=0;
 html=html.replace(/<h2>(.*?)<\/h2>/g,(_,t)=>{const id='section-'+(++n);toc.push(`<a href="#${id}">${t}</a>`);return `<h2 id="${id}">${t}</h2>`});
 let addition='';
 if(s.startsWith('docs/wef/')) addition=`<p class="callout"><a href="${path.posix.relative(path.posix.dirname(file),'wef.html')}">打开交互图谱，逐条查看关系与依据 →</a></p>`;
 const body=`<main id="main" class="wrap reader-layout"><aside><a href="${path.posix.relative(path.posix.dirname(file),'index.html')}">← 返回学习首页</a><p class="eyebrow">本页内容</p><nav aria-label="文章目录">${toc.join('')}</nav><button type="button" class="print-button" data-print>打印 / 保存PDF</button></aside><article class="prose">${html}${addition}<div class="reader-end"><a href="${links('knowledge.md',file)}">继续浏览知识导航 →</a></div></article></main>`;
 write(file,frame(titles[s],body,file));
}
const groups=[['任务与价值',sources.filter(s=>/docs\/cards\/0[123]-/.test(s))],['知识与共同语言',sources.filter(s=>/docs\/cards\/0[456]-/.test(s))],['智能体与授权',sources.filter(s=>/docs\/cards\/0[789]-/.test(s))],['评测与投资',sources.filter(s=>/docs\/cards\/(10|11|12)-/.test(s))]];
const row=(s,label)=>`<a class="reading-link" href="${links(s)}"><span>${esc(label||titles[s])}</span><span aria-hidden="true">→</span></a>`;
const paths=[['executive','管理者与投资决策','从经营目标到证据门，形成一页投资决定。'],['manufacturing-operations','制造、供应链与运营','审查数据质量、跨部门定义和异常处置。'],['sales-service','销售、客户与服务','连接客户知识、服务规则与行动授权。'],['finance-hr','财务、人力与公司职能','明确数据用途、复核责任与操作边界。']];
let home=`<main id="main"><section class="wrap intro"><p class="eyebrow">课后学习 · 管理决策知识库</p><h1>从一个业务问题出发，<br>把AI用在可验证的工作流中。</h1><p class="lead">围绕数据、企业知识、行动授权与评测证据，继续课堂讨论。选择与你有关的路径，阅读一张知识卡，再完成一次自己的判断。</p><div class="actions"><a class="button" href="#paths">选择学习路径</a><a href="wef.html">从WEF报告理解知识图谱 →</a></div></section>
<section class="section shade" id="paths"><div class="wrap"><div class="section-head"><h2>按角色进入</h2><p>每条路径五张核心卡，先解决眼前的一个问题。</p></div><div class="path-grid">${paths.map(([p,t,d],i)=>`<a class="path-item" href="${links('docs/paths/'+p+'.md')}"><span class="number">0${i+1}</span><div><h3>${t}</h3><p>${d}</p><span class="more">开始阅读 →</span></div></a>`).join('')}</div></div></section>
<section class="section wrap"><div class="feature"><div><p class="eyebrow">专题阅读</p><h2>两份WEF报告，<br>如何形成一张知识图谱？</h2><p>从2021年的数据卓越到2026年的组织转型，提取概念、核对关系，保留每条连接的原文依据，再回到管理问题。</p><a class="button" href="wef.html">阅读报告与图谱示范</a></div><ol class="process"><li><b>01</b><span>报告段落<small>定位原文与页码</small></span></li><li><b>02</b><span>概念与关系<small>统一定义，核验主张</small></span></li><li><b>03</b><span>证据图谱<small>每条连线可追溯</small></span></li><li><b>04</b><span>管理判断<small>提出问题，确定下一步</small></span></li></ol></div></section>
<section class="section shade" id="library"><div class="wrap"><div class="section-head"><h2>十二张管理知识卡</h2><p>按问题查找，全部在本站阅读。</p></div><div class="library-grid">${groups.map(([g,ss])=>`<section class="group"><h3>${g}</h3>${ss.map(s=>row(s)).join('')}</section>`).join('')}</div></div></section>
<section class="section wrap"><div class="library-grid"><section class="group"><h2>案例讨论</h2><p class="muted">课程合成情境，用于练习方法迁移。</p>${row('docs/cases/supplier-workflow.md','供应商交付预警与行动')}${row('docs/cases/customer-refund.md','客户退款与补偿')}</section><section class="group"><h2>管理工具</h2><p class="muted">先说明任务，再明确授权与投资请求。</p>${['task-evidence','action-authorization','investment-memo'].map(t=>row('templates/'+t+'.md')).join('')}</section></div></section>
<section class="section shade"><div class="wrap compact-feature"><div><h2>让Agent帮助你追问证据</h2><p>先给出自己的判断，再让学习教练推荐知识卡、检查假设和证据缺口。只使用经过脱敏的工作流。</p></div><div class="actions vertical"><a class="button" href="${links('docs/student-guide.md')}">查看学习指南</a><a href="https://github.com/jinyh/ai-management-decision-kit/archive/refs/heads/main.zip">下载知识库与学习Skill ↓</a></div></div></section></main>`;
write('index.html',frame('管理者学习资料',home,'index.html'));
const g=JSON.parse(read('data/wef-graph.json')); const node=id=>g.nodes.find(n=>n.id===id).label;
const refs=e=>e.evidence.map(v=>`<a href="${g.reports[v.report].pdf}#page=${v.page}" target="_blank" rel="noopener">WEF ${g.reports[v.report].year} · 第${v.page}页 · ${esc(v.section)} ↗</a>`).join('<br>');
let graphPage=`<main id="main" class="wrap graph-page"><p class="breadcrumb"><a href="index.html">学习首页</a> / WEF与知识图谱</p><p class="eyebrow">报告对读 · 证据示范</p><h1>从两份WEF报告，<br>形成可追溯的知识图谱</h1><p class="lead">阅读报告中的主张，提取概念与关系，再回答一个管理问题。这是课程人工核验的局部示范，不是WEF发布的图谱。</p>
<section class="section"><h2>一、打开两份原始报告</h2><div class="report-grid">${Object.values(g.reports).map((r,i)=>`<article class="report"><span class="report-year">${r.year}</span><div><h3>${r.title}</h3><p>${i?'WEF × Accenture · AI时代的组织转型':'WEF × BCG · 制造与供应体系'}</p><p class="muted">发布：${r.published}<br>建议阅读：${i?'第5–6、36–37页；第8页授权示例':'第4页摘要，第11–13页六项优先事项'}</p><div class="actions"><a class="button" href="${r.pdf}" target="_blank" rel="noopener">打开官方PDF ↗</a><a href="${r.url}" target="_blank" rel="noopener">官方发布页 ↗</a></div></div></article>`).join('')}</div><p class="small muted">原文由WEF官方提供；如PDF直链无法打开，请从官方发布页下载。PDF页码以本课程核对的21页及43页版本为准。来源核验：2026-09-09。</p></section>
<section class="section ruled"><h2>二、图谱如何形成</h2><ol class="build-steps"><li><b>定位段落</b><p>记录报告、章节与页码。</p></li><li><b>抽取概念</b><p>统一名称，保留范围差异。</p></li><li><b>建立关系</b><p>写成“主体—关系—客体”。</p></li><li><b>核验依据</b><p>逐条区分原文与课程解释。</p></li><li><b>用于判断</b><p>找出企业还缺哪些证据。</p></li></ol><div class="example"><p class="eyebrow">示例 E01</p><h3>开放平台 → 支持 → 跨系统数据共享</h3><p>2021报告第12页讨论开放平台如何连接分散系统与企业间的数据。抽取后仍保留来源、关系含义与适用边界；这条关系不意味着“买了平台就能获得收益”。</p><a href="${links('docs/wef/from-reports-to-graph.md','wef.html')}">阅读完整建模方法与一条关系的记录 →</a></div></section>
<section class="section ruled" id="explore"><h2>三、带着管理问题查看图谱</h2><p>选择问题，再点击一条关系，查看原文依据、课程解释与下一步追问。</p><div class="question-tabs" role="group" aria-label="选择管理问题">${g.questions.map((q,i)=>`<button type="button" data-question="${q.id}" aria-pressed="${i===0}">${q.label}</button>`).join('')}</div><div class="graph-summary" id="graph-summary"></div><div class="graph-layout"><div><div class="graph-viewport" role="region" aria-label="关系图，可横向滚动" tabindex="0"><svg id="knowledge-graph" viewBox="0 0 780 410" role="img" aria-label="所选问题对应的概念关系图"></svg></div><p class="small muted">实线：报告主张的课程转述　虚线：跨报告的课程解释。图中编号对应下方关系按钮。</p><div id="edge-buttons" class="edge-buttons" role="group" aria-label="查看关系证据"></div></div><aside class="evidence-panel" id="evidence-panel" aria-live="polite"></aside></div><noscript><p>交互图谱需要JavaScript；下方关系明细保留全部内容与来源。</p></noscript></section>
<section class="section ruled"><h2>四、逐条检查证据</h2><p>共${g.edges.length}条关系。中文表述是教学转述；跨报告连接不作为已证实的因果关系。</p><div class="edge-register">${g.edges.map(e=>`<details id="${e.id}"><summary><span class="number">${e.id}</span> ${node(e.source)} — ${e.relation} — ${node(e.target)} <span class="tag">${e.kind==='report'?'报告主张':'课程解释'}</span></summary><p>${e.paraphrase}</p><p>${refs(e)}</p><p><strong>管理追问：</strong>${e.question}</p><p class="muted"><strong>适用边界：</strong>${e.limitation}</p><p><a href="${links(e.card,'wef.html')}">继续阅读：${titles[e.card]} →</a></p></details>`).join('')}</div></section><section class="section ruled"><h2>五、迁移到自己的企业</h2><p class="lead">挑一个流程，核对三件事：原文支持什么、课程推导了什么、企业仍需验证什么。</p><p>先用五至十个概念画一张小图，让业务、数据和执行负责人共同审查。图谱帮助寻找依据，企业的权限、成本与投资决定仍需企业自己的证据。</p><div class="actions"><a class="button" href="${links('templates/task-evidence.md','wef.html')}">用任务证据表开始</a><a href="${links('docs/cards/06-common-language-and-ontology.md','wef.html')}">理解图谱、Ontology与业务规则 →</a></div></section></main>`;
write('wef.html',frame('WEF与知识图谱',graphPage,'wef.html',`<script id="graph-data" type="application/json">${JSON.stringify(g).replace(/</g,'\\u003c')}</script>`));
console.log(`Built homepage, WEF graph and ${sources.length} reading pages.`);
