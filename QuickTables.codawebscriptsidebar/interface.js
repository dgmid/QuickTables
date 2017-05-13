// QuickTables - Coda 2 webscript sidebar plugin v1.0 | @duncanmid

(function() {

	"use strict";
	
	
	//NOTE(@duncanmid): setup defaults
	
	var parameters = {
		'rows':		'3',
		'cols':		'3',
		'caption':	'1',
		'colgroup':	'1',
		'thead':	'1',
		'tfoot':	'1',
		'content':	'0'
	};
	
	var options = Object.keys(parameters);
	
	function setup() {
			
		options.forEach( function(key) {
		
		if( window.CodaPlugInPreferences.preferenceForKey(key) === undefined ) {
				window.CodaPlugInPreferences.setPreferenceForKey(parameters[key], key);
			}
		});
	}

	setup();
	
	
	
	//note(@duncanmid): build table body
	
	function buildCells(cols, rows) {
		
		var thead = '',
			tfoot = '',
			tbody = '';
		
		for( var r = 0; r < rows; r++ ) {
			
			if( r === 0 ) {
				
				thead += '<tr>';
				tfoot += '<tr>';
			}
			
			tbody += '<tr>';
			
			for (var c = 0; c < cols; c++ ) {
				
				if( r === 0 ) {
					
					thead += '<th></th>';
					tfoot += '<td></td>';
					
				}
				
				tbody += '<td></td>';
			}
			
			tbody += '</tr>';
		}
		
		$('#display thead').html( thead );
		$('#display tfoot').html( tfoot );
		$('#display tbody').html( tbody );
		
		window.CodaPlugInPreferences.setPreferenceForKey(cols, 'cols');
		window.CodaPlugInPreferences.setPreferenceForKey(rows, 'rows');
	}
	
	
	
	//note(@duncanmid): onload
	
	function onload(cols, rows) {
		
		var elements = ['colgroup', 'thead', 'tfoot', 'content'];
		
		$('#cols, #colsnum').val(cols);
		$('#rows, #rowsnum').val(rows);
		
		buildCells(cols, rows);
		
		if(window.CodaPlugInPreferences.preferenceForKey( 'caption' ) === '0') {
			
			$('#caption').prop('checked', false);
			$('#display caption').addClass('hide');
		
		} else {
			
			$('#caption').prop('checked', true);
			$('#display caption').removeClass('hide');
		}
		
		
		for( var i = 0; i < elements.length; i++ ) {
		
			if(window.CodaPlugInPreferences.preferenceForKey( elements[i] ) === '0') {
				
				$('#' + elements[i]).prop('checked', false);
				$('#display ' + elements[i]).hide();
			
			} else {
				
				$('#' + elements[i]).prop('checked', true);
				$('#display ' + elements[i]).show();
			}
		}
	}
	
	
	
	//note(@duncanmid): docready
	
	$(document).ready(function() {
		
		//note(@duncanmid): onload
		onload( window.CodaPlugInPreferences.preferenceForKey('cols'), window.CodaPlugInPreferences.preferenceForKey('rows') );
		
		
		
		
		//note(@duncanmid): add / remove elements
		
		$('#colgroup, #thead, #tfoot, #content').click(function() {
			
			var id = $(this).attr('id');
			
			if( $(this).prop('checked') ) {
				
				$('#display ' + id).show();
				
				window.CodaPlugInPreferences.setPreferenceForKey('1', id);
			
			} else {
				
				$('#display ' + id).hide();
				
				window.CodaPlugInPreferences.setPreferenceForKey('0', id);
			}
			
		});
		
		
		$('#caption').click(function() {
			
			if( $(this).prop('checked') ) {
				
				$('#display caption').removeClass('hide');
				window.CodaPlugInPreferences.setPreferenceForKey('1', 'caption');
				
			} else {
				
				$('#display caption').addClass('hide');
				window.CodaPlugInPreferences.setPreferenceForKey('0', 'caption');
			}
			
		});
		
		
		//note(@duncanmid): modify cols and rows
		
		$('#cols, #rows, #colsnum, #rowsnum').change(function() {
			
			var cols, rows;
			
			if( $(this).attr('id') === 'cols' || $(this).attr('id') === 'rows' ) {
			
				cols = $('#cols').val();
				rows = $('#rows').val();
				
				$('#colsnum').val(cols);
				$('#rowsnum').val(rows);
			
			} else {
				
				cols = $('#colsnum').val();
				rows = $('#rowsnum').val();
				
				$('#cols').val(cols);
				$('#rows').val(rows);
			}
			
			buildCells(cols, rows);
		});
		
	});

})();
