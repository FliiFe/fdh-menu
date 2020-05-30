const fs = require('fs')
console.log(JSON.stringify({
    lundi: {
        midi: fs.readFileSync('menu-0.txt', 'utf8'),
        soir: fs.readFileSync('menu-5.txt', 'utf8'),
    },
    mardi: {
        midi: fs.readFileSync('menu-1.txt', 'utf8'),
        soir: fs.readFileSync('menu-6.txt', 'utf8'),
    },
    mercredi: {
        midi: fs.readFileSync('menu-2.txt', 'utf8'),
        soir: fs.readFileSync('menu-7.txt', 'utf8'),
    },
    jeudi: {
        midi: fs.readFileSync('menu-3.txt', 'utf8'),
        soir: fs.readFileSync('menu-8.txt', 'utf8'),
    },
    vendredi: {
        midi: fs.readFileSync('menu-4.txt', 'utf8'),
        soir: fs.readFileSync('menu-9.txt', 'utf8'),
    }
}))
