ko.bindingHandlers.ReportChart = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called when the binding is first applied to an element
        // Set up any initial state, event handlers, etc. here
        try{
        var VM = bindingContext.$data;
        var options = {
			chart: {
	            type: 'column'
	        },
	        title:{
            	text:VM.title
           },
	        legend:{
	        	enabled:true
	        },
	        credits:{
	        	enabled:false
	        },
	        xAxis: {
	            categories: VM.col_names
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: 'number'
	            },
	            allowDecimals:false
	        },
	        plotOptions:{
	        	series:{
	        		cursor: 'ns-resize',
	        		point:{
		        		events:{
		        			//drag: function () {
		        			//	this.y = parseInt( this.y );
		        			//},
		        			drop: function () {
		        				console.log(this);
		        				//this.y = parseInt( this.y );
		                        //$('#drop').html(
		                        //    'In <b>' + this.series.name + '</b>, <b>' + this.category + '</b> was set to <b>' + Highcharts.numberFormat(this.y, 2) + '</b>'
	                            //);
	                            // set dragged data value to VM
	                            VM.series()[ this.series.index ].data[ this.index ]( parseInt( this.y ) );
		                    }
		        		}
		        	},
		        	stickyTracking: true
	        	},
	        	
	        	
	        		
	        },
	        tooltip: {
		        yDecimals: 0,
		        valueDecimals: 0,
		    },				
	        series:VM.chartData()
	    }
	    
	    	$(element).highcharts(options);
	    	VM.chartData.subscribe( function(){
	    		
	    	} );
	    }catch(e){
	    	console.log('help');
	    	console.log(e);
	    }
        
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called once when the binding is first applied to an element,
        // and again whenever any observables/computeds that are accessed change
        // Update the DOM element based on the supplied values here.
        var VM = bindingContext.$data;
        console.log('update');
        
        var oChart = $(element).highcharts();
        var chartData = VM.chartData();
        console.log(chartData);
        for( var i =0;i< oChart.series.length;i++ ){
        	var oSeries = oChart.series[i];
        	oSeries.setData( chartData[i].data );
        }

        oChart.redraw();
        console.log('redraw');
    }
};