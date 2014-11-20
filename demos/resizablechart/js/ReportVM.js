function ReportVM(title, col_names){
	var self = this;
	self.title = title;
	self.col_names = col_names;
	self.series = ko.observableArray();
	self.display_chart = ko.observable(false);
	self.set_chart_display = function(bSet){
		bSet = undefined == bSet ? true : bSet;
		self.display_chart(bSet);
		//alert( bSet );
		//console.log( 'bSet' );
		//console.log( bSet );
	}
	self.completed = ko.pureComputed(function(){
		// check if any values are empty
		//console.log('hey');
		//return false;
		//console.log(self.series.length);
		var bAllZero = true;
		for( var x = 0; x< self.series().length; x++ ){
			var oSeries = self.series()[ x ];
			//console.log(oSeries);
			for( var i = 0; i < oSeries.data.length; i++ ){
				var iValue =  oSeries.data[ i ];
				//console.log('iValue');
				//console.log(iValue());
				if( parseInt( iValue() ) !== 0 ){
					bAllZero =  false;
				}
			}
		}
		// return true if none are empty
		//console.log('bAllZero')
		//console.log(bAllZero)
		return bAllZero === false ? true : false;
	});
	self.chartData = ko.computed(function(){
		var aOutput = [];
		for( var i =0; i < self.series().length; i++ ){
			var oSeries = self.series()[i];
			//console.log( oSeries )
			var dataSeries = {
        		name:oSeries.name,
        		data:ko.toJS( oSeries.data ),
        		draggableX:false,
        		draggableY:true
        	};
        	for( var x = 0; x<dataSeries.data.length;x++ ){
        		dataSeries.data[ x ] = parseInt( dataSeries.data[ x ] );
        	}
        	aOutput.push( dataSeries );
		}
		return aOutput;
	});
}
