ajax = {
	/**
	 * Creates XMLHTTP object specific to browser type
	 *@return XMLHttpRequest object or Windows-specific ActiveX XMLHTTP object
	 */
	createXMLHTTP : function() {
		if(window.XMLHttpRequest) {
			try {
				x = new XMLHttpRequest();
			} catch(e) {
				x = false;
			}
		// branch for IE/Windows ActiveX version
		} else if(window.ActiveXObject) {
			try {
				x = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				try {
					x = new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {
					x = false;
				}
			}
		}

		return x;
	},
	/**
	 *Returns whether no request has been sent using XMLHTTP object
	 *@param x - XMLHTTP object
	 */
	requestUninitiated : function(x) {
		return ( x.readyState == 0 );
	},
	/**
	 *Returns whether a request has been sent using XMLHTTP object and awaiting response
	 *@param x - XMLHTTP object
	 */
	requestProcessing : function(x) {
		return ( x.readyState == 1 );
	},
	/**
	 *Returns whether a request has been sent using XMLHTTP object and is complete
	 *@param x - XMLHTTP object
	 */
	requestComplete : function(x) {
		return ( x.readyState == 4 );
	},
	/**
	 *Returns whether a request has been sent using XMLHTTP object but was canceled
	 *@param x - XMLHTTP object
	 */
	requestCanceled : function(x) {
		return ( x.readyState == 4 && x.status == 0 );
	},
	/**
	 *Returns whether a request has been sent using XMLHTTP object and response was received successfully
	 *@param x - XMLHTTP object
	 */
	requestSuccess : function(x) {
		return ( this.requestComplete( x ) && x.status == 200 );
	},
	/**
	 *Returns whether a request has been sent using XMLHTTP object and an error occured
	 *@param x - XMLHTTP object
	 */
	requestError : function(x) {
		return ( this.requestComplete( x ) && !this.requestCanceled( x ) && x.status != 200 );
	},
	/**
	 *Default AJAX error handling method
	 *@param x - XMLHTTP object
	 */
	onError : function( x ) {
		throw new Error( "AJAX request error (" + x.status + " " + x.statusText + ")." );
	},
	/**
	 *Default AJAX response handling method
	 *@param x - XMLHTTP object
	 */
	onSuccess : function( x ) {
		throw new Error( "No function specified to handle successful AJAX request." );
	},
	/**
	 *Set the AJAX response handler function; The handler function is also responsible for processing state of AJAX request!
	 *@param x - XMLHTTP object
	 *@param fcn - response handler function
	 */
	setResponseHandler : function ( x, fcn ) {
		try {
			x.onreadystatechange = fcn;
		}
		catch(e) {
			alert(e.message);
		}
	},
	/**
	 *Set the AJAX response functions for a successful request and an error; handler functions ARE NOT responsible for processing state of AJAX request!
	 *@param x - XMLHTTP object
	 *@param onSuccess(xmlhttp) - (optional) response handler function on successful request; function must process XMLHTTP argument; if no function specified, ajax.onSuccess will be used
	 *@param onError(xmlhttp) - (optional) response handler function on error; function must process XMLHTTP argument; if no function specified, ajax.onSuccess will be used
	 *@return FALSE if unsuccessful
	 */
	prepareResponseHandler : function(x, onSuccess, onError) {
		if ( x ) {
			try {
				var fcn1, fcn2;
				( onSuccess == null ) ?
					fcn1 = ajax.onSuccess :
					fcn1 = onSuccess;
				( onError == null ) ?
					fcn2 = ajax.onError :
					fcn2 = onError;
				var x = x; // so that remains in scope
				var fcn = function() {
					try {
						if ( ajax.requestSuccess(x) ) {
							fcn1( x );
						}
						else if ( ajax.requestError(x) ) {
							fcn2( x );
						}
//							alert(x.readyState);
//							alert(x.status);
					}
					catch(e) {
						alert(e.message);
					}
				}

				x.onreadystatechange = fcn;
			}
			catch(e) {
				alert(e.message);
			}
		}
		else {
			return false;
		}
	},
	/**
	 *Cancel any pending/processing AJAX request
	 *@param x - XMLHTTP object
	 *@return FALSE if unsuccessful
	 */
	cancelRequest : function( x ) {
		if ( x ) {
			try {
				x.abort();
			}
			catch(e) {
				alert(e.message);
			}
		}
		else {
			return false;
		}
	},
	/**
	 *Send an AJAX request via POST method
	 *@param x - XMLHTTP object
	 *@param u - URL to post data to; to add GET variables, include them in the URL, e.g. "index.php?extravar=hi"
	 *@param p - post parameters string, e.g. "var1=val1&var2=val2"; use ajax.createPostVar
	 *@param onSuccess(xmlhttp) - (optional) response handler function on successful request; function must process XMLHTTP argument; if no function specified, ajax.onSuccess will be used
	 *@param onError(xmlhttp) - (optional) response handler function on error; function must process XMLHTTP argument; if no function specified, ajax.onSuccess will be used
	 */
	sendPostRequest : function( x, u, p, onSuccess, onError ) {
		if ( this.requestUninitiated(x) ) {
			if ( onSuccess != null || onError != null ) {
				this.prepareResponseHandler( x, onSuccess, onError );
			}

			//ecc.tr( "Sending AJAX POST request to '" + u + "'..." );
			x.open("POST", u, true);
			x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			x.setRequestHeader("Content-length", p.length);
			//x.setRequestHeader("Connection", "close");
			x.send(p);
		}
		else {
			throw new Error("XMLHTTP object is already processing an AJAX request.");
		}
	},
	/**
	 *Send an AJAX request via GET method
	 *@param x - XMLHTTP object
	 *@param u - URL to post data to; to add GET variables, include them in the URL, e.g. "index.php?extravar=hi"
	 *@param onSuccess(xmlhttp) - (optional) response handler function on successful request; function must process XMLHTTP argument; if no function specified, ajax.onSuccess will be used
	 *@param onError(xmlhttp) - (optional) response handler function on error; function must process XMLHTTP argument; if no function specified, ajax.onSuccess will be used
	 */
	sendGetRequest : function( x, u, onSuccess, onError ) {
		if ( this.requestUninitiated(x) ) {
			if ( onSuccess != null || onError != null ) {
				this.prepareResponseHandler( x, onSuccess, onError );
			}

			//ecc.tr( "Sending AJAX GET request to '" + u + "'..." );
			x.open("GET", u, true);
			x.send(null);
		}
		else {
			throw new Error("XMLHTTP object is already processing an AJAX request.");
		}
	}
}