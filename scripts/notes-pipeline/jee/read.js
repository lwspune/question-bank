// usage: node _jee_read.js <dump.json> <subtopic name> [solLen]
const d=require(require('path').resolve('generated-papers', process.argv[2]));const want=process.argv[3];const L=+(process.argv[4]||420);
const sub=Object.fromEntries(d.subtopics.map(s=>[s.id,s.name]));
const qs=d.questions.filter(q=>!want||sub[q.subtopic_id]===want);
for(const q of qs){
 const opts=(q.options||[]).sort((a,b)=>a.label<b.label?-1:1).map(o=>o.label+(o.is_correct?'*':'')+') '+o.text).join(' | ');
 console.log(`## ${q.id.slice(0,8)} ${q.pyq_year} ${(q.pyq_note||'').replace(/ Shift /,' S')}${q.image_url?' [IMG]':''}`);
 console.log('Q: '+q.text.replace(/\s+/g,' '));
 console.log(opts?'O: '+opts:'NAT');
 console.log('S: '+(q.solution||'').replace(/\s+/g,' ').slice(0,L)+'\n');
}
console.error(qs.length+' rows');
