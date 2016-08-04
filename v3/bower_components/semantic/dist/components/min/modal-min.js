!function($,e,n,i){"use strict";e="undefined"!=typeof e&&e.Math==Math?e:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),$.fn.modal=function(t){var o=$(this),a=$(e),r=$(n),s=$("body"),c=o.selector||"",l=(new Date).getTime(),d=[],u=arguments[0],m="string"==typeof u,f=[].slice.call(arguments,1),g=e.requestAnimationFrame||e.mozRequestAnimationFrame||e.webkitRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,0)},h;return o.each(function(){var o=$.isPlainObject(t)?$.extend(!0,{},$.fn.modal.settings,t):$.extend({},$.fn.modal.settings),v=o.selector,b=o.className,p=o.namespace,y=o.error,k="."+p,w="module-"+p,M=$(this),C=$(o.context),S=M.find(v.close),F,A,D,H,T,x=this,z=M.data(w),O,q,E,j;j={initialize:function(){j.verbose("Initializing dimmer",C),j.create.id(),j.create.dimmer(),j.refreshModals(),j.bind.events(),o.observeChanges&&j.observeChanges(),j.instantiate()},instantiate:function(){j.verbose("Storing instance of modal"),z=j,M.data(w,z)},create:{dimmer:function(){var e={debug:o.debug,dimmerName:"modals",duration:{show:o.duration,hide:o.duration}},n=$.extend(!0,e,o.dimmerSettings);return o.inverted&&(n.variation=n.variation!==i?n.variation+" inverted":"inverted"),$.fn.dimmer===i?void j.error(y.dimmer):(j.debug("Creating dimmer with settings",n),H=C.dimmer(n),o.detachable?(j.verbose("Modal is detachable, moving content into dimmer"),H.dimmer("add content",M)):j.set.undetached(),o.blurring&&H.addClass(b.blurring),void(T=H.dimmer("get dimmer")))},id:function(){q=(Math.random().toString(16)+"000000000").substr(2,8),O="."+q,j.verbose("Creating unique id for element",q)}},destroy:function(){j.verbose("Destroying previous modal"),M.removeData(w).off(k),a.off(O),T.off(O),S.off(k),C.dimmer("destroy")},observeChanges:function(){"MutationObserver"in e&&(E=new MutationObserver(function(e){j.debug("DOM tree modified, refreshing"),j.refresh()}),E.observe(x,{childList:!0,subtree:!0}),j.debug("Setting up mutation observer",E))},refresh:function(){j.remove.scrolling(),j.cacheSizes(),j.set.screenHeight(),j.set.type(),j.set.position()},refreshModals:function(){A=M.siblings(v.modal),F=A.add(M)},attachEvents:function(e,n){var i=$(e);n=$.isFunction(j[n])?j[n]:j.toggle,i.length>0?(j.debug("Attaching modal events to element",e,n),i.off(k).on("click"+k,n)):j.error(y.notFound,e)},bind:{events:function(){j.verbose("Attaching events"),M.on("click"+k,v.close,j.event.close).on("click"+k,v.approve,j.event.approve).on("click"+k,v.deny,j.event.deny),a.on("resize"+O,j.event.resize)}},get:{id:function(){return(Math.random().toString(16)+"000000000").substr(2,8)}},event:{approve:function(){return o.onApprove.call(x,$(this))===!1?void j.verbose("Approve callback returned false cancelling hide"):void j.hide()},deny:function(){return o.onDeny.call(x,$(this))===!1?void j.verbose("Deny callback returned false cancelling hide"):void j.hide()},close:function(){j.hide()},click:function(e){var i=$(e.target),t=i.closest(v.modal).length>0,a=$.contains(n.documentElement,e.target);!t&&a&&(j.debug("Dimmer clicked, hiding all modals"),j.is.active()&&(j.remove.clickaway(),o.allowMultiple?j.hide():j.hideAll()))},debounce:function(e,n){clearTimeout(j.timer),j.timer=setTimeout(e,n)},keyboard:function(e){var n=e.which,i=27;n==i&&(o.closable?(j.debug("Escape key pressed hiding modal"),j.hide()):j.debug("Escape key pressed, but closable is set to false"),e.preventDefault())},resize:function(){H.dimmer("is active")&&g(j.refresh)}},toggle:function(){j.is.active()||j.is.animating()?j.hide():j.show()},show:function(e){e=$.isFunction(e)?e:function(){},j.refreshModals(),j.showModal(e)},hide:function(e){e=$.isFunction(e)?e:function(){},j.refreshModals(),j.hideModal(e)},showModal:function(e){e=$.isFunction(e)?e:function(){},j.is.animating()||!j.is.active()?(j.showDimmer(),j.cacheSizes(),j.set.position(),j.set.screenHeight(),j.set.type(),j.set.clickaway(),!o.allowMultiple&&j.others.active()?j.hideOthers(j.showModal):(o.onShow.call(x),o.transition&&$.fn.transition!==i&&M.transition("is supported")?(j.debug("Showing modal with css animations"),M.transition({debug:o.debug,animation:o.transition+" in",queue:o.queue,duration:o.duration,useFailSafe:!0,onComplete:function(){o.onVisible.apply(x),j.add.keyboardShortcuts(),j.save.focus(),j.set.active(),o.autofocus&&j.set.autofocus(),e()}})):j.error(y.noTransition))):j.debug("Modal is already visible")},hideModal:function(e,n){return e=$.isFunction(e)?e:function(){},j.debug("Hiding modal"),o.onHide.call(x,$(this))===!1?void j.verbose("Hide callback returned false cancelling hide"):void((j.is.animating()||j.is.active())&&(o.transition&&$.fn.transition!==i&&M.transition("is supported")?(j.remove.active(),M.transition({debug:o.debug,animation:o.transition+" out",queue:o.queue,duration:o.duration,useFailSafe:!0,onStart:function(){j.others.active()||n||j.hideDimmer(),j.remove.keyboardShortcuts()},onComplete:function(){o.onHidden.call(x),j.restore.focus(),e()}})):j.error(y.noTransition)))},showDimmer:function(){H.dimmer("is animating")||!H.dimmer("is active")?(j.debug("Showing dimmer"),H.dimmer("show")):j.debug("Dimmer already visible")},hideDimmer:function(){return H.dimmer("is animating")||H.dimmer("is active")?void H.dimmer("hide",function(){j.remove.clickaway(),j.remove.screenHeight()}):void j.debug("Dimmer is not visible cannot hide")},hideAll:function(e){var n=F.filter("."+b.active+", ."+b.animating);e=$.isFunction(e)?e:function(){},n.length>0&&(j.debug("Hiding all visible modals"),j.hideDimmer(),n.modal("hide modal",e))},hideOthers:function(e){var n=A.filter("."+b.active+", ."+b.animating);e=$.isFunction(e)?e:function(){},n.length>0&&(j.debug("Hiding other modals",A),n.modal("hide modal",e,!0))},others:{active:function(){return A.filter("."+b.active).length>0},animating:function(){return A.filter("."+b.animating).length>0}},add:{keyboardShortcuts:function(){j.verbose("Adding keyboard shortcuts"),r.on("keyup"+k,j.event.keyboard)}},save:{focus:function(){D=$(n.activeElement).blur()}},restore:{focus:function(){D&&D.length>0&&D.focus()}},remove:{active:function(){M.removeClass(b.active)},clickaway:function(){o.closable&&T.off("click"+O)},bodyStyle:function(){""===s.attr("style")&&(j.verbose("Removing style attribute"),s.removeAttr("style"))},screenHeight:function(){j.debug("Removing page height"),s.css("height","")},keyboardShortcuts:function(){j.verbose("Removing keyboard shortcuts"),r.off("keyup"+k)},scrolling:function(){H.removeClass(b.scrolling),M.removeClass(b.scrolling)}},cacheSizes:function(){var t=M.outerHeight();j.cache!==i&&0===t||(j.cache={pageHeight:$(n).outerHeight(),height:t+o.offset,contextHeight:"body"==o.context?$(e).height():H.height()}),j.debug("Caching modal and container sizes",j.cache)},can:{fit:function(){return j.cache.height+2*o.padding<j.cache.contextHeight}},is:{active:function(){return M.hasClass(b.active)},animating:function(){return M.transition("is supported")?M.transition("is animating"):M.is(":visible")},scrolling:function(){return H.hasClass(b.scrolling)},modernBrowser:function(){return!(e.ActiveXObject||"ActiveXObject"in e)}},set:{autofocus:function(){var e=M.find(":input").filter(":visible"),n=e.filter("[autofocus]"),i=n.length>0?n.first():e.first();i.length>0&&i.focus()},clickaway:function(){o.closable&&T.on("click"+O,j.event.click)},screenHeight:function(){j.can.fit()?s.css("height",""):(j.debug("Modal is taller than page content, resizing page height"),s.css("height",j.cache.height+2*o.padding))},active:function(){M.addClass(b.active)},scrolling:function(){H.addClass(b.scrolling),M.addClass(b.scrolling)},type:function(){j.can.fit()?(j.verbose("Modal fits on screen"),j.others.active()||j.others.animating()||j.remove.scrolling()):(j.verbose("Modal cannot fit on screen setting to scrolling"),j.set.scrolling())},position:function(){j.verbose("Centering modal on page",j.cache),j.can.fit()?M.css({top:"",marginTop:-(j.cache.height/2)}):M.css({marginTop:"",top:r.scrollTop()})},undetached:function(){H.addClass(b.undetached)}},setting:function(e,n){if(j.debug("Changing setting",e,n),$.isPlainObject(e))$.extend(!0,o,e);else{if(n===i)return o[e];$.isPlainObject(o[e])?$.extend(!0,o[e],n):o[e]=n}},internal:function(e,n){if($.isPlainObject(e))$.extend(!0,j,e);else{if(n===i)return j[e];j[e]=n}},debug:function(){!o.silent&&o.debug&&(o.performance?j.performance.log(arguments):(j.debug=Function.prototype.bind.call(console.info,console,o.name+":"),j.debug.apply(console,arguments)))},verbose:function(){!o.silent&&o.verbose&&o.debug&&(o.performance?j.performance.log(arguments):(j.verbose=Function.prototype.bind.call(console.info,console,o.name+":"),j.verbose.apply(console,arguments)))},error:function(){o.silent||(j.error=Function.prototype.bind.call(console.error,console,o.name+":"),j.error.apply(console,arguments))},performance:{log:function(e){var n,i,t;o.performance&&(n=(new Date).getTime(),t=l||n,i=n-t,l=n,d.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:x,"Execution Time":i})),clearTimeout(j.performance.timer),j.performance.timer=setTimeout(j.performance.display,500)},display:function(){var e=o.name+":",n=0;l=!1,clearTimeout(j.performance.timer),$.each(d,function(e,i){n+=i["Execution Time"]}),e+=" "+n+"ms",c&&(e+=" '"+c+"'"),(console.group!==i||console.table!==i)&&d.length>0&&(console.groupCollapsed(e),console.table?console.table(d):$.each(d,function(e,n){console.log(n.Name+": "+n["Execution Time"]+"ms")}),console.groupEnd()),d=[]}},invoke:function(e,n,t){var o=z,a,r,s;return n=n||f,t=x||t,"string"==typeof e&&o!==i&&(e=e.split(/[\. ]/),a=e.length-1,$.each(e,function(n,t){var s=n!=a?t+e[n+1].charAt(0).toUpperCase()+e[n+1].slice(1):e;if($.isPlainObject(o[s])&&n!=a)o=o[s];else{if(o[s]!==i)return r=o[s],!1;if(!$.isPlainObject(o[t])||n==a)return o[t]!==i?(r=o[t],!1):!1;o=o[t]}})),$.isFunction(r)?s=r.apply(t,n):r!==i&&(s=r),$.isArray(h)?h.push(s):h!==i?h=[h,s]:s!==i&&(h=s),r}},m?(z===i&&j.initialize(),j.invoke(u)):(z!==i&&z.invoke("destroy"),j.initialize())}),h!==i?h:this},$.fn.modal.settings={name:"Modal",namespace:"modal",silent:!1,debug:!1,verbose:!1,performance:!0,observeChanges:!1,allowMultiple:!1,detachable:!0,closable:!0,autofocus:!0,inverted:!1,blurring:!1,dimmerSettings:{closable:!1,useCSS:!0},context:"body",queue:!1,duration:500,offset:0,transition:"scale",padding:50,onShow:function(){},onVisible:function(){},onHide:function(){return!0},onHidden:function(){},onApprove:function(){return!0},onDeny:function(){return!0},selector:{close:"> .close",approve:".actions .positive, .actions .approve, .actions .ok",deny:".actions .negative, .actions .deny, .actions .cancel",modal:".ui.modal"},error:{dimmer:"UI Dimmer, a required component is not included in this page",method:"The method you called is not defined.",notFound:"The element you specified could not be found"},className:{active:"active",animating:"animating",blurring:"blurring",scrolling:"scrolling",undetached:"undetached"}}}(jQuery,window,document);