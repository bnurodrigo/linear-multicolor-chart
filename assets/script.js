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

// Retorna o valor referente ao agrupamento do item 
var getGroupValue = function (val) {
    if (val <= 4) {
        return 0;
    } else if (val > 4 && val <= 8) {
        return 1;
    } else if (val > 8 && val <= 20) {
        return 2;
    } else if (val > 20 && val <= 30) {
        return 3;
    } else if (val > 30 && val <= 35) {
        return 4;
    } else if (val > 35 && val <= 36) {
        return 5;
    } else {
        return 6;
    }
}

// Agrupando os itens e vinculando ao grupo
var groupItems = function (items) {
    var currentGroup;
    var group = 0;
    var itemJunctions = [];

    items.forEach(function (item, i) {
        item.y = getGroupValue(item.y);

        if (currentGroup !== item.y) {
            currentGroup = item.y;
            group++;
        }

        if (i !== items.length - 1) {
            itemJunctions[i + 1] = { x: items[i + 1].x, y: getGroupValue(items[i + 1].y), group: group, custom: true };
        }

        item.group = group;
    });

    // Mergando os arrays para criar a continuação dos pontos
    var totalMerged = 0;
    itemJunctions.forEach(function (item, i) {
        items.splice(i + totalMerged, 0, item);
        totalMerged++;
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

// Retorna a cor pelo index
var getLineColor = function (index) {
    var colorIndex = 0;
    for (let i = 0; i <= index; i++) {
        if (colorIndex > lineColors.length - 1) colorIndex = 0;
        if (i === index) return lineColors[colorIndex];
        colorIndex++;
    }
    return '#cccccc';
};

// Criando os grupos já com as cores correspondentes
var getGroups = function (items) {
    var groups = [];

    items.reverse().forEach(item => {
        let color = getLineColor(item.y);
        groups[item.group -1] = {
            id: item.group,
            style: 'stroke:' + color + ';',
            options: { drawPoints: { styles: 'stroke:' + color + '; fill:' + color + ';' } }
        };
    });

    return groups;
};

// Adicionando cores aos labels do eixo y
var addLabelColor = function () {
    let labels = document.querySelectorAll('.vis-data-axis .vis-y-axis:not(.vis-title)');
    let colorIndex = 0;

    labels.forEach(function (label, i) {
        if (colorIndex > labelColors.length - 1) colorIndex = 0;
        let color = labelColors[colorIndex];

        label.style.backgroundColor = color;

        colorIndex++;
    });
};

window.onload = function () {
    var items = generateItems(24);
    var groups = getGroups(items);

    new vis.Graph2d(document.getElementById('graph'), items, groups, options);

    addLabelColor();
};