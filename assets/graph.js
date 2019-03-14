var options = {
    maxMinorChars: 5,
    start: '2019-03-13 00:00',
    end: '2019-03-13 23:00',
    graphHeight: '200px',
    drawPoints: {
        size: 8,
        style: 'circle'
    },
    dataAxis: {
        left: {
            title: {
                text: 'Respiratory Rate'
            },
            range: {
                min: -1,
                max: groupCount
            }
        },
        data: {
            values: [0, 1, 2, 3, 4, 5, 6],
            labels: ['<= 4', '5-8', '9-20', '21-30', '31-35', '36', '>= 37']
        }
    },
    timeAxis: {
        scale: 'hour',
        step: 4
    }
};

window.onload = function () {
    new vis.Graph2d(document.getElementById('graph'), items, groups, options);

    // Removendo os pontos intermediários das linhas
    for (let i = 0; i < groupCount; i++) {
        let points = document.querySelectorAll('.vis-graph-group' + i + '.vis-point');
        points.forEach(function (point, i) {
            if (i !== 0 && i !== points.length - 1) {
                point.style.display = 'none';
            }
        });
    }
};