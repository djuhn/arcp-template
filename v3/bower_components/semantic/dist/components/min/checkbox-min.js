!function($,e,n,t){"use strict";e="undefined"!=typeof e&&e.Math==Math?e:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),$.fn.checkbox=function(i){var o=$(this),a=o.selector||"",c=(new Date).getTime(),r=[],d=arguments[0],l="string"==typeof d,s=[].slice.call(arguments,1),u;return o.each(function(){var o=$.extend(!0,{},$.fn.checkbox.settings,i),b=o.className,h=o.namespace,g=o.selector,p=o.error,f="."+h,k="module-"+h,m=$(this),v=$(this).children(g.label),y=$(this).children(g.input),C=y[0],x=!1,w=!1,I=m.data(k),D,S=this,E;E={initialize:function(){E.verbose("Initializing checkbox",o),E.create.label(),E.bind.events(),E.set.tabbable(),E.hide.input(),E.observeChanges(),E.instantiate(),E.setup()},instantiate:function(){E.verbose("Storing instance of module",E),I=E,m.data(k,E)},destroy:function(){E.verbose("Destroying module"),E.unbind.events(),E.show.input(),m.removeData(k)},fix:{reference:function(){m.is(g.input)&&(E.debug("Behavior called on <input> adjusting invoked element"),m=m.closest(g.checkbox),E.refresh())}},setup:function(){E.set.initialLoad(),E.is.indeterminate()?(E.debug("Initial value is indeterminate"),E.indeterminate()):E.is.checked()?(E.debug("Initial value is checked"),E.check()):(E.debug("Initial value is unchecked"),E.uncheck()),E.remove.initialLoad()},refresh:function(){v=m.children(g.label),y=m.children(g.input),C=y[0]},hide:{input:function(){E.verbose("Modifying <input> z-index to be unselectable"),y.addClass(b.hidden)}},show:{input:function(){E.verbose("Modifying <input> z-index to be selectable"),y.removeClass(b.hidden)}},observeChanges:function(){"MutationObserver"in e&&(D=new MutationObserver(function(e){E.debug("DOM tree modified, updating selector cache"),E.refresh()}),D.observe(S,{childList:!0,subtree:!0}),E.debug("Setting up mutation observer",D))},attachEvents:function(e,n){var t=$(e);n=$.isFunction(E[n])?E[n]:E.toggle,t.length>0?(E.debug("Attaching checkbox events to element",e,n),t.on("click"+f,n)):E.error(p.notFound)},event:{click:function(e){var n=$(e.target);return n.is(g.input)?void E.verbose("Using default check action on initialized checkbox"):n.is(g.link)?void E.debug("Clicking link inside checkbox, skipping toggle"):(E.toggle(),y.focus(),void e.preventDefault())},keydown:function(e){var n=e.which,t={enter:13,space:32,escape:27};n==t.escape?(E.verbose("Escape key pressed blurring field"),y.blur(),w=!0):e.ctrlKey||n!=t.space&&n!=t.enter?w=!1:(E.verbose("Enter/space key pressed, toggling checkbox"),E.toggle(),w=!0)},keyup:function(e){w&&e.preventDefault()}},check:function(){E.should.allowCheck()&&(E.debug("Checking checkbox",y),E.set.checked(),E.should.ignoreCallbacks()||(o.onChecked.call(C),o.onChange.call(C)))},uncheck:function(){E.should.allowUncheck()&&(E.debug("Unchecking checkbox"),E.set.unchecked(),E.should.ignoreCallbacks()||(o.onUnchecked.call(C),o.onChange.call(C)))},indeterminate:function(){return E.should.allowIndeterminate()?void E.debug("Checkbox is already indeterminate"):(E.debug("Making checkbox indeterminate"),E.set.indeterminate(),void(E.should.ignoreCallbacks()||(o.onIndeterminate.call(C),o.onChange.call(C))))},determinate:function(){return E.should.allowDeterminate()?void E.debug("Checkbox is already determinate"):(E.debug("Making checkbox determinate"),E.set.determinate(),void(E.should.ignoreCallbacks()||(o.onDeterminate.call(C),o.onChange.call(C))))},enable:function(){return E.is.enabled()?void E.debug("Checkbox is already enabled"):(E.debug("Enabling checkbox"),E.set.enabled(),o.onEnable.call(C),void o.onEnabled.call(C))},disable:function(){return E.is.disabled()?void E.debug("Checkbox is already disabled"):(E.debug("Disabling checkbox"),E.set.disabled(),o.onDisable.call(C),void o.onDisabled.call(C))},get:{radios:function(){var e=E.get.name();return $('input[name="'+e+'"]').closest(g.checkbox)},otherRadios:function(){return E.get.radios().not(m)},name:function(){return y.attr("name")}},is:{initialLoad:function(){return x},radio:function(){return y.hasClass(b.radio)||"radio"==y.attr("type")},indeterminate:function(){return y.prop("indeterminate")!==t&&y.prop("indeterminate")},checked:function(){return y.prop("checked")!==t&&y.prop("checked")},disabled:function(){return y.prop("disabled")!==t&&y.prop("disabled")},enabled:function(){return!E.is.disabled()},determinate:function(){return!E.is.indeterminate()},unchecked:function(){return!E.is.checked()}},should:{allowCheck:function(){return E.is.determinate()&&E.is.checked()&&!E.should.forceCallbacks()?(E.debug("Should not allow check, checkbox is already checked"),!1):o.beforeChecked.apply(C)===!1?(E.debug("Should not allow check, beforeChecked cancelled"),!1):!0},allowUncheck:function(){return E.is.determinate()&&E.is.unchecked()&&!E.should.forceCallbacks()?(E.debug("Should not allow uncheck, checkbox is already unchecked"),!1):o.beforeUnchecked.apply(C)===!1?(E.debug("Should not allow uncheck, beforeUnchecked cancelled"),!1):!0},allowIndeterminate:function(){return E.is.indeterminate()&&!E.should.forceCallbacks()?(E.debug("Should not allow indeterminate, checkbox is already indeterminate"),!1):o.beforeIndeterminate.apply(C)===!1?(E.debug("Should not allow indeterminate, beforeIndeterminate cancelled"),!1):!0},allowDeterminate:function(){return E.is.determinate()&&!E.should.forceCallbacks()?(E.debug("Should not allow determinate, checkbox is already determinate"),!1):o.beforeDeterminate.apply(C)===!1?(E.debug("Should not allow determinate, beforeDeterminate cancelled"),!1):!0},forceCallbacks:function(){return E.is.initialLoad()&&o.fireOnInit},ignoreCallbacks:function(){return x&&!o.fireOnInit}},can:{change:function(){return!(m.hasClass(b.disabled)||m.hasClass(b.readOnly)||y.prop("disabled")||y.prop("readonly"))},uncheck:function(){return"boolean"==typeof o.uncheckable?o.uncheckable:!E.is.radio()}},set:{initialLoad:function(){x=!0},checked:function(){return E.verbose("Setting class to checked"),m.removeClass(b.indeterminate).addClass(b.checked),E.is.radio()&&E.uncheckOthers(),!E.is.indeterminate()&&E.is.checked()?void E.debug("Input is already checked, skipping input property change"):(E.verbose("Setting state to checked",C),y.prop("indeterminate",!1).prop("checked",!0),void E.trigger.change())},unchecked:function(){return E.verbose("Removing checked class"),m.removeClass(b.indeterminate).removeClass(b.checked),!E.is.indeterminate()&&E.is.unchecked()?void E.debug("Input is already unchecked"):(E.debug("Setting state to unchecked"),y.prop("indeterminate",!1).prop("checked",!1),void E.trigger.change())},indeterminate:function(){return E.verbose("Setting class to indeterminate"),m.addClass(b.indeterminate),E.is.indeterminate()?void E.debug("Input is already indeterminate, skipping input property change"):(E.debug("Setting state to indeterminate"),y.prop("indeterminate",!0),void E.trigger.change())},determinate:function(){return E.verbose("Removing indeterminate class"),m.removeClass(b.indeterminate),E.is.determinate()?void E.debug("Input is already determinate, skipping input property change"):(E.debug("Setting state to determinate"),void y.prop("indeterminate",!1))},disabled:function(){return E.verbose("Setting class to disabled"),m.addClass(b.disabled),E.is.disabled()?void E.debug("Input is already disabled, skipping input property change"):(E.debug("Setting state to disabled"),y.prop("disabled","disabled"),void E.trigger.change())},enabled:function(){return E.verbose("Removing disabled class"),m.removeClass(b.disabled),E.is.enabled()?void E.debug("Input is already enabled, skipping input property change"):(E.debug("Setting state to enabled"),y.prop("disabled",!1),void E.trigger.change())},tabbable:function(){E.verbose("Adding tabindex to checkbox"),y.attr("tabindex")===t&&y.attr("tabindex",0)}},remove:{initialLoad:function(){x=!1}},trigger:{change:function(){var e=n.createEvent("HTMLEvents"),t=y[0];t&&(E.verbose("Triggering native change event"),e.initEvent("change",!0,!1),t.dispatchEvent(e))}},create:{label:function(){y.prevAll(g.label).length>0?(y.prev(g.label).detach().insertAfter(y),E.debug("Moving existing label",v)):E.has.label()||(v=$("<label>").insertAfter(y),E.debug("Creating label",v))}},has:{label:function(){return v.length>0}},bind:{events:function(){E.verbose("Attaching checkbox events"),m.on("click"+f,E.event.click).on("keydown"+f,g.input,E.event.keydown).on("keyup"+f,g.input,E.event.keyup)}},unbind:{events:function(){E.debug("Removing events"),m.off(f)}},uncheckOthers:function(){var e=E.get.otherRadios();E.debug("Unchecking other radios",e),e.removeClass(b.checked)},toggle:function(){return E.can.change()?void(E.is.indeterminate()||E.is.unchecked()?(E.debug("Currently unchecked"),E.check()):E.is.checked()&&E.can.uncheck()&&(E.debug("Currently checked"),E.uncheck())):void(E.is.radio()||E.debug("Checkbox is read-only or disabled, ignoring toggle"))},setting:function(e,n){if(E.debug("Changing setting",e,n),$.isPlainObject(e))$.extend(!0,o,e);else{if(n===t)return o[e];$.isPlainObject(o[e])?$.extend(!0,o[e],n):o[e]=n}},internal:function(e,n){if($.isPlainObject(e))$.extend(!0,E,e);else{if(n===t)return E[e];E[e]=n}},debug:function(){!o.silent&&o.debug&&(o.performance?E.performance.log(arguments):(E.debug=Function.prototype.bind.call(console.info,console,o.name+":"),E.debug.apply(console,arguments)))},verbose:function(){!o.silent&&o.verbose&&o.debug&&(o.performance?E.performance.log(arguments):(E.verbose=Function.prototype.bind.call(console.info,console,o.name+":"),E.verbose.apply(console,arguments)))},error:function(){o.silent||(E.error=Function.prototype.bind.call(console.error,console,o.name+":"),E.error.apply(console,arguments))},performance:{log:function(e){var n,t,i;o.performance&&(n=(new Date).getTime(),i=c||n,t=n-i,c=n,r.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:S,"Execution Time":t})),clearTimeout(E.performance.timer),E.performance.timer=setTimeout(E.performance.display,500)},display:function(){var e=o.name+":",n=0;c=!1,clearTimeout(E.performance.timer),$.each(r,function(e,t){n+=t["Execution Time"]}),e+=" "+n+"ms",a&&(e+=" '"+a+"'"),(console.group!==t||console.table!==t)&&r.length>0&&(console.groupCollapsed(e),console.table?console.table(r):$.each(r,function(e,n){console.log(n.Name+": "+n["Execution Time"]+"ms")}),console.groupEnd()),r=[]}},invoke:function(e,n,i){var o=I,a,c,r;return n=n||s,i=S||i,"string"==typeof e&&o!==t&&(e=e.split(/[\. ]/),a=e.length-1,$.each(e,function(n,i){var r=n!=a?i+e[n+1].charAt(0).toUpperCase()+e[n+1].slice(1):e;if($.isPlainObject(o[r])&&n!=a)o=o[r];else{if(o[r]!==t)return c=o[r],!1;if(!$.isPlainObject(o[i])||n==a)return o[i]!==t?(c=o[i],!1):(E.error(p.method,e),!1);o=o[i]}})),$.isFunction(c)?r=c.apply(i,n):c!==t&&(r=c),$.isArray(u)?u.push(r):u!==t?u=[u,r]:r!==t&&(u=r),c}},l?(I===t&&E.initialize(),E.invoke(d)):(I!==t&&I.invoke("destroy"),E.initialize())}),u!==t?u:this},$.fn.checkbox.settings={name:"Checkbox",namespace:"checkbox",silent:!1,debug:!1,verbose:!0,performance:!0,uncheckable:"auto",fireOnInit:!1,onChange:function(){},beforeChecked:function(){},beforeUnchecked:function(){},beforeDeterminate:function(){},beforeIndeterminate:function(){},onChecked:function(){},onUnchecked:function(){},onDeterminate:function(){},onIndeterminate:function(){},onEnable:function(){},onDisable:function(){},onEnabled:function(){},onDisabled:function(){},className:{checked:"checked",indeterminate:"indeterminate",disabled:"disabled",hidden:"hidden",radio:"radio",readOnly:"read-only"},error:{method:"The method you called is not defined"},selector:{checkbox:".ui.checkbox",label:"label, .box",input:'input[type="checkbox"], input[type="radio"]',link:"a[href]"}}}(jQuery,window,document);