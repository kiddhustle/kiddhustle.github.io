function SeriesVM(series_name, col_names){
	var self = this;
	self.name = series_name;
	self.col_names = col_names;
	self.data = [];
	self.init = function(){
		// for each col_name set observable to data property
		self.col_names.forEach( function(col_name){
			//console.log( self );
			this.push( ko.observable(0) );
		}, self.data );
		/*self.col_names.forEach( function(col_name){
			this[ col_name ] = ko.observable(0);
		}, self.data );*/
	}
	self.init();
}
