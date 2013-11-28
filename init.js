var init = {
	run : function(ajax) {
		this.send(ajax, this.procLeanneToDo, 'leanne_todo.php');
		this.send(ajax, this.procJustinToDo, 'justin_todo.php');
		this.send(ajax, this.procJustinLife, 'justin_life.php');
	},

	send : function(ajax, responseFcn, url) {
		try {
			var x = ajax.createXMLHTTP();
			ajax.prepareResponseHandler(x, responseFcn);
			ajax.sendGetRequest(x, url);
		}
		catch(e) {
			alert(e.message);
		}
	},
	procLeanneToDo : function(x) {
		document.getElementById('leanne_todo').innerHTML = x.responseText;
	},
	procJustinToDo : function(x) {
		document.getElementById('justin_todo').innerHTML = x.responseText;
	},
	procJustinLife : function(x) {
		document.getElementById('justin_life').innerHTML = x.responseText;
	}
}