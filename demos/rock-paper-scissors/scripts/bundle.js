(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* jshint devel:true */
var GameController = require('./GameController');
var oController;
//
$(document).ready(function(){
	oController = new GameController();
	console.log(oController);
	oController.setEventListeners();
	// oController.startGame();
	$('#play_human, #play_computer').on('click', oController.startGame );
});

},{"./GameController":4}],2:[function(require,module,exports){
var ComputerPlayer = function(gamemoves){
	var self = this;
	self.gamemoves = gamemoves;
	self.pickMove = function(){
		var random = Math.random();
		random *=  self.gamemoves.length;
		random = Math.floor( random );
		return self.gamemoves[ random ];
	};
};
module.exports = ComputerPlayer;
},{}],3:[function(require,module,exports){
var Constants = {
	movesStandard : ['rock','paper','scissors'],
	movesLizardSpock : ['rock','paper','scissors','lizard','spock']
};
module.exports = Constants;
},{}],4:[function(require,module,exports){
var GameEngine = require('./GameEngine');
var ComputerPlayer = require('./ComputerPlayer');
var Constants = require('./Constants');

var GameController = function(){
	var self = this;
	// properties
	self.state = {
		player:'human',// (human|computer)
		moves:{
			p1:'rock',
			p2:'rock'
		}
	};
	self.engine = new GameEngine(Constants.movesStandard);
	self.computerPlayer = new ComputerPlayer(Constants.movesStandard);
	self.htmlContainerSelector = '#render';
	self.htmlGameContentSelector = '.gamewindow__body__content';
	self.htmlMovesSelectorP1 = '#gamewindow__body__moves__options--player .gamewindow__body__moves__options__item';
	self.htmlMovesSelectorP2 = '#gamewindow__body__moves__options--opponent .gamewindow__body__moves__options__item';
	self.gameDuration = 3000;
	self.gameDurationInterations = 6;
	self.gameDurationInterationCount = 0;
	self.gameDurationInterval = self.gameDuration / self.gameDurationInterations;
	self.gameIntervalId;
	// methods
	self.onInterval = function(){
		if( this.gameDurationInterationCount === this.gameDurationInterations ){
			self.clearInterval( );
			// display winner
			this.displayWinner();
			this.gameDurationInterationCount = 0;
			$('.button').show();
		}
		else {
			self.gameDurationInterationCount++;
			var secs_remaining = 3 - ( Math.floor( this.gameDurationInterationCount/2 ) );

			// pick move on every interval
			if(this.state.player === 'computer'){
				this.state.moves.p1 = this.computerPlayer.pickMove();
				// click option
				$( self.htmlMovesSelectorP1 + '[data-move=' + this.state.moves.p1 + ']' ).click();
			}
			this.state.moves.p2 = this.computerPlayer.pickMove();
			$('#gamewindow__countdown').text( secs_remaining );
			this.updateComputerSelection();
			console.log( 'self.gameDurationInterationCount:', this.gameDurationInterationCount );
			console.log( 'secs_remaining:', secs_remaining );
			console.log( 'self.state:', this.state );
		}
	}.bind(self);
	
	self.clearInterval = function(){
		console.log( 'gameIntervalId:',self.gameIntervalId );
		window.clearInterval( self.gameIntervalId );
	};

	self.runGame = function(){
		console.log('run game');
		$('.button').hide();
		// rm classes
		$('.gamewindow__body__moves__options__item').removeClass('winner loser');
		// render display
		$( self.htmlGameContentSelector ).html(
			// text template to html
			$( $('#tmpl_gamewindow_countdown').text() )
		);
		// self.gameTimerId = window.setInterval( (function(controller){
		// 	return function(){
		// 		controller.onInterval();
		// 	};
		// })(self.onInterval), self.gameDurationInterval );
		self.gameIntervalId = window.setInterval( self.onInterval, self.gameDurationInterval );
	};
	self.displayWinner = function(){
		var m1 = self.state.moves.p1;
		var m2 = self.state.moves.p2;
		var winner = self.engine.findWinner( m1, m2 );
		console.log('winner:',winner);

		var jSelection1 = $( self.htmlMovesSelectorP1 + '[data-move=' + self.state.moves.p1 + ']');
		var jSelection2 = $( self.htmlMovesSelectorP2 + '[data-move=' + self.state.moves.p2 + ']');
		var aSelections = [jSelection1, jSelection2];

		jSelection1.siblings().removeClass('selected winner loser');
		jSelection2.siblings().removeClass('selected winner loser');

		
		var output;
		switch( winner ){
			case 1:
				output = '<h3>Player 1 beats Player 2!</h3><p>' + m1 + ' beats ' + m2 + '</p>';
				// render winner
				aSelections[0].addClass( 'winner' );
				aSelections[1].addClass( 'loser' );
				break;
			case 2:
				output = '<h3>Player 2 beats Player 1!</h3><p>' + m2 + ' beats ' + m1 + '</p>';
				aSelections[1].addClass( 'winner' );
				aSelections[0].addClass( 'loser' );
				break;
			default:
				output = '<h3>No winner this time. Play again!</h3><p>' + m1 + ' matches ' + m2 + '</p>';
				break;
		}
		$( self.htmlGameContentSelector ).html(
			$(output)
		);
	};
	// events
	self.setEventListeners = function(){
		// delegate events to render container
		var selector = self.htmlContainerSelector;
		console.log('add event listeners to:', selector);
		// play game
		$( selector ).on( 'click', '#btn_play_game', function(e){
			e.preventDefault();
			// alert('start game!');
			self.runGame();
		} );

		// go home
		$( selector ).on( 'click', '#btn_home', function(e){
			e.preventDefault();
			window.location.href = './';
		} );
		// set player selection
		$( selector ).on( 'click', self.htmlMovesSelectorP1, function(e){
			e.preventDefault();
			var selection = $(this).attr('data-move');
			var jSelf = $(this);
			jSelf.siblings().removeClass('selected');
			jSelf.addClass('selected');
			self.state.moves.p1 = selection;
			console.log('set human selection to:', self.state.moves.p1);
		} );
		// prevent computer options
		$( selector ).on( 'click', self.htmlMovesSelectorP2, function(e){
			e.preventDefault();
		} );
		//gamewindow__body__moves__options
	};
	// render
	self.renderGameWindow = function(player){
		console.log('renderGameWindow');
		var markup = ( player === 'computer' ) ? $('#tmpl_gamewindow_computer').text() : $('#tmpl_gamewindow_human').text();
		$( self.htmlContainerSelector ).html( $(markup) );
	},
	self.updateComputerSelection = function(){
		var jItem = $( self.htmlMovesSelectorP2 + '[data-move=' + self.state.moves.p2 + ']');
		jItem.siblings().removeClass('selected');
		jItem.addClass('selected');

	},
	self.startGame = function(e){
		console.log('start game');
		e.preventDefault();
		var jSelf = $(this);
		self.state.player = jSelf.attr('data-player');

		// alert('ouch! Player: ' + self.state.player);
		$('#home').hide();
		// window.location.hash = 'play';
		self.renderGameWindow(self.state.player);
	},
	// html generaters
	self.getOptionsHtml = function(role){
		// console.log('renderOptions');
		var tmpl = $('#tmpl_move_option').text();
		// console.log('#tmpl: ', tmpl);
		var open = '<div class="gamewindow__body__moves__options" id="gamewindow__body__moves__options--' + role + '"data-role="' + role + '" >';
		var close = '</div">';
		var html = '';
		self.engine.gamemoves.forEach(function(move, i){
			//console.log('move: ', move, 'tmpl:', tmpl);
			html += tmpl.replace( /\{\{name\}\}/g, move );
			// html += tmpl.replace( '{{name}}', move.name );
		});
		return open + html + close;
		//console.log('html:', html);
	}
};
module.exports = GameController;
},{"./ComputerPlayer":2,"./Constants":3,"./GameEngine":5}],5:[function(require,module,exports){
var GameEngine = function(gamemoves){
	var self = this;
	// check we have an odd number of moves for this game
	if( gamemoves.length % 2 !== 1 ){
		throw 'A game must have an odd number of possible game moves.\n' + possiblemoves.length + ' moves were provided';
	}
	else {
		self.gamemoves = gamemoves;
	}
	

	self.name = 'engine 1';
	self.getMoveIndex = function(move){
		return self.gamemoves.indexOf( move );
	};
	self.findMoveParity = function(move){
		return self.gamemoves.indexOf( move ) % 2;
	};
	/**
	 * [findWinner description]
	 * @param  {[string]} m1 [player 1's move]
	 * @param  {[string]} m2 [player 2's move]
	 * @return {[number]}    [number indicating the winner ( 0 = draw)]
	 */
	self.findWinner = function(m1, m2){
		var result;
		if( self.getMoveIndex( m1 ) === self.getMoveIndex( m2 ) ){
			result = 0;
		}
		else {
			// if of equal parity then lowest move wins
			if( self.findMoveParity( m1 ) === self.findMoveParity( m2 ) ){
				result = self.getMoveIndex( m1 ) < self.getMoveIndex( m2 ) ? 1 : 2;
			}
			// else highest move wins
			else {
				result = self.getMoveIndex( m1 ) > self.getMoveIndex( m2 ) ? 1 : 2;
			}
		}

		return result;
	}
};

module.exports = GameEngine;
},{}]},{},[1]);
