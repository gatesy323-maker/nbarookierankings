const fetch = require('node-fetch');

async function getPlayerStatsByName(name){
  try{
    const q = encodeURIComponent(name);
    const s = await fetch(`https://www.balldontlie.io/api/v1/players?search=${q}`);
    const sj = await s.json();
    if(!sj.data || sj.data.length===0) return null;
    const player = sj.data[0];
    const season = new Date().getFullYear() - 1;
    const statsRes = await fetch(`https://www.balldontlie.io/api/v1/season_averages?season=${season}&player_ids[]=${player.id}`);
    const statsJson = await statsRes.json();
    if(statsJson.data && statsJson.data.length>0){
      const s = statsJson.data[0];
      return {pts: s.pts.toFixed(1), reb: s.reb.toFixed(1), ast: s.ast.toFixed(1)};
    }
    return null;
  }catch(e){ return null; }
}

exports.handler = async (event, context) => {
  const q = event.queryStringParameters && event.queryStringParameters.names;
  const names = q ? q.split('|') : ["Victor Wembanyama","Scoot Henderson","Jalen Green","Amen Thompson","Ausar Thompson","Cason Wallace","Rookie A","Rookie B","Rookie C","Rookie D"];
  const out = {};
  for(const name of names){
    const stats = await getPlayerStatsByName(name);
    out[name] = stats || {pts:'—', reb:'—', ast:'—'};
  }
  return {
    statusCode: 200,
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(out)
  };
};
