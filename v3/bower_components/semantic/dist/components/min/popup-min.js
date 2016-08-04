!function($,t,e,o){"use strict";t="undefined"!=typeof t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),$.fn.popup=function(n){var i=$(this),r=$(e),a=$(t),s=$("body"),p=i.selector||"",l=!0,u=(new Date).getTime(),c=[],d=arguments[0],f="string"==typeof d,g=[].slice.call(arguments,1),h;return i.each(function(){var i=$.isPlainObject(n)?$.extend(!0,{},$.fn.popup.settings,n):$.extend({},$.fn.popup.settings),m=i.selector,v=i.className,b=i.error,w=i.metadata,y=i.namespace,T="."+i.namespace,C="module-"+y,P=$(this),x=$(i.context),k=$(i.scrollContext),S=$(i.boundary),E=i.target?$(i.target):P,A,D,O=0,j=!1,F=!1,R=this,H=P.data(C),N,M,W,G;G={initialize:function(){G.debug("Initializing",P),G.createID(),G.bind.events(),!G.exists()&&i.preserve&&G.create(),G.observeChanges(),G.instantiate()},instantiate:function(){G.verbose("Storing instance",G),H=G,P.data(C,H)},observeChanges:function(){"MutationObserver"in t&&(N=new MutationObserver(G.event.documentChanged),N.observe(e,{childList:!0,subtree:!0}),G.debug("Setting up mutation observer",N))},refresh:function(){i.popup?A=$(i.popup).eq(0):i.inline&&(A=E.nextAll(m.popup).eq(0),i.popup=A),i.popup?(A.addClass(v.loading),D=G.get.offsetParent(),A.removeClass(v.loading),i.movePopup&&G.has.popup()&&G.get.offsetParent(A)[0]!==D[0]&&(G.debug("Moving popup to the same offset parent as activating element"),A.detach().appendTo(D))):D=i.inline?G.get.offsetParent(E):G.has.popup()?G.get.offsetParent(A):s,D.is("html")&&D[0]!==s[0]&&(G.debug("Setting page as offset parent"),D=s),G.get.variation()&&G.set.variation()},reposition:function(){G.refresh(),G.set.position()},destroy:function(){G.debug("Destroying previous module"),N&&N.disconnect(),A&&!i.preserve&&G.removePopup(),clearTimeout(G.hideTimer),clearTimeout(G.showTimer),G.unbind.close(),G.unbind.events(),P.removeData(C)},event:{start:function(t){var e=$.isPlainObject(i.delay)?i.delay.show:i.delay;clearTimeout(G.hideTimer),F||(G.showTimer=setTimeout(G.show,e))},end:function(){var t=$.isPlainObject(i.delay)?i.delay.hide:i.delay;clearTimeout(G.showTimer),G.hideTimer=setTimeout(G.hide,t)},touchstart:function(t){F=!0,G.show()},resize:function(){G.is.visible()&&G.set.position()},documentChanged:function(t){[].forEach.call(t,function(t){t.removedNodes&&[].forEach.call(t.removedNodes,function(t){(t==R||$(t).find(R).length>0)&&(G.debug("Element removed from DOM, tearing down events"),G.destroy())})})},hideGracefully:function(t){var o=$(t.target),n=$.contains(e.documentElement,t.target),i=o.closest(m.popup).length>0;t&&!i&&n?(G.debug("Click occurred outside popup hiding popup"),G.hide()):G.debug("Click was inside popup, keeping popup open")}},create:function(){var t=G.get.html(),e=G.get.title(),o=G.get.content();t||o||e?(G.debug("Creating pop-up html"),t||(t=i.templates.popup({title:e,content:o})),A=$("<div/>").addClass(v.popup).data(w.activator,P).html(t),i.inline?(G.verbose("Inserting popup element inline",A),A.insertAfter(P)):(G.verbose("Appending popup element to body",A),A.appendTo(x)),G.refresh(),G.set.variation(),i.hoverable&&G.bind.popup(),i.onCreate.call(A,R)):0!==E.next(m.popup).length?(G.verbose("Pre-existing popup found"),i.inline=!0,i.popup=E.next(m.popup).data(w.activator,P),G.refresh(),i.hoverable&&G.bind.popup()):i.popup?($(i.popup).data(w.activator,P),G.verbose("Used popup specified in settings"),G.refresh(),i.hoverable&&G.bind.popup()):G.debug("No content specified skipping display",R)},createID:function(){W=(Math.random().toString(16)+"000000000").substr(2,8),M="."+W,G.verbose("Creating unique id for element",W)},toggle:function(){G.debug("Toggling pop-up"),G.is.hidden()?(G.debug("Popup is hidden, showing pop-up"),G.unbind.close(),G.show()):(G.debug("Popup is visible, hiding pop-up"),G.hide())},show:function(t){if(t=t||function(){},G.debug("Showing pop-up",i.transition),G.is.hidden()&&(!G.is.active()||!G.is.dropdown())){if(G.exists()||G.create(),i.onShow.call(A,R)===!1)return void G.debug("onShow callback returned false, cancelling popup animation");i.preserve||i.popup||G.refresh(),A&&G.set.position()&&(G.save.conditions(),i.exclusive&&G.hideAll(),G.animate.show(t))}},hide:function(t){if(t=t||function(){},G.is.visible()||G.is.animating()){if(i.onHide.call(A,R)===!1)return void G.debug("onHide callback returned false, cancelling popup animation");G.remove.visible(),G.unbind.close(),G.restore.conditions(),G.animate.hide(t)}},hideAll:function(){$(m.popup).filter("."+v.visible).each(function(){$(this).data(w.activator).popup("hide")})},exists:function(){return A?i.inline||i.popup?G.has.popup():A.closest(x).length>=1:!1},removePopup:function(){G.has.popup()&&!i.popup&&(G.debug("Removing popup",A),A.remove(),A=o,i.onRemove.call(A,R))},save:{conditions:function(){G.cache={title:P.attr("title")},G.cache.title&&P.removeAttr("title"),G.verbose("Saving original attributes",G.cache.title)}},restore:{conditions:function(){return G.cache&&G.cache.title&&(P.attr("title",G.cache.title),G.verbose("Restoring original attributes",G.cache.title)),!0}},supports:{svg:function(){return typeof SVGGraphicsElement===o}},animate:{show:function(t){t=$.isFunction(t)?t:function(){},i.transition&&$.fn.transition!==o&&P.transition("is supported")?(G.set.visible(),A.transition({animation:i.transition+" in",queue:!1,debug:i.debug,verbose:i.verbose,duration:i.duration,onComplete:function(){G.bind.close(),t.call(A,R),i.onVisible.call(A,R)}})):G.error(b.noTransition)},hide:function(t){return t=$.isFunction(t)?t:function(){},G.debug("Hiding pop-up"),i.onHide.call(A,R)===!1?void G.debug("onHide callback returned false, cancelling popup animation"):void(i.transition&&$.fn.transition!==o&&P.transition("is supported")?A.transition({animation:i.transition+" out",queue:!1,duration:i.duration,debug:i.debug,verbose:i.verbose,onComplete:function(){G.reset(),t.call(A,R),i.onHidden.call(A,R)}}):G.error(b.noTransition))}},change:{content:function(t){A.html(t)}},get:{html:function(){return P.removeData(w.html),P.data(w.html)||i.html},title:function(){return P.removeData(w.title),P.data(w.title)||i.title},content:function(){return P.removeData(w.content),P.data(w.content)||P.attr("title")||i.content},variation:function(){return P.removeData(w.variation),P.data(w.variation)||i.variation},popup:function(){return A},popupOffset:function(){return A.offset()},calculations:function(){var e=E[0],o=S[0]==t,n=i.inline||i.popup&&i.movePopup?E.position():E.offset(),r=o?{top:0,left:0}:S.offset(),s={},p=o?{top:a.scrollTop(),left:a.scrollLeft()}:{top:0,left:0},l;return s={target:{element:E[0],width:E.outerWidth(),height:E.outerHeight(),top:n.top,left:n.left,margin:{}},popup:{width:A.outerWidth(),height:A.outerHeight()},parent:{width:D.outerWidth(),height:D.outerHeight()},screen:{top:r.top,left:r.left,scroll:{top:p.top,left:p.left},width:S.width(),height:S.height()}},i.setFluidWidth&&G.is.fluid()&&(s.container={width:A.parent().outerWidth()},s.popup.width=s.container.width),s.target.margin.top=i.inline?parseInt(t.getComputedStyle(e).getPropertyValue("margin-top"),10):0,s.target.margin.left=i.inline?G.is.rtl()?parseInt(t.getComputedStyle(e).getPropertyValue("margin-right"),10):parseInt(t.getComputedStyle(e).getPropertyValue("margin-left"),10):0,l=s.screen,s.boundary={top:l.top+l.scroll.top,bottom:l.top+l.scroll.top+l.height,left:l.left+l.scroll.left,right:l.left+l.scroll.left+l.width},s},id:function(){return W},startEvent:function(){return"hover"==i.on?"mouseenter":"focus"==i.on?"focus":!1},scrollEvent:function(){return"scroll"},endEvent:function(){return"hover"==i.on?"mouseleave":"focus"==i.on?"blur":!1},distanceFromBoundary:function(t,e){var o={},n,i;return e=e||G.get.calculations(),n=e.popup,i=e.boundary,t&&(o={top:t.top-i.top,left:t.left-i.left,right:i.right-(t.left+n.width),bottom:i.bottom-(t.top+n.height)},G.verbose("Distance from boundaries determined",t,o)),o},offsetParent:function(t){var e=t!==o?t[0]:P[0],n=e.parentNode,i=$(n);if(n)for(var r="none"===i.css("transform"),a="static"===i.css("position"),s=i.is("html");n&&!s&&a&&r;)n=n.parentNode,i=$(n),r="none"===i.css("transform"),a="static"===i.css("position"),s=i.is("html");return i&&i.length>0?i:$()},positions:function(){return{"top left":!1,"top center":!1,"top right":!1,"bottom left":!1,"bottom center":!1,"bottom right":!1,"left center":!1,"right center":!1}},nextPosition:function(t){var e=t.split(" "),o=e[0],n=e[1],r={top:"bottom",bottom:"top",left:"right",right:"left"},a={left:"center",center:"right",right:"left"},s={"top left":"top center","top center":"top right","top right":"right center","right center":"bottom right","bottom right":"bottom center","bottom center":"bottom left","bottom left":"left center","left center":"top left"},p="top"==o||"bottom"==o,l=!1,u=!1,c=!1;return j||(G.verbose("All available positions available"),j=G.get.positions()),G.debug("Recording last position tried",t),j[t]=!0,"opposite"===i.prefer&&(c=[r[o],n],c=c.join(" "),l=j[c]===!0,G.debug("Trying opposite strategy",c)),"adjacent"===i.prefer&&p&&(c=[o,a[n]],c=c.join(" "),u=j[c]===!0,G.debug("Trying adjacent strategy",c)),(u||l)&&(G.debug("Using backup position",c),c=s[t]),c}},set:{position:function(t,e){if(0===E.length||0===A.length)return void G.error(b.notFound);var n,r,a,s,p,l,u,c;if(e=e||G.get.calculations(),t=t||P.data(w.position)||i.position,n=P.data(w.offset)||i.offset,r=i.distanceAway,a=e.target,s=e.popup,p=e.parent,0===a.width&&0===a.height&&!G.is.svg(a.element))return G.debug("Popup target is hidden, no action taken"),!1;switch(i.inline&&(G.debug("Adding margin to calculation",a.margin),"left center"==t||"right center"==t?(n+=a.margin.top,r+=-a.margin.left):"top left"==t||"top center"==t||"top right"==t?(n+=a.margin.left,r-=a.margin.top):(n+=a.margin.left,r+=a.margin.top)),G.debug("Determining popup position from calculations",t,e),G.is.rtl()&&(t=t.replace(/left|right/g,function(t){return"left"==t?"right":"left"}),G.debug("RTL: Popup position updated",t)),O==i.maxSearchDepth&&"string"==typeof i.lastResort&&(t=i.lastResort),t){case"top left":l={top:"auto",bottom:p.height-a.top+r,left:a.left+n,right:"auto"};break;case"top center":l={bottom:p.height-a.top+r,left:a.left+a.width/2-s.width/2+n,top:"auto",right:"auto"};break;case"top right":l={bottom:p.height-a.top+r,right:p.width-a.left-a.width-n,top:"auto",left:"auto"};break;case"left center":l={top:a.top+a.height/2-s.height/2+n,right:p.width-a.left+r,left:"auto",bottom:"auto"};break;case"right center":l={top:a.top+a.height/2-s.height/2+n,left:a.left+a.width+r,bottom:"auto",right:"auto"};break;case"bottom left":l={top:a.top+a.height+r,left:a.left+n,bottom:"auto",right:"auto"};break;case"bottom center":l={top:a.top+a.height+r,left:a.left+a.width/2-s.width/2+n,bottom:"auto",right:"auto"};break;case"bottom right":l={top:a.top+a.height+r,right:p.width-a.left-a.width-n,left:"auto",bottom:"auto"}}if(l===o&&G.error(b.invalidPosition,t),G.debug("Calculated popup positioning values",l),A.css(l).removeClass(v.position).addClass(t).addClass(v.loading),u=G.get.popupOffset(),c=G.get.distanceFromBoundary(u,e),G.is.offstage(c,t)){if(G.debug("Position is outside viewport",t),O<i.maxSearchDepth)return O++,t=G.get.nextPosition(t),G.debug("Trying new position",t),A?G.set.position(t,e):!1;if(!i.lastResort)return G.debug("Popup could not find a position to display",A),G.error(b.cannotPlace,R),G.remove.attempts(),G.remove.loading(),G.reset(),i.onUnplaceable.call(A,R),!1;G.debug("No position found, showing with last position")}return G.debug("Position is on stage",t),G.remove.attempts(),G.remove.loading(),i.setFluidWidth&&G.is.fluid()&&G.set.fluidWidth(e),!0},fluidWidth:function(t){t=t||G.get.calculations(),G.debug("Automatically setting element width to parent width",t.parent.width),A.css("width",t.container.width)},variation:function(t){t=t||G.get.variation(),t&&G.has.popup()&&(G.verbose("Adding variation to popup",t),A.addClass(t))},visible:function(){P.addClass(v.visible)}},remove:{loading:function(){A.removeClass(v.loading)},variation:function(t){t=t||G.get.variation(),t&&(G.verbose("Removing variation",t),A.removeClass(t))},visible:function(){P.removeClass(v.visible)},attempts:function(){G.verbose("Resetting all searched positions"),O=0,j=!1}},bind:{events:function(){G.debug("Binding popup events to module"),"click"==i.on&&P.on("click"+T,G.toggle),"hover"==i.on&&l&&P.on("touchstart"+T,G.event.touchstart),G.get.startEvent()&&P.on(G.get.startEvent()+T,G.event.start).on(G.get.endEvent()+T,G.event.end),i.target&&G.debug("Target set to element",E),a.on("resize"+M,G.event.resize)},popup:function(){G.verbose("Allowing hover events on popup to prevent closing"),A&&G.has.popup()&&A.on("mouseenter"+T,G.event.start).on("mouseleave"+T,G.event.end)},close:function(){(i.hideOnScroll===!0||"auto"==i.hideOnScroll&&"click"!=i.on)&&k.one(G.get.scrollEvent()+M,G.event.hideGracefully),"hover"==i.on&&F&&(G.verbose("Binding popup close event to document"),r.on("touchstart"+M,function(t){G.verbose("Touched away from popup"),G.event.hideGracefully.call(R,t)})),"click"==i.on&&i.closable&&(G.verbose("Binding popup close event to document"),r.on("click"+M,function(t){G.verbose("Clicked away from popup"),G.event.hideGracefully.call(R,t)}))}},unbind:{events:function(){a.off(M),P.off(T)},close:function(){r.off(M),k.off(M)}},has:{popup:function(){return A&&A.length>0}},is:{offstage:function(t,e){var o=[];return $.each(t,function(t,n){n<-i.jitter&&(G.debug("Position exceeds allowable distance from edge",t,n,e),o.push(t))}),o.length>0},svg:function(t){return G.supports.svg()&&t instanceof SVGGraphicsElement},active:function(){return P.hasClass(v.active)},animating:function(){return A!==o&&A.hasClass(v.animating)},fluid:function(){return A!==o&&A.hasClass(v.fluid)},visible:function(){return A!==o&&A.hasClass(v.visible)},dropdown:function(){return P.hasClass(v.dropdown)},hidden:function(){return!G.is.visible()},rtl:function(){return"rtl"==P.css("direction")}},reset:function(){G.remove.visible(),i.preserve?$.fn.transition!==o&&A.transition("remove transition"):G.removePopup()},setting:function(t,e){if($.isPlainObject(t))$.extend(!0,i,t);else{if(e===o)return i[t];i[t]=e}},internal:function(t,e){if($.isPlainObject(t))$.extend(!0,G,t);else{if(e===o)return G[t];G[t]=e}},debug:function(){!i.silent&&i.debug&&(i.performance?G.performance.log(arguments):(G.debug=Function.prototype.bind.call(console.info,console,i.name+":"),G.debug.apply(console,arguments)))},verbose:function(){!i.silent&&i.verbose&&i.debug&&(i.performance?G.performance.log(arguments):(G.verbose=Function.prototype.bind.call(console.info,console,i.name+":"),G.verbose.apply(console,arguments)))},error:function(){i.silent||(G.error=Function.prototype.bind.call(console.error,console,i.name+":"),G.error.apply(console,arguments))},performance:{log:function(t){var e,o,n;i.performance&&(e=(new Date).getTime(),n=u||e,o=e-n,u=e,c.push({Name:t[0],Arguments:[].slice.call(t,1)||"",Element:R,"Execution Time":o})),clearTimeout(G.performance.timer),G.performance.timer=setTimeout(G.performance.display,500)},display:function(){var t=i.name+":",e=0;u=!1,clearTimeout(G.performance.timer),$.each(c,function(t,o){e+=o["Execution Time"]}),t+=" "+e+"ms",p&&(t+=" '"+p+"'"),(console.group!==o||console.table!==o)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):$.each(c,function(t,e){console.log(e.Name+": "+e["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,e,n){var i=H,r,a,s;return e=e||g,n=R||n,"string"==typeof t&&i!==o&&(t=t.split(/[\. ]/),r=t.length-1,$.each(t,function(e,n){var s=e!=r?n+t[e+1].charAt(0).toUpperCase()+t[e+1].slice(1):t;if($.isPlainObject(i[s])&&e!=r)i=i[s];else{if(i[s]!==o)return a=i[s],!1;if(!$.isPlainObject(i[n])||e==r)return i[n]!==o?(a=i[n],!1):!1;i=i[n]}})),$.isFunction(a)?s=a.apply(n,e):a!==o&&(s=a),$.isArray(h)?h.push(s):h!==o?h=[h,s]:s!==o&&(h=s),a}},f?(H===o&&G.initialize(),G.invoke(d)):(H!==o&&H.invoke("destroy"),G.initialize())}),h!==o?h:this},$.fn.popup.settings={name:"Popup",silent:!1,debug:!1,verbose:!1,performance:!0,namespace:"popup",observeChanges:!0,onCreate:function(){},onRemove:function(){},onShow:function(){},onVisible:function(){},onHide:function(){},onUnplaceable:function(){},onHidden:function(){},on:"hover",boundary:t,addTouchEvents:!0,position:"top left",variation:"",movePopup:!0,target:!1,popup:!1,inline:!1,preserve:!1,hoverable:!1,content:!1,html:!1,title:!1,closable:!0,hideOnScroll:"auto",exclusive:!1,context:"body",scrollContext:t,prefer:"opposite",lastResort:!1,delay:{show:50,hide:70},setFluidWidth:!0,duration:200,transition:"scale",distanceAway:0,jitter:2,offset:0,maxSearchDepth:15,error:{invalidPosition:"The position you specified is not a valid position",cannotPlace:"Popup does not fit within the boundaries of the viewport",method:"The method you called is not defined.",noTransition:"This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>",notFound:"The target or popup you specified does not exist on the page"},metadata:{activator:"activator",content:"content",html:"html",offset:"offset",position:"position",title:"title",variation:"variation"},className:{active:"active",animating:"animating",dropdown:"dropdown",fluid:"fluid",loading:"loading",popup:"ui popup",position:"top left center bottom right",visible:"visible"},selector:{popup:".ui.popup"},templates:{escape:function(t){var e=/[&<>"'`]/g,o=/[&<>"'`]/,n={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},i=function(t){return n[t]};return o.test(t)?t.replace(e,i):t},popup:function(t){var e="",n=$.fn.popup.settings.templates.escape;return typeof t!==o&&(typeof t.title!==o&&t.title&&(t.title=n(t.title),e+='<div class="header">'+t.title+"</div>"),typeof t.content!==o&&t.content&&(t.content=n(t.content),e+='<div class="content">'+t.content+"</div>")),e}}}}(jQuery,window,document);