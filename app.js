// Mock data for prototype (replace with real source fetches later)
const rookies = [
  {name:"Victor Wembanyama", team:"SAS", espn:1, bleacher:1, cbs:1, nba:1},
  {name:"Scoot Henderson", team:"SAC", espn:2, bleacher:3, cbs:4, nba:2},
  {name:"Amen Thompson", team:"HOU", espn:4, bleacher:4, cbs:3, nba:5},
  {name:"Cason Wallace", team:"DAL", espn:6, bleacher:6, cbs:6, nba:6},
  {name:"Jalen Green", team:"HOU", espn:3, bleacher:2, cbs:2, nba:3},
  {name:"Ausar Thompson", team:"DET", espn:5, bleacher:5, cbs:5, nba:4},
  {name:"Rookie A", team:"LAL", espn:10, bleacher:9, cbs:8, nba:10},
  {name:"Rookie B", team:"BOS", espn:15, bleacher:12, cbs:14, nba:13},
  {name:"Rookie C", team:"NYK", espn:20, bleacher:18, cbs:17, nba:16},
  {name:"Rookie D", team:"MIA", espn:25, bleacher:22, cbs:20, nba:23}
];

function computeComposite(player){
  // For prototype: composite score is weighted average of source ranks (lower better)
  // We'll compute average rank and then map to a composite score where lower average = better.
  const sources = ['espn','bleacher','cbs','nba'];
  const vals = sources.map(s=>player[s]);
  const avg = vals.reduce((a,b)=>a+b,0)/vals.length;
  // Composite ranking value: we'll use avg directly for sorting, and present composite as a normalized score out of 100
  const score = Math.max(0, Math.round((30 - avg) * 3)); // simple mapping for demo
  return {avg: avg, score: score};
}

function buildTable(data){
  const tbody = document.getElementById('table-body');
  tbody.innerHTML = '';
  data.forEach((p, idx)=>{
    const c = computeComposite(p);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${idx+1}</td>
      <td class="player-cell"><div class="player-avatar">${p.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div><div><div style="font-weight:600">${p.name}</div><div style="color:#6b7280;font-size:12px">${p.position||''}</div></div></td>
      <td>${p.team}</td>
      <td><strong>${c.score}</strong></td>
      <td>${c.avg.toFixed(2)}</td>
      <td class="sources">${p.espn}</td>
      <td class="sources">${p.bleacher}</td>
      <td class="sources">${p.cbs}</td>
      <td class="sources">${p.nba}</td>
    `;
    tbody.appendChild(tr);
  });
}

function refreshTable(){
  const search = document.getElementById('search').value.toLowerCase().trim();
  const sort = document.getElementById('sort').value;
  let filtered = rookies.filter(p => p.name.toLowerCase().includes(search) || p.team.toLowerCase().includes(search));
  // compute average for sorting
  filtered = filtered.map(p => {
    const c = computeComposite(p);
    return {...p, _avg: c.avg, _score:c.score};
  });
  if(sort === 'composite'){
    filtered.sort((a,b)=>a._avg - b._avg);
  } else if(sort === 'avg'){
    filtered.sort((a,b)=>a._avg - b._avg);
  } else if(sort === 'name'){
    filtered.sort((a,b)=> a.name.localeCompare(b.name));
  } else if(sort === 'team'){
    filtered.sort((a,b)=> a.team.localeCompare(b.team));
  }
  // re-rank based on order
  buildTable(filtered);
}

document.getElementById('search').addEventListener('input', refreshTable);
document.getElementById('sort').addEventListener('change', refreshTable);

// initial load
refreshTable();
