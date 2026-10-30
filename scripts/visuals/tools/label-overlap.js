// Label pairs that overlap in each visual's LAST frame (estimated text boxes), from the review sheet.
//   npm run visuals:run -- <batch>   then   node scripts/visuals/tools/label-overlap.js <batch> [--edges]
// A hit is two labels printed on each other. Labels crossing a LINE are reported only with --edges
// (bar models: a bar outline through the text reads as struck out, owner 2026-10-30); elsewhere the
// halo keeps them readable.
const fs=require('fs');const b=process.argv[2];const edges=process.argv.includes('--edges');
const h=fs.readFileSync(require('path').join(__dirname,'..','..','..','generated-papers','visuals')+'/'+b+'.html','utf8');
const secs=h.split('<section').slice(1);let n=0;
// the straight pieces of every path (M/L/Z) and line in the frame
const segsOf=(svg)=>{const out=[];
 for(const m of svg.matchAll(/<path[^>]* d="([^"]*)"/g)){const pts=[...m[1].matchAll(/([ML])\s*(-?[\d.]+)[ ,](-?[\d.]+)/g)].map(p=>[+p[2],+p[3],p[1]]);
  for(let i=1;i<pts.length;i++)if(pts[i][2]==='L')out.push([pts[i-1],pts[i]]);
  if(/Z\s*$/.test(m[1])&&pts.length>2)out.push([pts[pts.length-1],pts[0]]);}
 for(const m of svg.matchAll(/<line([^>]*)>/g)){const g=k=>+((m[1].match(new RegExp(' '+k+'="([^"]*)"'))||[0,NaN])[1]);
  if(!isNaN(g('x1')))out.push([[g('x1'),g('y1')],[g('x2'),g('y2')]]);}
 return out;};
// points of a segment, one per pixel, inside the text box (its top edge counts: a bar edge touching the glyphs reads as struck through)
const crosses=(B,[p,q])=>{const L=Math.hypot(q[0]-p[0],q[1]-p[1]);let k=0;
 for(let t=0;t<=L;t+=1){const x=p[0]+(q[0]-p[0])*t/(L||1),y=p[1]+(q[1]-p[1])*t/(L||1);
  if(x>B.x0+1&&x<B.x1-1&&y>=B.y0-1&&y<=B.y1)k++;}return k>=4;};
for(const s of secs){const id=(s.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}/)||['?'])[0].slice(0,8);
 const figs=s.split('<figure');const last=figs[figs.length-1];
 const boxes=[];for(const m of last.matchAll(/<text([^>]*)>([^<]*)<\/text>/g)){const a=m[1];if(/opacity="0"/.test(a))continue;
  const g=k=>{const r=a.match(new RegExp(k+'="([^"]*)"'));return r?r[1]:null};
  const x=+g('x'),y=+g('y'),fs_=+(g('font-size')||12),anc=g('text-anchor')||'start',t=m[2].replace(/&times;/g,'×').replace(/&(#x?[0-9a-f]+|[a-z]+);/gi,'x');
  const w=t.length*fs_*0.56;const x0=anc==='middle'?x-w/2:anc==='end'?x-w:x;boxes.push({t,x0,x1:x0+w,y0:y-fs_*0.78,y1:y+fs_*0.15});}
 const hits=[];for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++){const A=boxes[i],B=boxes[j];
  const ox=Math.min(A.x1,B.x1)-Math.max(A.x0,B.x0),oy=Math.min(A.y1,B.y1)-Math.max(A.y0,B.y0);if(ox<=1||oy<=1)continue;
  const amin=Math.min((A.x1-A.x0)*(A.y1-A.y0),(B.x1-B.x0)*(B.y1-B.y0));if(ox*oy/amin>0.12)hits.push(`"${A.t}" x "${B.t}"`);}
 if(edges){const segs=segsOf(last.split(/<text/)[0]+last.replace(/<text[^>]*>[^<]*<\/text>/g,''));
  for(const B of boxes)if(segs.some(sg=>crosses(B,sg)))hits.push(`"${B.t}" on a line`);}
 if(hits.length){n++;console.log(id,hits.join(' | '));}}
console.log(n,'of',secs.length,'visuals with',edges?'labels on labels or lines':'overlapping labels');
