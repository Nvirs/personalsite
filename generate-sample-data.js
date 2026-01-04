

const today = new Date('2026-01-04');
const oneYearAgo = new Date(today);
oneYearAgo.setDate(today.getDate() - 364);

const data = [];

for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    const dateStr = new Date(d).toISOString().split('T')[0];
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    
    let count = 0;
    const random = Math.random();
    
    if (!isWeekend && random > 0.3) {
        count = Math.floor(Math.random() * 12) + 1;
    } else if (random > 0.7) {
        count = Math.floor(Math.random() * 5) + 1;
    }
    
    data.push({
        date: dateStr,
        count: count
    });
}

console.log(JSON.stringify(data, null, 2));
