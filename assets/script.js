var labelColors = [
    '#e5baff',
    '#ffb9bf',
    '#f2f2f2',
    '#ffeaab',
    '#ffd2ab'
];

var lineColors = [
    '#d38aff',
    '#ff838d',
    '#cccccc',
    '#fdda1e',
    '#ffb26f'
];

var groupLength = 7;

var options = {
    graphHeight: '200px',
    drawPoints: {
        size: 10,
        style: 'circle'
    },
    dataAxis: {
        left: {
            title: {
                text: '<div><span class="title">Respiratory Rate</span><br/><span class="subtitle">(breath / min)</span></div>'
            },
            range: {
                min: -1,
                max: groupLength
            }
        },
        data: {
            values: [0, 1, 2, 3, 4, 5, 6],
            labels: ['≤ 4', '5-8', '9-20', '21-30', '31-35', '36', '≥ 37']
        }
    },
    timeAxis: {
        scale: 'hour',
        step: 1
    }
};

// Agrupando os itens e vinculando ao grupo
var groupItems = function (items) {
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

    return items;
};

// Gera um número inteiro aleatório entre os intervalos informados
var generateRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Gera os itens aleatoriamente
var generateItems = function (length) {
    var items = [];
    var d = new Date(2010, 10, 10);
        
    for (let i = 0; i < length; i++) {
        items.push({ x: new Date(d.getTime() + (i * 60 * 60 * 1000)), y: generateRandomInt(0, 40) });
    }

    return groupItems(items);
};


// Criando os grupos
var getGroups = function (length) {
    let groups = [];
    let colorIndex = 0;

    for (let i = 0; i < length; i++) {
        if (colorIndex > 4) colorIndex = 0;
        let color = lineColors[colorIndex];

        groups.push({
            id: i,
            style: 'stroke:' + color + ';',
            options: { drawPoints: { styles: 'stroke:' + color + '; fill:' + color + ';' } }
        });

        colorIndex++;
    }

    return groups;
};

// Removendo os pontos intermediários das linhas
var removeIntermediatePoints = function () {
    for (let i = 0; i < groupLength; i++) {
        let points = document.querySelectorAll('.vis-graph-group' + i + '.vis-point');
        points.forEach(function (point, i) {
            if (i !== 0 && i !== points.length - 1) {
                point.style.display = 'none';
            }
        });
    }
};

// Adicionando cores aos labels do eixo y
var addLabelColor = function () {
    let labels = document.querySelectorAll('.vis-data-axis .vis-y-axis:not(.vis-title)');
    let colorIndex = 0;

    labels.forEach(function (label, i) {
        if (colorIndex > 4) colorIndex = 0;
        let color = labelColors[colorIndex];

        label.style.backgroundColor = color;

        colorIndex++;
    });
};

var connectPoints = function () {
    let points = [];
    document.querySelectorAll('.vis-timeline .vis-point').forEach(function (point) {
        points[point.getAttribute('cx')] = point;
    });
    points.sort();
    console.log(points);
};

window.onload = function () {
    var items = generateItems(48);

    var Graph2d = new vis.Graph2d(document.getElementById('graph'), items, getGroups(groupLength), options);

    addLabelColor();
    connectPoints();
    //removeIntermediatePoints();

    //Graph2d.on('rangechanged', removeIntermediatePoints);
};