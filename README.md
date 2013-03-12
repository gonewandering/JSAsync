# JSAsync Loader v0.1

A simple asynchronous tool for loading and managing third-party javascript snippets.

Add js-async-loader.js like this:

    <script src="js-async-loader/load.min.js" type="text/javascript"></script>

Then add an array containing a config object for each service or set of services you'd like to use. Configuration is easy. Each object has the following options:

### obj.key (optional)
The key used to identify this object if you ever need to reinitialize it

### obj.includes (optional)
An array of urls targeting the scripts to load, ex.  http://code.jquery.com/jquery-1.9.1.min.js

### obj.active (optional, defaults 1)
Binary item that determines if the script is active. Defaults to 1.

### obj.sample (optional, defaults 1)
A float that calculates the rate of sampling for this item. Can be any dec between 0 and 1

### obj.complete (optional)
Either a function or a string representing some javascript that will be evaluated and run when all includes are loaded. 

The following is a simple configuration that loads jquery and google analytics:

      $JSAsync = [{
        // Add Jquery & bootstrap.js and print 'Good work!' when done
        {
      		"key": "jquery",
      		"includes": ["http://code.jquery.com/jquery-1.9.1.min.js", "libs/bootstrap.min.js"],
      		"complete": function () { $('document').ready(function () { $('body').append('Good work!'); }); }
      	},
        
        // Load Google Analytics (already additional scripts loaded by complete)
      	{
      		"key": "google-analytics",
      		"complete": "var _gaq = _gaq || []; _gaq.push(['_setAccount', 'UA-XXXXX-X']); _gaq.push(['_trackPageview']); (function() { var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true; ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s); })();"
      	}
      }];
    
You can add the $JSAsync array anywhere on the page, or include it externally. 
