"""Check generated navigation and provenance without network or third-party packages."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json

ROOT = Path(__file__).resolve().parent.parent
class Page(HTMLParser):
    def __init__(self, file):
        super().__init__(); self.file = file; self.refs = []; self.ids = set(); self.duplicate_ids = []; self.h1 = 0
        self.feed(file.read_text())
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'h1': self.h1 += 1
        if 'id' in attrs:
            if attrs['id'] in self.ids: self.duplicate_ids.append(attrs['id'])
            self.ids.add(attrs['id'])
        for k in ('href', 'src'):
            if k in attrs: self.refs.append(attrs[k])

files = [ROOT/'index.html', ROOT/'wef.html', *sorted((ROOT/'pages').rglob('*.html'))]
pages = {p.resolve(): Page(p) for p in files}
errors = []
for path, p in pages.items():
    if p.h1 != 1 or p.duplicate_ids: errors.append(f'{path.name}: invalid headings/IDs')
    for ref in p.refs:
        u = urlsplit(ref)
        if u.scheme or u.netloc:
            if 'github.com/jinyh/ai-management-decision-kit/blob/' in ref:
                errors.append(f'GitHub Markdown reading link: {ref}')
            continue
        target = (path.parent/unquote(u.path)).resolve() if u.path else path
        if not target.exists(): errors.append(f'{path.name}: missing {ref}')
        if target.suffix == '.md': errors.append(f'{path.name}: raw Markdown link {ref}')
        if u.fragment and target in pages and u.fragment not in pages[target].ids:
            errors.append(f'{path.name}: missing anchor {ref}')
g = json.loads((ROOT/'data/wef-graph.json').read_text())
nodes = {n['id'] for n in g['nodes']}; edges = {e['id']: e for e in g['edges']}
if len(nodes) != len(g['nodes']) or len(edges) != len(g['edges']): errors.append('duplicate graph IDs')
for e in g['edges']:
    if e['source'] not in nodes or e['target'] not in nodes: errors.append(f'{e["id"]}: missing node')
    if not e['evidence'] or not e['question'] or not e['limitation'] or not e['verified']: errors.append(f'{e["id"]}: missing provenance')
    for ref in e['evidence']:
        if ref['report'] not in g['reports'] or not 1 <= ref['page'] <= g['reports'][ref['report']]['pages']:
            errors.append(f'{e["id"]}: invalid source/page')
    if not (ROOT/e['card']).exists(): errors.append(f'{e["id"]}: missing card')
for q in g['questions']:
    if any(i not in edges for i in q['edges']) or not (ROOT/q['template']).exists(): errors.append(f'{q["id"]}: invalid question route')
print(json.dumps({'html_pages': len(pages), 'graph_relations': len(edges), 'question_routes': len(g['questions']), 'errors': errors}, ensure_ascii=False, indent=2))
raise SystemExit(bool(errors))
