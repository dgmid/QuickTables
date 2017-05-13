// QuickTables - Coda 2 webscript sidebar plugin v1.0 | @duncanmid

(function(){

	"use strict";


	function outputTable( spacing ) {
		
		var cols	= window.CodaPlugInPreferences.preferenceForKey('cols'),
			rows	= window.CodaPlugInPreferences.preferenceForKey('rows'),
			content = window.CodaPlugInPreferences.preferenceForKey('content'),
			table	= '<table>\n',
			i,c,r, caption, thead, tfoot, cell;
		
		if( window.CodaPlugInPreferences.preferenceForKey('caption') === '1' ) {
			
			caption = '';
			
			if( content === '1' ) { caption = 'table caption'; }
			
			table	+= spacing + '\t<caption>' + caption + '</caption>\n';
		}
		
		if( window.CodaPlugInPreferences.preferenceForKey('colgroup') === '1' ) {
			
			table	+= spacing + '\t<colgroup>\n';
		
			for ( i = 0; i < cols; i ++ ) {
				
				table += spacing + '\t\t<col></col>\n';
			}	
			
			table	+= spacing + '\t</colgroup>\n';
		}
		
		if( window.CodaPlugInPreferences.preferenceForKey('thead') === '1' ) {
		
			table	+= spacing + '\t<thead>\n';
			table	+= spacing + '\t\t<tr>\n';
			
			for ( c = 0; c < cols; c ++ ) {
				
				thead = '';
				
				if( content === '1' ) { thead = 'head:' + (c+1); }
				
				table += spacing + '\t\t\t<th>' + thead + '</th>\n';
			}
			
			table	+= spacing + '\t\t</tr>\n';
			table	+= spacing + '\t</thead>\n';
		}
		
		if( window.CodaPlugInPreferences.preferenceForKey('tfoot') === '1' ) {
		
			table	+= spacing + '\t<tfoot>\n';
			table	+= spacing + '\t\t<tr>\n';
			
			for ( c = 0; c < cols; c ++ ) {
				
				tfoot = '';
				
				if( content === '1' ) { tfoot = 'foot:' + (c+1); }
				
				table += spacing + '\t\t\t<td>' + tfoot + '</td>\n';
			}
			
			table	+= spacing + '\t\t</tr>\n';
			table	+= spacing + '\t</tfoot>\n';
		}
		
		table	+= spacing + '\t<tbody>\n';
			
		for ( r = 0; r < rows; r ++ ) {
			
			table += spacing + '\t\t<tr>\n';
			
				for( c = 0; c < cols; c++  ) {
					
					cell = '';
					
					if( content === '1' ) { cell = 'row:' + (r+1) + ', col:' + (c+1); }
					
					table += spacing + '\t\t\t<td>' + cell + '</td>\n';
				}
			
			table += spacing + '\t\t</tr>\n';
		}
		
		table	+= spacing + '\t</tbody>\n';
	
		table	+= spacing + '</table>\n';
		
		return table;
	}
	
	
	
	
	function calculateInset() {
		
		var i, tabs, width, column, space, spacing;
		
		//note(@duncanmid): tabs or spaces
		tabs		= window.CodaTextView.usesTabs();
		width		= window.CodaTextView.tabWidth();
		column		= window.CodaTextView.getColumn();
		space		= '\t';
		spacing		= '';
		
		if(tabs === 0) {
									
			space = '';
			
			for ( i = 0; i < width; i++) {
				
				space += ' ';
			}
			
			for (i = 0; i < column; i += width ) {
			
				spacing += space;
			}
		
		} else {
			
			for (i = 0; i < column; i++) {
			
				spacing += space;
			}
		}
		
		return spacing;
	}
	
	
	
	//note(@duncanmid): docready
	
	$(document).ready(function() {
				
		$('#insert, #code').click(function() {
			
			var newDoc;

			//note(@duncanmid): insert or code			
			if( $(this).attr('id') === 'insert' ) {
				
				window.CodaTextView.insertText( outputTable( calculateInset() ) );
			
			} else {
			
				//note(@duncanmid): generate
			
				newDoc = CodaPlugInsController.makeUntitledDocument();
				newDoc.insertText( outputTable( '' ) );			
			}
		});
	});

})();
