requirejs.config({
  paths: {
    "jquery": '../../bower_components/jquery/dist/jquery.min',
    "jquery.cookie": '../../bower_components/jquery.cookie/jquery.cookie',
    "foundation": '../../bower_components/foundation/js/foundation',
    "foundation.abide": '../../bower_components/foundation/js/foundation/foundation.abide',
    "foundation.accordion": '../../bower_components/foundation/js/foundation/foundation.accordion',
    "foundation.alert": '../../bower_components/foundation/js/foundation/foundation.alert',
    "foundation.clearing": '../../bower_components/foundation/js/foundation/foundation.clearing',
    "foundation.dropdown": '../../bower_components/foundation/js/foundation/foundation.dropdown',
    "foundation.equalizer": '../../bower_components/foundation/js/foundation/foundation.equalizer',
    "foundation.interchange": '../../bower_components/foundation/js/foundation/foundation.interchange',
    "foundation.joyride": '../../bower_components/foundation/js/foundation/foundation.joyride',
    "foundation.magellan": '../../bower_components/foundation/js/foundation/foundation.magellan',
    "foundation.offcanvas": '../../bower_components/foundation/js/foundation/foundation.offcanvas',
    "foundation.orbit": '../../bower_components/foundation/js/foundation/foundation.orbit',
    "foundation.reveal": '../../bower_components/foundation/js/foundation/foundation.reveal',
    "foundation.slider": '../../bower_components/foundation/js/foundation/foundation.slider',
    "foundation.tab": '../../bower_components/foundation/js/foundation/foundation.tab',
    "foundation.toolbar": '../../bower_components/foundation/js/foundation/foundation.toolbar',
    "foundation.topbar": '../../bower_components/foundation/js/foundation/foundation.topbar',
	"mustache": '../../bower_components/mustache/mustache',
	"skrollr": '../../bower_components/skrollr/dist/skrollr.min',
	"skrollr.ie": '../../bower_components/skrollr-ie/dist/skrollr.ie.min',
	"skrollr.menu": '../../bower_components/skrollr-menu/dist/skrollr.menu.min'
  },
  shim: {
    "jquery.cookie": ['jquery'],
    "foundation": ['jquery'],
    "foundation.abide": ['foundation'],
    "foundation.accordion": ['foundation'],
    "foundation.alert": ['foundation'],
    "foundation.clearing": ['foundation'],
    "foundation.dropdown": ['foundation'],
    "foundation.equalizer": ['foundation'],
    "foundation.interchange": ['foundation'],
    "foundation.joyride": ['foundation', 'jquery.cookie'],
    "foundation.magellan": ['foundation'],
    "foundation.offcanvas": ['foundation'],
    "foundation.orbit": ['foundation'],
    "foundation.reveal": ['foundation'],
    "foundation.slider": ['foundation'],
    "foundation.tab": ['foundation'],
    "foundation.toolbar": ['foundation'],
    "foundation.topbar": ['foundation'],
    "skrollr.ie": ['skrollr'],
    "skrollr.menu": ['skrollr']
  }
});

require( ['ScreenshotImagesUI','skrollr','mustache','jquery', 'foundation', 'skrollr.menu', 'skrollr.ie'],
	function( aoImgs, skrollr, Mustache, $ ){
		// build markup
		var template = $('#tmpl_screenshot_thumbnail').html();
		Mustache.parse(template);
		
		function buildScreenshotMarkup( oImgData ){
			var hContainer = $('#' + oImgData.id);
			oImgData.imgs.forEach( function( val ){
					var self = $( this );
					var rendered = Mustache.render( template, val );
					self.append( rendered )
				}, hContainer );
		}
		
		aoImgs.forEach( function(oSet){
			buildScreenshotMarkup( oSet );
		} );
		
		// activate plugins
		$(document).foundation();
		// start
		console.log('start');
		console.log(aoImgs);
	}
);

