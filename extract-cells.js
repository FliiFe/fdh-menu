const lines = require('./lines.json')
let cells = []

if (lines.vl[0] > 40) lines.vl.unshift(0)
if (lines.vl[lines.vl.length - 1] < lines.w - 40) lines.vl.push(lines.w - 1)

if (lines.hl[0] > 20) lines.hl.unshift(0)

for (let j = 0; j < lines.hl.length - 1; j++) {
    for (let i = 0; i < lines.vl.length - 1; i++) {
        cells.push(
            {
                x: lines.vl[i],
                y: lines.hl[j],
                w: lines.vl[i + 1] - lines.vl[i],
                h: lines.hl[j + 1] - lines.hl[j],
            }
        )
    }
}

cells = cells.filter(e => e.h > 100 && e.w > 120)

console.log(cells.map(({x,y,w,h}, i) => `${i}:${w+3}x${h}+${x}+${y}`).join('\n'))
