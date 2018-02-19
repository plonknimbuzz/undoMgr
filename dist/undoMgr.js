/*
	name: undoMgr 1.0
	author: plonknimbuzz@gmail.com
	github: https://github.com/plonknimbuzz/undoMgr
*/
(function() {
	"use strict";
	var undoMgr = function(limits=0, callbacks = false) {
		var index = -1,
			limit = parseInt(limits) > 0 ? parseInt(limits): 0,
			history = [],
			callback = typeof callbacks =="function" ? callbacks: false;
		
		return {
			getIndex: function(){
				return index;
			},
			
			add: function(data){
				if(index + 1 < history.length) history.splice(index+1, history.length);
				if(history.length==limit && limit >0) history.shift();
				else index++;
				history[history.length] = data;
				if(callback) callback();
			},
			
			show: function(){
				return history;
			},
			
			count: function(){
				return history.length;
			},
			
			clear: function(){
				index = -1;
				history = [];
				if(callback) callback();
			},
			
			hasUndo: function(){
				return index > 0;
			},
			
			hasRedo: function(){
				return (index > -1 && index + 1 < history.length); 
			},
				
			undo: function(){
				index--;
				if(callback) callback();
			},
			
			redo: function(){
				index++;
				if(callback) callback();
			},
			
			getData: function(){
				return index > -1 ? history[index] : null;
			}
		};
	};
	
	window.undoMgr = undoMgr;
}());