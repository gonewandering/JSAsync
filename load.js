var $JSAsync = {
	modules:{},
	module: function (attr) { 
	
		var self = this;
		
		// Set Module Defaults
		self.data = { 	
			key: null,					// Default Attributes for module
			active: 1,					// Checks whether the item is active
			sample: 1,					// Percent of the time that it gets run
			includes: [],				// External script includes
			complete: null,				// Callback actions after scripts have been loaded
			
			ready: 0,
		}
		
		// Add attributes to module
		for (var at in self.data) { self.data[at] = attr[at] ? attr[at] : self.data[at]; }
		
		// Load Module based on attributes
		self.load = function ()  {
			if (self.data.includes.length) {
				var i = 0; while(i < self.data.includes.length) {
					var src = self.data.includes[i]; 
					
					self.data.includes[i] = document.createElement('script');
					self.data.includes[i].async = true;
					self.data.includes[i].type = 'text/javascript';
					self.data.includes[i].src = src;
					
					self.data.includes[i].onload = self.data.includes[i].onreadystatechange = function () { 
						if (!self.ready && (!self.data.readyState || self.data.readyState == 'complete')) {
							self.data.scripts++;
							if (self.data.scripts == self.data.includes.length) {
								if (typeof(self.data.complete) == "function"){
									self.data.complete();
								} else {
									var complete = new Function(self.data.complete);
									complete();
								}
								self.ready = true;
							} 
						}				
					}
					
					document.body.appendChild(self.data.includes[i]);
					i++;
				}
			} else { 
				if (typeof(self.data.complete) == "function"){
					self.data.complete();
				} else {
					var complete = new Function(self.data.complete);
					complete();
				}
				self.ready = true;			
			}
		}
		
		// Log the module for debuggin
		this.log = function () { window.console.log(this); };
		
		// Initialize Module
		self.load();
	},
	
	load: function (module) { 
		var self = this;
		if (module instanceof Array) {
			var i = 0; while (i < module.length) { 
				self.modules[module[i].key] = new this.module(module[i]);
				i++;
			}
		} else {
			self.modules[module.key] = new this.module(module);
		}
	},
	
	log: function () { window.console.log(this); }
};