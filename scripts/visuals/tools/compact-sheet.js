// A compact review sheet: only each visual's last frame (everything drawn), N per row.
//   npm run visuals:run -- <batch>   then   node scripts/visuals/tools/compact-sheet.js <batch> [cols=3]
// Writes generated-papers/visuals/zz-<batch>-compact.html (delete after). About a sixth of the screenshots of the full sheet; use it to check shapes and labels, the full sheet for step order.
const fs=require('fs');const [b,cols='3']=process.argv.slice(2);const dir=require('path').join(__dirname,'..','..','..','generated-papers','visuals')+'/';
let h=fs.readFileSync(dir+b+'.html','utf8');
const css=`<style>.cmp{display:grid;grid-template-columns:repeat(${cols},1fr);gap:8px}.cmp section{border:1px solid #bbb;padding:6px;margin:0;font-size:11px}.cmp .frames figure{display:none}.cmp .frames figure:last-of-type{display:block}.cmp .frames{display:block}.cmp figcaption{display:none}</style>`;
const first=h.indexOf('<section');const last=h.lastIndexOf('</section>')+10;
h=h.slice(0,first)+css+'<div class="cmp">'+h.slice(first,last)+'</div>'+h.slice(last);
fs.writeFileSync(dir+'zz-'+b+'-compact.html',h,'utf8');console.log('ok');
