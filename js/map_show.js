gdp_show = function() {
    get_gdp = function(year) {
        var gdp_data = [];
        var index = year - 1978;
        for (i in gdps) {
            var gdp = {
                'hc-key': gdps[i]['hc-key'],
                'value': [gdps[i]['value'][index]]
            };
            gdp_data.push(gdp);
        }
        return gdp_data;
    };

    $('#data-map').highcharts('Map', {
        title: {
            text: ''
        },

        subtitle: {
            text: ''
        },

        credits: {
            enabled: false,
            text: '',
            href: ''
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            min: 0
        },

        series: [{
            data: get_gdp(1978),
            mapData: Highcharts.maps['countries/cn/custom/cn-all-sar-taiwan'],
            joinBy: 'hc-key',
            name: '人均GDP',
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }]
    });
};

gdp_rate_show = function() {
    get_gdp_rate = function(year) {
        var gdp_rate_data = [];
        var index = year - 1978;
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

    $('#data-map').highcharts('Map', {
        title: {
            text: ''
        },

        subtitle: {
            text: ''
        },

        credits: {
            enabled: false,
            text: '',
            href: ''
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            min: 0
        },

        series: [{
            data: get_gdp_rate(1979),
            mapData: Highcharts.maps['countries/cn/custom/cn-all-sar-taiwan'],
            joinBy: 'hc-key',
            name: '人均GDP增长率',
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }]
    });
};

relative_gdp_show = function() {
    get_relative_gdp = function(year) {
        var relative_gdp_data = [];
        var index = year - 1978;
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

    $('#data-map').highcharts('Map', {
        title: {
            text: ''
        },

        subtitle: {
            text: ''
        },

        credits: {
            enabled: false,
            text: '',
            href: ''
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            min: 0
        },

        series: [{
            data: get_relative_gdp(1978),
            mapData: Highcharts.maps['countries/cn/custom/cn-all-sar-taiwan'],
            joinBy: 'hc-key',
            name: '人均GDP',
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }]
    });
};

gdp_show();
