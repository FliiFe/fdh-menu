const fs = require('fs')
const PNG = require('pngjs').PNG
const lines = {hl: [], vl: [], w:0, h:0}

fs.createReadStream('menu_table.png')
    .pipe(
        new PNG({
            filterType: 4,
        })
    )
    .on('parsed', function () {
        let img = this
        for (let y = 0; y < img.height; y++) {
            for (let x = 0; x < img.width; x++) {
                let idx = (img.width * y + x) << 2
                if (Math.max(...img.data.slice(idx, idx + 4*10).filter((_, i) => (i + 1) % 4)) === 0) {
                    for (let xx = 0; xx < img.width; xx++) {
                        let idx2 = (img.width * y + xx) << 2
                        img.data[idx2] = 0
                        img.data[idx2 + 1] = 0
                        img.data[idx2 + 2] = 0
                    }
                    lines.hl.push(y)
                    break;
                }
            }
        }

        for (let x = 0; x < img.width; x++) {
            for (let y = 0; y < img.height; y++) {
                if (Math.max(...[...new Array(10)].map((_, i) => img.data[(img.width * (y + i) + x) << 2])) === 0) {
                    for (let yy = 0; yy < img.height; yy++) {
                        let idx2 = (img.width * yy + x) << 2
                        img.data[idx2] = 0
                        img.data[idx2 + 1] = 0
                        img.data[idx2 + 2] = 0
                    }
                    lines.vl.push(x)
                    break;
                }
            }
        }

        lines.hl = lines.hl.filter((e, _, a) => !a.includes(e-1))
        lines.vl = lines.vl.filter((e, _, a) => !a.includes(e-1))
        lines.h = img.height
        lines.w = img.width

        img.pack().pipe(fs.createWriteStream('menu_table_complete.png'))
        fs.writeFileSync('lines.json', JSON.stringify(lines))
    });

