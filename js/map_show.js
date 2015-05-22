map_show = function(tag, year) {
    get_gdp = function(y) {
        var gdp_data = [];
        var index = y - 1978;
        for (i in gdps) {
            var gdp = {
                'hc-key': gdps[i]['hc-key'],
                'value': [gdps[i]['value'][index]]
            };
            gdp_data.push(gdp);
        }
        return gdp_data;
    };

    get_gdp_rate = function(y) {
        var gdp_rate_data = [];
        var index = y - 1978;
        for (i in gdps) {
            var gdp = {
                'hc-key': gdps[i]['hc-key'],
                'value': [(gdps[i]['value'][index] - gdps[i]['value'][index-1])
                / gdps[i]['value'][index-1] * 100]
            };
            gdp_rate_data.push(gdp);
        }
        return gdp_rate_data;
    };

    get_relative_gdp = function(y) {
        var relative_gdp_data = [];
        var index = y - 1978;
        var base_gdp = gdps[gdps.length-1]['value'][index];
        for (i in gdps) {
            var gdp = {
                'hc-key': gdps[i]['hc-key'],
                'value': [gdps[i]['value'][index] / base_gdp]
            };
            relative_gdp_data.push(gdp);
        }
        return relative_gdp_data;
    };

    var data = [];
    switch (tag) {
        case 0:
            data = get_gdp(year);
            break;
        case 1:
            data = get_gdp_rate(year);
            break;
        case 2:
            data = get_relative_gdp(year);
            break;
        default:
            break;
    }

    $('#data-map').highcharts('Map', {
        title: {
            text: null
        },

        credits: {
            enabled: true,
            text: '数据来源: 国家统计局'
        },

        mapNavigation: {
            enabled: true,
            enableDoubleClickZoomTo: true
        },

        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'bottom'
        },

        colorAxis: {
            min: 0,
            stops: [
                [0, '#EFEFFF'],
                [0.5, Highcharts.getOptions().colors[0]],
                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).brighten(-0.5).get()]
            ]
        },

        series: [{
            //animation: {
            //    duration: 1000
            //},
            data: data,
            mapData: Highcharts.maps['countries/cn/custom/cn-all-sar-taiwan'],
            joinBy: 'hc-key',
            name: '人均GDP',
            allowPointSelect: true,
            states: {
                select: {
                    color: Highcharts.getOptions().colors[5]
                },
                hover: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }]
    });
};
