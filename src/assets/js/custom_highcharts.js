$(document).ready(function() {

	Highcharts.chart('thirdChart', {

	    chart: {
	        type: 'solidgauge',
	        height: '120%',
	      	margin: [0, 0, 0, 0]
	    },

	    title: {
	        text: '',
	    },

	    tooltip: {
	        borderWidth: 0,
	        backgroundColor: 'none',
	        shadow: false,
	        style: {
	            fontSize: '16px'
	        },
	        valueSuffix: '%',
	        pointFormat: '',
	        positioner: function (labelWidth) {
	            return {
	                x: (this.chart.chartWidth - labelWidth) / 2,
	                y: (this.chart.plotHeight / 2) + 15
	            };
	        }
	    },

	    exporting: { enabled: false },

	    pane: {
	        startAngle: 0,
	        endAngle: 360,
	        background: [{ // Track for Move
	            outerRadius: '100%',
	            innerRadius: '88%',
	            backgroundColor: Highcharts.color(Highcharts.getOptions().colors[0])
	                .setOpacity(0)
	                .get(),
	            borderWidth: 0
	        }, { // Track for Exercise
	            outerRadius: '75%',
	            innerRadius: '63%',
	            backgroundColor: Highcharts.color(Highcharts.getOptions().colors[1])
	                .setOpacity(0)
	                .get(),
	            borderWidth: 0
	        }, { // Track for Stand
	            outerRadius: '50%',
	            innerRadius: '38%',
	            backgroundColor: Highcharts.color(Highcharts.getOptions().colors[2])
	                .setOpacity(0)
	                .get(),
	            borderWidth: 0
	        }]
	    },

	    yAxis: {
	        min: 0,
	        max: 100,
	        lineWidth: 0,
	        tickPositions: []
	    },

	    plotOptions: {
	        solidgauge: {
	            dataLabels: {
	                enabled: false
	            },
	            linecap: 'round',
	            stickyTracking: false,
	            rounded: true
	        }
	    },

	    series: [{
	        name: 'Move',
	        data: [{
	            color: '#DB2A33',
	            radius: '100%',
	            innerRadius: '88%',
	            y: 70
	        }]
	    }, {
	        name: 'Exercise',
	        data: [{
	            color: '#A91B89',
	            radius: '75%',
	            innerRadius: '63%',
	            y: 23
	        }]
	    }, {
	        name: 'Stand',
	        data: [{
	            color: '#2C767E',
	            radius: '50%',
	            innerRadius: '38%',
	            y: 7
	        }]
	    }]
	});

});