document.querySelectorAll('[data-print]').forEach(b=>b.addEventListener('click',()=>window.print()));
const embedded=document.getElementById('graph-data');
if(embedded){
 const data=JSON.parse(embedded.textContent);
 const node=id=>data.nodes.find(n=>n.id===id).label;
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let current=data.questions[0],selected=current.edges[0];
 const positions={authorize:{platform:[105,70],data:[385,70],workflow:[665,70],action:[665,250],owner:[385,330],threshold:[385,180],escalation:[105,180]},team:{skills:[130,190],business_action:[620,65],talent:[385,190],learning:[620,320]},scale:{action:[100,70],threshold:[385,70],escalation:[665,70],talent:[100,290],learning:[385,290]}};
 function show(){
  const edge=data.edges.find(e=>e.id===selected);
  document.querySelectorAll('[data-question]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.question===current.id)));
  document.getElementById('graph-summary').textContent=current.answer;
  document.getElementById('edge-buttons').innerHTML=current.edges.map(id=>{const e=data.edges.find(x=>x.id===id);return `<button type="button" data-edge="${id}" aria-pressed="${id===selected}">${id} ${esc(node(e.source))} → ${esc(node(e.target))}</button>`}).join('');
  const coords=positions[current.id];
  let svg='<title>概念关系图：'+esc(current.label)+'</title><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="#355e7a"/></marker></defs>';
  current.edges.forEach(id=>{
   const e=data.edges.find(x=>x.id===id),a=coords[e.source],b=coords[e.target];
   const dx=b[0]-a[0],dy=b[1]-a[1],f=1/Math.max(Math.abs(dx)/85,Math.abs(dy)/28);
   const x1=a[0]+dx*f,y1=a[1]+dy*f,x2=b[0]-dx*f,y2=b[1]-dy*f;
   svg+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${id===selected?'#233b51':'#8d9daa'}" stroke-width="${id===selected?3:1.5}" ${e.kind==='interpretation'?'stroke-dasharray="6 5"':''} marker-end="url(#arrow)"/><text class="edge-label" x="${(x1+x2)/2+ (dx===0?-12:0)}" y="${(y1+y2)/2-10}" text-anchor="${dx===0?'end':'middle'}">${id} ${esc(e.relation)}</text>`;
  });
  Object.entries(coords).forEach(([id,[x,y]])=>{svg+=`<rect x="${x-85}" y="${y-27}" width="170" height="54" fill="white" stroke="#a8b3bc"/><text x="${x}" y="${y+6}" text-anchor="middle">${esc(node(id))}</text>`});
  document.getElementById('knowledge-graph').innerHTML=svg;
  const refs=edge.evidence.map(v=>`<a href="${data.reports[v.report].pdf}#page=${v.page}" target="_blank" rel="noopener">WEF ${data.reports[v.report].year} · 第${v.page}页 ↗</a><br><span class="muted">${esc(v.section)}</span>`).join('<br>');
  document.getElementById('evidence-panel').innerHTML=`<span class="tag">${edge.kind==='report'?'报告主张的课程转述':'跨报告的课程解释'}</span><h3>${edge.id} ${esc(node(edge.source))}<br>${esc(edge.relation)} → ${esc(node(edge.target))}</h3><p>${esc(edge.paraphrase)}</p><p class="label">原文依据</p><p>${refs}</p><p class="label">管理追问</p><p>${esc(edge.question)}</p><p class="label">适用边界</p><p class="muted">${esc(edge.limitation)}</p><a href="pages/${current.template.replace(/\.md$/,'.html')}">带到管理模板中 →</a>`;
 }
 document.querySelectorAll('[data-question]').forEach(b=>b.addEventListener('click',()=>{current=data.questions.find(q=>q.id===b.dataset.question);selected=current.edges[0];show()}));
 document.getElementById('edge-buttons').addEventListener('click',e=>{const b=e.target.closest('[data-edge]');if(b){selected=b.dataset.edge;show()}});
 show();
}
