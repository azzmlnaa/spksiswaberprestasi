/*
 Simple SAW service that expects:
 - students: array of { id, name }
 - criteria: array of { id, weight, type }  type = 'benefit'|'cost'
 - scores: array of { student_id, criteria_id, value }
 Returns: array of { student_id, name, total_score, rank }
*/
function computeSAW(students, criteria, scores) {
  // build matrix
  const critMap = {};
  criteria.forEach(c => critMap[c.id] = c);

  const byCriteria = {};
  criteria.forEach(c => byCriteria[c.id] = []);

  students.forEach(s => {
    criteria.forEach(c => {
      const sc = scores.find(x => x.student_id === s.id && x.criteria_id === c.id);
      const v = sc ? Number(sc.value) : null;
      byCriteria[c.id].push({ student_id: s.id, value: v });
    });
  });

  // compute max/min per criteria (only consider non-null)
  const extrema = {};
  for (const c of criteria) {
    const values = byCriteria[c.id].map(x=>x.value).filter(v=>v!==null);
    extrema[c.id] = {
      max: values.length ? Math.max(...values) : 0,
      min: values.length ? Math.min(...values) : 0
    };
  }

  // compute normalized r_ij and total
  const results = students.map(s => {
    let total = 0;
    for (const c of criteria) {
      const sc = scores.find(x => x.student_id === s.id && x.criteria_id === c.id);
      let v = sc ? Number(sc.value) : null;
      let r = 0;
      const ex = extrema[c.id];
      if (v === null) {
        r = 0; // missing treated as 0 (you can change policy)
      } else if (c.type === 'benefit') {
        r = ex.max ? v / ex.max : 0;
      } else {
        r = ex.min ? ex.min / v : 0;
      }
      total += r * Number(c.weight);
    }
    return { student_id: s.id, name: s.name, total_score: Number(total.toFixed(6)) };
  });

  // ranking
  results.sort((a,b) => b.total_score - a.total_score);
  results.forEach((r,i) => r.rank = i+1);
  return results;
}

module.exports = { computeSAW };
