var mapChart;
var countryChart;

Highcharts.wrap(Highcharts.Point.prototype, 'select', function (proceed) {
    proceed.apply(this, Array.prototype.slice.call(arguments, 1));
    var points = mapChart.getSelectedPoints();

    if (points.length) {
        if (points.length === 1) {
            $('#province-name').html(points[0].name);
        } else {
            $('#province-name').html('地区对比');
        }

        if (!countryChart) {
            countryChart = $('#province-chart').highcharts({
                title: {
                    text: null
                },

                credits: {
                    enabled: false
                },

                xAxis: {
                    tickPixelInterval: 50,
                    crosshair: true
                },
                yAxis: {
                    title: null,
                    opposite: true
                },

                tooltip: {
                    shared: true
                },

                plotOptions: {
                    series: {
                        animation: {
                            duration: 500
                        },
                        marker: {
                            enabled: false
                        },
                        threshold: 0,
                        pointStart: parseInt(categories[0])
                    }
                }
            }).highcharts();
        }

        $.each(points, function (i) {
            // Update
            if (countryChart.series[i]) {
                /*$.each(countries[this.code3].data, function (pointI, value) {
                 countryChart.series[i].points[pointI].update(value, false);
                 });*/
                countryChart.series[i].update({
                    name: this.name,
                    data: countries[this.code3].data,
                    type: points.length > 1 ? 'line' : 'area'
                }, false);
            } else {
                countryChart.addSeries({
                    name: this.name,
                    data: countries[this.code3].data,
                    type: points.length > 1 ? 'line' : 'area'
                }, false);
            }
        });
        while (countryChart.series.length > points.length) {
            countryChart.series[countryChart.series.length - 1].remove(false);
        }
        countryChart.redraw();

    } else {
        $('#province-name').html('');
        if (countryChart) {
            countryChart = countryChart.destroy();
        }
    }
});

map_show = function(tag, year) {
    get_gdp = function(y) {
        var gdp_data = [];
        var index = y - 1978;
        for (var i in gdps) {
            var gdp = {
                'hc-key': gdps[i]['hc-key'],
                'value': [gdps[i]['value'][index]]
            };
            gdp_data.push(gdp);
        }
        return gdp_data;
    };

    get_max_gdp = function() {
        var max_gdp = 0;
        var values, max_value;
        for (var i in gdps) {
            values = gdps[i]['value'];
            max_value = values[values.length-1];
            if (max_value > max_gdp) {
                max_gdp = max_value;
            }
        }
        return max_gdp;
    };

    get_gdp_rate = function(y) {
        var gdp_rate_data = [];
        var index = y - 1978;
        for (var i in gdps) {
            var gdp = {
                'hc-key': gdps[i]['hc-key'],
                'value': [(gdps[i]['value'][index] - gdps[i]['value'][index-1])
                / gdps[i]['value'][index-1] * 100]
            };
            gdp_rate_data.push(gdp);
        }
        return gdp_rate_data;
    };

    get_max_gdp_rate = function() {
        var max_gdp_rate = 0;
        var values, gdp_rate;
        for (var i in gdps) {
            values = gdps[i]['value'];
            for (var j = 1; j < values.length; j++) {
                gdp_rate = (values[j] - values[j-1]) / values[j] * 100;
                if (gdp_rate > max_gdp_rate) {
                    max_gdp_rate = gdp_rate;
                }
            }
        }
        return max_gdp_rate;
    };

    get_relative_gdp = function(y) {
        var relative_gdp_data = [];
        var index = y - 1978;
        var base_gdp = gdps[gdps.length-1]['value'][index];
        for (var i in gdps) {
            var gdp = {
                'hc-key': gdps[i]['hc-key'],
                'value': [gdps[i]['value'][index] / base_gdp]
            };
            relative_gdp_data.push(gdp);
        }
        return relative_gdp_data;
    };

    get_max_relative_gdp = function() {
        var max_relative_gdp = 0;
        var values, relative_gdp;
        var base_values = gdps[gdps.length-1]['value'];
        for (var i in gdps) {
            values = gdps[i]['value'];
            for (var j = 0; j < values.length; j++) {
                relative_gdp = values[j] / base_values[j];
                if (relative_gdp > max_relative_gdp) {
                    max_relative_gdp = relative_gdp;
                }
            }
        }
        return max_relative_gdp;
    };

    var data = [];
    var max_data = 0;
    switch (tag) {
        case 0:
            data = get_gdp(year);
            max_data = get_max_gdp();
            break;
        case 1:
            data = get_gdp_rate(year);
            max_data = get_max_gdp_rate();
            break;
        case 2:
            data = get_relative_gdp(year);
            max_data = get_max_relative_gdp();
            break;
        default:
            break;
    }

    mapChart = $('#data-map').highcharts('Map', {
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
            max: max_data,
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
    }).highcharts();
};
