#!/usr/bin/env fish


curl -s https://www.faidherbe.org/le-menu-de-la-semaine | pup 'article img attr{src}' | cut -d, -f2- | base64 --decode | tee menu.jpg | convert jpg:- -threshold 70% menu-bw.png

convert menu.jpg -trim +repage menu.png

function horconvmat;
    for i in (seq 1 (math "(" $argv[1] "^2 - $argv[1])/ 2"));
        printf 0,;
    end;
    for i in (seq 1 $argv[1]);
        printf 1,;
    end;
    for i in (seq 1 (math "(" $argv[1] " ^2 - $argv[1]) / 2 - 1"));
        printf 0,;
    end;
    printf 0 ;
end

function vertconvmat;
    for i in (seq 1 $argv[1]);
        for j in (seq 1 (math $argv[1] / 2));
            printf 0,
        end
        printf 1,
        for j in (seq 1 (math $argv[1] / 2));
            printf 0,
        end
    end | sed 's/,$//'
end

convert menu-bw.png \
    -convolve (horconvmat 25) -threshold 10% \
    -convolve (horconvmat 25) -threshold 10% \
    -convolve (horconvmat 25) -threshold 10% \
    -fuzz 10% -transparent white \
    menu_hlines.png

convert menu-bw.png \
    -convolve (vertconvmat 25) -threshold 10% \
    -convolve (vertconvmat 25) -threshold 10% \
    -convolve (vertconvmat 25) -threshold 10% \
    -fuzz 10% -transparent white \
    menu_vlines.png

convert -composite menu_hlines.png menu_vlines.png -background white -flatten menu_table.png

node fill-table.js

convert menu_table_complete.png -fuzz 5% -transparent white menu_table_complete_transparent.png
convert -composite menu-bw.png menu_table_complete_transparent.png menu-bw-wlines.png
convert -composite menu.png menu_table_complete_transparent.png menu-wlines.png

for line in (node ./extract-cells.js);
    convert -extract (echo $line | cut -d: -f2) menu.png menu-(echo $line | cut -d: -f1).png
end

for i in (seq 0 9);
    tesseract menu-$i.png - -l fra | sed 's/^[^a-zA-Z]//g' | sed 's/\*//g' | tee menu-$i.txt
end

node gen-menu-json.js > menu.json
