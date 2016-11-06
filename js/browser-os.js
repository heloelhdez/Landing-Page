// Checks the browser and os and adds classes to the body to reflect it.
/* please read for the classes
 the classes are for os
  WinOS
  MacOS
 
 the classes are for browser
  Firefox
  Safari
  Chrome
  IE
  Opera
 
 the classes are for browser version
 **just add the version number w/ no decimal
 **eg, Firefox3, IE6, IE7, Safari3
 
*/

$(document).ready(function(){
    
    var userAgent = navigator.userAgent.toLowerCase();
    $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase()); 
    
    // Is this a version of IE?
    if($.browser.msie){
        $('body').addClass('IE');
        
        // Add the version number
        $('body').addClass('IE' + $.browser.version.substring(0,1));
    }
    
    
    // Is this a version of Chrome?
    if($.browser.chrome){
    
        $('body').addClass('Chrome');
        
        //Add the version number
        userAgent = userAgent.substring(userAgent.indexOf('chrome/') +7);
        userAgent = userAgent.substring(0,1);
        $('body').addClass('Chrome' + userAgent);
        
        // If it is chrome then jQuery thinks it's safari so we have to tell it it isn't
        $.browser.safari = false;
    }
    
    // Is this a version of Safari?
    if($.browser.safari){
        $('body').addClass('Safari');
        
        // Add the version number
        userAgent = userAgent.substring(userAgent.indexOf('version/') +8);
        userAgent = userAgent.substring(0,1);
        $('body').addClass('Safari' + userAgent);
    }
    
    // Is this a version of Mozilla?
    if($.browser.mozilla){
        
        //Is it Firefox?
        if(navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
            $('body').addClass('Firefox');
            
            // Add the version number
            userAgent = userAgent.substring(userAgent.indexOf('firefox/') +8);
            userAgent = userAgent.substring(0,1);
            $('body').addClass('Firefox' + userAgent);
        }
        // If not then it must be another Mozilla
        else{
            $('body').addClass('Mozilla');
        }
    }
    
    // Is this a version of Opera?
    if($.browser.opera){
        $('body').addClass('Opera');
    }
	
	// OS dectection
	if(navigator.userAgent.toLowerCase().indexOf('win') != -1){
            $('body').addClass('WinOS');
	}
	if(navigator.userAgent.toLowerCase().indexOf('mac') != -1){
            $('body').addClass('MacOS');
	}    
    
	
	/*Ipad*/
	var isiPad = navigator.userAgent.match(/iPad/i);
	if(isiPad != null){
        $('body').addClass('iPad');
    }
	var isiPhone = navigator.userAgent.match(/iPhone/i);
	if(isiPhone != null){
        $('body').addClass('iPhone');
    }
});