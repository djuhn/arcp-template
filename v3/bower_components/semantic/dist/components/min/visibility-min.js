!function($,e,o,n){"use strict";e="undefined"!=typeof e&&e.Math==Math?e:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),$.fn.visibility=function(t){var i=$(this),s=i.selector||"",c=(new Date).getTime(),r=[],a=arguments[0],l="string"==typeof a,d=[].slice.call(arguments,1),u,f=i.length,b=0;return i.each(function(){var i=$.isPlainObject(t)?$.extend(!0,{},$.fn.visibility.settings,t):$.extend({},$.fn.visibility.settings),m=i.className,g=i.namespace,v=i.error,p=i.metadata,h="."+g,P="module-"+g,x=$(e),C=$(this),y=$(i.context),R,V=C.selector||"",S=C.data(P),k=e.requestAnimationFrame||e.mozRequestAnimationFrame||e.webkitRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,0)},T=this,O=!1,A,z,w;w={initialize:function(){w.debug("Initializing",i),w.setup.cache(),w.should.trackChanges()&&("image"==i.type&&w.setup.image(),"fixed"==i.type&&w.setup.fixed(),i.observeChanges&&w.observeChanges(),w.bind.events()),w.save.position(),w.is.visible()||w.error(v.visible,C),i.initialCheck&&w.checkVisibility(),w.instantiate()},instantiate:function(){w.debug("Storing instance",w),C.data(P,w),S=w},destroy:function(){w.verbose("Destroying previous module"),z&&z.disconnect(),A&&A.disconnect(),x.off("load"+h,w.event.load).off("resize"+h,w.event.resize),y.off("scroll"+h,w.event.scroll).off("scrollchange"+h,w.event.scrollchange),"fixed"==i.type&&(w.resetFixed(),w.remove.placeholder()),C.off(h).removeData(P)},observeChanges:function(){"MutationObserver"in e&&(A=new MutationObserver(w.event.contextChanged),z=new MutationObserver(w.event.changed),A.observe(o,{childList:!0,subtree:!0}),z.observe(T,{childList:!0,subtree:!0}),w.debug("Setting up mutation observer",z))},bind:{events:function(){w.verbose("Binding visibility events to scroll and resize"),i.refreshOnLoad&&x.on("load"+h,w.event.load),x.on("resize"+h,w.event.resize),y.off("scroll"+h).on("scroll"+h,w.event.scroll).on("scrollchange"+h,w.event.scrollchange)}},event:{changed:function(e){w.verbose("DOM tree modified, updating visibility calculations"),w.timer=setTimeout(function(){w.verbose("DOM tree modified, updating sticky menu"),w.refresh()},100)},contextChanged:function(e){[].forEach.call(e,function(e){e.removedNodes&&[].forEach.call(e.removedNodes,function(e){(e==T||$(e).find(T).length>0)&&(w.debug("Element removed from DOM, tearing down events"),w.destroy())})})},resize:function(){w.debug("Window resized"),i.refreshOnResize&&k(w.refresh)},load:function(){w.debug("Page finished loading"),k(w.refresh)},scroll:function(){i.throttle?(clearTimeout(w.timer),w.timer=setTimeout(function(){y.triggerHandler("scrollchange"+h,[y.scrollTop()])},i.throttle)):k(function(){y.triggerHandler("scrollchange"+h,[y.scrollTop()])})},scrollchange:function(e,o){w.checkVisibility(o)}},precache:function(e,n){e instanceof Array||(e=[e]);for(var t=e.length,i=0,s=[],c=o.createElement("img"),r=function(){i++,i>=e.length&&$.isFunction(n)&&n()};t--;)c=o.createElement("img"),c.onload=r,c.onerror=r,c.src=e[t],s.push(c)},enableCallbacks:function(){w.debug("Allowing callbacks to occur"),O=!1},disableCallbacks:function(){w.debug("Disabling all callbacks temporarily"),O=!0},should:{trackChanges:function(){return l?(w.debug("One time query, no need to bind events"),!1):(w.debug("Callbacks being attached"),!0)}},setup:{cache:function(){w.cache={occurred:{},screen:{},element:{}}},image:function(){var e=C.data(p.src);e&&(w.verbose("Lazy loading image",e),i.once=!0,i.observeChanges=!1,i.onOnScreen=function(){w.debug("Image on screen",T),w.precache(e,function(){w.set.image(e,function(){b++,b==f&&i.onAllLoaded.call(this),i.onLoad.call(this)})})})},fixed:function(){w.debug("Setting up fixed"),i.once=!1,i.observeChanges=!1,i.initialCheck=!0,i.refreshOnLoad=!0,t.transition||(i.transition=!1),w.create.placeholder(),w.debug("Added placeholder",R),i.onTopPassed=function(){w.debug("Element passed, adding fixed position",C),w.show.placeholder(),w.set.fixed(),i.transition&&$.fn.transition!==n&&C.transition(i.transition,i.duration)},i.onTopPassedReverse=function(){w.debug("Element returned to position, removing fixed",C),w.hide.placeholder(),w.remove.fixed()}}},create:{placeholder:function(){w.verbose("Creating fixed position placeholder"),R=C.clone(!1).css("display","none").addClass(m.placeholder).insertAfter(C)}},show:{placeholder:function(){w.verbose("Showing placeholder"),R.css("display","block").css("visibility","hidden")}},hide:{placeholder:function(){w.verbose("Hiding placeholder"),R.css("display","none").css("visibility","")}},set:{fixed:function(){w.verbose("Setting element to fixed position"),C.addClass(m.fixed).css({position:"fixed",top:i.offset+"px",left:"auto",zIndex:i.zIndex}),i.onFixed.call(T)},image:function(e,o){C.attr("src",e),i.transition?$.fn.transition!==n?C.transition(i.transition,i.duration,o):C.fadeIn(i.duration,o):C.show()}},is:{onScreen:function(){var e=w.get.elementCalculations();return e.onScreen},offScreen:function(){var e=w.get.elementCalculations();return e.offScreen},visible:function(){return w.cache&&w.cache.element?!(0===w.cache.element.width&&0===w.cache.element.offset.top):!1}},refresh:function(){w.debug("Refreshing constants (width/height)"),"fixed"==i.type&&w.resetFixed(),w.reset(),w.save.position(),i.checkOnRefresh&&w.checkVisibility(),i.onRefresh.call(T)},resetFixed:function(){w.remove.fixed(),w.remove.occurred()},reset:function(){w.verbose("Resetting all cached values"),$.isPlainObject(w.cache)&&(w.cache.screen={},w.cache.element={})},checkVisibility:function(e){w.verbose("Checking visibility of element",w.cache.element),!O&&w.is.visible()&&(w.save.scroll(e),w.save.calculations(),w.passed(),w.passingReverse(),w.topVisibleReverse(),w.bottomVisibleReverse(),w.topPassedReverse(),w.bottomPassedReverse(),w.onScreen(),w.offScreen(),w.passing(),w.topVisible(),w.bottomVisible(),w.topPassed(),w.bottomPassed(),i.onUpdate&&i.onUpdate.call(T,w.get.elementCalculations()))},passed:function(e,o){var t=w.get.elementCalculations(),s;if(e&&o)i.onPassed[e]=o;else{if(e!==n)return w.get.pixelsPassed(e)>t.pixelsPassed;t.passing&&$.each(i.onPassed,function(e,o){t.bottomVisible||t.pixelsPassed>w.get.pixelsPassed(e)?w.execute(o,e):i.once||w.remove.occurred(o)})}},onScreen:function(e){var o=w.get.elementCalculations(),t=e||i.onOnScreen,s="onScreen";return e&&(w.debug("Adding callback for onScreen",e),i.onOnScreen=e),o.onScreen?w.execute(t,s):i.once||w.remove.occurred(s),e!==n?o.onOnScreen:void 0},offScreen:function(e){var o=w.get.elementCalculations(),t=e||i.onOffScreen,s="offScreen";return e&&(w.debug("Adding callback for offScreen",e),i.onOffScreen=e),o.offScreen?w.execute(t,s):i.once||w.remove.occurred(s),e!==n?o.onOffScreen:void 0},passing:function(e){var o=w.get.elementCalculations(),t=e||i.onPassing,s="passing";return e&&(w.debug("Adding callback for passing",e),i.onPassing=e),o.passing?w.execute(t,s):i.once||w.remove.occurred(s),e!==n?o.passing:void 0},topVisible:function(e){var o=w.get.elementCalculations(),t=e||i.onTopVisible,s="topVisible";return e&&(w.debug("Adding callback for top visible",e),i.onTopVisible=e),o.topVisible?w.execute(t,s):i.once||w.remove.occurred(s),e===n?o.topVisible:void 0},bottomVisible:function(e){var o=w.get.elementCalculations(),t=e||i.onBottomVisible,s="bottomVisible";return e&&(w.debug("Adding callback for bottom visible",e),i.onBottomVisible=e),o.bottomVisible?w.execute(t,s):i.once||w.remove.occurred(s),e===n?o.bottomVisible:void 0},topPassed:function(e){var o=w.get.elementCalculations(),t=e||i.onTopPassed,s="topPassed";return e&&(w.debug("Adding callback for top passed",e),i.onTopPassed=e),o.topPassed?w.execute(t,s):i.once||w.remove.occurred(s),e===n?o.topPassed:void 0},bottomPassed:function(e){var o=w.get.elementCalculations(),t=e||i.onBottomPassed,s="bottomPassed";return e&&(w.debug("Adding callback for bottom passed",e),i.onBottomPassed=e),o.bottomPassed?w.execute(t,s):i.once||w.remove.occurred(s),e===n?o.bottomPassed:void 0},passingReverse:function(e){var o=w.get.elementCalculations(),t=e||i.onPassingReverse,s="passingReverse";return e&&(w.debug("Adding callback for passing reverse",e),i.onPassingReverse=e),o.passing?i.once||w.remove.occurred(s):w.get.occurred("passing")&&w.execute(t,s),e!==n?!o.passing:void 0},topVisibleReverse:function(e){var o=w.get.elementCalculations(),t=e||i.onTopVisibleReverse,s="topVisibleReverse";return e&&(w.debug("Adding callback for top visible reverse",e),i.onTopVisibleReverse=e),o.topVisible?i.once||w.remove.occurred(s):w.get.occurred("topVisible")&&w.execute(t,s),e===n?!o.topVisible:void 0},bottomVisibleReverse:function(e){var o=w.get.elementCalculations(),t=e||i.onBottomVisibleReverse,s="bottomVisibleReverse";return e&&(w.debug("Adding callback for bottom visible reverse",e),i.onBottomVisibleReverse=e),o.bottomVisible?i.once||w.remove.occurred(s):w.get.occurred("bottomVisible")&&w.execute(t,s),e===n?!o.bottomVisible:void 0},topPassedReverse:function(e){var o=w.get.elementCalculations(),t=e||i.onTopPassedReverse,s="topPassedReverse";return e&&(w.debug("Adding callback for top passed reverse",e),i.onTopPassedReverse=e),o.topPassed?i.once||w.remove.occurred(s):w.get.occurred("topPassed")&&w.execute(t,s),e===n?!o.onTopPassed:void 0},bottomPassedReverse:function(e){var o=w.get.elementCalculations(),t=e||i.onBottomPassedReverse,s="bottomPassedReverse";return e&&(w.debug("Adding callback for bottom passed reverse",e),i.onBottomPassedReverse=e),o.bottomPassed?i.once||w.remove.occurred(s):w.get.occurred("bottomPassed")&&w.execute(t,s),e===n?!o.bottomPassed:void 0},execute:function(e,o){var n=w.get.elementCalculations(),t=w.get.screenCalculations();e=e||!1,e&&(i.continuous?(w.debug("Callback being called continuously",o,n),e.call(T,n,t)):w.get.occurred(o)||(w.debug("Conditions met",o,n),e.call(T,n,t))),w.save.occurred(o)},remove:{fixed:function(){w.debug("Removing fixed position"),C.removeClass(m.fixed).css({position:"",top:"",left:"",zIndex:""}),i.onUnfixed.call(T)},placeholder:function(){w.debug("Removing placeholder content"),R&&R.remove()},occurred:function(e){if(e){var o=w.cache.occurred;o[e]!==n&&o[e]===!0&&(w.debug("Callback can now be called again",e),w.cache.occurred[e]=!1)}else w.cache.occurred={}}},save:{calculations:function(){w.verbose("Saving all calculations necessary to determine positioning"),w.save.direction(),w.save.screenCalculations(),w.save.elementCalculations()},occurred:function(e){e&&(w.cache.occurred[e]!==n&&w.cache.occurred[e]===!0||(w.verbose("Saving callback occurred",e),w.cache.occurred[e]=!0))},scroll:function(e){e=e+i.offset||y.scrollTop()+i.offset,w.cache.scroll=e},direction:function(){var e=w.get.scroll(),o=w.get.lastScroll(),n;return n=e>o&&o?"down":o>e&&o?"up":"static",w.cache.direction=n,w.cache.direction},elementPosition:function(){var e=w.cache.element,o=w.get.screenSize();return w.verbose("Saving element position"),e.fits=e.height<o.height,e.offset=C.offset(),e.width=C.outerWidth(),e.height=C.outerHeight(),w.cache.element=e,e},elementCalculations:function(){var e=w.get.screenCalculations(),o=w.get.elementPosition();return i.includeMargin?(o.margin={},o.margin.top=parseInt(C.css("margin-top"),10),o.margin.bottom=parseInt(C.css("margin-bottom"),10),o.top=o.offset.top-o.margin.top,o.bottom=o.offset.top+o.height+o.margin.bottom):(o.top=o.offset.top,o.bottom=o.offset.top+o.height),o.topVisible=e.bottom>=o.top,o.topPassed=e.top>=o.top,o.bottomVisible=e.bottom>=o.bottom,o.bottomPassed=e.top>=o.bottom,o.pixelsPassed=0,o.percentagePassed=0,o.onScreen=o.topVisible&&!o.bottomPassed,o.passing=o.topPassed&&!o.bottomPassed,o.offScreen=!o.onScreen,o.passing&&(o.pixelsPassed=e.top-o.top,o.percentagePassed=(e.top-o.top)/o.height),w.cache.element=o,w.verbose("Updated element calculations",o),o},screenCalculations:function(){var e=w.get.scroll();return w.save.direction(),w.cache.screen.top=e,w.cache.screen.bottom=e+w.cache.screen.height,w.cache.screen},screenSize:function(){w.verbose("Saving window position"),w.cache.screen={height:y.height()}},position:function(){w.save.screenSize(),w.save.elementPosition()}},get:{pixelsPassed:function(e){var o=w.get.elementCalculations();return e.search("%")>-1?o.height*(parseInt(e,10)/100):parseInt(e,10)},occurred:function(e){return w.cache.occurred!==n?w.cache.occurred[e]||!1:!1},direction:function(){return w.cache.direction===n&&w.save.direction(),w.cache.direction},elementPosition:function(){return w.cache.element===n&&w.save.elementPosition(),w.cache.element},elementCalculations:function(){return w.cache.element===n&&w.save.elementCalculations(),w.cache.element},screenCalculations:function(){return w.cache.screen===n&&w.save.screenCalculations(),w.cache.screen},screenSize:function(){return w.cache.screen===n&&w.save.screenSize(),w.cache.screen},scroll:function(){return w.cache.scroll===n&&w.save.scroll(),w.cache.scroll},lastScroll:function(){return w.cache.screen===n?(w.debug("First scroll event, no last scroll could be found"),!1):w.cache.screen.top}},setting:function(e,o){if($.isPlainObject(e))$.extend(!0,i,e);else{if(o===n)return i[e];i[e]=o}},internal:function(e,o){if($.isPlainObject(e))$.extend(!0,w,e);else{if(o===n)return w[e];w[e]=o}},debug:function(){!i.silent&&i.debug&&(i.performance?w.performance.log(arguments):(w.debug=Function.prototype.bind.call(console.info,console,i.name+":"),w.debug.apply(console,arguments)))},verbose:function(){!i.silent&&i.verbose&&i.debug&&(i.performance?w.performance.log(arguments):(w.verbose=Function.prototype.bind.call(console.info,console,i.name+":"),w.verbose.apply(console,arguments)))},error:function(){i.silent||(w.error=Function.prototype.bind.call(console.error,console,i.name+":"),w.error.apply(console,arguments))},performance:{log:function(e){var o,n,t;i.performance&&(o=(new Date).getTime(),t=c||o,n=o-t,c=o,r.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:T,"Execution Time":n})),clearTimeout(w.performance.timer),w.performance.timer=setTimeout(w.performance.display,500)},display:function(){var e=i.name+":",o=0;c=!1,clearTimeout(w.performance.timer),$.each(r,function(e,n){o+=n["Execution Time"]}),e+=" "+o+"ms",s&&(e+=" '"+s+"'"),(console.group!==n||console.table!==n)&&r.length>0&&(console.groupCollapsed(e),console.table?console.table(r):$.each(r,function(e,o){console.log(o.Name+": "+o["Execution Time"]+"ms")}),console.groupEnd()),r=[]}},invoke:function(e,o,t){var i=S,s,c,r;return o=o||d,t=T||t,"string"==typeof e&&i!==n&&(e=e.split(/[\. ]/),s=e.length-1,$.each(e,function(o,t){var r=o!=s?t+e[o+1].charAt(0).toUpperCase()+e[o+1].slice(1):e;if($.isPlainObject(i[r])&&o!=s)i=i[r];else{if(i[r]!==n)return c=i[r],!1;if(!$.isPlainObject(i[t])||o==s)return i[t]!==n?(c=i[t],!1):(w.error(v.method,e),!1);i=i[t]}})),$.isFunction(c)?r=c.apply(t,o):c!==n&&(r=c),$.isArray(u)?u.push(r):u!==n?u=[u,r]:r!==n&&(u=r),c}},l?(S===n&&w.initialize(),S.save.scroll(),S.save.calculations(),w.invoke(a)):(S!==n&&S.invoke("destroy"),w.initialize())}),u!==n?u:this},$.fn.visibility.settings={name:"Visibility",namespace:"visibility",debug:!1,verbose:!1,performance:!0,observeChanges:!0,initialCheck:!0,refreshOnLoad:!0,refreshOnResize:!0,checkOnRefresh:!0,once:!0,continuous:!1,offset:0,includeMargin:!1,context:e,throttle:!1,type:!1,zIndex:"10",transition:"fade in",duration:1e3,onPassed:{},onOnScreen:!1,onOffScreen:!1,onPassing:!1,onTopVisible:!1,onBottomVisible:!1,onTopPassed:!1,onBottomPassed:!1,onPassingReverse:!1,onTopVisibleReverse:!1,onBottomVisibleReverse:!1,onTopPassedReverse:!1,onBottomPassedReverse:!1,onLoad:function(){},onAllLoaded:function(){},onFixed:function(){},onUnfixed:function(){},onUpdate:!1,onRefresh:function(){},metadata:{src:"src"},className:{fixed:"fixed",placeholder:"placeholder"},error:{method:"The method you called is not defined.",visible:"Element is hidden, you must call refresh after element becomes visible"}}}(jQuery,window,document);