!function(e,n,t,i){"use strict";n="undefined"!=typeof n&&n.Math==Math?n:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.accordion=function(t){var o,a=e(this),s=(new Date).getTime(),r=[],c=arguments[0],l="string"==typeof c,u=[].slice.call(arguments,1);return n.requestAnimationFrame||n.mozRequestAnimationFrame||n.webkitRequestAnimationFrame||n.msRequestAnimationFrame||function(e){setTimeout(e,0)},a.each(function(){var d,g,f=e.isPlainObject(t)?e.extend(!0,{},e.fn.accordion.settings,t):e.extend({},e.fn.accordion.settings),m=f.className,p=f.namespace,h=f.selector,v=f.error,b="."+p,y="module-"+p,C=a.selector||"",O=e(this),x=O.find(h.title),F=O.find(h.content),A=this,T=O.data(y);g={initialize:function(){g.debug("Initializing",O),g.bind.events(),f.observeChanges&&g.observeChanges(),g.instantiate()},instantiate:function(){T=g,O.data(y,g)},destroy:function(){g.debug("Destroying previous instance",O),O.off(b).removeData(y)},refresh:function(){x=O.find(h.title),F=O.find(h.content)},observeChanges:function(){"MutationObserver"in n&&(d=new MutationObserver(function(e){g.debug("DOM tree modified, updating selector cache"),g.refresh()}),d.observe(A,{childList:!0,subtree:!0}),g.debug("Setting up mutation observer",d))},bind:{events:function(){g.debug("Binding delegated events"),O.on(f.on+b,h.trigger,g.event.click)}},event:{click:function(){g.toggle.call(this)}},toggle:function(n){var t=n!==i?"number"==typeof n?x.eq(n):e(n).closest(h.title):e(this).closest(h.title),o=t.next(F),a=o.hasClass(m.animating),s=o.hasClass(m.active),r=s&&!a,c=!s&&a;g.debug("Toggling visibility of content",t),r||c?f.collapsible?g.close.call(t):g.debug("Cannot close accordion content collapsing is disabled"):g.open.call(t)},open:function(n){var t=n!==i?"number"==typeof n?x.eq(n):e(n).closest(h.title):e(this).closest(h.title),o=t.next(F),a=o.hasClass(m.animating),s=o.hasClass(m.active),r=s||a;return r?void g.debug("Accordion already open, skipping",o):(g.debug("Opening accordion content",t),f.onOpening.call(o),f.exclusive&&g.closeOthers.call(t),t.addClass(m.active),o.stop(!0,!0).addClass(m.animating),f.animateChildren&&(e.fn.transition!==i&&O.transition("is supported")?o.children().transition({animation:"fade in",queue:!1,useFailSafe:!0,debug:f.debug,verbose:f.verbose,duration:f.duration}):o.children().stop(!0,!0).animate({opacity:1},f.duration,g.resetOpacity)),void o.slideDown(f.duration,f.easing,function(){o.removeClass(m.animating).addClass(m.active),g.reset.display.call(this),f.onOpen.call(this),f.onChange.call(this)}))},close:function(n){var t=n!==i?"number"==typeof n?x.eq(n):e(n).closest(h.title):e(this).closest(h.title),o=t.next(F),a=o.hasClass(m.animating),s=o.hasClass(m.active),r=!s&&a,c=s&&a;!s&&!r||c||(g.debug("Closing accordion content",o),f.onClosing.call(o),t.removeClass(m.active),o.stop(!0,!0).addClass(m.animating),f.animateChildren&&(e.fn.transition!==i&&O.transition("is supported")?o.children().transition({animation:"fade out",queue:!1,useFailSafe:!0,debug:f.debug,verbose:f.verbose,duration:f.duration}):o.children().stop(!0,!0).animate({opacity:0},f.duration,g.resetOpacity)),o.slideUp(f.duration,f.easing,function(){o.removeClass(m.animating).removeClass(m.active),g.reset.display.call(this),f.onClose.call(this),f.onChange.call(this)}))},closeOthers:function(n){var t,o,a,s=n!==i?x.eq(n):e(this).closest(h.title),r=s.parents(h.content).prev(h.title),c=s.closest(h.accordion),l=h.title+"."+m.active+":visible",u=h.content+"."+m.active+":visible";f.closeNested?(t=c.find(l).not(r),a=t.next(F)):(t=c.find(l).not(r),o=c.find(u).find(l).not(r),t=t.not(o),a=t.next(F)),t.length>0&&(g.debug("Exclusive enabled, closing other content",t),t.removeClass(m.active),a.removeClass(m.animating).stop(!0,!0),f.animateChildren&&(e.fn.transition!==i&&O.transition("is supported")?a.children().transition({animation:"fade out",useFailSafe:!0,debug:f.debug,verbose:f.verbose,duration:f.duration}):a.children().stop(!0,!0).animate({opacity:0},f.duration,g.resetOpacity)),a.slideUp(f.duration,f.easing,function(){e(this).removeClass(m.active),g.reset.display.call(this)}))},reset:{display:function(){g.verbose("Removing inline display from element",this),e(this).css("display",""),""===e(this).attr("style")&&e(this).attr("style","").removeAttr("style")},opacity:function(){g.verbose("Removing inline opacity from element",this),e(this).css("opacity",""),""===e(this).attr("style")&&e(this).attr("style","").removeAttr("style")}},setting:function(n,t){if(g.debug("Changing setting",n,t),e.isPlainObject(n))e.extend(!0,f,n);else{if(t===i)return f[n];e.isPlainObject(f[n])?e.extend(!0,f[n],t):f[n]=t}},internal:function(n,t){return g.debug("Changing internal",n,t),t===i?g[n]:void(e.isPlainObject(n)?e.extend(!0,g,n):g[n]=t)},debug:function(){!f.silent&&f.debug&&(f.performance?g.performance.log(arguments):(g.debug=Function.prototype.bind.call(console.info,console,f.name+":"),g.debug.apply(console,arguments)))},verbose:function(){!f.silent&&f.verbose&&f.debug&&(f.performance?g.performance.log(arguments):(g.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),g.verbose.apply(console,arguments)))},error:function(){f.silent||(g.error=Function.prototype.bind.call(console.error,console,f.name+":"),g.error.apply(console,arguments))},performance:{log:function(e){var n,t,i;f.performance&&(n=(new Date).getTime(),i=s||n,t=n-i,s=n,r.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:A,"Execution Time":t})),clearTimeout(g.performance.timer),g.performance.timer=setTimeout(g.performance.display,500)},display:function(){var n=f.name+":",t=0;s=!1,clearTimeout(g.performance.timer),e.each(r,function(e,n){t+=n["Execution Time"]}),n+=" "+t+"ms",C&&(n+=" '"+C+"'"),(console.group!==i||console.table!==i)&&r.length>0&&(console.groupCollapsed(n),console.table?console.table(r):e.each(r,function(e,n){console.log(n.Name+": "+n["Execution Time"]+"ms")}),console.groupEnd()),r=[]}},invoke:function(n,t,a){var s,r,c,l=T;return t=t||u,a=A||a,"string"==typeof n&&l!==i&&(n=n.split(/[\. ]/),s=n.length-1,e.each(n,function(t,o){var a=t!=s?o+n[t+1].charAt(0).toUpperCase()+n[t+1].slice(1):n;if(e.isPlainObject(l[a])&&t!=s)l=l[a];else{if(l[a]!==i)return r=l[a],!1;if(!e.isPlainObject(l[o])||t==s)return l[o]!==i?(r=l[o],!1):(g.error(v.method,n),!1);l=l[o]}})),e.isFunction(r)?c=r.apply(a,t):r!==i&&(c=r),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),r}},l?(T===i&&g.initialize(),g.invoke(c)):(T!==i&&T.invoke("destroy"),g.initialize())}),o!==i?o:this},e.fn.accordion.settings={name:"Accordion",namespace:"accordion",silent:!1,debug:!1,verbose:!1,performance:!0,on:"click",observeChanges:!0,exclusive:!0,collapsible:!0,closeNested:!1,animateChildren:!0,duration:350,easing:"easeOutQuad",onOpening:function(){},onOpen:function(){},onClosing:function(){},onClose:function(){},onChange:function(){},error:{method:"The method you called is not defined"},className:{active:"active",animating:"animating"},selector:{accordion:".accordion",title:".title",trigger:".title",content:".content"}},e.extend(e.easing,{easeOutQuad:function(e,n,t,i,o){return-i*(n/=o)*(n-2)+t}})}(jQuery,window,document);