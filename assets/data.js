var groupCount = 7;

var groups = [
    { id: 0, style: 'stroke:pink;', options: { drawPoints: { styles: 'stroke:pink; fill:pink;' } } }
];

var items = [
    { x: '2019-03-13 00:00', y: 1 },
    { x: '2019-03-13 01:00', y: 3 },
    { x: '2019-03-13 02:00', y: 5 },
    { x: '2019-03-13 03:00', y: 7 },
    { x: '2019-03-13 04:00', y: 9 },
    { x: '2019-03-13 05:00', y: 11 },
    { x: '2019-03-13 06:00', y: 13 },
    { x: '2019-03-13 07:00', y: 17 },
    { x: '2019-03-13 08:00', y: 19 },
    { x: '2019-03-13 09:00', y: 21 },
    { x: '2019-03-13 10:00', y: 23 },
    { x: '2019-03-13 11:00', y: 25 },
    { x: '2019-03-13 12:00', y: 27 },
    { x: '2019-03-13 13:00', y: 29 },
    { x: '2019-03-13 14:00', y: 31 },
    { x: '2019-03-13 15:00', y: 33 },
    { x: '2019-03-13 16:00', y: 35 },
    { x: '2019-03-13 17:00', y: 36 },
    { x: '2019-03-13 18:00', y: 36 },
    { x: '2019-03-13 19:00', y: 41 },
    { x: '2019-03-13 20:00', y: 43 },
    { x: '2019-03-13 21:00', y: 45 },
    { x: '2019-03-13 22:00', y: 47 },
    { x: '2019-03-13 23:00', y: 49 }
];

items.forEach(function (item) {
    if (item.y <= 4) {
        item.group = 0;
        item.y = 0;
    } else if (item.y > 4 && item.y <= 8) {
        item.group = 1;
        item.y = 1;
    } else if (item.y > 8 && item.y <= 20) {
        item.group = 2;
        item.y = 2;
    } else if (item.y > 20 && item.y <= 30) {
        item.group = 3;
        item.y = 3;
    } else if (item.y > 30 && item.y <= 35) {
        item.group = 4;
        item.y = 4;
    } else if (item.y > 35 && item.y <= 36) {
        item.group = 5;
        item.y = 5;
    } else {
        item.group = 6;
        item.y = 6;
    }
});