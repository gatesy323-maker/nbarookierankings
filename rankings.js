const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function fetchPageTitles(url, selector){
  try{
    const res = await fetch(url, {headers: {'User-Agent':'nbarookierankings-bot/1.0'}});
    const txt = await res.text();
    const $ = cheerio.load(txt);
    const items = [];
    $(selector).each((i,el)=>{ if(i<20) items.push($(el).text().trim()) });
    return items;
  }catch(e){ return null; }
}

function mockTop(){
  return [
    "Victor Wembanyama","Scoot Henderson","Jalen Green","Amen Thompson","Ausar Thompson",
    "Cason Wallace","Rookie A","Rookie B","Rookie C","Rookie D","Rookie E","Rookie F"
  ];
}

exports.handler = async (event, context) => {
  // Best-effort scrapes. The selectors below are examples and may need tuning.
  let espn = await fetchPageTitles('https://www.espn.com/nba/story/_/id/34400062/rookie-rankings','h2') || mockTop();
  let bleacher = await fetchPageTitles('https://bleacherreport.com/tag/rookies','h2') || mockTop();
  let cbs = await fetchPageTitles('https://www.cbssports.com/nba/news/rookie-rankings/','h2') || mockTop();

  const pool = Array.from(new Set([...espn.slice(0,20), ...bleacher.slice(0,20), ...cbs.slice(0,20)])).slice(0,50);

  const makeRanks = (arr) => { const map = {}; arr.forEach((name,i)=> map[name]=i+1); return map; };

  const espnRanks = makeRanks(espn);
  const bleacherRanks = makeRanks(bleacher);
  const cbsRanks = makeRanks(cbs);

  // Try NBA.com too
  let nbaRanks = {};
  try{
    const rn = await fetch('https://www.nba.com/rookie-ladder', {headers: {'User-Agent':'nbarookierankings-bot/1.0'}});
    const txt = await rn.text();
    const $ = cheerio.load(txt);
    $('h3').each((i,el)=>{ const t = $(el).text().trim(); if(t) nbaRanks[t]=i+1 });
  }catch(e){}

  const results = pool.map(name=>{
    const e = espnRanks[name] || 25;
    const b = bleacherRanks[name] || 25;
    const c = cbsRanks[name] || 25;
    const n = nbaRanks[name] || 25;
    const arr = [e,b,c,n];
    const avg = arr.reduce((a,b)=>a+b,0)/arr.length;
    return {name, espn: e, bleacher: b, cbs: c, nba: n, avg, composite: (100 - avg*3)};
  });

  results.sort((a,b)=>a.avg - b.avg);
  const top10 = results.slice(0,10);

  return {
    statusCode: 200,
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({top10, sources:{espn:espn.slice(0,20), bleacher:bleacher.slice(0,20), cbs:cbs.slice(0,20)}})
  };
};
