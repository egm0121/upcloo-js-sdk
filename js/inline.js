(function(global){
	
	var upCloo = global.upCloo;
		Inline = function(elem){
		
			this.data = false;
			this.options = {};
			this.hasImage =false;
			this.widgetElem = elem;	
		};
	Inline.prototype = {
		'setOptions' :function(opts){
			this.options = opts || {};
		},
		'setData' : function(dataObj){
			this.data = dataObj;
		},
		'_makeLink':function(obj){ 
			
			var link = document.createElement('a');
				link.setAttribute('href',obj.url),
				hasImg = 'image' in obj && obj.image.length > 0;
				
			link.innerHTML = hasImg ? "<img src='"+obj.image+"' alt='' border='0'/>"+obj.title : obj.title ;
			upCloo.utils.bind(link,'mousedown',function(){this.setAttribute('href',obj.trackUrl);});
			return link;
		},
		'setHasImage':function(yesno){
			this.hasImage = yesno;
		},
		'render' : function(){
			var arr = this.data,
				tmpHeadline = document.createElement('li'),	
				tmpUl = document.createElement('ul'),
				count = 'limit' in this.options ? parseInt(this.options.limit,10) : 3 ;
				
			upCloo.utils.addClass(this.widgetElem,'upcloo-inline');
			//has thumb 
			if(this.hasImage)upCloo.utils.addClass(this.widgetElem,'upcloo-img');
			if(this.options.headline ){
				tmpHeadline.innerHTML = this.options.headline;
				upCloo.utils.addClass(tmpHeadline,'upcloo-inline-title');
				this.widgetElem.appendChild(tmpHeadline);
			}
			for(var i=0; i < count; i++){
				if(arr[i] === undefined)break;
				var tmpLi = document.createElement('li');
					tmpLi.appendChild(this._makeLink(arr[i]));
					tmpUl.appendChild(tmpLi);
			}
			this.widgetElem.appendChild(tmpUl);
		}
	};

	if('upCloo' in global){
		'widgets' in global.upCloo ? false : global.upCloo.widgets = {};
		global.upCloo.widgets.inline = function(elem){ return new Inline(elem); }
	}
})(window === undefined ? this : window);