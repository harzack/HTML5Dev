
	try{
	
		contentTable = true;
		document.LoginForm.Username.focus()

		// send client time for time zone.

		var		llglogin_CurrentClientTime = new Date()
		var		llglogin_year = ( llglogin_CurrentClientTime.getFullYear == null ) ? llglogin_CurrentClientTime.getYear() : llglogin_CurrentClientTime.getFullYear()
		var		llglogin_month = llglogin_CurrentClientTime.getMonth() + 1
		var		llglogin_date = llglogin_CurrentClientTime.getDate()
		var		llglogin_hour = llglogin_CurrentClientTime.getHours()
		var		llglogin_minute = llglogin_CurrentClientTime.getMinutes()
		var		llglogin_second = llglogin_CurrentClientTime.getSeconds()

		document.LoginForm.CurrentClientTime.value  = 'D/' + llglogin_year + '/' + llglogin_month + '/' + llglogin_date
		document.LoginForm.CurrentClientTime.value += ':' + llglogin_hour + ':' + llglogin_minute + ':' + llglogin_second
	
	}
	catch( e )
	{
	}

        function isCookieEnabled()
        {
        
            if( navigator.cookieEnabled )
            {
            
                return true;
                
            }
            else
            {
            
              	return false;
              	
            }
            
        }

	function SetCookie( langCode,  expireMode, expireDays )
	{

		var days = 1;

		if( !isCookieEnabled() || arguments.length < 2 )
		{
			return;
		}

		if( expireMode == 0 )
		{
			days = 10000
		}
		else
		{
			days = expireDays;
		}
		
		var exp = '';

		if( days > 0 )
		{
			var now = new Date();
			var then = now.getTime() + ( days * 24 * 60 * 60 * 1000 );
			now.setTime( then );
			exp = '; expires=' + now.toGMTString();
		}

		document.cookie = 'langcode' + "=" + escape( String( langCode ) ) + '; path=/' + exp;
	}

	// set the focus on the username field if is empty, 
	// otherwise put the focus on the password field.
	//
	function SetFocus()
	{
		if ( $( "#Username" ).val().trim().length > 0 ) 
		{
			$( "#Password" ).focus();
		} 
		else 
		{
			$( "#Username" ).focus();
		}
	}

