var Cackle=Cackle||{};
Cackle.Fastjs=Cackle.Fastjs||{get:function(b,a){return document.querySelector(b+" "+a)
},extend:function(c,a){var b={},d;
for(d in c){if(Object.prototype.hasOwnProperty.call(c,d)){b[d]=c[d]
}}for(d in a){if(Object.prototype.hasOwnProperty.call(a,d)){b[d]=a[d]
}}return b
},create:function(b,a,c,d){var e=document.createElement(b);
if(a){this.addcl(e,a)
}if(c){e.setAttribute("title",c)
}if(d){e.setAttribute("style",d)
}return e
},addcls:function(d,a){for(var b=0;
b<a.length;
b++){var e=a[b];
if(d.className.indexOf(e)<0){d.className+=" "+e
}}},addcl:function(b,a){if(b&&b.className.indexOf(a)<0){b.className+=" "+a;
b.className=b.className.trim()
}},remcl:function(b,a){b&&(b.className=b.className.replace(a," "))
},hascl:function(b,a){return b&&b.className.indexOf(a)>-1
},on:function(c,d,a){if(!c){return
}var b=this;
if(c.addEventListener){c.addEventListener(d,function(f){if(a.call(c,f)==false){b.stop(f)
}},false)
}else{c.attachEvent("on"+d,function(f){f.stopPropagation=f.stopPropagation||function(){this.cancelBubble=true
};
f.preventDefault=f.preventDefault||function(){this.returnValue=false
};
if(a.call(c,f)==false){b.stop(f)
}})
}},on2:function(c,b,e,a){if(!c){return
}var d=c.querySelector(b);
if(d){this.on(d,e,a)
}},onall:function(c,d,a){for(var b=0;
b<c.length;
b++){this.on(c[b],d,a)
}},onall2:function(c,b,d,a){this.onall(c.querySelectorAll(b),d,a)
},stop:function(a){a.preventDefault();
a.stopPropagation()
},parents:function(c,a){var d=c.parentNode,b=!1;
this.each(d.className.split(" "),function(e){!b&&(b=(e==a))
});
return b?d:this.parents(d,a)
},parentsel:function(b,a){var c=b.parentNode;
if(c.tagName.toLowerCase().indexOf(a)<0){return this.parentsel(c,a)
}return c
},show:function(a,b){var c=b.querySelector(a);
this.show2(c)
},show2:function(a){if(a){a.style.display=""
}},hide:function(a,b){var c=b.querySelector(a);
this.hide2(c)
},hide2:function(a){if(a){a.style.display="none"
}},html:function(a,b){if(a){a.innerHTML="";
if(this.isString(b)){a.innerHTML=b
}else{a.appendChild(b)
}}},prepend:function(a,b){a.insertBefore(b,a.firstChild)
},rm:function(a){if(a){if(a.parentNode){a.parentNode.removeChild(a)
}}},rm2:function(b,a){var c=b.querySelector(a);
this.rm(c)
},each:function forEach(c,b){if(typeof c.length=="undefined"){b(c,0)
}else{for(var a=0;
a<c.length;
a++){b(c[a],a)
}}},css:function(b,a,c){if(this.isInteger(c)){c=c+"px"
}b.style[a]=c
},child:function(b,c){for(var a=b.children.length;
a--;
){var d=b.children[a];
if(d.nodeType!=8){if(d.className.indexOf(c)>-1){return d
}}}},children:function(c){var b=[];
for(var a=c.children.length;
a--;
){if(c.children[a].nodeType!=8){b.unshift(c.children[a])
}}return b
},icss:function(b,a){return b+":"+a+"px!important;"
},transCss:function(b,d){var c=" .5s ease-in-out!important;",a="overflow-y:hidden!important;-webkit-transition:"+d+c+"-moz-transition:"+d+c+"-o-transition:"+d+c+"transition:"+d+c;
b.setAttribute("style",a);
return a
},prependSlide:function(e,b){var a=this,d=this.transCss(e,"max-height");
b.insertBefore(e,b.firstChild);
var c=e.offsetHeight;
e.setAttribute("style",this.icss("max-height",0)+d);
setTimeout(function(){e.setAttribute("style",a.icss("max-height",c)+d);
setTimeout(function(){e.setAttribute("style","")
},1000)
},1)
},slidedwn:function(b){b.style.display="";
var a=b.offsetHeight;
b.setAttribute("style",this.transCss(b,"height"));
b.style.height="0";
setTimeout(function(){b.style.height=a+"px";
setTimeout(function(){b.setAttribute("style","")
},500)
},5)
},slideup:function(b,a){b.setAttribute("style",this.transCss(b,"height"));
b.style.height=b.offsetHeight+"px";
setTimeout(function(){b.style.height="0";
setTimeout(function(){b.setAttribute("style","display:none");
a&&a()
},500)
},5)
},title:function(){var a=document.getElementsByTagName("title")[0];
return a&&a.textContent||""
},nextES:function(a){do{a=a.nextSibling
}while(a&&a.nodeType!==1);
return a
},next:function(a){return a.nextElementSibling||this.nextES(a)
},prevES:function(a){do{a=a.previousSibling
}while(a&&a.nodeType!==1);
return a
},prev:function(a){return a.previousElementSibling||this.prevES(a)
},after:function(a,b){a.parentNode.insertBefore(b,a.nextSibling)
},isVisible:function(a){return a.offsetWidth>0&&a.offsetHeight>0
},isInteger:function(a){return a%1===0
},isString:function(a){return typeof a=="string"
},afun:function(a){var b="cackle_"+Math.floor(Math.random()*1000001);
window[b]=function(c){window[b]=undefined;
try{delete window[b]
}catch(d){}a(c)
};
return b
},params:function(c,b,a){var d=[];
if(b){for(p in b){d.push(encodeURIComponent(p)+"="+encodeURIComponent(b[p]))
}}if(a){d.push("callback="+this.afun(a))
}if(d.length>0){var e=(c.indexOf("?")<0)?"?":"&";
return c+=e+d.join("&")
}return c
},jsonp:function(c,b,a){var d=document.createElement("script");
d.src=this.params(c,b,a);
d.type="text/javascript";
(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(d)
},popup:function(c,d,a,b,f,e){f=f||(screen.height/2)-(a/2);
e=e||(screen.width/2)-(d/2);
return window.open(this.params(c,b),"","location=1,status=1,resizable=yes,width="+d+",height="+a+",top="+f+",left="+e)
},inArray:function(c,b){for(var a=0;
a<c.length;
a++){if(c[a]===b){return a
}}return -1
},txt:function(b,a){"textContent" in b?b.textContent=a:b.innerText=a
},cbs:function(d,b,a){if(!d.callback){return
}var c=d.callback[b];
if(c&&c.length>0){for(var e=0;
e<c.length;
e++){c[e](a)
}}},extendcbs:function(b,a){b.callback=b.callback||{};
for(cb in a){if(Object.prototype.hasOwnProperty.call(a,cb)){if(!Object.prototype.hasOwnProperty.call(b.callback,cb)){b.callback[cb]=[]
}b.callback[cb].push(a[cb])
}}return b.callback
}};
String.prototype.trim=String.prototype.trim||function(){return this.replace(/^\s+|\s+$/g,"")
};Cackle.Base=Cackle.Base||{emailRegex:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,error:function(a,b){var c=b[a.code],d=a.banInfo;
if(d){if(d.expired){c+=" "+b.banUntil+" "+new Date(d.expired).toLocaleString()
}if(d.reason){c+="<br>"+b.banReason+" "+b["ban"+d.reason]
}else{if(d.reasonTxt){c+="<br>"+b.banReason+" "+d.reasonTxt
}}}return c
},validEmail:function(a){return this.emailRegex.test(a)
},gotoId:function(b){var a=window.location.href;
if(a.indexOf("#"+b)>0){document.location.replace(a)
}},ssl:function(a){if(Cackle.protocol=="https:"&&a){if(a.indexOf("http://media.cackle.me")>-1||a.indexOf("http://cackle.me")>-1){return a.replace("http:","https:")
}else{if(a.indexOf("https://media.cackle.me")>-1||a.indexOf("https")==0){return a
}else{return"https://i2.wp.com/"+a.replace("http://","")
}}}else{return a
}},urlsToHyperlinks:function(d){var c=/(\b(https?|ftp|file):\/\/[-A-Z0-9А-Я+&@#\/%?=~_|!:,.;]*[-A-Z0-9А-Я+&@#\/%=~_|])/ig,b=/(^|[^\/])(www\.[\S]+(\b|$))/ig,a=d.replace(c,'<a href="$1" target="_blank">$1</a>');
return a.replace(b,'$1<a href="http://$2" target="_blank" rel="nofollow">$2</a>')
},escapeHtml:function(a){return a?document.createElement("div").appendChild(document.createTextNode(a)).parentNode.innerHTML:""
},escapeHtmlWithLinks:function(a){return this.urlsToHyperlinks(this.escapeHtml(a))
},getAvatar:function(b,d,c,a){if(b){b=this.ssl(b);
return b.match("^http://cackle.me/")?b.replace("http://","http://i1.wp.com/"):b
}else{if((a.gravatarEnable||a.anonymGravatarEnable)&&d){return this.getGravatar(d,c,a)
}else{return this.getDefaultAvatar(a)
}}},getGravatar:function(c,b,a){return"//gravatar.com/avatar/"+c+"?d="+this.getDefaultAvatar(a)+"&r=PG&s="+b
},getDefaultAvatar:function(a){return a.anonymAvatar?(a.anonymAvatar.match("^https?:")?a.anonymAvatar:"//"+a.anonymAvatar):this.getCackleAvatar()
},getCackleAvatar:function(){return Cackle.origin+"/widget/img/anonym2.png"
}};if(typeof JSON!=="object"){JSON={}
}(function(){function f(n){return n<10?"0"+n:n
}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null
};
String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()
}
}var cx,escapable,gap,indent,meta,rep;
function quote(string){escapable.lastIndex=0;
return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})+'"':'"'+string+'"'
}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];
if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)
}if(typeof rep==="function"){value=rep.call(holder,key,value)
}switch(typeof value){case"string":return quote(value);
case"number":return isFinite(value)?String(value):"null";
case"boolean":case"null":return String(value);
case"object":if(!value){return"null"
}gap+=indent;
partial=[];
if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;
for(i=0;
i<length;
i+=1){partial[i]=str(i,value)||"null"
}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";
gap=mind;
return v
}if(rep&&typeof rep==="object"){length=rep.length;
for(i=0;
i<length;
i+=1){if(typeof rep[i]==="string"){k=rep[i];
v=str(k,value);
if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);
if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";
gap=mind;
return v
}}if(typeof JSON.stringify!=="function"){escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
JSON.stringify=function(value,replacer,space){var i;
gap="";
indent="";
if(typeof space==="number"){for(i=0;
i<space;
i+=1){indent+=" "
}}else{if(typeof space==="string"){indent=space
}}rep=replacer;
if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")
}return str("",{"":value})
}
}if(typeof JSON.parse!=="function"){cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
JSON.parse=function(text,reviver){var j;
function walk(holder,key){var k,v,value=holder[key];
if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);
if(v!==undefined){value[k]=v
}else{delete value[k]
}}}}return reviver.call(holder,key,value)
}text=String(text);
cx.lastIndex=0;
if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})
}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");
return typeof reviver==="function"?walk({"":j},""):j
}throw new SyntaxError("JSON.parse")
}
}}());var Cackle = Cackle || {};

Cackle.PostMessage = Cackle.PostMessage || {

    xdm: {},

    channel: {},

    xhr: function(host) {
        if (this.xdm[host] && this.iframe(host)) {
            return this.xdm[host];
        } else {
            return (this.xdm[host] = this.create(host));
        }
    },

    iframe: function(host) {
        return document.getElementById('easyXDM_' + this.channel[host] + '_provider');
    },

    create: function(host) {
        var handler = this;
        this.loadEasyXDM();
        return new easyXDM.Rpc({
            remote: host + '/xdm/index.html',
            onReady: function() {
                var iframe = document.getElementById('easyXDM_' + this.channel + '_provider');
                iframe.setAttribute('style', 'position:absolute!important;top:-2000px!important;left:0!important;');
                handler.channel[host] = this.channel;
            }
        },{
            remote: {
                request: {}
            },
            serializer: {
                stringify: function(obj) {
                    var clone = {
                        id: obj.id,
                        jsonrpc: obj.jsonrpc,
                        method: obj.method,
                        params: obj.params[0]
                    };
                    return handler.stringify(clone);
                },
                parse: function(string) {
                    return JSON.parse(string);
                }
            }
        });
    },

    //TODO: coz if loaded many times occurs error: undefined is not a function
    //TODO: check this behavior on production with loaded widget from 'a' and 'b'
    loadEasyXDM: function() {
        (function(N,d,p,K,k,H){var b=this;var n=Math.floor(Math.random()*10000);var q=Function.prototype;var Q=/^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/;var R=/[\-\w]+\/\.\.\//;var F=/([^:])\/\//g;var I="";var o={};var M=N.easyXDM;var U="easyXDM_";var E;var y=false;var i;var h;function C(X,Z){var Y=typeof X[Z];return Y=="function"||(!!(Y=="object"&&X[Z]))||Y=="unknown"}function u(X,Y){return !!(typeof(X[Y])=="object"&&X[Y])}function r(X){return Object.prototype.toString.call(X)==="[object Array]"}function c(){var Z="Shockwave Flash",ad="application/x-shockwave-flash";if(!t(navigator.plugins)&&typeof navigator.plugins[Z]=="object"){var ab=navigator.plugins[Z].description;if(ab&&!t(navigator.mimeTypes)&&navigator.mimeTypes[ad]&&navigator.mimeTypes[ad].enabledPlugin){i=ab.match(/\d+/g)}}if(!i){var Y;try{Y=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");i=Array.prototype.slice.call(Y.GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/),1);Y=null}catch(ac){}}if(!i){return false}var X=parseInt(i[0],10),aa=parseInt(i[1],10);h=X>9&&aa>0;return true}var v,x;if(C(N,"addEventListener")){v=function(Z,X,Y){Z.addEventListener(X,Y,false)};x=function(Z,X,Y){Z.removeEventListener(X,Y,false)}}else{if(C(N,"attachEvent")){v=function(X,Z,Y){X.attachEvent("on"+Z,Y)};x=function(X,Z,Y){X.detachEvent("on"+Z,Y)}}else{throw new Error("Browser not supported")}}var W=false,J=[],L;if("readyState" in d){L=d.readyState;W=L=="complete"||(~navigator.userAgent.indexOf("AppleWebKit/")&&(L=="loaded"||L=="interactive"))}else{W=!!d.body}function s(){if(W){return}W=true;for(var X=0;X<J.length;X++){J[X]()}J.length=0}if(!W){if(C(N,"addEventListener")){v(d,"DOMContentLoaded",s)}else{v(d,"readystatechange",function(){if(d.readyState=="complete"){s()}});if(d.documentElement.doScroll&&N===top){var g=function(){if(W){return}try{d.documentElement.doScroll("left")}catch(X){K(g,1);return}s()};g()}}v(N,"load",s)}function G(Y,X){if(W){Y.call(X);return}J.push(function(){Y.call(X)})}function m(){var Z=parent;if(I!==""){for(var X=0,Y=I.split(".");X<Y.length;X++){Z=Z[Y[X]]}}return Z.easyXDM}function e(X){N.easyXDM=M;I=X;if(I){U="easyXDM_"+I.replace(".","_")+"_"}return o}function z(X){return X.match(Q)[3]}function f(X){return X.match(Q)[4]||""}function j(Z){var X=Z.toLowerCase().match(Q);var aa=X[2],ab=X[3],Y=X[4]||"";if((aa=="http:"&&Y==":80")||(aa=="https:"&&Y==":443")){Y=""}return aa+"//"+ab+Y}function B(X){X=X.replace(F,"$1/");if(!X.match(/^(http||https):\/\//)){var Y=(X.substring(0,1)==="/")?"":p.pathname;if(Y.substring(Y.length-1)!=="/"){Y=Y.substring(0,Y.lastIndexOf("/")+1)}X=p.protocol+"//"+p.host+Y+X}while(R.test(X)){X=X.replace(R,"")}return X}function P(X,aa){var ac="",Z=X.indexOf("#");if(Z!==-1){ac=X.substring(Z);X=X.substring(0,Z)}var ab=[];for(var Y in aa){if(aa.hasOwnProperty(Y)){ab.push(Y+"="+H(aa[Y]))}}return X+(y?"#":(X.indexOf("?")==-1?"?":"&"))+ab.join("&")+ac}var S=(function(X){X=X.substring(1).split("&");var Z={},aa,Y=X.length;while(Y--){aa=X[Y].split("=");Z[aa[0]]=k(aa[1])}return Z}(/xdm_e=/.test(p.search)?p.search:p.hash));function t(X){return typeof X==="undefined"}var O=function(){var Y={};var Z={a:[1,2,3]},X='{"a":[1,2,3]}';if(typeof JSON!="undefined"&&typeof JSON.stringify==="function"&&JSON.stringify(Z).replace((/\s/g),"")===X){return JSON}if(Object.toJSON){if(Object.toJSON(Z).replace((/\s/g),"")===X){Y.stringify=Object.toJSON}}if(typeof String.prototype.evalJSON==="function"){Z=X.evalJSON();if(Z.a&&Z.a.length===3&&Z.a[2]===3){Y.parse=function(aa){return aa.evalJSON()}}}if(Y.stringify&&Y.parse){O=function(){return Y};return Y}return null};function T(X,Y,Z){var ab;for(var aa in Y){if(Y.hasOwnProperty(aa)){if(aa in X){ab=Y[aa];if(typeof ab==="object"){T(X[aa],ab,Z)}else{if(!Z){X[aa]=Y[aa]}}}else{X[aa]=Y[aa]}}}return X}function a(){var Y=d.body.appendChild(d.createElement("form")),X=Y.appendChild(d.createElement("input"));X.name=U+"TEST"+n;E=X!==Y.elements[X.name];d.body.removeChild(Y)}function A(Y){if(t(E)){a()}var ac;if(E){ac=d.createElement('<iframe name="'+Y.props.name+'"/>')}else{ac=d.createElement("IFRAME");ac.name=Y.props.name}ac.id=ac.name=Y.props.name;delete Y.props.name;if(typeof Y.container=="string"){Y.container=d.getElementById(Y.container)}if(!Y.container){T(ac.style,{position:"absolute",top:"-2000px",left:"0px"});Y.container=d.body}var ab=Y.props.src;Y.props.src="javascript:false";T(ac,Y.props);ac.border=ac.frameBorder=0;ac.allowTransparency=true;Y.container.appendChild(ac);if(Y.onLoad){v(ac,"load",Y.onLoad)}if(Y.usePost){var aa=Y.container.appendChild(d.createElement("form")),X;aa.target=ac.name;aa.action=ab;aa.method="POST";if(typeof(Y.usePost)==="object"){for(var Z in Y.usePost){if(Y.usePost.hasOwnProperty(Z)){if(E){X=d.createElement('<input name="'+Z+'"/>')}else{X=d.createElement("INPUT");X.name=Z}X.value=Y.usePost[Z];aa.appendChild(X)}}}aa.submit();aa.parentNode.removeChild(aa)}else{ac.src=ab}Y.props.src=ab;return ac}function V(aa,Z){if(typeof aa=="string"){aa=[aa]}var Y,X=aa.length;while(X--){Y=aa[X];Y=new RegExp(Y.substr(0,1)=="^"?Y:("^"+Y.replace(/(\*)/g,".$1").replace(/\?/g,".")+"$"));if(Y.test(Z)){return true}}return false}function l(Z){var ae=Z.protocol,Y;Z.isHost=Z.isHost||t(S.xdm_p);y=Z.hash||false;if(!Z.props){Z.props={}}if(!Z.isHost){Z.channel=S.xdm_c.replace(/["'<>\\]/g,"");Z.secret=S.xdm_s;Z.remote=S.xdm_e.replace(/["'<>\\]/g,"");ae=S.xdm_p;if(Z.acl&&!V(Z.acl,Z.remote)){throw new Error("Access denied for "+Z.remote)}}else{Z.remote=B(Z.remote);Z.channel=Z.channel||"default"+n++;Z.secret=Math.random().toString(16).substring(2);if(t(ae)){if(j(p.href)==j(Z.remote)){ae="4"}else{if(C(N,"postMessage")||C(d,"postMessage")){ae="1"}else{if(Z.swf&&C(N,"ActiveXObject")&&c()){ae="6"}else{if(navigator.product==="Gecko"&&"frameElement" in N&&navigator.userAgent.indexOf("WebKit")==-1){ae="5"}else{if(Z.remoteHelper){ae="2"}else{ae="0"}}}}}}}Z.protocol=ae;switch(ae){case"0":T(Z,{interval:100,delay:2000,useResize:true,useParent:false,usePolling:false},true);if(Z.isHost){if(!Z.local){var ac=p.protocol+"//"+p.host,X=d.body.getElementsByTagName("img"),ad;var aa=X.length;while(aa--){ad=X[aa];if(ad.src.substring(0,ac.length)===ac){Z.local=ad.src;break}}if(!Z.local){Z.local=N}}var ab={xdm_c:Z.channel,xdm_p:0};if(Z.local===N){Z.usePolling=true;Z.useParent=true;Z.local=p.protocol+"//"+p.host+p.pathname+p.search;ab.xdm_e=Z.local;ab.xdm_pa=1}else{ab.xdm_e=B(Z.local)}if(Z.container){Z.useResize=false;ab.xdm_po=1}Z.remote=P(Z.remote,ab)}else{T(Z,{channel:S.xdm_c,remote:S.xdm_e,useParent:!t(S.xdm_pa),usePolling:!t(S.xdm_po),useResize:Z.useParent?false:Z.useResize})}Y=[new o.stack.HashTransport(Z),new o.stack.ReliableBehavior({}),new o.stack.QueueBehavior({encode:true,maxLength:4000-Z.remote.length}),new o.stack.VerifyBehavior({initiate:Z.isHost})];break;case"1":Y=[new o.stack.PostMessageTransport(Z)];break;case"2":if(Z.isHost){Z.remoteHelper=B(Z.remoteHelper)}Y=[new o.stack.NameTransport(Z),new o.stack.QueueBehavior(),new o.stack.VerifyBehavior({initiate:Z.isHost})];break;case"3":Y=[new o.stack.NixTransport(Z)];break;case"4":Y=[new o.stack.SameOriginTransport(Z)];break;case"5":Y=[new o.stack.FrameElementTransport(Z)];break;case"6":if(!i){c()}Y=[new o.stack.FlashTransport(Z)];break}Y.push(new o.stack.QueueBehavior({lazy:Z.lazy,remove:true}));return Y}function D(aa){var ab,Z={incoming:function(ad,ac){this.up.incoming(ad,ac)},outgoing:function(ac,ad){this.down.outgoing(ac,ad)},callback:function(ac){this.up.callback(ac)},init:function(){this.down.init()},destroy:function(){this.down.destroy()}};for(var Y=0,X=aa.length;Y<X;Y++){ab=aa[Y];T(ab,Z,true);if(Y!==0){ab.down=aa[Y-1]}if(Y!==X-1){ab.up=aa[Y+1]}}return ab}function w(X){X.up.down=X.down;X.down.up=X.up;X.up=X.down=null}T(o,{version:"2.4.19.3",query:S,stack:{},apply:T,getJSONObject:O,whenReady:G,noConflict:e});o.DomHelper={on:v,un:x,requiresJSON:function(X){if(!u(N,"JSON")){d.write('<script type="text/javascript" src="'+X+'"><\/script>')}}};(function(){var X={};o.Fn={set:function(Y,Z){X[Y]=Z},get:function(Z,Y){if(!X.hasOwnProperty(Z)){return}var aa=X[Z];if(Y){delete X[Z]}return aa}}}());o.Socket=function(Y){var X=D(l(Y).concat([{incoming:function(ab,aa){Y.onMessage(ab,aa)},callback:function(aa){if(Y.onReady){Y.onReady(aa)}}}])),Z=j(Y.remote);this.origin=j(Y.remote);this.destroy=function(){X.destroy()};this.postMessage=function(aa){X.outgoing(aa,Z)};X.init()};o.Rpc=function(Z,Y){if(Y.local){for(var ab in Y.local){if(Y.local.hasOwnProperty(ab)){var aa=Y.local[ab];if(typeof aa==="function"){Y.local[ab]={method:aa}}}}}var X=D(l(Z).concat([new o.stack.RpcBehavior(this,Y),{callback:function(ac){if(Z.onReady){Z.onReady(ac)}}}]));this.origin=j(Z.remote);this.destroy=function(){X.destroy()};X.init()};o.stack.SameOriginTransport=function(Y){var Z,ab,aa,X;return(Z={outgoing:function(ad,ae,ac){aa(ad);if(ac){ac()}},destroy:function(){if(ab){ab.parentNode.removeChild(ab);ab=null}},onDOMReady:function(){X=j(Y.remote);if(Y.isHost){T(Y.props,{src:P(Y.remote,{xdm_e:p.protocol+"//"+p.host+p.pathname,xdm_c:Y.channel,xdm_p:4}),name:U+Y.channel+"_provider"});ab=A(Y);o.Fn.set(Y.channel,function(ac){aa=ac;K(function(){Z.up.callback(true)},0);return function(ad){Z.up.incoming(ad,X)}})}else{aa=m().Fn.get(Y.channel,true)(function(ac){Z.up.incoming(ac,X)});K(function(){Z.up.callback(true)},0)}},init:function(){G(Z.onDOMReady,Z)}})};o.stack.FlashTransport=function(aa){var ac,X,ab,ad,Y,ae;function af(ah,ag){K(function(){ac.up.incoming(ah,ad)},0)}function Z(ah){var ag=aa.swf+"?host="+aa.isHost;var aj="easyXDM_swf_"+Math.floor(Math.random()*10000);o.Fn.set("flash_loaded"+ah.replace(/[\-.]/g,"_"),function(){o.stack.FlashTransport[ah].swf=Y=ae.firstChild;var ak=o.stack.FlashTransport[ah].queue;for(var al=0;al<ak.length;al++){ak[al]()}ak.length=0});if(aa.swfContainer){ae=(typeof aa.swfContainer=="string")?d.getElementById(aa.swfContainer):aa.swfContainer}else{ae=d.createElement("div");T(ae.style,h&&aa.swfNoThrottle?{height:"20px",width:"20px",position:"fixed",right:0,top:0}:{height:"1px",width:"1px",position:"absolute",overflow:"hidden",right:0,top:0});d.body.appendChild(ae)}var ai="callback=flash_loaded"+H(ah.replace(/[\-.]/g,"_"))+"&proto="+b.location.protocol+"&domain="+H(z(b.location.href))+"&port="+H(f(b.location.href))+"&ns="+H(I);ae.innerHTML="<object height='20' width='20' type='application/x-shockwave-flash' id='"+aj+"' data='"+ag+"'><param name='allowScriptAccess' value='always'></param><param name='wmode' value='transparent'><param name='movie' value='"+ag+"'></param><param name='flashvars' value='"+ai+"'></param><embed type='application/x-shockwave-flash' FlashVars='"+ai+"' allowScriptAccess='always' wmode='transparent' src='"+ag+"' height='1' width='1'></embed></object>"}return(ac={outgoing:function(ah,ai,ag){Y.postMessage(aa.channel,ah.toString());if(ag){ag()}},destroy:function(){try{Y.destroyChannel(aa.channel)}catch(ag){}Y=null;if(X){X.parentNode.removeChild(X);X=null}},onDOMReady:function(){ad=aa.remote;o.Fn.set("flash_"+aa.channel+"_init",function(){K(function(){ac.up.callback(true)})});o.Fn.set("flash_"+aa.channel+"_onMessage",af);aa.swf=B(aa.swf);var ah=z(aa.swf);var ag=function(){o.stack.FlashTransport[ah].init=true;Y=o.stack.FlashTransport[ah].swf;Y.createChannel(aa.channel,aa.secret,j(aa.remote),aa.isHost);if(aa.isHost){if(h&&aa.swfNoThrottle){T(aa.props,{position:"fixed",right:0,top:0,height:"20px",width:"20px"})}T(aa.props,{src:P(aa.remote,{xdm_e:j(p.href),xdm_c:aa.channel,xdm_p:6,xdm_s:aa.secret}),name:U+aa.channel+"_provider"});X=A(aa)}};if(o.stack.FlashTransport[ah]&&o.stack.FlashTransport[ah].init){ag()}else{if(!o.stack.FlashTransport[ah]){o.stack.FlashTransport[ah]={queue:[ag]};Z(ah)}else{o.stack.FlashTransport[ah].queue.push(ag)}}},init:function(){G(ac.onDOMReady,ac)}})};o.stack.PostMessageTransport=function(aa){var ac,ad,Y,Z;function X(ae){if(ae.origin){return j(ae.origin)}if(ae.uri){return j(ae.uri)}if(ae.domain){return p.protocol+"//"+ae.domain}throw"Unable to retrieve the origin of the event"}function ab(af){var ae=X(af);if(ae==Z&&af.data.substring(0,aa.channel.length+1)==aa.channel+" "){ac.up.incoming(af.data.substring(aa.channel.length+1),ae)}}return(ac={outgoing:function(af,ag,ae){Y.postMessage(aa.channel+" "+af,ag||Z);if(ae){ae()}},destroy:function(){x(N,"message",ab);if(ad){Y=null;ad.parentNode.removeChild(ad);ad=null}},onDOMReady:function(){Z=j(aa.remote);if(aa.isHost){var ae=function(af){if(af.data==aa.channel+"-ready"){Y=("postMessage" in ad.contentWindow)?ad.contentWindow:ad.contentWindow.document;x(N,"message",ae);v(N,"message",ab);K(function(){ac.up.callback(true)},0)}};v(N,"message",ae);T(aa.props,{src:P(aa.remote,{xdm_e:j(p.href),xdm_c:aa.channel,xdm_p:1}),name:U+aa.channel+"_provider"});ad=A(aa)}else{v(N,"message",ab);Y=("postMessage" in N.parent)?N.parent:N.parent.document;Y.postMessage(aa.channel+"-ready",Z);K(function(){ac.up.callback(true)},0)}},init:function(){G(ac.onDOMReady,ac)}})};o.stack.FrameElementTransport=function(Y){var Z,ab,aa,X;return(Z={outgoing:function(ad,ae,ac){aa.call(this,ad);if(ac){ac()}},destroy:function(){if(ab){ab.parentNode.removeChild(ab);ab=null}},onDOMReady:function(){X=j(Y.remote);if(Y.isHost){T(Y.props,{src:P(Y.remote,{xdm_e:j(p.href),xdm_c:Y.channel,xdm_p:5}),name:U+Y.channel+"_provider"});ab=A(Y);ab.fn=function(ac){delete ab.fn;aa=ac;K(function(){Z.up.callback(true)},0);return function(ad){Z.up.incoming(ad,X)}}}else{if(d.referrer&&j(d.referrer)!=S.xdm_e){N.top.location=S.xdm_e}aa=N.frameElement.fn(function(ac){Z.up.incoming(ac,X)});Z.up.callback(true)}},init:function(){G(Z.onDOMReady,Z)}})};o.stack.NameTransport=function(ab){var ac;var ae,ai,aa,ag,ah,Y,X;function af(al){var ak=ab.remoteHelper+(ae?"#_3":"#_2")+ab.channel;ai.contentWindow.sendMessage(al,ak)}function ad(){if(ae){if(++ag===2||!ae){ac.up.callback(true)}}else{af("ready");ac.up.callback(true)}}function aj(ak){ac.up.incoming(ak,Y)}function Z(){if(ah){K(function(){ah(true)},0)}}return(ac={outgoing:function(al,am,ak){ah=ak;af(al)},destroy:function(){ai.parentNode.removeChild(ai);ai=null;if(ae){aa.parentNode.removeChild(aa);aa=null}},onDOMReady:function(){ae=ab.isHost;ag=0;Y=j(ab.remote);ab.local=B(ab.local);if(ae){o.Fn.set(ab.channel,function(al){if(ae&&al==="ready"){o.Fn.set(ab.channel,aj);ad()}});X=P(ab.remote,{xdm_e:ab.local,xdm_c:ab.channel,xdm_p:2});T(ab.props,{src:X+"#"+ab.channel,name:U+ab.channel+"_provider"});aa=A(ab)}else{ab.remoteHelper=ab.remote;o.Fn.set(ab.channel,aj)}var ak=function(){var al=ai||this;x(al,"load",ak);o.Fn.set(ab.channel+"_load",Z);(function am(){if(typeof al.contentWindow.sendMessage=="function"){ad()}else{K(am,50)}}())};ai=A({props:{src:ab.local+"#_4"+ab.channel},onLoad:ak})},init:function(){G(ac.onDOMReady,ac)}})};o.stack.HashTransport=function(Z){var ac;var ah=this,af,aa,X,ad,am,ab,al;var ag,Y;function ak(ao){if(!al){return}var an=Z.remote+"#"+(am++)+"_"+ao;((af||!ag)?al.contentWindow:al).location=an}function ae(an){ad=an;ac.up.incoming(ad.substring(ad.indexOf("_")+1),Y)}function aj(){if(!ab){return}var an=ab.location.href,ap="",ao=an.indexOf("#");if(ao!=-1){ap=an.substring(ao)}if(ap&&ap!=ad){ae(ap)}}function ai(){aa=setInterval(aj,X)}return(ac={outgoing:function(an,ao){ak(an)},destroy:function(){N.clearInterval(aa);if(af||!ag){al.parentNode.removeChild(al)}al=null},onDOMReady:function(){af=Z.isHost;X=Z.interval;ad="#"+Z.channel;am=0;ag=Z.useParent;Y=j(Z.remote);if(af){T(Z.props,{src:Z.remote,name:U+Z.channel+"_provider"});if(ag){Z.onLoad=function(){ab=N;ai();ac.up.callback(true)}}else{var ap=0,an=Z.delay/50;(function ao(){if(++ap>an){throw new Error("Unable to reference listenerwindow")}try{ab=al.contentWindow.frames[U+Z.channel+"_consumer"]}catch(aq){}if(ab){ai();ac.up.callback(true)}else{K(ao,50)}}())}al=A(Z)}else{ab=N;ai();if(ag){al=parent;ac.up.callback(true)}else{T(Z,{props:{src:Z.remote+"#"+Z.channel+new Date(),name:U+Z.channel+"_consumer"},onLoad:function(){ac.up.callback(true)}});al=A(Z)}}},init:function(){G(ac.onDOMReady,ac)}})};o.stack.ReliableBehavior=function(Y){var aa,ac;var ab=0,X=0,Z="";return(aa={incoming:function(af,ad){var ae=af.indexOf("_"),ag=af.substring(0,ae).split(",");af=af.substring(ae+1);if(ag[0]==ab){Z="";if(ac){ac(true)}}if(af.length>0){aa.down.outgoing(ag[1]+","+ab+"_"+Z,ad);if(X!=ag[1]){X=ag[1];aa.up.incoming(af,ad)}}},outgoing:function(af,ad,ae){Z=af;ac=ae;aa.down.outgoing(X+","+(++ab)+"_"+af,ad)}})};o.stack.QueueBehavior=function(Z){var ac,ad=[],ag=true,aa="",af,X=0,Y=false,ab=false;function ae(){if(Z.remove&&ad.length===0){w(ac);return}if(ag||ad.length===0||af){return}ag=true;var ah=ad.shift();ac.down.outgoing(ah.data,ah.origin,function(ai){ag=false;if(ah.callback){K(function(){ah.callback(ai)},0)}ae()})}return(ac={init:function(){if(t(Z)){Z={}}if(Z.maxLength){X=Z.maxLength;ab=true}if(Z.lazy){Y=true}else{ac.down.init()}},callback:function(ai){ag=false;var ah=ac.up;ae();ah.callback(ai)},incoming:function(ak,ai){if(ab){var aj=ak.indexOf("_"),ah=parseInt(ak.substring(0,aj),10);aa+=ak.substring(aj+1);if(ah===0){if(Z.encode){aa=k(aa)}ac.up.incoming(aa,ai);aa=""}}else{ac.up.incoming(ak,ai)}},outgoing:function(al,ai,ak){if(Z.encode){al=H(al)}var ah=[],aj;if(ab){while(al.length!==0){aj=al.substring(0,X);al=al.substring(aj.length);ah.push(aj)}while((aj=ah.shift())){ad.push({data:ah.length+"_"+aj,origin:ai,callback:ah.length===0?ak:null})}}else{ad.push({data:al,origin:ai,callback:ak})}if(Y){ac.down.init()}else{ae()}},destroy:function(){af=true;ac.down.destroy()}})};o.stack.VerifyBehavior=function(ab){var ac,aa,Y,Z=false;function X(){aa=Math.random().toString(16).substring(2);ac.down.outgoing(aa)}return(ac={incoming:function(af,ad){var ae=af.indexOf("_");if(ae===-1){if(af===aa){ac.up.callback(true)}else{if(!Y){Y=af;if(!ab.initiate){X()}ac.down.outgoing(af)}}}else{if(af.substring(0,ae)===Y){ac.up.incoming(af.substring(ae+1),ad)}}},outgoing:function(af,ad,ae){ac.down.outgoing(aa+"_"+af,ad,ae)},callback:function(ad){if(ab.initiate){X()}}})};o.stack.RpcBehavior=function(ad,Y){var aa,af=Y.serializer||O();var ae=0,ac={};function X(ag){ag.jsonrpc="2.0";aa.down.outgoing(af.stringify(ag))}function ab(ag,ai){var ah=Array.prototype.slice;return function(){var aj=arguments.length,al,ak={method:ai};if(aj>0&&typeof arguments[aj-1]==="function"){if(aj>1&&typeof arguments[aj-2]==="function"){al={success:arguments[aj-2],error:arguments[aj-1]};ak.params=ah.call(arguments,0,aj-2)}else{al={success:arguments[aj-1]};ak.params=ah.call(arguments,0,aj-1)}ac[""+(++ae)]=al;ak.id=ae}else{ak.params=ah.call(arguments,0)}if(ag.namedParams&&ak.params.length===1){ak.params=ak.params[0]}X(ak)}}function Z(an,am,ai,al){if(!ai){if(am){X({id:am,error:{code:-32601,message:"Procedure not found."}})}return}var ak,ah;if(am){ak=function(ao){ak=q;X({id:am,result:ao})};ah=function(ao,ap){ah=q;var aq={id:am,error:{code:-32099,message:ao}};if(ap){aq.error.data=ap}X(aq)}}else{ak=ah=q}if(!r(al)){al=[al]}try{var ag=ai.method.apply(ai.scope,al.concat([ak,ah]));if(!t(ag)){ak(ag)}}catch(aj){ah(aj.message)}}return(aa={incoming:function(ah,ag){var ai=af.parse(ah);if(ai.method){if(Y.handle){Y.handle(ai,X)}else{Z(ai.method,ai.id,Y.local[ai.method],ai.params)}}else{var aj=ac[ai.id];if(ai.error){if(aj.error){aj.error(ai.error)}}else{if(aj.success){aj.success(ai.result)}}delete ac[ai.id]}},init:function(){if(Y.remote){for(var ag in Y.remote){if(Y.remote.hasOwnProperty(ag)){ad[ag]=ab(Y.remote[ag],ag)}}}aa.down.init()},destroy:function(){for(var ag in Y.remote){if(Y.remote.hasOwnProperty(ag)&&ad.hasOwnProperty(ag)){delete ad[ag]}}aa.down.destroy()}})};b.easyXDM=o})(window,document,location,window.setTimeout,decodeURIComponent,encodeURIComponent);
    },

    get: function(xhrhost, url, data, success, complete) {
        this.send(xhrhost, url, 'GET', data, success, complete);
    },

    post: function(xhrhost, url, data, success, complete) {
        if (Cackle.auth && Cackle.auth.provider == 'sso' && /Safari/.test(navigator.userAgent) && /Apple/.test(navigator.vendor)) {
            var p3pCookie = Cackle.getCookie('mc-sso-p3p');
            if (p3pCookie) {
                this.postP3P(p3pCookie, url, data, success, complete);
                return;
            }
        }
        this.doPost(url, data, success, complete);
    },

    //In iOS (Safari) SSO auth don't set cookie according P3P policy
    //This is workaround for set cookie into window.popup
    postP3P: function(p3pCookie, url, data, success, complete) {
        var handler = this,
            p3pJson = JSON.parse(p3pCookie),
            win = Cackle.Fastjs.popup(p3pJson.url, 1, 1, p3pJson.params, 1000000, 1000000);

        function check() {
            if (!win || win.closed != false) {
                Cackle.Cookie.erase('mc-sso-p3p');
                handler.doPost(url, data, success, complete);
            } else {
                setTimeout(check, 10);
            }
        }
        setTimeout(check, 10);
    },

    doPost: function(url, data, success, complete) {
        url = url.replace(/https?.*cackle.me/, Cackle.origin);
        this.send(Cackle.origin, url, 'POST', data, success, complete);
    },

    send: function(xhrhost, url, type, data, success, complete) {
        if (data) {
            for (d in data) {
                if (data.hasOwnProperty(d)) {
                    var val = data[d];
                    if (typeof val == 'string') {
                        data[d] = this.escape(val);
                    }
                }
            }
        }
        this.xhr(xhrhost).request({url: url, method: type, headers: {'Accept': 'application/json;'}, data: data},
            function(res) {
                if (success) {
                    if (res.data) {
                        var json;
                        try { json = JSON.parse(res.data); } catch (e) {}
                        success(json || res.data);
                    } else {
                        success();
                    }
                }
                if (complete) complete();
            }, function(res) {
                if (complete) complete();
            }
        );
    },

    escape: function(str) {
        var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            meta = {'\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"' : '\\"', '\\': '\\\\'};

        escapable.lastIndex = 0;
        return escapable.test(str) ?
            str.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) : str;
    },

    stringify: function (obj) {
        var t = typeof (obj);
        if (t != "object" || obj === null) {
            if (t == "string"){obj = '"'+obj+'"';}
            return String(obj);
        }
        else {
            var n, v, json = [], arr = (obj && obj.constructor == Array);
            for (n in obj) {
                if (obj.hasOwnProperty(n)) {
                    v = obj[n]; t = typeof(v);
                    if (t == "string"){v = '"'+v+'"';}else if (t == "object" && v !== null){v = this.stringify(v);}
                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    }
};var Cackle=Cackle||{};
Cackle.Cookie=Cackle.Cookie||{create:function(b,d,e){var c=b+"="+encodeURIComponent(d);
if(e){var a=new Date();
a.setTime(a.getTime()+(e*24*60*60*1000));
c+=";expires="+a.toGMTString()
}if(window.mcXDCookie){c+=";domain="+this.getXDomain()
}c+=";path=/";
document.cookie=c
},getXDomain:function(){var b=window.location.hostname.split("."),a=b.length;
if(a>1){return"."+b[a-2]+"."+b[a-1]
}else{return""
}},read:function(b){var e=b+"=",a=document.cookie.split(";");
for(var d=0;
d<a.length;
d+=1){var f=a[d];
while(f.charAt(0)===" "){f=f.substring(1,f.length)
}if(f.indexOf(e)===0){return decodeURIComponent(f.substring(e.length,f.length))
}}return null
},erase:function(a){this.create(a,"",-1)
}};var Cackle=Cackle||{};
Cackle.Storage=Cackle.Storage||{storage:null,init:function(){var a=false;
if("localStorage" in window){try{window.localStorage.setItem("_tmptest","tmpval");
a=true;
window.localStorage.removeItem("_tmptest")
}catch(d){}}if(a){try{if(window.localStorage){this.storage=window.localStorage
}}catch(c){}}else{if("globalStorage" in window){try{if(window.globalStorage){if(window.location.hostname=="localhost"){this.storage=window.globalStorage["localhost.localdomain"]
}else{this.storage=window.globalStorage[window.location.hostname]
}}}catch(b){}}else{if(Cackle.Cookie){this.storage={setItem:function(e,f){Cackle.Cookie.create(e,f,365)
},getItem:function(e){return Cackle.Cookie.read(e)
},removeItem:function(e){Cackle.Cookie.erase(e)
}}
}}}},set:function(a,b){var c=JSON.stringify(b);
this.storage.setItem(a,c)
},get:function(a){var c=this.storage.getItem(a);
try{return JSON.parse(c)
}catch(b){return c
}},remove:function(a){this.storage.removeItem(a)
}};
Cackle.Storage.init();Cackle.Login2=Cackle.Login2||{prov:{googleplus:{name:"Google+",url:"/signin/proxy?provider=googleplus&scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email"},yahoo:{name:"Yahoo",url:"/signin/proxy?openid_identifier=http://me.yahoo.com/"},yandex:{name:"Яндекс",url:"/signin/proxy?provider=yandex"},vkontakte:{name:"Вконтакте",url:"/signin/proxy?provider=vkontakte&scope=wall,offline,notify,email"},facebook:{name:"Facebook",url:"/signin/proxy?provider=facebook&scope=email"},twitter:{name:"Twitter",url:"/signin/proxy?provider=twitter"},linkedin:{name:"Linkedin",url:"/signin/proxy?provider=linkedin&scope=r_basicprofile,r_emailaddress"},mymailru:{name:"Мой Мир",url:"/signin/proxy?provider=mymailru&scope=stream"},odnoklassniki:{name:"OK",url:"/signin/proxy?provider=odnoklassniki&scope=VALUABLE%20ACCESS"},"500px":{name:"500px",url:"/signin/proxy?provider=500px"},dropbox:{name:"Dropbox",url:"/signin/proxy?provider=dropbox"},foursquare:{name:"Foursquare",url:"/signin/proxy?provider=foursquare"},instagram:{name:"Instagram",url:"/signin/proxy?provider=instagram&scope=basic"},live:{name:"Live",url:"/signin/proxy?provider=live&scope=wl.basic,wl.emails"},stackoverflow:{name:"Stackoverflow",url:"/signin/proxy?provider=stackoverflow"},yammer:{name:"Yammer",url:"/signin/proxy?provider=yammer"},tumblr:{name:"Tumblr",url:"/signin/proxy?provider=tumblr"},soundcloud:{name:"Soundcloud",url:"/signin/proxy?provider=soundcloud"},livejournal:{name:"Живой Журнал",url:"/signin/livejournal"},wordpress:{name:"WordPress",url:"/signin/wordpress"},cackle:{name:"Cackle",url:"/account/signin?returnUrl=/login/success"}},timeout:100,popupSize:{width:670,height:520},temp:'<div class="mc-authbox">{{?it.conf.anonym != false}}<div class="mc-grid">{{?it.conf.guestFirst == true}}<div class="mc-auth-anonym mc-grid-lg"><div class="mc-h6">{{=it.msg.anonym2}}</div>{{=it.anonym}}</div><div class="mc-auth-social mc-grid-lg"><div class="mc-h6">{{=it.msg.social2}}</div><div class="mc-authsoc">{{=it.soc}}</div></div>{{??}}<div class="mc-auth-social mc-grid-lg"><div class="mc-h6">{{=it.msg.social}}</div><div class="mc-authsoc">{{=it.soc}}</div></div><div class="mc-auth-anonym mc-grid-lg"><div class="mc-h6">{{=it.msg.anonym}}</div>{{=it.anonym}}</div>{{?}}</div>{{??}}<div class="mc-auth-social"><div class="mc-h6">{{=it.msg.social}}</div><div class="mc-authsoc">{{=it.soc}}</div></div>{{?}}</div>',anonym:'<div class="mc-p"><a href="//gravatar.com" class="mc-avatar-wrap" target="_blank" title="{{=it.msg.grava}}"><img src="{{=it.conf.avatar}}" class="mc-anonym-avatar"></a><input type="text" class="mc-anonym-name" placeholder="{{=it.msg.name}}"/></div>{{?it.conf.anonymExpand}}<div class="mc-hide">{{?}}{{?it.conf.guestHideEmail != true}}<div class="mc-p"><input type="text" class="mc-anonym-email" placeholder="Email"/></div>{{?}}<div class="mc-captcha"></div><div class="mc-p"><button class="mc-btn2 mc-btn2-sm mc-btn2-bck mc-anonym-login">{{=it.msg.alogin}}</button></div>{{?it.conf.anonymExpand}}</div>{{?}}',soctemp:'{{~it.provs :p}}{{?p && Cackle.Login2.prov[p]}}<a href="#" class="mc-auth-btn" data-provider="{{=p}}" title="{{=Cackle.Login2.prov[p].name}}"><div class="mc-{{=p}}"></div></a>{{?}}{{~}}',captcha:'<div class="g-recaptcha" data-sitekey="{{=it.key}}" data-callback="{{=it.cb}}" data-theme="{{=it.tm}}" data-size="compact"></div>',render:function(a,b){return(doT.template(Cackle.Login2[a]))(b)
},authorize:function(c,a){var d=this,b=c.host+"/login/"+c.id+"/authorize.json",e={};
if(c.chanId>0){e.chanId=c.chanId
}Cackle.PostMessage.get(c.host,b,e,function(f){d.authorizecb(c,f.authorizeResponse,a)
})
},authorizecb:function(b,c,a){if(b.provTrust||this.isProviderCorrect(b,c.auth)){Cackle.auth=Cackle.Login2.auth=c.auth;
Cackle.Fastjs.cbs(b,"loggedin",c.auth);
b.action&&b.action(c.auth);
if(b.logcb){if(b.redirect){this.post(b.redirect,{name:"token",value:c.token})
}if(b.callbackjs){this.execfun(b.callbackjs,[c.token,c.auth])
}}}a&&a()
},post:function(b,d){var c=document.createElement("form");
c.action=decodeURIComponent(b.match("^https?://")?b:"http://"+b);
c.method="post";
c.target="_top";
c.style.display="none";
var a=document.createElement("input");
a.type="hidden";
a.name=d.name;
a.value=d.value;
c.appendChild(a);
document.body.appendChild(c);
c.submit()
},execfun:function(a,c){try{window[a](c[0],c[1],c[2],c[3],c[4])
}catch(b){try{a(c[0],c[1],c[2],c[3],c[4])
}catch(b){}}},logout:function(b){var c=b?b.host:Cackle.origin,a=c+"/login/logout.json";
Cackle.PostMessage.get(c,a,null,function(){Cackle.auth=Cackle.Login2.auth=null;
if(b){Cackle.Fastjs.cbs(b,"logout")
}})
},isAuthorized:function(){return Cackle.Login2.auth&&Cackle.Login2.auth.id
},isProviderCorrect:function(a,d){if(a.widget=="comment"&&this.isModerator(d)){return true
}else{var c=a.providers,b=d.provider;
if(c){return b=="guest"||b=="sso"||Cackle.Fastjs.inArray(c,b)>-1
}}return false
},isModerator:function(b){var a=b||Cackle.Login2.auth;
return a&&a.moderator
},init:function(a,c){var d=this,e=c.querySelectorAll("[data-provider]");
if(a.ssoProvider){Cackle.Fastjs.prepend(c,this.renderSSO(a))
}for(var b=0;
b<e.length;
b++){Cackle.Fastjs.on(e[b],"click",function(f){d.login(a,this.getAttribute("data-provider"));
return false
})
}},renderSSO:function(c){var f=this,e=c.ssoProvider,a=Cackle.Fastjs.create(c.ssoEl||"li","mc-sso-provider",e.name),b=Cackle.Fastjs.create("img"),d="";
b.src=e.logo;
a.appendChild(b);
if(e.width){d+="width:"+e.width+"px!important;"
}if(e.height){d+="height:"+e.height+"px!important;"
}if(d){a.setAttribute("style",d);
b.setAttribute("style",d)
}Cackle.Fastjs.on(a,"click",function(g){f.loginPopup(c,e.url,{},f.popupSize,true);
return false
});
return a
},login:function(c,b){var d=Cackle.Login2.prov[b],a=Cackle.origin+d.url,e={};
if(c.verifyEmail){e.verifyUrl="/widget/"+c.id+"/verify"
}this.loginPopup(c,a,e,this.popupSize)
},loginPopup:function(b,a,f,c,d){var e=Cackle.Fastjs.popup(a,c.width,c.height,f);
this.checkConnection(b,e,d)
},checkConnection:function(b,e,d){var c=this;
function a(){if(!e||e.closed!=false){var f=Cackle.Cookie.read("mc-sso-auth");
if(f){Cackle.Cookie.create("mc-sso-auth","");
if("success"==f){window.location.reload()
}}else{if(d){window.location.reload()
}else{c.authorize(b)
}}}else{setTimeout(a,c.timeout)
}}setTimeout(a,c.timeout)
},safari:function(){return/Safari/.test(navigator.userAgent)&&/Apple/.test(navigator.vendor)
},ANONYM:{init:function(e,f){var g=this,d=f.querySelector(".mc-anonym-email"),a=f.querySelector(".mc-anonym-login"),c=f.querySelector(".mc-captcha");
if(e.captchaPub&&!c.innerHTML){var h=document.querySelector(".mc-captcha .g-recaptcha");
if(h){c.innerHTML="";
c.appendChild(h)
}else{Cackle.Lib.loadJs("https://www.google.com/recaptcha/api.js",function(){var i=Cackle.Fastjs.afun(function(j){g.captcha=j
});
c.innerHTML=(doT.template(Cackle.Login2.captcha))({key:e.captchaPub,cb:i,tm:e.theme=="black"?"dark":"light"})
})
}}if(e.anonymExpand){var b=f.querySelector(".mc-anonym-name");
Cackle.Fastjs.on(b,"click",function(){var i=document.querySelector(".mc-captcha .g-recaptcha");
if(i){c.innerHTML="";
c.appendChild(i)
}Cackle.Fastjs.addcl(f,"mc-expanded")
})
}Cackle.Fastjs.on(d,"keyup",function(){g.setav(e,f,this.value)
});
Cackle.Fastjs.on(a,"click",function(){g.login(e,f)
})
},setav:function(b,c,e){var a=c.querySelector(".mc-anonym-avatar"),d=b.avatar;
if(window.md5){d="//gravatar.com/avatar/"+md5(e)+"?d="+b.avatar+"&r=PG&s="+30
}a.setAttribute("src",Cackle.Base.validEmail(e)?d:b.avatar)
},login:function(d,e){var c=e.querySelector(".mc-anonym-name"),b=e.querySelector(".mc-anonym-email"),a=e.querySelector(".mc-anonym-avatar");
Cackle.Fastjs.remcl(c,"mc-error");
Cackle.Fastjs.remcl(b,"mc-error");
if(c&&!c.value){Cackle.Fastjs.addcl(c,"mc-error")
}else{if(b&&b.value&&!Cackle.Base.validEmail(b.value)){Cackle.Fastjs.addcl(b,"mc-error")
}else{this.authorize(d,c.value,b&&b.value,this.captcha,function(){c.value="";
b&&(b.value="");
a.setAttribute("src",d.avatar)
});
window.grecaptcha&&grecaptcha.reset()
}}},authorize:function(g,a,h,i,d){var b=Cackle.origin+"/login/"+g.id+"/anonym.json",e={name:a};
if(h){e.email=h
}if(i){e.captcha=i
}if(Cackle.Login2.safari()){var f=Cackle.Fastjs.popup(b,1,1,e,1000000,1000000);
function c(){if(!f||f.closed!=false){Cackle.Login2.authorize(g,d)
}else{setTimeout(c,10)
}}setTimeout(c,10)
}else{Cackle.PostMessage.post(g.host,b,e,function(j){if(j){Cackle.Login2.authorizecb(g,j.authorizeResponse,d)
}})
}}},SSO:{flag:"e30= ",cookie:"mc-sso-user",provider:"sso",init:function(a){if(a.ssoAuth){if(a.ssoAuth.indexOf(this.flag)<0){if(this.isAuthNeed(a)){this.auth(a)
}}else{if(a.ssoAuth.indexOf(this.flag)==0&&this.isAuth()){Cackle.Login2.logout(a)
}}}},isAuthNeed:function(a){return !Cackle.Login2.isAuthorized()||(Cackle.Login2.auth.provider!=this.provider&&a.ssoPrimary)||(Cackle.Login2.auth.provider==this.provider&&this.token(a)!=Cackle.getCookie(this.cookie))
},token:function(a){return a.ssoAuth.split(" ")[0]
},auth:function(b){var c=this,a=b.host+"/login/"+b.id+"/sso.json",d={token:b.ssoAuth,widget:b.widget};
Cackle.PostMessage.post(b.host,a,d,function(e){var f=e.widgetUser;
Cackle.auth=Cackle.Login2.auth=f;
if(Cackle.Login2.isAuthorized()){Cackle.Cookie.create(c.cookie,c.token(b),365);
Cackle.Fastjs.cbs(b,"loggedin",f);
if(Cackle.Login2.safari()){Cackle.Cookie.create("mc-sso-p3p",JSON.stringify({url:a,params:d}),5)
}}})
},isAuth:function(){return Cackle.Login2.isAuthorized()&&Cackle.Login2.auth.provider==this.provider
}}};
Cackle.Login2.main=function(b,a){if(!Cackle.Login2.auth){Cackle.Login2.authorize(a,function(){Cackle.Login2.SSO.init(a)
})
}else{Cackle.Fastjs.cbs(a,"loggedin",Cackle.Login2.auth)
}if(b){Cackle.Login2.build(b,a)
}};
Cackle.Login2.build=function(c,b){c.innerHTML=Cackle.Login2.render("temp",{conf:b,msg:b.msg,anonym:Cackle.Login2.render("anonym",{conf:b,msg:b.msg}),soc:Cackle.Login2.render("soctemp",{provs:b.providers})});
var a=c.querySelector(".mc-authsoc");
if(a){Cackle.Login2.init(b,a)
}if(b.anonym!=false){Cackle.Login2.ANONYM.init(b,c.querySelector(".mc-auth-anonym"))
}};var Cackle=Cackle||{};
Cackle.Media=Cackle.Media||{srv:"https://media.cackle.me/",xhr:null,html:'<a href="#" class="mc-attachimg"><i class="mcicon-picture"></i></a><input type="file" tabindex="-1" accept="image/*" style="display:none!important">',pthumb:Cackle.origin+"/widget/img/presen_thumbl.png",uploadImage:function(b){var a=Cackle.Fastjs.next(this);
a.click();
return false
},uploadFiles:function(b,c,d,g){if(!window.FormData){return
}var j=Cackle.Fastjs.prev(c);
Cackle.Fastjs.addcl(j,"mc-spin");
var e=new FormData();
for(var h=0,f;
f=b[h];
++h){e.append("file",f)
}var k=this;
if(!this.xhr){this.xhr=new XMLHttpRequest()
}this.xhr.open("POST",this.srv+"upload2",true);
this.xhr.onload=function(i){if(4===k.xhr.readyState){if(200===k.xhr.status&&k.xhr.responseText.length>0){var a=k.srv+k.xhr.responseText;
if(d){k.attachImage(a,d)
}if(g){g(a)
}Cackle.Fastjs.remcl(j,"mc-spin")
}}};
this.xhr.send(e)
},attachImage:function(b,d){if(b){var c=this.makePreview(b.split(" "),true),e=Cackle.Fastjs.next(d);
if(e&&Cackle.Fastjs.hascl(e,"mc-media-preview")){var a=e.querySelector("ul");
Cackle.Fastjs.each(c.querySelectorAll("li"),function(g){a.appendChild(g)
})
}else{var f=Cackle.Fastjs.create("div","mc-media-preview");
f.appendChild(c);
Cackle.Fastjs.after(d,f)
}}},makeContent:function(e,d,a){var b=this.findLinks(e);
if(b&&b.length>0){var c=this.makePreview(b,d,a);
var f=Cackle.Fastjs.create("div","mc-comment-media");
f.appendChild(c);
return f
}return""
},makeContentHtml:function(c,b){var a=this.makeContent(c,b);
if(a){return a.outerHTML
}return""
},findLinks:function(a){return a.match(/(((\bhttps?:)?(\/\/)?(((www\.)?youtube\.com\/watch\?[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|((www\.)?youtu\.be\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(vimeo\.com\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*\/?(\d)*)|([-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]\.(png|jpg|jpeg|gif))|(docs\.google\.com\/present\/view?[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(www\.slideshare\.net\/slideshow\/embed_code\/(\d)+))))/ig)
},makePreview:function(b,f,a){var d=this,c=Cackle.Fastjs.create("ul"),e=0;
Cackle.Fastjs.each(b,function(o){var l=o.toString().trim();
if(!l){return
}var m=Cackle.Fastjs.create("li"),i=false,k="img",j;
if(l.indexOf("youtube.com")>-1){j=d.youtubeThumbl(l);
k="youtube";
i=true
}else{if(l.indexOf("youtu.be")>-1){j=d.youtubeShortThumbl(l);
k="youtube";
i=true
}else{if(l.indexOf("vimeo.com")>-1){j=d.vimeoThumbl(l);
k="vimeo";
i=true
}else{if(l.indexOf("docs.google.com")>-1){j=d.imgThumbl(d.pthumb)
}else{if(l.indexOf("slideshare.net")>-1){j=d.imgThumbl(d.pthumb)
}else{j=d.imgThumbl(l)
}}}}}if(!j){return
}var g;
if(f){g=Cackle.Fastjs.create("div","mc-media-surface");
g.setAttribute("data-media",l);
var n=Cackle.Fastjs.create("span");
n.innerHTML="×";
m.appendChild(n);
Cackle.Fastjs.on(n,"click",function(p){m.parentNode.removeChild(m);
return false
})
}else{g=Cackle.Fastjs.create("a");
g.href=l;
g.target="_blank";
g.setAttribute("data-type",k);
Cackle.Fastjs.on(g,"click",d.mediaClick);
if(i){var h=Cackle.Fastjs.create("img","mc-media-play");
h.src=Cackle.origin+"/widget/img/ytplay.png";
g.appendChild(h)
}}j.onload=function(){a&&a()
};
g.appendChild(j);
m.appendChild(g);
c.appendChild(m);
e+=1
});
return c
},mediaClick:function(c){var a=this.getAttribute("href"),b=this.getAttribute("data-type");
if(b!="img"){Cackle.Fastjs.addcl(this.parentNode,"mc-block");
this.outerHTML=Cackle.Media[b+"Video"](a)
}else{if(Cackle.Modal2){Cackle.Media.lightbox(a,this)
}else{return
}}return false
},lightbox:function(e,d){var b='<img src="'+e+'"><div class="mc-media-nav"><span class="mc-media-prev" data-dir="prev"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc5MiIgaGVpZ2h0PSIxNzkyIiB2aWV3Qm94PSIwIDAgMTc5MiAxNzkyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xNDI3IDMwMWwtNTMxIDUzMSA1MzEgNTMxcTE5IDE5IDE5IDQ1dC0xOSA0NWwtMTY2IDE2NnEtMTkgMTktNDUgMTl0LTQ1LTE5bC03NDItNzQycS0xOS0xOS0xOS00NXQxOS00NWw3NDItNzQycTE5LTE5IDQ1LTE5dDQ1IDE5bDE2NiAxNjZxMTkgMTkgMTkgNDV0LTE5IDQ1eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg=="></span><span class="mc-media-next" data-dir="next"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc5MiIgaGVpZ2h0PSIxNzkyIiB2aWV3Qm94PSIwIDAgMTc5MiAxNzkyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMzYzIDg3N2wtNzQyIDc0MnEtMTkgMTktNDUgMTl0LTQ1LTE5bC0xNjYtMTY2cS0xOS0xOS0xOS00NXQxOS00NWw1MzEtNTMxLTUzMS01MzFxLTE5LTE5LTE5LTQ1dDE5LTQ1bDE2Ni0xNjZxMTktMTkgNDUtMTl0NDUgMTlsNzQyIDc0MnExOSAxOSAxOSA0NXQtMTkgNDV6IiBmaWxsPSIjZmZmIi8+PC9zdmc+"></span></div>',c=Cackle.Modal2.show("mc-modal-lightbox","",null,b,true),a=c.querySelector("img");
Cackle.Fastjs.on(window,"resize",function(f){Cackle.Media.imgResize(a)
},false);
Cackle.Fastjs.onall2(c,".mc-modal2, .mc-modal-backdrop2","click",function(f){Cackle.Fastjs.rm(c)
},false);
Cackle.Fastjs.onall2(c,".mc-media-prev, .mc-media-prev img, .mc-media-next, .mc-media-next img","click",function(){Cackle.Fastjs.rm(c);
var g=this.getAttribute("data-dir")||this.parentNode.getAttribute("data-dir");
var f=function(j){var i=Cackle.Fastjs[g]((j||d).parentNode);
if(i){var k=Cackle.Fastjs.children(i)[0];
if(k&&k.getAttribute("data-type")=="img"){Cackle.Media.mediaClick.call(k);
return
}else{f(k)
}}else{var h=Cackle.Fastjs.parents(d,"mc-comment-media");
Cackle.Media.mediaClick.call(h.querySelector((g=="prev"?"li:last-child ":"")+'a[data-type="img"]'))
}};
f()
});
Cackle.Media.ratio=false;
Cackle.Media.imgOriginWidth=0;
Cackle.Media.imgOriginHeight=0;
Cackle.Media.imgResize(a)
},youtubeVideo:function(b){if(b.indexOf("youtu.be")>-1){var a=this.youtubeShortRegex(b);
if(a&&a.length>1){return this.youtubeEmbed(b,a[2])
}}else{var a=this.youtubeRegex(b);
if(a&&a.length>0){return this.youtubeEmbed(b,a[1])
}}},youtubeEmbed:function(a,b){return'<object><param name="movie" value="'+a+'"/><param name="allowFullScreen" value="true" /><param name="allowscriptaccess" value="never"/><embed src="//www.youtube.com/v/'+b+'?f=videos&amp;app=youtube_gdata&amp;autoplay=1&amp;fs=1" type="application/x-shockwave-flash" allowscriptaccess="never" allowfullscreen="true"/></object>'
},vimeoVideo:function(b){var a=/vimeo\.com\/?.*\/(\d+)/.exec(b);
if(a&&a.length>0){return this.vimeoEmbed(a[1])
}},vimeoEmbed:function(a){return'<object><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="//vimeo.com/moogaloop.swf?clip_id='+a+'&amp;server=vimeo.com&amp;color=00adef&amp;fullscreen=1&amp;autoplay=1" /><embed src="//vimeo.com/moogaloop.swf?clip_id='+a+'&amp;server=vimeo.com&amp;color=00adef&amp;fullscreen=1&amp;autoplay=1" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always"></embed></object>'
},youtubeThumbl:function(b){var a=this.youtubeRegex(b);
if(a&&a.length>0){return this.imgThumbl(this.youtubeThumbSrc(a[1]))
}},youtubeShortThumbl:function(b){var a=this.youtubeShortRegex(b);
if(a&&a.length>1){return this.imgThumbl(this.youtubeThumbSrc(a[2]))
}},youtubeThumbSrc:function(a){return"//i.ytimg.com/vi/"+a+"/0.jpg"
},youtubeRegex:function(a){return/v=([^\?\&]+)/.exec(a)
},youtubeShortRegex:function(a){return/([^\/]+)\/([^\/]+)/.exec(a)
},vimeoThumbl:function(c){var a=/vimeo\.com\/?.*\/(\d+)/.exec(c);
if(a&&a.length>0){var b=Cackle.Fastjs.create("img");
Cackle.Fastjs.jsonp("//vimeo.com/api/v2/video/"+a[1]+".json",null,function(d){b.src=d[0].thumbnail_large
});
return b
}},imgThumbl:function(a){var b=Cackle.Fastjs.create("img");
b.src=a;
return b
},imgResize:function(c){var f,b;
var e=window.innerWidth||document.documentElement.offsetWidth;
var a=window.innerHeight||document.documentElement.offsetHeight;
if(!this.ratio&&c&&c.offsetWidth&&c.offsetHeight){this.ratio=c.offsetWidth/c.offsetHeight
}if(Math.floor(e/this.ratio)>a){f=a*this.ratio;
b=a
}else{f=e;
b=e/this.ratio
}f=Math.floor(f*0.8);
b=Math.floor(b*0.8);
this.imgOriginWidth=this.imgOriginWidth||c.naturalWidth||c.width;
this.imgOriginHeight=this.imgOriginHeight||c.naturalHeight||c.height;
if(f>this.imgOriginWidth||b>this.imgOriginHeight){f=this.imgOriginWidth;
b=this.imgOriginHeight
}var d="width:"+f+"px!important;height:"+b+"px!important;margin-top:"+(((window.innerHeight||document.documentElement.offsetHeight)-b)/2)+"px!important";
c.parentNode.setAttribute("style",d)
}};
Cackle.Media.attach=function(b,c){if(c){var a=c.trim().split(/\s+/);
Cackle.Fastjs.each(a,function(d){Cackle.Media.attachImage(d,b)
})
}};
Cackle.Media.main=function(a,c){if(!a){return
}var b=Cackle.Fastjs.create("div","mc-attachimg-cnt");
b.innerHTML=Cackle.Media.html;
a.appendChild(b);
Cackle.Fastjs.on2(a,".mc-attachimg","click",Cackle.Media.uploadImage);
Cackle.Fastjs.on2(a,'input[type="file"]',"change",function(){Cackle.Media.uploadFiles(this.files,this,a);
this.value=""
});
Cackle.Media.attach(a,c)
};
Cackle.Media.event=function(b,a){Cackle.Fastjs.on2(b,".mc-attachimg","click",Cackle.Media.uploadImage);
Cackle.Fastjs.on2(b,'input[type="file"]',"change",function(){Cackle.Media.uploadFiles(this.files,this,a);
this.value=""
})
};var Cackle=Cackle||{};
Cackle.Time=Cackle.Time||{getTime:function(b,c,a){if(a=="chat"){return this.getChatTime(b,c||"ru")
}else{if(a){return this.getFormatTime(b,a,c||"ru")
}else{return this.getDefaultTime(b,c||"ru")
}}},getChatTime:function(g,j){var c=new Date().getTime(),b=c-g,f=b/1000,a=f/60,e=a/60,i=e/24;
if(e<24){return this.getFormatTime(g,"HH:mm",j)
}else{if(i<365){return this.getFormatTime(g,"dd.MM HH:mm",j)
}else{return this.getFormatTime(g,"yyyy.MM.dd HH:mm",j)
}}},getDefaultTime:function(g,j){var c=new Date(),b=c.getTime()-g,f=b/1000,a=f/60,e=a/60,i=e/24;
if(e<24){return this.getTimeAgo(g,j)
}else{if(i<30){return this.getTimeAgo(g,j)+" "+this.getFormatTime(g,"HH:mm",j)
}else{if(new Date(g).getFullYear()==c.getFullYear()){return this.getFormatTime(g,"dd.MM HH:mm",j)
}else{return this.getFormatTime(g,"yyyy.MM.dd HH:mm",j)
}}}},getTimeAgo:function(c,b){var a=new Date().getTime(),i=a-c,k=i/1000,e=k/60,f=e/60,g=f/24,j=g/365;
b=Cackle.Time.Messages[b]?b:"en";
if(k<45){return Cackle.Time.Messages[b].second
}else{if(k<90){return Cackle.Time.Messages[b].minute
}else{if(e<45){return Cackle.Time.Messages[b].minutes(e)
}else{if(e<90){return Cackle.Time.Messages[b].hour
}else{if(f<24){return Cackle.Time.Messages[b].hours(f)
}else{if(f<48){return Cackle.Time.Messages[b].day
}else{if(g<30){return Cackle.Time.Messages[b].days(g)
}else{if(g<60){return Cackle.Time.Messages[b].month
}else{if(g<365){return Cackle.Time.Messages[b].months(g)
}else{if(j<2){return Cackle.Time.Messages[b].year
}else{return Cackle.Time.Messages[b].years(j)
}}}}}}}}}}},getFormatTime:function(d,c,e){var b=new Date(d),a={SS:b.getMilliseconds(),ss:b.getSeconds(),mm:b.getMinutes(),HH:b.getHours(),hh:((b.getHours()%12)?b.getHours()%12:12)+(b.getHours()>=12?"PM":"AM"),dd:b.getDate(),MM:b.getMonth()+1,yyyy:b.getFullYear(),yy:String(b.getFullYear()).toString().substr(2,2),ago:this.getTimeAgo(d,e)};
return c.replace(/(SS|ss|mm|HH|hh|DD|dd|MM|yyyy|yy|ago)/g,function(f,g){var h=a[g];
return h<10?"0"+h:h
})
},declineNum:function(d,c,b,a){return d+" "+this.declineMsg(d,c,b,a)
},declineMsg:function(e,c,b,a){var d=e%10;
if((d==1)&&((e==1)||(e>20))){return c
}else{if((d>1)&&(d<5)&&((e>20)||(e<10))){return b
}else{return a
}}}};
Cackle.Time.Messages={ru:{second:"только что",minute:"минуту назад",minutes:function(a){return Cackle.Time.declineNum(Math.round(a),"минута назад","минуты назад","минут назад")
},hour:"час назад",hours:function(a){return Cackle.Time.declineNum(Math.round(a),"час назад","часа назад","часов назад")
},day:"день назад",days:function(a){return Cackle.Time.declineNum(Math.round(a),"день назад","дня назад","дней назад")
},month:"месяц назад",months:function(a){return Cackle.Time.declineNum(Math.round(a/30),"месяц назад","месяца назад","месяцев назад")
},year:"год назад",years:function(a){return Cackle.Time.declineNum(Math.round(a),"год назад","года назад","лет назад")
}},en:{second:"just now",minute:"minute ago",minutes:function(a){return Math.round(a)+" minutes ago"
},hour:"an hour ago",hours:function(a){return"about "+Math.round(a)+" hours ago"
},day:"day ago",days:function(a){return Math.round(a)+" days ago"
},month:"a month ago",months:function(a){return Math.round(a/30)+" months ago"
},year:"a year ago",years:function(a){return Math.round(a)+" years ago"
}},uk:{second:"тільки що",minute:"хвилину тому",minutes:function(a){return Cackle.Time.declineNum(Math.round(a),"хвилину тому","хвилини тому","хвилин тому")
},hour:"годину тому",hours:function(a){return Cackle.Time.declineNum(Math.round(a),"годину тому","години тому","годин тому")
},day:"день тому",days:function(a){return Cackle.Time.declineNum(Math.round(a),"день тому","дні тому","днів тому")
},month:"місяць тому",months:function(a){return Cackle.Time.declineNum(Math.round(a/30),"місяць тому","місяці тому","місяців тому")
},year:"рік тому",years:function(a){return Cackle.Time.declineNum(Math.round(a),"рік тому","роки тому","років тому")
}},ro:{second:"chiar acum",minute:"în urmă minut",minutes:function(a){return Cackle.Time.declineNum(Math.round(a),"o minuta in urma","minute in urma","de minute in urma")
},hour:"acum o ora",hours:function(a){return Cackle.Time.declineNum(Math.round(a),"acum o ora","ore in urma","de ore in urma")
},day:"o zi in urma",days:function(a){return Cackle.Time.declineNum(Math.round(a),"o zi in urma","zile in urma","de zile in urma")
},month:"o luna in urma",months:function(a){return Cackle.Time.declineNum(Math.round(a/30),"o luna in urma","luni in urma","de luni in urma")
},year:"un an in urma",years:function(a){return Cackle.Time.declineNum(Math.round(a),"un an in urma","ani in urma","de ani in urma")
}},lv:{second:"Mazāk par minūti",minute:"Pirms minūtes",minutes:function(a){return Cackle.Time.declineNum(Math.round(a),"pirms minūtes","pirms minūtēm","pirms minūtēm")
},hour:"pirms stundas",hours:function(a){return Cackle.Time.declineNum(Math.round(a),"pirms stundas","pirms stundām","pirms stundām")
},day:"pirms dienas",days:function(a){return Cackle.Time.declineNum(Math.round(a),"pirms dienas","pirms dienām","pirms dienām")
},month:"pirms mēneša",months:function(a){return Cackle.Time.declineNum(Math.round(a/30),"pirms mēneša","pirms mēnešiem","pirms mēnešiem")
},year:"pirms gada",years:function(a){return Cackle.Time.declineNum(Math.round(a),"pirms gada","pirms gadiem","pirms gadiem")
}},lt:{second:"ką tik",minute:"prieš minutę",minutes:function(a){return Cackle.Time.declineNum(Math.round(a),"minutė prieš","minutės prieš","minučių prieš")
},hour:"prieš valandą",hours:function(a){return Cackle.Time.declineNum(Math.round(a),"valanda prieš","valandos prieš","valandų prieš")
},day:"prieš dieną",days:function(a){return Cackle.Time.declineNum(Math.round(a),"diena prieš","dienos prieš","dienų prieš")
},month:"prieš mėnesį",months:function(a){return Cackle.Time.declineNum(Math.round(a/30),"mėnesį prieš","mėnesiai prieš","mėnesių prieš")
},year:"prieš metus",years:function(a){return Cackle.Time.declineNum(Math.round(a),"metai prieš","metai prieš","metų prieš")
}},kk:{second:"бір минуттан аз уақыт бұрын",minute:"бір минут бұрын",minutes:function(a){return Cackle.Time.declineNum(Math.round(a),"минут бұрын","минут бұрын","минут бұрын")
},hour:"бір сағат бұрын",hours:function(a){return Cackle.Time.declineNum(Math.round(a),"сағат бұрын","сағат бұрын","сағат бұрын")
},day:"бір күн бұрын",days:function(a){return Cackle.Time.declineNum(Math.round(a),"күн бұрын","күн бұрын","күн бұрын")
},month:"бір ай бұрын",months:function(a){return Cackle.Time.declineNum(Math.round(a/30),"ай бұрын","ай бұрын","ай бұрын")
},year:"бір жыл бұрын",years:function(a){return Cackle.Time.declineNum(Math.round(a),"жыл бұрын","жыл бұрын","жыл бұрын")
}},ka:{second:"წამის წინ",minute:"წუთის წინ",minutes:function(a){return Cackle.Time.declineNum(Math.round(a),"წუთის წინ","წუთის წინ","წუთის წინ")
},hour:"საათის წინ",hours:function(a){return Cackle.Time.declineNum(Math.round(a),"საათის წინ","საათის წინ","საათის წინ")
},day:"დღის წინ",days:function(a){return Cackle.Time.declineNum(Math.round(a),"დღის წინ","დღის წინ","დღის წინ")
},month:"თვის წინ",months:function(a){return Cackle.Time.declineNum(Math.round(a/30),"თვის წინ","თვის წინ","თვის წინ")
},year:"წლის წინ",years:function(a){return Cackle.Time.declineNum(Math.round(a),"წლის წინ","წლის წინ","წლის წინ")
}},hy:{second:"մի քնի վայրկյան առաջ",minute:"մեկ րոպե առաջ",minutes:function(a){return Cackle.Time.declineNum(Math.round(a),"րոպե առաջ","րոպե առաջ","րոպե առաջ")
},hour:"մեկ ժամ առաջ",hours:function(a){return Cackle.Time.declineNum(Math.round(a),"ժամ առաջ","ժամ առաջ","ժամ առաջ")
},day:"մեկ օր առաջ",days:function(a){return Cackle.Time.declineNum(Math.round(a),"օր առաջ","օր առաջ","օր առաջ")
},month:"մեկ ամիս առաջ",months:function(a){return Cackle.Time.declineNum(Math.round(a/30),"ամիս առաջ","ամիս առաջ","ամիս առաջ")
},year:"մեկ տարի առաջ",years:function(a){return Cackle.Time.declineNum(Math.round(a),"տարի առաջ","տարի առաջ","տարի առաջ")
}},fr:{second:"tout à l'heure",minute:"environ une minute",minutes:function(a){return Math.round(a)+" minutes"
},hour:"environ une heure",hours:function(a){return"environ "+Math.round(a)+" heures"
},day:"un jour",days:function(a){return Math.round(a)+" jours"
},month:"environ un mois",months:function(a){return Math.round(a/30)+" mois"
},year:"environ un an",years:function(a){return Math.round(a)+" ans"
}},es:{second:"en este momento",minute:"hace un minuto",minutes:function(a){return Cackle.Time.declineNum(Math.round(a),"hace un minuto","minutos atrás","minutos atrás")
},hour:"una hora atrás",hours:function(a){return Cackle.Time.declineNum(Math.round(a),"una hora atrás","horas atrás","horas atrás")
},day:"hace un día",days:function(a){return Cackle.Time.declineNum(Math.round(a),"un día atrás","días atrás","días atrás")
},month:"Hace un mes",months:function(a){return Cackle.Time.declineNum(Math.round(a/30),"un mes atrás","meses atrás","meses atrás")
},year:"Hace un año",years:function(a){return Cackle.Time.declineNum(Math.round(a),"hace un año","años atrás","años atrás")
}},el:{second:"λιγότερο από ένα λεπτό",minute:"γύρω στο ένα λεπτό",minutes:function(a){return Math.round(a)+" minutes"
},hour:"γύρω στην μια ώρα",hours:function(a){return"about "+Math.round(a)+" hours"
},day:"μια μέρα",days:function(a){return Math.round(a)+" days"
},month:"γύρω στον ένα μήνα",months:function(a){return Math.round(a/30)+" months"
},year:"γύρω στον ένα χρόνο",years:function(a){return Math.round(a)+" years"
}},de:{second:"soeben",minute:"vor einer Minute",minutes:function(a){if(Math.round(a)==1){return"vor einer Minute"
}else{return"vor "+Math.round(a)+" Minuten"
}},hour:"vor einer Stunde",hours:function(a){return Cackle.Time.declineNum(Math.round(a),"vor einer Stunde","vor Stunden","vor Stunden")
},day:"vor einem Tag",days:function(a){return Cackle.Time.declineNum(Math.round(a),"vor einem Tag","vor Tage","vor Tage")
},month:"vor einem Monat",months:function(a){return Cackle.Time.declineNum(Math.round(a/30),"vor einem Monat","vor Monate","vor Monate")
},year:"vor einem Jahr",years:function(a){return Cackle.Time.declineNum(Math.round(a),"vor einem Jahr","vor Jahre","vor Jahre")
}},be:{second:"менш за хвіліну таму",minute:"хвіліну таму",minutes:function(a){return Cackle.Time.declineNum(Math.round(a),"хвіліна таму","хвіліны таму","хвілін таму")
},hour:"гадзіну таму",hours:function(a){return Cackle.Time.declineNum(Math.round(a),"гадзіну таму","гадзіны таму","гадзін таму")
},day:"дзень таму",days:function(a){return Cackle.Time.declineNum(Math.round(a),"дзень таму","дні таму","дзён таму")
},month:"месяц таму",months:function(a){return Cackle.Time.declineNum(Math.round(a/30),"месяц таму","месяца таму","месяцаў таму")
},year:"год таму",years:function(a){return Cackle.Time.declineNum(Math.round(a),"год таму","гады таму","год таму")
}},it:{second:"proprio ora",minute:"un minuto fa",minutes:function(a){return Cackle.Time.declineNum(Math.round(a),"un minuto fa","minuti fa","minuti fa")
},hour:"un'ora fa",hours:function(a){return Cackle.Time.declineNum(Math.round(a),"un'ora fa","ore fa","ore fa")
},day:"un giorno fa",days:function(a){return Cackle.Time.declineNum(Math.round(a),"un giorno fa","giorni fa","giorni fa")
},month:"un mese fa",months:function(a){return Cackle.Time.declineNum(Math.round(a/30),"un mese fa","mesi fa","mesi fa")
},year:"un anno fa",years:function(a){return Cackle.Time.declineNum(Math.round(a),"un anno fa","anni fa","anni fa")
}},bg:{second:"току що",minute:"преди минута",minutes:function(a){return Cackle.Time.declineNum(Math.round(a),"преди минута","преди минути","преди минути")
},hour:"преди час",hours:function(a){return Cackle.Time.declineNum(Math.round(a),"преди час","преди часове","преди часове")
},day:"преди ден",days:function(a){return Cackle.Time.declineNum(Math.round(a),"преди ден","преди дни","преди дни")
},month:"преди месец",months:function(a){return Cackle.Time.declineNum(Math.round(a/30),"преди месец","преди месеци","преди месеци")
},year:"преди година",years:function(a){return Cackle.Time.declineNum(Math.round(a),"преди година","преди години","преди години")
}},pt:{second:"Agora",minute:"1 minuto atrás",minutes:function(a){return Cackle.Time.declineNum(Math.round(a),"1 minuto atrás","1 minuto atrás","alguns minutos")
},hour:"1 hora atrás",hours:function(a){return Cackle.Time.declineNum(Math.round(a),"1 hora atrás","1 hora atrás","algumas horas atrás")
},day:"dia anterior",days:function(a){return Cackle.Time.declineNum(Math.round(a),"dia anterior","dia anterior","dia anterior")
},month:"1 mês atrás",months:function(a){return Cackle.Time.declineNum(Math.round(a/30),"1 mês atrás","1 mês atrás","alguns meses atrás")
},year:"1 ano atrás",years:function(a){return Cackle.Time.declineNum(Math.round(a),"1 ano atrás","1 ano atrás","alguns anos atrás")
}},id:{second:"baru saja",minute:"semenit yang lalu",minutes:function(a){return Math.round(a)+" semenit yang lalu"
},hour:"sejam yang lalu",hours:function(a){return Math.round(a)+" sejam yang lalu"
},day:"hari yang lalu",days:function(a){return Math.round(a)+" hari yang lalu"
},month:"sebulan yang lalu",months:function(a){return Math.round(a/30)+" sebulan yang lalu"
},year:"setahun yang lalu",years:function(a){return Math.round(a)+" setahun yang lalu"
}},hi:{second:"बस अभी",minute:"एक मिनट पहले",minutes:function(a){return Math.round(a)+" एक मिनट पहले"
},hour:"घंटा पहले",hours:function(a){return Math.round(a)+" घंटा पहले"
},day:"दिन पहले",days:function(a){return Math.round(a)+" दिन पहले"
},month:"महीना पहले",months:function(a){return Math.round(a/30)+" महीना पहले"
},year:"एक साल पहले",years:function(a){return Math.round(a)+" साल पहले"
}}};var Cackle=Cackle||{};
Cackle.Social=Cackle.Social||{Share:{vkontakte:function(b){var a="http://vk.com/share.php?noparse=true&url="+encodeURIComponent(b.url);
if(b.title){a+="&title="+encodeURIComponent(b.title)
}if(b.text){a+="&description="+encodeURIComponent(this.trim(b.text))
}if(b.img){a+="&image="+encodeURIComponent(b.img)
}this.popup(a)
},odnoklassniki:function(b){var a="http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl="+encodeURIComponent(b.url);
if(b.text){a+="&st.comments="+encodeURIComponent(this.trim(b.text))
}this.popup(a)
},mymailru:function(b){var a="http://connect.mail.ru/share?url="+encodeURIComponent(b.url);
if(b.title){a+="&title="+encodeURIComponent(b.title)
}if(b.text){a+="&description="+encodeURIComponent(this.trim(b.text))
}if(b.img){a+="&imageurl="+encodeURIComponent(b.img)
}this.popup(a)
},googleplus:function(b){var a="https://plus.google.com/share?url="+encodeURIComponent(b.url);
this.popup(a)
},facebook:function(b){var a;
if(!b.title&&!b.text&&b.url){a="https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(b.url)
}else{a="https://www.facebook.com/dialog/feed?app_id=230560550330921&display=popup";
a+="&redirect_uri="+encodeURIComponent("http://cackle.me/login/success");
a+="&caption="+encodeURIComponent(b.title);
a+="&description="+encodeURIComponent(b.text);
a+="&link="+encodeURIComponent(b.url);
if(b.img&&b.img.indexOf("facebook.com")<0){a+="&picture="+encodeURIComponent(b.img)
}}this.popup(a)
},twitter:function(c){var b="http://twitter.com/share?";
if(c.title){var a=c.title.length+c.url.length+10,d;
if(c.text.length+a>140){d=c.text.substring(0,140-a)+"..."
}else{d=c.text
}b+="text="+encodeURIComponent('"'+d+'" - '+c.title);
b+="&url="+encodeURIComponent(c.url);
b+="&counturl="+encodeURIComponent(c.url)
}else{if(c.text.length>140){d=c.text.substring(0,140)+"..."
}else{d=c.text
}b+="text="+encodeURIComponent(d);
b+="&url="+encodeURIComponent(c.url)
}this.popup(b)
},trim:function(b){var a=300;
if(b&&b.length>a){return b.substring(0,a)+"..."
}return b
},popup:function(a){Cackle.Fastjs.popup(a,626,436)
}}};(function(H,f,o){if(H.PushStream){return
}var F={};
var g=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var v=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var u=function(O){return((O<10)?"0":"")+O
};
F.dateToUTCString=function(O){var P=u(O.getUTCHours())+":"+u(O.getUTCMinutes())+":"+u(O.getUTCSeconds());
return g[O.getUTCDay()]+", "+u(O.getUTCDate())+" "+v[O.getUTCMonth()]+" "+O.getUTCFullYear()+" "+P+" GMT"
};
var m=function(){var P=arguments[0]||{};
for(var Q=0;
Q<arguments.length;
Q++){var R=arguments[Q];
for(var O in R){if(!R.hasOwnProperty||R.hasOwnProperty(O)){P[O]=R[O]
}}}return P
};
var K=/^[\],:{}\s]*$/,d=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,n=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,j=/(?:^|:|,)(?:\s*\[)+/g;
var a=function(O){return O.replace(/^\s*/,"").replace(/\s*$/,"")
};
F.parseJSON=function(O){if(!O||!k(O)){return null
}O=a(O);
if(H.JSON&&H.JSON.parse){try{return H.JSON.parse(O)
}catch(P){throw"Invalid JSON: "+O
}}if(K.test(O.replace(d,"@").replace(n,"]").replace(j,""))){return(new Function("return "+O))()
}throw"Invalid JSON: "+O
};
var q=function(P){var O={};
O[P.tagArgument]="";
O[P.timeArgument]="";
O[P.eventIdArgument]="";
if(P.messagesControlByArgument){O[P.tagArgument]=Number(P._etag);
if(P._lastModified){O[P.timeArgument]=P._lastModified
}else{if(P._lastEventId){O[P.eventIdArgument]=P._lastEventId
}}}return O
};
var r=function(){return(new Date()).getTime()
};
var b=function(){return{_:r()}
};
var E=function(P){var Q=P;
if(typeof(P)==="object"){Q="";
for(var O in P){if(!P.hasOwnProperty||P.hasOwnProperty(O)){Q+="&"+O+"="+H.escape(P[O])
}}Q=Q.substring(1)
}return Q||""
};
var N=function(O,P){return O+((O.indexOf("?")<0)?"?":"&")+E(P)
};
var x=Array.isArray||function(O){return Object.prototype.toString.call(O)==="[object Array]"
};
var k=function(O){return Object.prototype.toString.call(O)==="[object String]"
};
var w=function(O){return Object.prototype.toString.call(O)==="[object Date]"
};
var s={logger:null,debug:function(){if(e.LOG_LEVEL==="debug"){s._log.apply(s._log,arguments)
}},info:function(){if((e.LOG_LEVEL==="info")||(e.LOG_LEVEL==="debug")){s._log.apply(s._log,arguments)
}},error:function(){s._log.apply(s._log,arguments)
},_initLogger:function(){var O=H.console;
if(O&&O.log){if(O.log.apply){s.logger=O.log
}else{if((typeof O.log==="object")&&Function.prototype.bind){s.logger=Function.prototype.bind.call(O.log,O)
}else{if((typeof O.log==="object")&&Function.prototype.call){s.logger=function(){Function.prototype.call.call(O.log,O,Array.prototype.slice.call(arguments))
}
}}}}},_log:function(){if(!s.logger){s._initLogger()
}if(s.logger){try{s.logger.apply(H.console,arguments)
}catch(R){s._initLogger();
if(s.logger){s.logger.apply(H.console,arguments)
}}}var Q=f.getElementById(e.LOG_OUTPUT_ELEMENT_ID);
if(Q){var S="";
for(var P=0;
P<arguments.length;
P++){S+=arguments[P]+" "
}Q.innerHTML+=S+"\n";
var O=Q.innerHTML.split("\n");
if(O.length>100){Q.innerHTML=O.slice(-100).join("\n")
}}}};
var y={_getXHRObject:function(){var S=false;
try{S=new H.XMLHttpRequest()
}catch(R){try{S=new H.XDomainRequest()
}catch(Q){try{S=new H.ActiveXObject("Msxml2.XMLHTTP")
}catch(P){try{S=new H.ActiveXObject("Microsoft.XMLHTTP")
}catch(O){S=false
}}}}return S
},_send:function(R,Q){R=R||{};
R.timeout=R.timeout||30000;
var T=y._getXHRObject();
if(!T||!R.url){return
}y.clear(R);
T.onreadystatechange=function(){if(T.readyState===4){y.clear(R);
if(R.afterReceive){R.afterReceive(T)
}if(T.status===200){if(R.success){R.success(T.responseText)
}}else{if(R.error){R.error(T.status)
}}}};
if(R.beforeOpen){R.beforeOpen(T)
}var S={};
var P=null;
var U="GET";
if(Q){P=E(R.data);
U="POST"
}else{S=R.data||{}
}T.open(U,N(R.url,m({},S,b())),true);
if(R.beforeSend){R.beforeSend(T)
}var O=function(){try{T.abort()
}catch(V){}y.clear(R);
R.error(304)
};
if(Q){T.setRequestHeader("Accept","application/json");
T.setRequestHeader("Content-type","application/x-www-form-urlencoded")
}else{R.timeoutId=H.setTimeout(O,R.timeout+2000)
}T.send(P);
return T
},_clear_script:function(O){if(O){O.onerror=O.onload=O.onreadystatechange=null;
if(O.parentNode){O.parentNode.removeChild(O)
}}},_clear_timeout:function(O){O.timeoutId=L(O.timeoutId)
},clear:function(O){y._clear_timeout(O);
y._clear_script(f.getElementById(O.scriptId))
},jsonp:function(S){S.timeout=S.timeout||30000;
y.clear(S);
var Q=f.head||f.getElementsByTagName("head")[0];
var P=f.createElement("script");
var R=r();
var O=function(){y.clear(S);
var W=S.data.callback;
if(W){H[W]=function(){H[W]=null
}
}var V=r();
S.error(((V-R)>S.timeout/2)?304:0)
};
var T=function(){y.clear(S);
S.load()
};
P.onerror=O;
P.onload=P.onreadystatechange=function(V){if(!P.readyState||/loaded|complete/.test(P.readyState)){T()
}};
if(S.beforeOpen){S.beforeOpen({})
}if(S.beforeSend){S.beforeSend({})
}S.timeoutId=H.setTimeout(O,S.timeout+2000);
S.scriptId=S.scriptId||r();
var U=S.data.callback;
if(U){H[U]=function(){H[U]=null
}
}S.data.callback=S.scriptId+"_onmessage_"+r();
H[S.data.callback]=S.success;
P.setAttribute("src",N(S.url,m({},S.data,b())));
P.setAttribute("async","async");
P.setAttribute("id",S.scriptId);
Q.insertBefore(P,Q.firstChild);
return S
},load:function(O){return y._send(O,false)
},post:function(O){return y._send(O,true)
}};
var z=function(O){return(O)?H.escape(O):""
};
var A=function(O){return(O)?H.unescape(O):""
};
F.parseMessage=function(Q,P){var R=Q;
if(k(Q)){R=F.parseJSON(Q)
}var O={id:R[P.jsonIdKey],channel:R[P.jsonChannelKey],text:k(R[P.jsonTextKey])?A(R[P.jsonTextKey]):R[P.jsonTextKey],tag:R[P.jsonTagKey],time:R[P.jsonTimeKey],eventid:R[P.jsonEventIdKey]||""};
return O
};
var l=function(O){return(O.backtrack)?".b"+Number(O.backtrack):""
};
var p=function(O,Q){var R="";
for(var P in O){if(!O.hasOwnProperty||O.hasOwnProperty(P)){R+="/"+P+(Q?l(O[P]):"")
}}return R
};
var i=function(R,T,U,W){var P=R.wrapper.type===G.TYPE;
var Q=R.useSSL;
var O=(P)?((Q)?"wss://":"ws://"):((Q)?"https://":"http://");
O+=R.host;
O+=((!Q&&R.port===80)||(Q&&R.port===443))?"":(":"+R.port);
O+=T;
var S=p(R.channels,W);
if(R.channelsByArgument){var V={};
V[R.channelsArgument]=S.substring(1);
U=m({},U,V)
}else{O+=S
}return N(O,U)
};
var D=function(R){var Q="";
var P=(R.useSSL)?"https://":"http://";
P+=R.host;
P+=((R.port!==80)&&(R.port!==443))?(":"+R.port):"";
P+=R.urlPrefixPublisher;
for(var O in R.channels){if(!R.channels.hasOwnProperty||R.channels.hasOwnProperty(O)){Q=O;
break
}}P+="?id="+Q;
return P
};
F.extract_xss_domain=function(P){if(P.match(/^(\d{1,3}\.){3}\d{1,3}$/)){return P
}var Q=P.split(".");
var O=Math.max(Q.length-1,(P.match(/(\w{4,}\.\w{2}|\.\w{3,})$/)?2:3));
return Q.slice(-1*O).join(".")
};
var B=function(P,O){return function(){return P.apply(O,arguments)
}
};
var L=function(O){if(O){H.clearTimeout(O)
}return null
};
var h=function(P){s.info("["+this.type+"] message received",arguments);
var O=F.parseMessage(P.data,this.pushstream);
if(O.tag){this.pushstream._etag=O.tag
}if(O.time){this.pushstream._lastModified=O.time
}if(O.eventid){this.pushstream._lastEventId=O.eventid
}this.pushstream._onmessage(O.text,O.id,O.channel,O.eventid,true)
};
var I=function(){this.pushstream._onopen();
s.info("["+this.type+"] connection opened")
};
var M=function(O){s.info("["+this.type+"] error (disconnected by server):",O);
if((this.pushstream.readyState===e.OPEN)&&(this.type===t.TYPE)&&(O.type==="error")&&(this.connection.readyState===H.EventSource.CONNECTING)){return
}this._closeCurrentConnection();
this.pushstream._onerror({type:((O&&((O.type==="load")||(O.type==="close")))||(this.pushstream.readyState===e.CONNECTING))?"load":"timeout"})
};
var G=function(O){if(!H.WebSocket&&!H.MozWebSocket){throw"WebSocket not supported"
}this.type=G.TYPE;
this.pushstream=O;
this.connection=null
};
G.TYPE="WebSocket";
G.prototype={connect:function(){this._closeCurrentConnection();
var P=m({},this.pushstream.extraParams(),b(),q(this.pushstream));
var O=i(this.pushstream,this.pushstream.urlPrefixWebsocket,P,!this.pushstream._useControlArguments());
this.connection=(H.WebSocket)?new H.WebSocket(O):new H.MozWebSocket(O);
this.connection.onerror=B(M,this);
this.connection.onclose=B(M,this);
this.connection.onopen=B(I,this);
this.connection.onmessage=B(h,this);
s.info("[WebSocket] connecting to:",O)
},disconnect:function(){if(this.connection){s.debug("[WebSocket] closing connection to:",this.connection.URL);
this.connection.onclose=null;
this._closeCurrentConnection();
this.pushstream._onclose()
}},_closeCurrentConnection:function(){if(this.connection){try{this.connection.close()
}catch(O){}this.connection=null
}},sendMessage:function(O){if(this.connection){this.connection.send(O)
}}};
var t=function(O){if(!H.EventSource){throw"EventSource not supported"
}this.type=t.TYPE;
this.pushstream=O;
this.connection=null
};
t.TYPE="EventSource";
t.prototype={connect:function(){this._closeCurrentConnection();
var P=m({},this.pushstream.extraParams(),b(),q(this.pushstream));
var O=i(this.pushstream,this.pushstream.urlPrefixEventsource,P,!this.pushstream._useControlArguments());
this.connection=new H.EventSource(O);
this.connection.onerror=B(M,this);
this.connection.onopen=B(I,this);
this.connection.onmessage=B(h,this);
s.info("[EventSource] connecting to:",O)
},disconnect:function(){if(this.connection){s.debug("[EventSource] closing connection to:",this.connection.URL);
this.connection.onclose=null;
this._closeCurrentConnection();
this.pushstream._onclose()
}},_closeCurrentConnection:function(){if(this.connection){try{this.connection.close()
}catch(O){}this.connection=null
}}};
var C=function(O){this.type=C.TYPE;
this.pushstream=O;
this.connection=null;
this.url=null;
this.frameloadtimer=null;
this.pingtimer=null;
this.iframeId="PushStreamManager_"+O.id
};
C.TYPE="Stream";
C.prototype={connect:function(){this._closeCurrentConnection();
var O=F.extract_xss_domain(this.pushstream.host);
try{f.domain=O
}catch(P){s.error("[Stream] (warning) problem setting document.domain = "+O+" (OBS: IE8 does not support set IP numbers as domain)")
}var Q=m({},this.pushstream.extraParams(),b(),{streamid:this.pushstream.id},q(this.pushstream));
this.url=i(this.pushstream,this.pushstream.urlPrefixStream,Q,!this.pushstream._useControlArguments());
s.debug("[Stream] connecting to:",this.url);
this.loadFrame(this.url)
},disconnect:function(){if(this.connection){s.debug("[Stream] closing connection to:",this.url);
this._closeCurrentConnection();
this.pushstream._onclose()
}},_clear_iframe:function(){var O=f.getElementById(this.iframeId);
if(O){O.onload=null;
O.src="about:blank";
if(O.parentNode){O.parentNode.removeChild(O)
}}},_closeCurrentConnection:function(){this._clear_iframe();
if(this.connection){this.pingtimer=L(this.pingtimer);
this.frameloadtimer=L(this.frameloadtimer);
this.connection=null;
this.transferDoc=null;
if(typeof H.CollectGarbage==="function"){H.CollectGarbage()
}}},loadFrame:function(O){this._clear_iframe();
try{var P=new H.ActiveXObject("htmlfile");
P.open();
P.write('<html><script>document.domain="'+(f.domain)+'";<\/script></html>');
P.parentWindow.PushStream=e;
P.close();
var R=P.createElement("div");
P.appendChild(R);
R.innerHTML='<iframe src="'+O+'"></iframe>';
this.connection=R.getElementsByTagName("IFRAME")[0];
this.connection.onload=B(M,this);
this.transferDoc=P
}catch(Q){var S=f.createElement("IFRAME");
S.style.width="1px";
S.style.height="1px";
S.style.border="none";
S.style.position="absolute";
S.style.top="-10px";
S.style.marginTop="-10px";
S.style.zIndex="-20";
S.PushStream=e;
f.body.appendChild(S);
S.setAttribute("src",O);
S.onload=B(M,this);
this.connection=S
}this.connection.setAttribute("id",this.iframeId);
this.frameloadtimer=H.setTimeout(B(M,this),this.pushstream.timeout)
},register:function(O){this.frameloadtimer=L(this.frameloadtimer);
O.p=B(this.process,this);
this.connection.onload=B(this._onframeloaded,this);
this.pushstream._onopen();
this.setPingTimer();
s.info("[Stream] frame registered")
},process:function(T,Q,S,P,R,O){this.pingtimer=L(this.pingtimer);
s.info("[Stream] message received",arguments);
if(T!==-1){if(O){this.pushstream._etag=O
}if(R){this.pushstream._lastModified=R
}if(P){this.pushstream._lastEventId=P
}}this.pushstream._onmessage(A(S),T,Q,P||"",true);
this.setPingTimer()
},_onframeloaded:function(){s.info("[Stream] frame loaded (disconnected by server)");
this.connection.onload=null;
this.disconnect()
},setPingTimer:function(){if(this.pingtimer){L(this.pingtimer)
}this.pingtimer=H.setTimeout(B(M,this),this.pushstream.pingtimeout)
}};
var c=function(O){this.type=c.TYPE;
this.pushstream=O;
this.connection=null;
this.opentimer=null;
this.messagesQueue=[];
this._linkedInternalListen=B(this._internalListen,this);
this.xhrSettings={timeout:this.pushstream.timeout,data:{},url:null,success:B(this.onmessage,this),error:B(this.onerror,this),load:B(this.onload,this),beforeSend:B(this.beforeSend,this),afterReceive:B(this.afterReceive,this)}
};
c.TYPE="LongPolling";
c.prototype={connect:function(){this.messagesQueue=[];
this._closeCurrentConnection();
this.urlWithBacktrack=i(this.pushstream,this.pushstream.urlPrefixLongpolling,{},true);
this.urlWithoutBacktrack=i(this.pushstream,this.pushstream.urlPrefixLongpolling,{},false);
this.xhrSettings.url=this.urlWithBacktrack;
var R=F.extract_xss_domain(this.pushstream.host);
var Q=F.extract_xss_domain(H.location.hostname);
var P=this.pushstream.port;
var O=H.location.port?Number(H.location.port):(this.pushstream.useSSL?443:80);
this.useJSONP=this.pushstream.useJSONP;
this.xhrSettings.scriptId="PushStreamManager_"+this.pushstream.id;
if(this.useJSONP){this.pushstream.messagesControlByArgument=true
}this._internalListen();
this.opentimer=H.setTimeout(B(I,this),100);
s.info("[LongPolling] connecting to:",this.xhrSettings.url)
},_listen:function(){if(this._internalListenTimeout){L(this._internalListenTimeout)
}this._internalListenTimeout=H.setTimeout(this._linkedInternalListen,100)
},_internalListen:function(){if(this.pushstream._keepConnected){this.xhrSettings.url=this.pushstream._useControlArguments()?this.urlWithoutBacktrack:this.urlWithBacktrack;
this.xhrSettings.data=m({},this.pushstream.extraParams(),this.xhrSettings.data,q(this.pushstream));
if(this.useJSONP){this.connection=y.jsonp(this.xhrSettings)
}else{if(!this.connection){this.connection=y.load(this.xhrSettings)
}}}},disconnect:function(){if(this.connection){s.debug("[LongPolling] closing connection to:",this.xhrSettings.url);
this._closeCurrentConnection();
this.pushstream._onclose()
}},_closeCurrentConnection:function(){this.opentimer=L(this.opentimer);
if(this.connection){try{this.connection.abort()
}catch(O){try{y.clear(this.connection)
}catch(P){}}this.connection=null;
this.xhrSettings.url=null
}},beforeSend:function(O){if(!this.pushstream.messagesControlByArgument){O.setRequestHeader("If-None-Match",this.pushstream._etag);
O.setRequestHeader("If-Modified-Since",this.pushstream._lastModified)
}},afterReceive:function(O){if(!this.pushstream.messagesControlByArgument){this.pushstream._etag=O.getResponseHeader("Etag");
this.pushstream._lastModified=O.getResponseHeader("Last-Modified")
}this.connection=null
},onerror:function(O){if(this.pushstream._keepConnected){if(O===304){this._listen()
}else{s.info("[LongPolling] error (disconnected by server):",O);
this._closeCurrentConnection();
this.pushstream._onerror({type:((O===403)||(this.pushstream.readyState===e.CONNECTING))?"load":"timeout"})
}}},onload:function(){this._listen()
},onmessage:function(S){if(this._internalListenTimeout){L(this._internalListenTimeout)
}s.info("[LongPolling] message received",S);
var O=null;
var R=x(S)?S:S.replace(/\}\{/g,"}\r\n{").split("\r\n");
for(var P=0;
P<R.length;
P++){if(R[P]){O=F.parseMessage(R[P],this.pushstream);
this.messagesQueue.push(O);
if(this.pushstream.messagesControlByArgument&&O.time){this.pushstream._etag=O.tag;
this.pushstream._lastModified=O.time
}}}this._listen();
while(this.messagesQueue.length>0){var Q=this.messagesQueue.shift();
this.pushstream._onmessage(Q.text,Q.id,Q.channel,Q.eventid,(this.messagesQueue.length===0))
}}};
var J=[];
var e=function(P){P=P||{};
this.id=J.push(this)-1;
this.useSSL=P.useSSL||false;
this.host=P.host||H.location.hostname;
this.port=Number(P.port||(this.useSSL?443:80));
this.timeout=P.timeout||30000;
this.pingtimeout=P.pingtimeout||30000;
this.reconnectOnTimeoutInterval=P.reconnectOnTimeoutInterval||3000;
this.reconnectOnChannelUnavailableInterval=P.reconnectOnChannelUnavailableInterval||60000;
this.lastEventId=P.lastEventId||null;
this.messagesPublishedAfter=P.messagesPublishedAfter;
this.messagesControlByArgument=P.messagesControlByArgument||false;
this.tagArgument=P.tagArgument||"tag";
this.timeArgument=P.timeArgument||"time";
this.eventIdArgument=P.eventIdArgument||"eventid";
this.useJSONP=P.useJSONP||false;
this._reconnecttimer=null;
this._etag=0;
this._lastModified=null;
this._lastEventId=null;
this.urlPrefixPublisher=P.urlPrefixPublisher||"/pub";
this.urlPrefixStream=P.urlPrefixStream||"/sub";
this.urlPrefixEventsource=P.urlPrefixEventsource||"/ev";
this.urlPrefixLongpolling=P.urlPrefixLongpolling||"/lp";
this.urlPrefixWebsocket=P.urlPrefixWebsocket||"/ws";
this.jsonIdKey=P.jsonIdKey||"id";
this.jsonChannelKey=P.jsonChannelKey||"channel";
this.jsonTextKey=P.jsonTextKey||"text";
this.jsonTagKey=P.jsonTagKey||"tag";
this.jsonTimeKey=P.jsonTimeKey||"time";
this.jsonEventIdKey=P.jsonEventIdKey||"eventid";
this.modes=(P.modes||"eventsource|websocket|stream|longpolling").split("|");
this.wrappers=[];
this.wrapper=null;
this.onchanneldeleted=P.onchanneldeleted||null;
this.onmessage=P.onmessage||null;
this.onerror=P.onerror||null;
this.onstatuschange=P.onstatuschange||null;
this.extraParams=P.extraParams||function(){return{}
};
this.channels={};
this.channelsCount=0;
this.channelsByArgument=P.channelsByArgument||false;
this.channelsArgument=P.channelsArgument||"channels";
for(var O=0;
O<this.modes.length;
O++){try{var R=null;
switch(this.modes[O]){case"websocket":R=new G(this);
break;
case"eventsource":R=new t(this);
break;
case"longpolling":R=new c(this);
break;
case"stream":R=new C(this);
break
}this.wrappers[this.wrappers.length]=R
}catch(Q){s.info(Q)
}}this.readyState=0
};
e.LOG_LEVEL="error";
e.LOG_OUTPUT_ELEMENT_ID="Log4jsLogOutput";
e.CLOSED=0;
e.CONNECTING=1;
e.OPEN=2;
e.prototype={addChannel:function(P,O){if(z(P)!==P){throw"Invalid channel name! Channel has to be a set of [a-zA-Z0-9]"
}s.debug("entering addChannel");
if(typeof(this.channels[P])!=="undefined"){throw"Cannot add channel "+P+": already subscribed"
}O=O||{};
s.info("adding channel",P,O);
this.channels[P]=O;
this.channelsCount++;
if(this.readyState!==e.CLOSED){this.connect()
}s.debug("leaving addChannel")
},removeChannel:function(O){if(this.channels[O]){s.info("removing channel",O);
delete this.channels[O];
this.channelsCount--
}},removeAllChannels:function(){s.info("removing all channels");
this.channels={};
this.channelsCount=0
},_setState:function(O){if(this.readyState!==O){s.info("status changed",O);
this.readyState=O;
if(this.onstatuschange){this.onstatuschange(this.readyState)
}}},connect:function(){s.debug("entering connect");
if(!this.host){throw"PushStream host not specified"
}if(isNaN(this.port)){throw"PushStream port not specified"
}if(!this.channelsCount){throw"No channels specified"
}if(this.wrappers.length===0){throw"No available support for this browser"
}this._keepConnected=true;
this._lastUsedMode=0;
this._connect();
s.debug("leaving connect")
},disconnect:function(){s.debug("entering disconnect");
this._keepConnected=false;
this._disconnect();
this._setState(e.CLOSED);
s.info("disconnected");
s.debug("leaving disconnect")
},_useControlArguments:function(){return this.messagesControlByArgument&&((this._lastModified!==null)||(this._lastEventId!==null))
},_connect:function(){if(this._lastEventId===null){this._lastEventId=this.lastEventId
}if(this._lastModified===null){var P=this.messagesPublishedAfter;
if(!w(P)){var O=Number(this.messagesPublishedAfter);
if(O>0){P=new Date();
P.setTime(P.getTime()-(O*1000))
}else{if(O<0){P=new Date(0)
}}}if(w(P)){this._lastModified=F.dateToUTCString(P)
}}this._disconnect();
this._setState(e.CONNECTING);
this.wrapper=this.wrappers[this._lastUsedMode++%this.wrappers.length];
try{this.wrapper.connect()
}catch(Q){if(this.wrapper){this.wrapper.disconnect()
}}},_disconnect:function(){this._reconnecttimer=L(this._reconnecttimer);
if(this.wrapper){this.wrapper.disconnect()
}},_onopen:function(){this._reconnecttimer=L(this._reconnecttimer);
this._setState(e.OPEN);
if(this._lastUsedMode>0){this._lastUsedMode--
}},_onclose:function(){this._reconnecttimer=L(this._reconnecttimer);
this._setState(e.CLOSED);
this._reconnect(this.reconnectOnTimeoutInterval)
},_onmessage:function(R,S,P,O,Q){s.debug("message",R,S,P,O,Q);
if(S===-2){if(this.onchanneldeleted){this.onchanneldeleted(P)
}}else{if(S>0){if(this.onmessage){this.onmessage(R,S,P,O,Q)
}}}},_onerror:function(O){this._setState(e.CLOSED);
this._reconnect((O.type==="timeout")?this.reconnectOnTimeoutInterval:this.reconnectOnChannelUnavailableInterval);
if(this.onerror){this.onerror(O)
}},_reconnect:function(O){if(this._keepConnected&&!this._reconnecttimer&&(this.readyState!==e.CONNECTING)){s.info("trying to reconnect in",O);
this._reconnecttimer=H.setTimeout(B(this._connect,this),O)
}},sendMessage:function(Q,O,P){Q=z(Q);
if(this.wrapper.type===G.TYPE){this.wrapper.sendMessage(Q);
if(O){O()
}}else{y.post({url:D(this),data:Q,success:O,error:P})
}}};
e.sendMessage=function(Q,R,O,P){y.post({url:Q,data:z(R),success:O,error:P})
};
e.register=function(O){var P=O.window.location.href.match(/streamid=([0-9]*)&?/);
if(P[1]&&J[P[1]]){J[P[1]].wrapper.register(O)
}};
e.unload=function(){for(var O=0;
O<J.length;
O++){try{J[O].disconnect()
}catch(P){}}};
H.PushStream=e;
H.PushStreamManager=J;
if(H.attachEvent){H.attachEvent("onunload",e.unload)
}if(H.addEventListener){H.addEventListener.call(H,"unload",e.unload,false)
}})(window,document);var Cackle=Cackle||{};
Cackle.Stream=Cackle.Stream||{servers:["rt4","rt5"],pushstreams:{},start:function(e,g,f){var c=e+"";
var b=function a(i,h){return Math.floor(Math.random()*(h-i+1))+i
};
var d=new PushStream({host:(f||this.servers[b(0,1)])+".cackle.me",modes:"websocket|eventsource|longpolling",messagesControlByArgument:true,useSSL:true,reconnectOnChannelUnavailableInterval:5000});
d.onmessage=g;
d.addChannel(c);
d.connect();
this.pushstreams[c]=d
},stop:function(d,a){var b=d+"";
var c=this.pushstreams[b];
if(c){c.disconnect();
if(a){c.removeChannel(b)
}}}};Cackle.AutoSize=Cackle.AutoSize||{css:"position:absolute!important;top:-999px!important;left:0!important;right:auto!important;bottom:auto!important;border:0!important;padding: 0!important;-moz-box-sizing:content-box!important;-webkit-box-sizing:content-box!important;box-sizing:content-box!important;word-wrap:break-word!important;height:0!important;min-height:0!important;overflow:hidden!important;transition:none!important;-webkit-transition:none!important;-moz-transition:none!important;"};
Cackle.AutoSize.mainall=function(a){Cackle.Fastjs.each(a,function(b){Cackle.AutoSize.main(b)
})
};
Cackle.AutoSize.main=function(e){if(!e||!window.getComputedStyle){return
}e.setAttribute("style","overflow:hidden!important;overflow-y:hidden!important;word-wrap:break-word!important;");
var p=e.value;
e.value="";
e.value=p;
var i=Cackle.Fastjs.create("textarea",!1,!1,this.css),h=getComputedStyle(e,null),b=h.getPropertyValue("resize"),a=h.getPropertyValue("box-sizing")==="border-box"||h.getPropertyValue("-moz-box-sizing")==="border-box"||h.getPropertyValue("-webkit-box-sizing")==="border-box",d=!a?{width:0,height:0}:{width:parseInt(h.getPropertyValue("border-right-width"),10)+parseInt(h.getPropertyValue("padding-right"),10)+parseInt(h.getPropertyValue("padding-left"),10)+parseInt(h.getPropertyValue("border-left-width"),10),height:parseInt(h.getPropertyValue("border-top-width"),10)+parseInt(h.getPropertyValue("padding-top"),10)+parseInt(h.getPropertyValue("padding-bottom"),10)+parseInt(h.getPropertyValue("border-bottom-width"),10)},f=parseInt(h.getPropertyValue("min-height"),10),l=parseInt(h.getPropertyValue("height"),10),o=Math.max(f,l)-d.height,n=parseInt(h.getPropertyValue("max-height"),10),k,c,g=["font-family","font-size","font-weight","font-style","letter-spacing","line-height","text-transform","word-spacing","text-indent"];
n=n&&n>0?n:90000;
if(i.parentNode!==document.body){document.body.appendChild(i)
}function m(){var q=Cackle.AutoSize.css;
k=e;
h=getComputedStyle(e,null);
Cackle.Fastjs.each(g,function(r){q+=r+":"+h.getPropertyValue(r)+";"
});
i.setAttribute("style",q)
}function j(){var t,q,r,s,u;
if(k!==e){m()
}if(!c){c=true;
i.value=e.value+"";
i.style.overflowY=e.style.overflowY;
t=e.style.height===""?"auto":parseInt(e.style.height,10);
q=getComputedStyle(e,null).getPropertyValue("width");
if(q.substr(q.length-2,2)==="px"){s=parseInt(q,10)-d.width;
i.style.width=s+"px"
}r=i.scrollHeight;
if(r>n){r=n;
u="scroll"
}else{if(r<o){r=o
}}r+=d.height;
e.style.overflowY=u||"hidden";
if(t!==r){e.style.height=r+"px"
}setTimeout(function(){c=false
},1)
}}if("onpropertychange" in e&&"oninput" in e){e.oninput=e.onkeyup=j
}else{if("oninput" in e){e.oninput=j
}else{Cackle.Fastjs.on(e,"keyup",j)
}}j()
};Cackle.Modal2=Cackle.Modal2||{temp:'<div class="mc-modal2" style="display:none;top:{{=it.top}}!important"><div class="mc-modal-dialog2"><div class="mc-modal-content2"><div class="mc-modal-header2"><button type="button" class="mc-close2">×</button>{{?it.img}}<img src="{{=it.img}}"/>{{?}}<div class="mc-modal-title2">{{=it.title}}</div></div>{{?it.title}}<div class="mc-clear"></div>{{?}}<div class="mc-modal-body2">{{=it.body}}</div></div></div></div>',create:function(b,h,c,a,g,e){var f=this,d=document.querySelector("."+b.split(" ").join(".")+".mc-modal-cnt2");
if(!d||e){d=Cackle.Fastjs.create("div",b+" mc-modal-cnt2 mc-c");
d.innerHTML=(doT.template(this.temp))({top:document.documentElement.scrollTop||document.body.scrollTop,img:c,title:h,body:a});
document.body.appendChild(d);
Cackle.Fastjs.on2(d,".mc-close2","click",function(){if(g){Cackle.Fastjs.rm(d)
}else{f.hide(d)
}})
}return d
},show:function(b,f,c,a,e){var d=this.create(b,f,c,a,e);
this.show2(d);
return d
},show2:function(c){var a=c.querySelector(".mc-modal-backdrop2"),b=c.querySelector(".mc-modal2");
if(!a){c.appendChild(Cackle.Fastjs.create("div","mc-modal-backdrop2"))
}var d=document.documentElement.scrollTop||document.body.scrollTop;
b.setAttribute("style","display:block;top:"+d+"px!important;")
},hide:function(c){var b=c.querySelector(".mc-modal2"),a=c.querySelector(".mc-modal-backdrop2");
Cackle.Fastjs.rm(a);
Cackle.Fastjs.hide2(b)
}};!function(a){"use strict";function b(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c}function c(a,b){return a<<b|a>>>32-b}function d(a,d,e,f,g,h){return b(c(b(b(d,a),b(f,h)),g),e)}function e(a,b,c,e,f,g,h){return d(b&c|~b&e,a,b,f,g,h)}function f(a,b,c,e,f,g,h){return d(b&e|c&~e,a,b,f,g,h)}function g(a,b,c,e,f,g,h){return d(b^c^e,a,b,f,g,h)}function h(a,b,c,e,f,g,h){return d(c^(b|~e),a,b,f,g,h)}function i(a,c){a[c>>5]|=128<<c%32,a[(c+64>>>9<<4)+14]=c;var d,i,j,k,l,m=1732584193,n=-271733879,o=-1732584194,p=271733878;for(d=0;d<a.length;d+=16)i=m,j=n,k=o,l=p,m=e(m,n,o,p,a[d],7,-680876936),p=e(p,m,n,o,a[d+1],12,-389564586),o=e(o,p,m,n,a[d+2],17,606105819),n=e(n,o,p,m,a[d+3],22,-1044525330),m=e(m,n,o,p,a[d+4],7,-176418897),p=e(p,m,n,o,a[d+5],12,1200080426),o=e(o,p,m,n,a[d+6],17,-1473231341),n=e(n,o,p,m,a[d+7],22,-45705983),m=e(m,n,o,p,a[d+8],7,1770035416),p=e(p,m,n,o,a[d+9],12,-1958414417),o=e(o,p,m,n,a[d+10],17,-42063),n=e(n,o,p,m,a[d+11],22,-1990404162),m=e(m,n,o,p,a[d+12],7,1804603682),p=e(p,m,n,o,a[d+13],12,-40341101),o=e(o,p,m,n,a[d+14],17,-1502002290),n=e(n,o,p,m,a[d+15],22,1236535329),m=f(m,n,o,p,a[d+1],5,-165796510),p=f(p,m,n,o,a[d+6],9,-1069501632),o=f(o,p,m,n,a[d+11],14,643717713),n=f(n,o,p,m,a[d],20,-373897302),m=f(m,n,o,p,a[d+5],5,-701558691),p=f(p,m,n,o,a[d+10],9,38016083),o=f(o,p,m,n,a[d+15],14,-660478335),n=f(n,o,p,m,a[d+4],20,-405537848),m=f(m,n,o,p,a[d+9],5,568446438),p=f(p,m,n,o,a[d+14],9,-1019803690),o=f(o,p,m,n,a[d+3],14,-187363961),n=f(n,o,p,m,a[d+8],20,1163531501),m=f(m,n,o,p,a[d+13],5,-1444681467),p=f(p,m,n,o,a[d+2],9,-51403784),o=f(o,p,m,n,a[d+7],14,1735328473),n=f(n,o,p,m,a[d+12],20,-1926607734),m=g(m,n,o,p,a[d+5],4,-378558),p=g(p,m,n,o,a[d+8],11,-2022574463),o=g(o,p,m,n,a[d+11],16,1839030562),n=g(n,o,p,m,a[d+14],23,-35309556),m=g(m,n,o,p,a[d+1],4,-1530992060),p=g(p,m,n,o,a[d+4],11,1272893353),o=g(o,p,m,n,a[d+7],16,-155497632),n=g(n,o,p,m,a[d+10],23,-1094730640),m=g(m,n,o,p,a[d+13],4,681279174),p=g(p,m,n,o,a[d],11,-358537222),o=g(o,p,m,n,a[d+3],16,-722521979),n=g(n,o,p,m,a[d+6],23,76029189),m=g(m,n,o,p,a[d+9],4,-640364487),p=g(p,m,n,o,a[d+12],11,-421815835),o=g(o,p,m,n,a[d+15],16,530742520),n=g(n,o,p,m,a[d+2],23,-995338651),m=h(m,n,o,p,a[d],6,-198630844),p=h(p,m,n,o,a[d+7],10,1126891415),o=h(o,p,m,n,a[d+14],15,-1416354905),n=h(n,o,p,m,a[d+5],21,-57434055),m=h(m,n,o,p,a[d+12],6,1700485571),p=h(p,m,n,o,a[d+3],10,-1894986606),o=h(o,p,m,n,a[d+10],15,-1051523),n=h(n,o,p,m,a[d+1],21,-2054922799),m=h(m,n,o,p,a[d+8],6,1873313359),p=h(p,m,n,o,a[d+15],10,-30611744),o=h(o,p,m,n,a[d+6],15,-1560198380),n=h(n,o,p,m,a[d+13],21,1309151649),m=h(m,n,o,p,a[d+4],6,-145523070),p=h(p,m,n,o,a[d+11],10,-1120210379),o=h(o,p,m,n,a[d+2],15,718787259),n=h(n,o,p,m,a[d+9],21,-343485551),m=b(m,i),n=b(n,j),o=b(o,k),p=b(p,l);return[m,n,o,p]}function j(a){var b,c="";for(b=0;b<32*a.length;b+=8)c+=String.fromCharCode(a[b>>5]>>>b%32&255);return c}function k(a){var b,c=[];for(c[(a.length>>2)-1]=void 0,b=0;b<c.length;b+=1)c[b]=0;for(b=0;b<8*a.length;b+=8)c[b>>5]|=(255&a.charCodeAt(b/8))<<b%32;return c}function l(a){return j(i(k(a),8*a.length))}function m(a,b){var c,d,e=k(a),f=[],g=[];for(f[15]=g[15]=void 0,e.length>16&&(e=i(e,8*a.length)),c=0;16>c;c+=1)f[c]=909522486^e[c],g[c]=1549556828^e[c];return d=i(f.concat(k(b)),512+8*b.length),j(i(g.concat(d),640))}function n(a){var b,c,d="0123456789abcdef",e="";for(c=0;c<a.length;c+=1)b=a.charCodeAt(c),e+=d.charAt(b>>>4&15)+d.charAt(15&b);return e}function o(a){return unescape(encodeURIComponent(a))}function p(a){return l(o(a))}function q(a){return n(p(a))}function r(a,b){return m(o(a),o(b))}function s(a,b){return n(r(a,b))}function t(a,b,c){return b?c?r(b,a):s(b,a):c?p(a):q(a)}"function"==typeof define&&define.amd?define(function(){return t}):a.md5=t}(this);/* Laura Doktorova https://github.com/olado/doT */
(function(){function o(){var a={"&":"&#38;","<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","/":"&#47;"},b=/&(?!#?\w+;)|<|>|"|'|\//g;return function(){return this?this.replace(b,function(c){return a[c]||c}):this}}function p(a,b,c){return(typeof b==="string"?b:b.toString()).replace(a.define||i,function(l,e,f,g){if(e.indexOf("def.")===0)e=e.substring(4);if(!(e in c))if(f===":"){a.defineParams&&g.replace(a.defineParams,function(n,h,d){c[e]={arg:h,text:d}});e in c||(c[e]=g)}else(new Function("def","def['"+
e+"']="+g))(c);return""}).replace(a.use||i,function(l,e){if(a.useParams)e=e.replace(a.useParams,function(g,n,h,d){if(c[h]&&c[h].arg&&d){g=(h+":"+d).replace(/'|\\/g,"_");c.__exp=c.__exp||{};c.__exp[g]=c[h].text.replace(RegExp("(^|[^\\w$])"+c[h].arg+"([^\\w$])","g"),"$1"+d+"$2");return n+"def.__exp['"+g+"']"}});var f=(new Function("def","return "+e))(c);return f?p(a,f,c):f})}function m(a){return a.replace(/\\('|\\)/g,"$1").replace(/[\r\t\n]/g," ")}var j={version:"1.0.1",templateSettings:{evaluate:/\{\{([\s\S]+?(\}?)+)\}\}/g,
interpolate:/\{\{=([\s\S]+?)\}\}/g,encode:/\{\{!([\s\S]+?)\}\}/g,use:/\{\{#([\s\S]+?)\}\}/g,useParams:/(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,define:/\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,defineParams:/^\s*([\w$]+):([\s\S]+)/,conditional:/\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,iterate:/\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,varname:"it",strip:true,append:true,selfcontained:false},template:undefined,
compile:undefined},q;q=function(){return this||(0,eval)("this")}();q.doT=j;String.prototype.encodeHTML=o();var r={append:{start:"'+(",end:")+'",endencode:"||'').toString().encodeHTML()+'"},split:{start:"';out+=(",end:");out+='",endencode:"||'').toString().encodeHTML();out+='"}},i=/$^/;j.template=function(a,b,c){b=b||j.templateSettings;var l=b.append?r.append:
r.split,e,f=0,g;a=b.use||b.define?p(b,a,c||{}):a;a=("var out='"+(b.strip?a.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""):a).replace(/'|\\/g,"\\$&").replace(b.interpolate||i,function(h,d){return l.start+m(d)+l.end}).replace(b.encode||i,function(h,d){e=true;return l.start+m(d)+l.endencode}).replace(b.conditional||i,function(h,d,k){return d?k?"';}else if("+m(k)+"){out+='":"';}else{out+='":k?"';if("+m(k)+"){out+='":"';}out+='"}).replace(b.iterate||i,function(h,
d,k,s){if(!d)return"';} } out+='";f+=1;g=s||"i"+f;d=m(d);return"';var arr"+f+"="+d+";if(arr"+f+"){var "+k+","+g+"=-1,l"+f+"=arr"+f+".length-1;while("+g+"<l"+f+"){"+k+"=arr"+f+"["+g+"+=1];out+='"}).replace(b.evaluate||i,function(h,d){return"';"+m(d)+"out+='"})+"';return out;").replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\r/g,"\\r").replace(/(\s|;|\}|^|\{)out\+='';/g,"$1").replace(/\+''/g,"").replace(/(\s|;|\}|^|\{)out\+=''\+/g,"$1out+=");if(e&&b.selfcontained)a="String.prototype.encodeHTML=("+
o.toString()+"());"+a;try{return new Function(b.varname,a)}catch(n){typeof console!=="undefined"&&console.log("Could not create a template function: "+a);throw n;}};j.compile=function(a,b){return j.template(a,null,b)}})();
Cackle.Comment=Cackle.Comment||{};
Cackle.Comment.lang=Cackle.Comment.lang||{};
Cackle.Comment.lang.en={header:"Comments",commentCount:function(a){return a+" comments"
},from:"sign in",logout:"Logout",placeholder:"Leave your comment...",media:"Upload images",submit:"Post comment",socialSubmit:"share on",rating:"comment rating",ratingUp:"I like the comment",ratingDown:"I do not like the comment",answer:"Reply",nextComments:"Next comments",moderate:"Moderate",commentDeleted:"Comment deleted",guest:"Guest",share:"Share",edit:"Edit",remove:"Remove",save:"Save",cancel:"Cancel",send:"Send",removeConfirm:"Do you really want to delete your comment?",orderbest:"Best",orderdesc:"Newest",orderasc:"Oldest",subscribe:"Subscribe",rss:"RSS",close:"Comments for this thread are now closed",noneComments:"Be the first to comment.",expired:"Comments are disabled",floodError:"Your message looks like flood",banError:"You are banned",banUntil:"until",banReason:"Reason:",bannorule:"Failure to comply with rules of site",baninsult:"Insults, obscene language",banspam:"Spam, unauthorized advertising",bangov:"Inconsistency government requirements",messageBlankError:"Comments can not be blank",messageSmallError:"Comments must have at least 2 characters",messageLimitError:"Your comment is too big",mediaLengthError:"Too much media links",ipBanError:"Your IP address is banned",badWordsError:"Your message has been blocked for foul language",anonymError:"Anonymous comments are disabled",loginError:"Comments from your social provider is disabled, logout and login again",accept:"I accept",agreement:"the user agreement",agreementError:"Please accept the user comment agreement.",commentPreModer:"Your comment will appear here after approval by moderator",notice:"Notice",noticeRead:"Notice read",pay:"Pay",seemore:"see more",prof:"My profile",editProf:"Edit profile",userCount:"Published comments",mycomment:"My comments",upload:"Upload image",notify:"Allow to send notifications about replies",status:"Status",pending:"On moderation",approved:"Approved",deleted:"Deleted",spam:"Marked as SPAM",r0:"Rate post",r1:"Rating of the post",r2:function(a){return Cackle.Time.declineMsg(a,"vote","votes","votes")
},make:"Create your widget",about:"About",rtnew:"New comments",medianet:"Upload from internet",mediapl:"Link to image, video (Youtube, Vimeo)",social:"Sign in with social network",anonym:"or anonymously",anonym2:"Login as guest",social2:"or leave a social comment",grava:"So your avatar will be displayed in the comments. Click if you want to change it.",name:"Name",alogin:"Login as guest",profile:"Account",avatar:"Avatar",comp:"Upload from computer",sett:"Settings",pub:"Show comments in the profile",sub:"Subscriptions to comments",link:"Link to post",itspam:"Mark as spam",complaint:"Complaint",sent:"Complaint sent",url:"Comment link",replies:"Replies"};Cackle.Comment=Cackle.Comment||{};
Cackle.Comment.lang=Cackle.Comment.lang||{};
Cackle.Comment.lang.ru=Cackle.Fastjs.extend(Cackle.Comment.lang.en,{header:"Комментарии",commentCount:function(a){return Cackle.Time.declineNum(a,"комментарий","комментария","комментариев")
},from:"войдите",logout:"Выход",placeholder:"Оставьте свой комментарий...",media:"Добавить изображение",submit:"Комментировать",socialSubmit:"разрешить публиковать в",rating:"Рейтинг комментария",ratingUp:"Нравится комментарий",ratingDown:"Не нравится комментарий",answer:"Ответить",nextComments:"Следующие комментарии",moderate:"Модерировать",commentDeleted:"Комментарий удален",guest:"Гость",share:"Поделиться",edit:"Редактировать",remove:"Удалить",save:"Сохранить",cancel:"Отмена",send:"Отправить",removeConfirm:"Вы действительно хотите удалить свой комментарий?",orderbest:"Лучшие",orderdesc:"Новые",orderasc:"Ранее",subscribe:"Подписаться",close:"Комментарии к этой теме были закрыты",noneComments:"Никто ещё не оставил комментариев, станьте первым.",expired:"Комментарии отключены",floodError:"Ваше сообщение похоже на флуд",banError:"Вы забанены на этом ресурсе",banUntil:"до",banReason:"Причина:",bannorule:"Несоблюдение правил сайта",baninsult:"Мат, оскорбления, нецензурная лексика",banspam:"Спам, несанкционированная реклама",bangov:"Несоответствие требований Роскомнадзора",messageBlankError:"Комментарий не может быть пустым",messageSmallError:"Комментарий должен быть хотя бы 2 символа",messageLimitError:"Ваш комментарий слишком большой",mediaLengthError:"Слишком много медиа ссылок",ipBanError:"Ваш IP адрес забанен",badWordsError:"Ваше сообщение заблокировано за нецензурную лексику",anonymError:"Анонимные комментарии отключены",loginError:"Комментарии от вашего социального провайдера запрещены, выйдите и войдите снова",accept:"Я принимаю",agreement:"условия комментирования",agreementError:"Пожалуйста, примите условия комментирования",commentPreModer:"Ваш комментарий появится сразу после одобрения модератором",notice:"Предупреждение",noticeRead:"Предупреждение прочитано",pay:"Оплатить",seemore:"показать больше",prof:"Мой профиль",editProf:"Редактировать профиль",userCount:"Опубликовано комментариев",mycomment:"Мои комментарии",upload:"Загрузить изображение",notify:"Разрешить присылать уведомления об ответах",status:"Статус",pending:"На модерации",approved:"Одобрен",deleted:"Удален",spam:"Отмечен как СПАМ",r0:"Оцените пост",r1:"Рейтинг поста",r2:function(a){return Cackle.Time.declineMsg(a,"голос","голоса","голосов")
},make:"Создать свой виджет",about:"О сервисе",rtnew:"Новые комментарии",medianet:"Загрузить из интернета",mediapl:"Ссылка на изображение, видео (YouTube, Vimeo)",social:"Войдите через социальную сеть",anonym:"или анонимно",anonym2:"Представьтесь пожалуйста",social2:"или войдите через социальную сеть",grava:"Так будет отображаться ваш аватар в комментариях. Кликните, если хотите его изменить.",name:"Ваше имя",alogin:"Войти как гость",profile:"Аккаунт",avatar:"Аватар",comp:"Загрузить с компьютера",sett:"Настройки",pub:"Показывать комментарии в профиле",sub:"Подписки на новые комментарии",link:"Ссылка на пост",itspam:"Это спам",complaint:"Пожаловаться",sent:"Жалоба отправлена",url:"Ссылка на комментарий",replies:"Ответов"});Cackle.Comment=Cackle.Comment||{};
Cackle.Comment.main=function(j){var f=j.data,g=f.setting,v=j.providers?j.providers.split(";"):(f.login?f.login.providers.split(";"):[]),p=Cackle.Base.getDefaultAvatar(g),o=Cackle.Comment.lang[j.lang],m=48,t=36,z=j.msg&&Cackle.Fastjs.extend(o,j.msg)||o;
j.ratingOff=j.ratingOff||g.setting.ratingOff;
var q={content:'<div class="cc mc-c{{?it.theme}} mc-{{=it.theme}}{{?}}"><div class="mc-head"><ul><li>{{?it.conf.ratingOff}}<div class="mc-comment-count" data-count="0">{{=it.msg.header}}</div>{{??}}<div class="mc-comment-star">{{=it.stars}}</div>{{?}}</li><li class="mc-user-menu" style="display:none"><a class="mc-menu-toggle" href="#"><span class="mc-username"></span> <span class="mcicon-bars"></span></a><ul class="mc-dropdown-menu" style="display:none"><li><a href="#" class="mc-user-prof">{{=it.msg.prof}}</a></li><li><a href="#" class="mc-user-edit">{{=it.msg.editProf}}</a></li>{{?!it.conf.data.wl}}<li><a href="{{!it.reglink}}" target="_blank">{{=it.msg.make}}</a></li><li><a href="{{!it.crlink}}" target="_blank">{{=it.msg.about}}</a></li>{{?}}<li><a href="#" class="mc-logout">{{=it.msg.logout}}</a></li></ul></li>{{?!it.conf.data.wl}}<li class="mc-logo" style="display:inline-block"><a href="{{!it.crlink}}" target="_blank" style="display:inline-block!important"><img src="{{=it.conf.host}}/widget/img/cackle.png" style="display:inline-block!important"></a></li>{{?}}</ul></div>{{?it.conf.data.close}}<div class="mc-alert mc-alert-close"><div class="mc-alert-text">{{=it.msg.close}}</div></div>{{??}}<div class="mc-form">{{=it.postbox}}</div>{{?}}<div class="mc-menu mc-grid"><div class="mc-grid-xs6"><a href="#" class="mc-sort-toggle"><span class="mc-sort-label">{{=it.msg["order" + it.order]}}</span> {{?!it.conf.ratingOff}}<span class="mc-comment-count"></span> {{?}}<span class="mcicon-sort"></span></a>{{=it.sortMenu}}{{=it.sortNav}}</div><div class="mc-grid-xs4"><ul class="mc-nav mc-useract"><li class="mc-subscr-email" style="display:none"><div class="mc-subscr-input-wrap"><input type="text" placeholder="example@mail.com"/></div></li><li><a href="#" class="mc-subscr-toggle"><span class="mcicon-envelope"></span> <span class="mc-navlabel">{{=it.msg.subscribe}}</span></a></li><li class="mc-share-cnt"><a href="#" class="mc-share-toggle"><span class="mcicon-share-alt"></span> <span class="mc-navlabel">{{=it.msg.share}}</span></a><ul class="mc-dropdown-menu" style="display:none"><li><ul class="mc-share-menu"><li><span class="mc-social mc-twitter" data-social="twitter"></span></li><li><span class="mc-social mc-facebook" data-social="facebook"></span></li><li><span class="mc-social mc-googleplus" data-social="googleplus"></span></li><li><span class="mc-social mc-vkontakte" data-social="vkontakte"></span></li><li><span class="mc-social mc-odnoklassniki" data-social="odnoklassniki"></span></li><li><span class="mc-social mc-mymailru" data-social="mymailru"></span></li></ul></li></ul></li></ul></div></div><button class="mc-rt" style="display:none">{{=it.msg.rtnew}} (<span class="mc-rt-count"></span>)</button><div class="mc-nocomments">{{=it.msg.noneComments}}</div><div class="mc-comments">{{=it.comments}}</div><div class="mc-pagination" style="display:none"><button class="mc-btn2 mc-btn2-bck mc-comment-next" data-page="0">{{=it.msg.nextComments}} </button></div></div>',stars:'<span class="mc-star{{?it.ro}} mc-readonly{{??}}" title="{{=it.msg.r0}}{{?}}">{{~[1, 2, 3, 4, 5] :c}}{{?it.r >= c}}<span class="mcicon-star" data-orgcls="mcicon-star" data-star="{{=c}}"></span>{{??}}{{?c - it.r < 1}}<span class="mcicon-star-half-o" data-orgcls="mcicon-star-half-o" data-star="{{=c}}"></span>{{??}}<span class="mcicon-star-o" data-orgcls="mcicon-star-o" data-star="{{=c}}"></span>{{?}}{{?}}{{~}}</span> {{?it.c > 0}}<span itemscope itemtype="http://schema.org/Product" title="{{=it.msg.r1}} {{=it.r}} - {{=it.c}} {{=it.msg.r2(it.c)}}">{{?it.t}}<meta itemprop="name" content="{{!it.t}}">{{?}}{{?it.u}}<meta itemprop="url" content="{{!it.u}}">{{?}}<span class="mc-star-count" itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating"><span itemprop="ratingValue">{{=it.r}}</span> / <span itemprop="ratingCount">{{=it.c}}</span></span></span>{{?}}',crlink:'http://cackle.{{?it.lang="ru"}}me{{??}}me{{?}}/comments',reglink:'http://cackle.me/account/signup?demo=[{"type":"comment","ver":2,"period":1}]&lang={{?it.lang="ru"}}ru{{??}}en{{?}}',postbox:'<div class="mc-postbox"><div class="mc-avatar-cnt">{{=it.avatar}}</div><div class="mc-text-cnt">{{=it.textarea}}</div><div class="mc-auth-cnt"></div><div class="mc-submit-cnt"><div class="mc-submit-left"><div class="mc-social-xpost"><input type="checkbox" rel="button" class="mc-social-xpost-checkbox">{{=it.msg.socialSubmit}}<span class="mc-social-xpost-icon"></span></div></div><button class="mc-btn2 mc-submit">{{=it.msg.submit}}</button></div><div class="mc-clear"></div></div>',textarea:'<div class="mc-text-wrap"><div class="mc-textarea-wrap"><textarea class="mc-textarea" placeholder="{{=it.msg.placeholder}}">{{!it.text}}</textarea><div class="mc-attach-cnt"><a href="#" class="mc-attach-toggle"><span class="mcicon-paper-clip"></span></a><ul class="mc-dropdown-menu" style="display:none"><li><a href="#" class="mc-attachlink"><span class="mcicon-link"></span> {{=it.msg.medianet}}</a><div class="mc-attachlinkbox" style="display:none"><textarea class="mc-attachlink-textarea" placeholder="{{=it.msg.mediapl}}"></textarea><button class="mc-btn2 mc-btn2-sm mc-btn2-bck mc-attachlink-btn">{{=it.msg.media}}</button></div></li><li><a href="#" class="mc-attachimg"><span class="mcicon-camera"></span> {{=it.msg.upload}}</a><input type="file" tabindex="-1" accept="image/*" style="display:none!important"></li></ul></div></div></div>',avatar:'<div class="mc-avatar-wrap"><img src="{{!it.avatar}}" class="mc-avatar" onerror="if(this.src!=\'{{=it.defava}}\')this.src=\'{{=it.defava}}\';"></div>{{?it.social && it.social != "sso"}}<div class="mc-social-wrap"><div class="mc-social mc-{{=it.social}}" style="display:none"></div></div>{{?}}',agreement:'<input type="checkbox"/> {{=it.msg.accept}} <a href="{{=it.url}}" target="_blank" style="text-decoration:underline!important;">{{=it.msg.agreement}}</a>',notice:'{{!it.notice}}<button type="button" class="mc-btn2 mc-notice-agree">{{=it.msg.noticeRead}}</button>',sort:'<ul class="mc-sort {{=it.cls}}" style="{{!it.style}}"><li {{?it.order == "desc"}}class="mc-active"{{?}}><a href="#" data-sort="desc">{{=it.msg.orderdesc}} {{?it.count}}<span class="mc-comment-count"></span>{{?}}<span class="{{=it.clshover}}"></span></a></li><li {{?it.order == "best"}}class="mc-active"{{?}}><a href="#" data-sort="best">{{=it.msg.orderbest}} {{?it.count}}<span class="mc-comment-count"></span>{{?}}<span class="{{=it.clshover}}"></span></a></li><li {{?it.order == "asc"}}class="mc-active"{{?}}><a href="#" data-sort="asc">{{=it.msg.orderasc}} {{?it.count}}<span class="mc-comment-count"></span>{{?}}<span class="{{=it.clshover}}"></span></a></li></ul>',profileView:'<div class="mc-profile-top"><div class="mc-user-img">{{=it.avatar}}</div><div class="mc-user-info"><div class="mc-user-name">{{?it.user.www}}<a href="{{!it.user.www}}" target="_blank">{{?}}{{!it.user.name}}{{?it.user.www}}</a>{{?}}</div><div class="mc-user-count">{{=it.msg.userCount}}: <span></span></div></div></div><div><div class="mc-hr">{{=it.msg.mycomment}}</div><div class="mc-user-ccnt"><div class="mc-user-comments"></div><div class="mc-pagination" style="display:none"><button class="mc-btn2 mc-btn2-bck mc-comment-next">{{=it.msg.nextComments}}</button></div></div></div>',userComment:'{{=it.avatar}}<div class="mc-comment"><span class="mc-comment-author">{{!it.c.author ? it.c.author.name : it.c.anonym.name}}</span><span class="mc-comment-time">{{=it.created}}</span>{{?it.c.status != "approved"}}<span class="mc-comment-status">{{=it.msg[it.c.status]}}</span>{{?}}{{?it.c.rating != 0}}<span class="mc-comment-rating mc-comment-{{?it.c.rating > 0}}up{{??}}down{{?}}"><span class="mcicon-thumbs-up"></span><span class="mcicon-thumbs-down"></span> {{=it.c.rating}}</span>{{?}}<div class="mc-comment-text">{{!it.c.message}}</div></div><div class="mc-comment-link"><a href="{{!it.c.chan.url}}#cc-{{!it.c.id}}" target="_blank"><span class="mcicon-share2"></span> {{!it.c.chan.title || it.c.chan.url}}</a></div>',profileEdit:'<div class="mc-profile-top"><div class="mc-user-img">{{=it.avatar}}</div><div class="mc-user-info">{{?Cackle.Login2.prov[it.user.provider]}}<div class="">{{=it.msg.profile}}: {{=Cackle.Login2.prov[it.user.provider].name}}</div>{{?}}<select><option>{{=it.msg.avatar}}</option><option value="computer">{{=it.msg.comp}}</option>{{?Cackle.Login2.prov[it.user.provider]}}<option value="social">{{=Cackle.Login2.prov[it.user.provider].name}}</option>{{?}}</select><input type="file" tabindex="-1" accept="image/*" style="display:none"><input data-param="name" type="text" placeholder="name" value="{{!it.user.name}}"/><input data-param="www" type="text" placeholder="website" value="{{!it.user.www}}"/><input data-param="avatar" type="hidden" placeholder="photo" value="{{!it.user.avatar}}"/><div class="mc-user-btn"><button class="mc-btn2 mc-profile-cancel">{{=it.msg.cancel}}</button><button class="mc-btn2 mc-profile-save">{{=it.msg.save}}</button></div></div></div><div class="mc-profile-setting"><div class="mc-hr">{{=it.msg.sett}}</div><label><input data-param="publicprof" type="checkbox" {{?it.user.publicprof}}checked="checked"{{?}}/> {{=it.msg.pub}}</label><label><input data-param="notify" type="checkbox" {{?it.user.notify}}checked="checked"{{?}}/> {{=it.msg.notify}}</label></div><div class="mc-profile-subscribtion"><div class="mc-hr">{{=it.msg.sub}}</div><div class="mc-subscr-list"></div><div class="mc-pagination" style="display:none"><button class="mc-btn2 mc-subscr-next">{{=it.msg.nextComments}}</button></div></div>',subscrList:'{{~it.list.content :item}}<div><a href="{{=item.url}}" target="_blank"><span class="mcicon-share2"></span> {{=item.title || it.msg.link}}</a> <span class="mc-subscr-remove mcicon-trash" data-id="{{=item.id}}" data-email="{{=item.email}}"></span></div>{{~}}',comment:'<div class="mc-comment-wrap mc-comment-{{=it.c.status}}{{?it.rt}} mc-comment-new{{?}}"><div class="mc-comment-light"></div><div class="mc-comment-user"><a href="javascript:void(0)" class="mc-comment-author">{{=it.avatar}}</a></div><div class="mc-comment-info"><div class="mc-comment-head">{{?it.u.www}}<a href="{{!it.u.www}}" class="mc-comment-username" data-author-id="{{=it.u.id}}" target="_blank"><span itemprop="author">{{!it.u.name}}</span></a>{{??}}<span class="mc-comment-username" data-author-id="{{=it.u.id}}" itemprop="author">{{!it.u.name}}</span>{{?}}{{?it.c.admin && !it.badgeHide}}<span class="mc-comment-badge">{{=it.badge}}</span>{{?}}{{?it.parentUsername}}<a href="{{!it.url}}#cc-{{=it.c.parentId}}" class="mc-comment-parent"><span class="mcicon-share2"></span> {{!it.parentUsername}}</a>{{?}}<meta itemprop="dateCreated" content="{{=it.dateCreated}}"><a href="{{!it.url}}#cc-{{=it.c.id}}" class="mc-comment-time" timestamp="{{=it.c.created}}">{{=it.time}}</a></div><div class="mc-comment-body">{{=it.commentBody}}</div><div class="mc-comment-footer">{{?!it.close}}<a class="mc-comment-reply" data-id="{{=it.c.id}}" href="#">{{=it.msg.answer}}</a>{{?}}<a class="mc-comment-edit" data-id="{{=it.c.id}}" href="#" style="display:none"><span class="mcicon-edit"></span> <span class="mc-commentlabel">{{=it.msg.edit}}</span></a><a class="mc-comment-remove" data-id="{{=it.c.id}}" href="#" style="display:none"><span class="mcicon-trash"></span> <span class="mc-commentlabel">{{=it.msg.remove}}</span></a><div class="mc-comment-vote"><a href="#" class="mc-comment-dislike mcicon-thumbs-down" data-vote="-1" data-id="{{=it.c.id}}"></a><a href="#" class="mc-comment-like mcicon-thumbs-up" data-vote="1" data-id="{{=it.c.id}}"></a><span class="mc-comment-rating mc-comment-{{?it.c.rating > 0}}up{{??it.c.rating < 0}}down{{?}}" title="{{=it.msg.rating}}">{{=it.c.rating}}</span></div></div></div></div><div class="mc-comment-menu"><a href="#" class="mc-comment-url mcicon-link" data-url="{{!it.url}}#cc-{{=it.c.id}}" title="{{=it.msg.url}}"></a><a href="#" class="mc-comment-share mcicon-share-alt" title="{{=it.msg.share}}"></a><a href="#" class="mc-comment-menu-toggle mcicon-bars"></a><ul class="mc-dropdown-menu" style="display:none"><li><a href="#" data-act="spam" data-id="{{=it.c.id}}">{{=it.msg.itspam}}</a><a href="#" data-act="complaint" data-id="{{=it.c.id}}">{{=it.msg.complaint}}</a></li></ul></div>',commentBody:'<div class="mc-comment-inner" data-msg="{{!it.dataMsg}}" data-media="{{!it.dataMedia}}"><div class="mc-comment-msgcnt"><div class="mc-comment-msg" itemprop="text">{{=it.message}}</div></div><a class="mc-comment-seemore" style="display:none">{{=it.msg.seemore}}</a></div>',edit:'{{=it.textarea}}<button class="mc-btn2 mc-btn2-sm mc-comment-save">{{=it.msg.save}}</button><button class="mc-btn2 mc-btn2-sm mc-comment-cancel">{{=it.msg.cancel}}</button>',complaint:'<div class="mc-complaint"><div class="mc-comment">{{=it.user}}<div class="mc-comment-info">{{=it.head}}{{=it.body}}</div></div><div class="mc-complaint-msg"><div class="mc-text-wrap"><div class="mc-textarea-wrap"><textarea class="mc-textarea" placeholder="{{=it.msg.complaint}}"></textarea></div></div><div class="mc-complaint-btn"><button class="mc-btn2 mc-cancel">{{=it.msg.cancel}}</button><button class="mc-btn2 mc-send">{{=it.msg.send}}</button></div></div></div>',renderContent:function(){return this.render("content",{conf:j,theme:j.theme||g.color,stars:this.renderRating(f.rating),crlink:this.render("crlink",{lang:j.lang}),reglink:this.render("reglink",{lang:j.lang}),postbox:this.renderPostbox(j.id),order:h.getCommentOrder(),sortMenu:this.render("sort",{cls:"mc-dropdown-menu",style:"display:none",clshover:"mcicon-ok",order:h.getCommentOrder()}),sortNav:this.render("sort",{cls:"mc-nav",count:j.ratingOff?!1:1,clshover:"mc-sort-hover",order:h.getCommentOrder()}),comments:""})
},renderRating:function(D){var B=0,A=0;
if(D){var C=D.split(":");
B=parseInt(C[0]);
A=parseInt(C[1])
}return this.render("stars",{c:B,t:j.title||Cackle.Fastjs.title(),u:Cackle.getUrl(j),r:this.calcRate(B,A),ro:y.readonly()})
},calcRate:function(D,A){var B=0;
if(D>0){B+=D
}if(A&&B>0){var C=A/B;
return Cackle.Fastjs.isInteger(C)?C:C.toFixed(1)
}else{return""
}},renderPostbox:function(C,A,B){return this.render("postbox",{avatar:this.renderAvatar(A||p,B),textarea:this.render("textarea",{})})
},renderAvatar:function(A,B){return this.render("avatar",{avatar:A,defava:Cackle.Base.getCackleAvatar(),social:B})
},renderComment:function(D,B,C,A){return this.render("comment",{host:j.host,rt:A,u:B,c:D,close:f.close,badgeHide:j.badgeHide,badge:j.badge||g.badge||"Admin",parentUsername:C,avatar:this.renderAvatar(B.avatar,B.provider),time:Cackle.Time.getTime(D.created,j.lang,j.timeFormat),dateCreated:Cackle.Time.getTime(D.created,j.lang||"ru","yyyy-MM-ddTHH:mm:ss"),url:Cackle.getUrl(j)})
},renderCommentBody:function(A,B){return this.render("commentBody",{dataMsg:A,dataMedia:B,message:Cackle.Base[g.setting.urlRecogn?"escapeHtmlWithLinks":"escapeHtml"](A)})
},renderEdit:function(A){return this.render("edit",{textarea:this.render("textarea",{text:A})})
},renderComplaint:function(B,C,A){return this.render("complaint",{user:B,head:C,body:A})
},render:function(A,B){B.msg=z;
return(doT.template(this[A]||A))(B)
}};
var r={params:{host:j.host,id:j.id,logcb:true,redirect:j.redirect,callbackjs:j.callbackjs,providers:v,avatar:p,anonym:g.anonymEnable,anonymExpand:true,guestFirst:j.guestFirst,guestHideEmail:j.guestHideEmail,theme:j.theme,captchaPub:g.captchaPub,ssoEl:"div",widget:"comment",verifyEmail:g.verifyEmail,ssoAuth:j.ssoAuth,ssoPrimary:j.ssoPrimary,ssoProvider:j.ssoProvider,callback:Cackle.Fastjs.extendcbs(j,{loggedin:function(A){n.init();
h.afterLogin(A);
l.init(h.cnt);
u.updateAppearance()
},logout:function(A){n.init();
h.afterLogin(A);
l.init(h.cnt);
u.updateAppearance();
Cackle.Fastjs.remcl(h.form,"mc-expanded")
}}),msg:z},init:function(A,B){this.params.action=B;
Cackle.Login2.main(A,this.params)
},main:function(B,A,C){this.params.anonym=A;
this.params.action=C;
Cackle.Login2.build(B,this.params)
}};
var e={init:function(A){var B=this,D=A.querySelector(".mc-dropdown-menu"),C=A.querySelector(".mc-menu-toggle");
Cackle.Fastjs.on(C,"click",function(E){Cackle.Fastjs.isVisible(D)?Cackle.Fastjs.hide2(D):Cackle.Fastjs.show2(D);
return false
});
Cackle.Fastjs.on2(A,".mc-user-prof","click",function(F){Cackle.Fastjs.hide2(D);
var E=document.querySelector(".mc-profile.mc-profile-view");
if(E){Cackle.Modal2.show2(E);
return false
}B.initProfile();
return false
});
Cackle.Fastjs.on2(A,".mc-user-edit","click",function(F){Cackle.Fastjs.hide2(D);
var E=document.querySelector(".mc-profile.mc-profile-edit");
if(E){Cackle.Modal2.show2(E);
return false
}B.initEdit();
return false
});
Cackle.Fastjs.on2(A,".mc-logout","click",function(F){Cackle.Fastjs.hide2(D);
var E=document.querySelectorAll(".mc-profile");
Cackle.Fastjs.each(E,function(G){Cackle.Fastjs.rm(G)
});
Cackle.Login2.logout(j);
return false
})
},initProfile:function(){var C=Cackle.Login2.auth||{},H=C.avatar,D=C.hash,E=q.render("profileView",{user:C,avatar:q.renderAvatar(Cackle.Base.getAvatar(H,D,50,g))}),J=Cackle.Modal2.show("mc-profile mc-profile-view",z.prof,null,E),G=J.querySelector(".mc-user-count span"),F=J.querySelector(".mc-user-comments"),B=J.querySelector(".mc-pagination");
var I=function(L){var K=L.commentUserModel,M=0;
Cackle.Fastjs.txt(G,K.count);
Cackle.Fastjs.each(K.comments,function(O){var N=Cackle.Fastjs.create("div","mc-user-comment mc-"+O.status);
N.innerHTML=q.render("userComment",{c:O,avatar:q.renderAvatar(Cackle.Base.getAvatar(H,D,t,g)),created:Cackle.Time.getTime(O.created,j.lang)});
F.appendChild(N);
M+=1
});
if(M>9){Cackle.Fastjs.show2(B)
}else{Cackle.Fastjs.hide2(B)
}};
var A=j.host+"/comment/"+j.id+"/user";
Cackle.PostMessage.get(j.host,A,null,function(K){I(K)
});
Cackle.Fastjs.on(B,"click",function(L){var K=parseInt(B.getAttribute("data-page"))||1;
Cackle.PostMessage.get(j.host,A+"?page="+K,null,function(M){I(M);
B.setAttribute("data-page",K+1)
});
return false
})
},initEdit:function(){var D=Cackle.Login2.auth||{},L=q.renderAvatar(D.avatar),F=q.render("profileEdit",{avatar:L,user:D}),N=Cackle.Modal2.show("mc-profile mc-profile-edit",z.editProf,null,F),E=N.querySelector("img"),B=N.querySelector("select"),J=N.querySelector('input[type="file"]'),G=N.querySelector('input[data-param="avatar"]'),O=N.querySelector(".mc-profile-cancel"),I=N.querySelector(".mc-profile-save"),H=function(P,S){var R=j.host+"/comment/"+j.id+"/user",T=S||{},Q=N.querySelectorAll(".mc-user-info input,.mc-profile-setting input");
Cackle.Fastjs.each(Q,function(V){var U=V.getAttribute("data-param");
T[U]=V[V.getAttribute("type")=="checkbox"?"checked":"value"]
});
Cackle.PostMessage.post(j.host,R,T,function(){P&&P()
})
};
Cackle.Fastjs.on(G,"input",function(){E.src=G.value
});
Cackle.Fastjs.on(B,"change",function(){if(this.value=="computer"){var P=Cackle.Fastjs.next(this);
P.click()
}else{if(this.value=="social"){H(function(){Cackle.Login2.authorize(j,function(){G.value=(E.src=Cackle.Login2.auth.avatar);
h.afterLogin(Cackle.Login2.auth)
})
},{socialimg:true})
}}return false
});
Cackle.Fastjs.on(J,"change",function(){Cackle.Media.uploadFiles(this.files,this,null,function(P){G.value=P;
E.src=P
});
this.value=""
});
Cackle.Fastjs.on(O,"click",function(){Cackle.Modal2.hide(N);
return false
});
Cackle.Fastjs.on(I,"click",function(){H(function(){Cackle.Modal2.hide(N);
Cackle.Login2.authorize(j,function(){h.afterLogin(Cackle.Login2.auth)
})
});
return false
});
Cackle.Fastjs.onall2(N,".mc-profile-setting input","change",function(){H();
return false
});
var A=j.host+"/widget/subscrlist",K=N.querySelector(".mc-subscr-list"),C=N.querySelector(".mc-pagination");
var M=function(P){K.innerHTML=K.innerHTML+q.render("subscrList",{list:P.page});
Cackle.Fastjs.onall2(K,".mc-subscr-remove","click",function(){if(!confirm(z.confirm)){return false
}var R=this,S=this.getAttribute("data-id"),Q=this.getAttribute("data-email");
Cackle.PostMessage.post(j.host,j.host+"/widget/"+S+"/unsubscription",{email:Q},function(){Cackle.Fastjs.rm(R.parentNode)
});
return false
});
if(P.page.numberOfElements>9){Cackle.Fastjs.show2(C)
}else{Cackle.Fastjs.hide2(C)
}};
Cackle.PostMessage.get(j.host,A,null,function(P){M(P)
});
Cackle.Fastjs.on(C,"click",function(Q){var P=parseInt(C.getAttribute("data-page"))||1;
Cackle.PostMessage.get(j.host,A+"?page="+P,null,function(R){M(R);
C.setAttribute("data-page",P+1)
});
return false
})
}};
var x={init:function(D,B){var E=D.querySelector(".mc-attach-cnt"),G=E.querySelector(".mc-dropdown-menu"),I=G.querySelector(".mc-attachlink"),H=G.querySelector(".mc-attachlinkbox"),C=G.querySelector(".mc-attachlink-textarea"),F=E.querySelector(".mc-attach-toggle"),A=D.querySelector(".mc-textarea-wrap");
Cackle.Media.event(G,A);
Cackle.Media.attach(A,B);
Cackle.Fastjs.on(F,"click",function(J){Cackle.Fastjs.isVisible(G)?Cackle.Fastjs.hide2(G):Cackle.Fastjs.show2(G);
return false
});
Cackle.Fastjs.on(I,"click",function(J){Cackle.Fastjs.isVisible(H)?Cackle.Fastjs.hide2(H):Cackle.Fastjs.show2(H);
C.focus();
return false
});
Cackle.Fastjs.on2(G,".mc-attachlink-btn","click",function(J){var K=C.value;
if(K){Cackle.Media.attachImage(K,A);
C.value="";
C.focus()
}return false
})
}};
var s={subscrClick:function(E){var D=this.parentNode,B=Cackle.Login2.auth||{};
if(Cackle.Fastjs.hascl(D,"mc-subscribed")){var C=B&&B.email?B.email:h.cnt.querySelector(".mc-subscr-email input").value;
s.post("unsubscription",C);
h.buildSubscr(false)
}else{if(B&&B.email){s.post("subscription",B.email);
h.buildSubscr(true)
}else{var A=h.cnt.querySelector(".mc-subscr-email");
A.style.display="";
A.querySelector("input").focus();
D.style.display="none"
}}return false
},subscrEmail:function(D){if(D.type=="keyup"&&D.keyCode!=13){return
}var C=this.parentNode,A=C.querySelector("input"),B=A.value;
if(B&&Cackle.Base.validEmail(B)){Cackle.Fastjs.remcl(A,"mc-error");
s.post("subscription",B);
Cackle.Fastjs.hide(".mc-subscr-email",h.cnt);
var E=h.cnt.querySelector(".mc-subscr-toggle");
E.parentNode.style.display="";
h.buildSubscr(true)
}else{Cackle.Fastjs.addcl(A,"mc-error")
}return false
},subscriptionParams:function(A){return{email:A,siteId:j.id,chan:Cackle.getChan(j),url:Cackle.getUrl(j),title:Cackle.Fastjs.title()}
},unsubscriptionParams:function(A){return{email:A}
},post:function(C,B){var A=j.host+"/widget/"+f.sitePageId+"/"+C;
params=this[C+"Params"](B);
Cackle.PostMessage.post(j.host,A,params,function(){var D=(C=="subscription")?"subscribe":"unsubscribe";
Cackle.Fastjs.cbs(j,D,params)
})
}};
var i={init:function(A){Cackle.Fastjs.on2(A,".mc-sort-toggle","click",this.sortToggle);
Cackle.Fastjs.onall2(A,".mc-sort a","click",this.sortAction);
Cackle.Fastjs.on2(A,".mc-share-toggle","click",this.shareMenu);
Cackle.Fastjs.onall2(A,".mc-share-menu span","click",this.sharePost);
Cackle.Fastjs.on2(A,".mc-subscr-toggle","click",s.subscrClick);
Cackle.Fastjs.on2(A,".mc-subscr-email input","keyup",s.subscrEmail);
this.menu=h.cc.querySelector(".mc-menu");
if(this.menu.offsetWidth<700){Cackle.Fastjs.addcl(this.menu,"mc-menu-sm")
}},sortToggle:function(A){var B=h.sortMenu;
B.style.display=Cackle.Fastjs.isVisible(B)?"none":"block";
return false
},sortAction:function(E){var B="mc-active",A=this.getAttribute("data-sort"),D=h.sortMenu.querySelector('a[data-sort="'+A+'"]'),C=h.sortNav.querySelector('a[data-sort="'+A+'"]');
Cackle.Cookie.create("mc-comment-order",A,365);
Cackle.Fastjs.remcl(h.sortMenu.querySelector("."+B),B);
Cackle.Fastjs.remcl(h.sortNav.querySelector("."+B),B);
Cackle.Fastjs.addcl(D.parentNode,B);
Cackle.Fastjs.addcl(C.parentNode,B);
Cackle.Fastjs.txt(h.sortLabel,z["order"+A]);
Cackle.Fastjs.hide2(h.sortMenu);
d.hide();
d.setPage(0);
h.addspin(h.comments);
u.load(function(){h.comments.innerHTML=""
});
return false
},shareMenu:function(){var A=this.parentNode,B=A.querySelector(".mc-dropdown-menu");
B.style.display=Cackle.Fastjs.isVisible(B)?"none":"block";
return false
},sharePost:function(C){var B=Cackle.Fastjs.parents(this,"mc-share-cnt"),E=B.querySelector(".mc-dropdown-menu"),D=this.getAttribute("data-social"),A={};
E.style.display="none";
A.url=Cackle.getUrl(j);
if(D=="twitter"){A.text=Cackle.Fastjs.title()
}Cackle.Social.Share[D](A);
return false
}};
var k={providers:{vkontakte:true,mymailru:true,twitter:true},init:function(A,B){if(this.providers[B]){this.show(A,B)
}else{this.hide(A)
}},show:function(B,E){var C=this,A=Cackle.getCookie("mc-xpost-"+E),D=(g.setting.crossposting==false&&A!="on")||A=="off"?false:true;
Cackle.Fastjs.each(B.querySelectorAll(".mc-social-xpost"),function(F){C.showOne(F,D,E);
F.style.display="inline-block"
})
},showOne:function(A,C,E){var D=A.querySelector(".mc-social-xpost-checkbox"),B=A.querySelector(".mc-social-xpost-icon");
if(!D){return
}D.checked=C;
B.setAttribute("class","mc-social-xpost-icon mc-social mc-"+E);
B.setAttribute("title",Cackle.Login2.prov[E].name);
Cackle.Fastjs.on(D,"click",function(){var F="mc-xpost-"+E;
Cackle.Cookie.create(F,this.checked?"on":"off",365)
})
},hide:function(A){Cackle.Fastjs.each(A.querySelectorAll(".mc-social-xpost"),function(B){Cackle.Fastjs.hide2(B)
})
}};
var l={init:function(B){if(j.agreement){if(Cackle.Login2.isAuthorized()){if(this.isAgreement()){this.removeAll(B);
return
}var C=this,A=B.querySelectorAll(".mc-postbox .mc-submit-left");
Cackle.Fastjs.each(A,function(D){if(!D.querySelector(".mc-agreement")){D.appendChild(C.create())
}})
}else{this.removeAll(B)
}}},isAgreement:function(){if(j.agreement){var B="mc-agreement"+Cackle.Login2.auth.id,A=Cackle.getCookie(B);
if(A=="true"){return true
}else{return false
}}return true
},create:function(){var A=Cackle.Fastjs.create("div","mc-agreement");
A.innerHTML=q.render("agreement",{url:j.agreement});
Cackle.Fastjs.on2(A,"input","change",function(){var B="mc-agreement"+Cackle.Login2.auth.id;
Cackle.Cookie.create(B,this.checked,1000)
});
return A
},removeAll:function(A){var B=A.querySelectorAll(".mc-agreement");
if(B){Cackle.Fastjs.each(B,function(C){Cackle.Fastjs.rm(C)
})
}}};
var w={cl:"mc-admin-menu",MSG:{ru:{guest:"Гость",moderate:"Модерировать",approve:"Одобрить",spam:"Это спам",removeByAdmin:"Удалить",removeAll:"Удалить все",removeAllBan:"Удалить все и забанить",editByAdmin:"Редактировать",banUser:"Забанить пользователя",unbanUser:"Разбанить пользователя",banIp:"Забанить IP",unbanIp:"Разбанить IP",confirm:"Вы уверены, что хотите удалить?"},en:{guest:"Guest",moderate:"Moderate",approve:"Approve",spam:"Spam",removeByAdmin:"Delete",removeAll:"Delete all",removeAllBan:"Delete all and ban",editByAdmin:"Edit",banUser:"Ban user",unbanUser:"Unban user",banIp:"Ban IP",unbanIp:"Unban IP",confirm:"Are you sure you want to delete?"},msg:function(A){lang=j.lang=="ru"?"ru":"en";
return this[lang][A]
}},init:function(A,B,C){if(Cackle.Fastjs.isVisible(C)){this.show(A,B,C)
}else{this.hide(C)
}},show:function(C,E,H){var D=this,B=Cackle.origin+"/comment/"+j.id+"/info.json",G={id:C};
var F=Cackle.Fastjs.create("li",D.cl),A=D.anchor("#","");
H.appendChild(F);
F.appendChild(A);
h.addspin(A);
Cackle.Fastjs.jsonp(B,G,function(I){var J=I.moderateInfo;
D.commentControls(H,C,E,J);
if(!J.comment.anonym){H.appendChild(D.userControl(H,C,E,J))
}H.appendChild(D.ipControl(H,C,J));
Cackle.Fastjs.rm(A)
})
},hide:function(B){Cackle.Fastjs.hide2(B);
var A=B.querySelectorAll("."+this.cl);
if(A){Cackle.Fastjs.each(A,function(C){Cackle.Fastjs.rm(C)
})
}},userControl:function(F,B,C,E){var A=this.getOptContainer(F),D;
if(E.ban){D=this.banControl(F,B,"unban",this.MSG.msg("unbanUser"),C,E.comment.anonym)
}else{D=this.banControl(F,B,"ban",this.MSG.msg("banUser"),C,E.comment.anonym)
}A.appendChild(D);
return A
},ipControl:function(E,B,D){var A=this.getOptContainer(E),C;
if(D.ipban){C=this.banControl(E,B,"unban",this.MSG.msg("unbanIp"))
}else{C=this.banControl(E,B,"ban",this.MSG.msg("banIp"))
}A.appendChild(C);
return A
},commentControls:function(A,E,F,B){var I=this,C=[];
if(B.comment.status==="pending"){C.push("approve");
C.push("removeByAdmin");
C.push("spam")
}else{if(B.comment.status==="approved"){C.push("spam");
C.push("removeByAdmin")
}else{if(B.comment.status==="spam"){C.push("approve");
C.push("removeByAdmin")
}else{C.push("approve");
C.push("spam")
}}}Cackle.Fastjs.each(C,function(K){var J=I.getOptContainer(A);
J.appendChild(I.control(I.MSG.msg(K),function(){var L=j.host+"/comment/"+j.id+"/"+K,M={id:E};
I.refresh(A,L,M);
return false
}));
A.appendChild(J)
});
var D=I.getOptContainer(A);
D.appendChild(I.control(I.MSG.msg("removeAll"),function(){I.endClick(A);
I.deleteAll(E,F);
return false
}));
A.appendChild(D);
var H=I.getOptContainer(A);
H.appendChild(I.control(I.MSG.msg("removeAllBan"),function(){I.endClick(A);
I.deleteAll(E,F,B.comment.anonym,true);
return false
}));
A.appendChild(H);
var G=I.getOptContainer(A);
G.appendChild(I.control(I.MSG.msg("editByAdmin"),function(K){K.data=K.data||{};
K.data.id=E;
K.data.url="/editByAdmin";
var J=c.edit.call(this,K);
I.endClick(A);
return J
}));
A.appendChild(G)
},deleteAll:function(B,C,A,D){if(!confirm(this.MSG.msg("confirm"))){return false
}c.removeAll(B,C,A,D)
},refresh:function(D,A,C){if(A.indexOf("remove")>-1&&!confirm(this.MSG.msg("confirm"))){return
}var B=this;
Cackle.PostMessage.post(j.host,A,C,function(){B.endClick(D)
})
},endClick:function(A){this.hide(A)
},control:function(A,C){var B=this.anchor("#",A);
Cackle.Fastjs.on(B,"click",C);
return B
},getOptContainer:function(A){return A.querySelector("."+this.cl)
},banControl:function(B,G,F,I,H,D){var J=this,A=j.host+"/site/"+j.id+"/"+F,C={commentId:G},E=this.anchor(A,I);
if(H){C[D?"anonymId":"userId"]=H
}else{C.banIp=true
}Cackle.Fastjs.on(E,"click",function(K){J.refresh(B,A,C);
return false
});
return E
},anchor:function(B,A){var C=Cackle.Fastjs.create("a");
C.href=B;
C.innerHTML=A;
C.setAttribute("style","color:#333!important");
return C
}};
var a={validateMsg:function(B,A){if(!B&&!A){return z.messageBlankError
}else{if((g.maxCommentLen&&B.length>g.maxCommentLen)||(!g.maxCommentLen&&B.length>2000)){return z.messageLimitError
}else{if(A&&A.length>1000){return z.mediaLengthError
}}}return
},alert:function(B,A){var C=Cackle.Fastjs.next(B);
if(C&&Cackle.Fastjs.hascl(C,"mc-alert-error")){C.querySelector(".mc-alert-text").innerHTML=A
}else{C=Cackle.Fastjs.create("div","mc-alert mc-alert-error");
C.innerHTML='<div class="mc-alert-text">'+A+"</div>";
Cackle.Fastjs.after(B,C);
setTimeout(function(){Cackle.Fastjs.rm(C)
},10000)
}}};
var d={container:"",init:function(){this.cnt=h.cnt.querySelector(".mc-pagination");
this.next=this.cnt.querySelector(".mc-comment-next");
var A=this;
Cackle.Fastjs.on(this.next,"click",function(){A.click();
return false
})
},setVisible:function(A){if((A.number+1)*A.size<A.totalElements){this.show()
}else{this.hide()
}},setPage:function(A){this.next.setAttribute("data-page",A)
},getPage:function(){return parseInt(this.next.getAttribute("data-page"))
},click:function(){var A=this;
h.addspin(this.next);
this.setPage(this.getPage()+1);
u.load(function(){h.remspin(A.next)
})
},show:function(){Cackle.Fastjs.show2(this.cnt)
},hide:function(){Cackle.Fastjs.hide2(this.cnt)
}};
var b={init:function(A){setInterval(function(){var B=A.querySelectorAll(".mc-comment-time");
if(B){Cackle.Fastjs.each(B,function(C){var D=parseInt(C.getAttribute("timestamp"));
C.innerHTML=Cackle.Time.getTime(D,j.lang,j.timeFormat)
})
}},60000)
}};
var c={submit:function(D,H){if(!Cackle.Login2.isAuthorized()){return
}var F=D.querySelector(".mc-submit"),A=D.querySelector(".mc-textarea"),E=A.value.trim(),G=u.getMedia(D.querySelectorAll(".mc-media-surface")),C=this.submitUrl(D,E,G,H);
var B=a.validateMsg(E,G);
if(B){a.alert(D,B);
return false
}if(!l.isAgreement()){a.alert(D,z.agreementError);
return false
}if(F){h.addspin(F);
F.disabled=true
}Cackle.PostMessage.post(j.host,C.url,C.params,function(K){var I=K.commentResponse;
if(!I){return
}var L=I.comment,J=I.error;
if(L){A.value="";
Cackle.Fastjs.rm2(D,".mc-media-preview");
Cackle.Fastjs.cbs(j,"submit",I);
if(L.status==="pending"){if(H>0){setTimeout(function(){Cackle.Fastjs.hide2(D.parentNode)
},5000)
}a.alert(D,z.commentPreModer)
}else{if(H>0){Cackle.Fastjs.hide2(D.parentNode)
}u.add(L,1,1)
}}else{if(J){a.alert(D,Cackle.Base.error(J,z))
}}},function(){A.focus();
if(F){h.remspin(F);
F.disabled=false
}})
},submitUrl:function(C,D,E,G){var B=j.host+"/widget/"+j.id+"/createComment",F={chan:Cackle.getChan(j),url:Cackle.getUrl(j),title:Cackle.Fastjs.title(),msg:D,media:E,social:""};
if(G>0){F.parentId=G
}var A=C.querySelector(".mc-social-xpost .mc-social-xpost-checkbox");
if(A&&A.checked){F.social="on"
}return{url:B,params:F}
},vote:function(H,G){var E=G||this,B="data-enable";
if(E.getAttribute(B)=="false"){return false
}var D=c,A=j.host+"/comment/"+j.id+"/vote/"+E.getAttribute("data-id")+"/"+E.getAttribute("data-vote");
if((!Cackle.Login2.isAuthorized()||Cackle.Login2.auth.provider=="guest")&&!G){var F=Cackle.Modal2.show("mc-vote-login",z.social,null,'<div class="mc-auth-modal"></div>',1);
r.main(F.querySelector(".mc-auth-modal"),false,function(){Cackle.Fastjs.rm(F);
D.vote(H,E)
});
return false
}var C=E.parentNode.querySelector(".mc-comment-rating");
Cackle.Fastjs.addcl(C,"mc-spin");
E.setAttribute(B,"false");
D.voteajax(A,function(){E.removeAttribute(B,"true");
Cackle.Fastjs.remcl(C,"mc-spin")
});
return false
},voteajax:function(B,A){Cackle.PostMessage.post(j.host,B,null,function(C){if(A){A()
}var D=C.commentSmallDto;
if(D){u.changeRating(D.id,D.rating)
}})
},reply:function(){var D=this.getAttribute("data-id"),G=Cackle.Fastjs.parents(this,"mc-comment"),A=G.querySelector(".mc-comment-wrap"),I="mc-comment-replybox",B=Cackle.Fastjs.next(A),E=Cackle.Fastjs.hascl(B,I);
if(E&&Cackle.Fastjs.isVisible(B)){Cackle.Fastjs.hide2(B)
}else{if(!E){B=Cackle.Fastjs.create("div",I);
var C=Cackle.Login2.auth||{},F=Cackle.Base.getAvatar(C.avatar,C.hash,t,g);
B.innerHTML=q.renderPostbox(D,F,C.provider);
var H=B.querySelector("textarea");
l.init(B);
Cackle.Fastjs.on2(B,".mc-submit","click",function(J){c.submit(B.querySelector(".mc-postbox"),D);
return false
});
x.init(B);
setTimeout(function(){Cackle.AutoSize.main(H)
},100);
Cackle.Fastjs.after(A,B);
r.main(B.querySelector(".mc-auth-cnt"),g.anonymEnable,function(){H.focus()
});
k.init(B,C.provider)
}B.style.display="";
B.querySelector("textarea").focus()
}return false
},edit:function(F){var E=F.data&&F.data.id?F.data.id:this.getAttribute("data-id"),H=Cackle.Fastjs.parents(this,"mc-comment"),L=H.querySelector(".mc-comment-inner"),C=L.getAttribute("data-msg"),B=L.getAttribute("data-media"),K="mc-comment-editbox",J=Cackle.Fastjs.next(L),G=Cackle.Fastjs.hascl(J,K),A=F.data&&F.data.url?F.data.url:"/edit",D=function(){Cackle.Fastjs.hide2(J);
Cackle.Fastjs.show2(L)
};
if(G&&Cackle.Fastjs.isVisible(J)){D()
}else{if(!G){J=Cackle.Fastjs.create("div",K);
J.innerHTML=q.renderEdit(C);
Cackle.Fastjs.hide2(L);
Cackle.Fastjs.after(L,J);
var I=J.querySelector("textarea");
I.style.height=I.scrollHeight+"px";
I.focus();
Cackle.AutoSize.main(J.querySelector("textarea"));
x.init(J,B)
}else{Cackle.Fastjs.hide2(L);
Cackle.Fastjs.show2(J)
}}Cackle.Fastjs.on2(J,".mc-comment-save","click",function(Q){var R=J.querySelector("textarea").value,P=u.getMedia(J.querySelectorAll(".mc-media-surface")),N=a.validateMsg(R,P);
if(N){a.alert(J,N);
return false
}var O=this,M=j.host+"/comment/"+j.id+A;
O.disabled=true;
h.addspin(O);
Cackle.PostMessage.post(j.host,M,{id:E,msg:R,media:P},function(T){if(T&&T.error){a.alert(J,z[T.error])
}var S=h.comments.querySelector("#cc-"+E);
u.changeMessage(S,R,P);
D()
},function(){h.remspin(O);
O.disabled=false
});
return false
});
Cackle.Fastjs.on2(J,".mc-comment-cancel","click",function(M){D();
return false
});
return false
},remove:function(C){if(confirm(z.removeConfirm)){var B=this.getAttribute("data-id"),A=j.host+"/comment/"+B+"/remove";
Cackle.PostMessage.post(j.host,A,{},function(){u.remove(B)
})
}return false
},removeAll:function(C,D,A,F){var B=j.host+"/site/"+j.id+"/ban",E={all:true,status:2,commentId:C};
if(F){E[A?"anonymId":"userId"]=D
}Cackle.PostMessage.post(j.host,B,E,function(){var G=0;
Cackle.Fastjs.each(h.comments.querySelectorAll('.mc-comment[data-author-id="'+D+'"]'),function(H){u.remove(0,H);
G-=1
});
u.addCount(G)
});
return false
},scrollToParent:function(){var A="mc-comment-target",B=this.getAttribute("href"),D=h.comments.querySelector(B.substring(B.indexOf("#"))),C=D.querySelector(".mc-comment-wrap");
Cackle.Fastjs.remcl(h.comments.querySelector("."+A),A);
setTimeout(function(){Cackle.Fastjs.addcl(C,A)
},100);
return true
},menu:function(H,I){var P=c,B=I||this;
if((!Cackle.Login2.isAuthorized()||Cackle.Login2.auth.provider=="guest")&&!I){var N=Cackle.Modal2.show("mc-menu-login",z.social,null,'<div class="mc-auth-modal"></div>',1);
r.main(N.querySelector(".mc-auth-modal"),false,function(){Cackle.Fastjs.rm(N);
P.menu(H,B)
});
return false
}var Q=Cackle.Fastjs.parents(B,"mc-dropdown-menu"),A=B.getAttribute("data-id"),J=B.getAttribute("data-act"),C=function(R){if(R&&R!="false"){a.alert(Q.parentNode,z.sent)
}Cackle.Fastjs.hide2(Q);
w.hide(Q)
};
if(J=="complaint"){var L=Cackle.Fastjs.parents(B,"mc-comment"),E=L.querySelector(".mc-comment-user").outerHTML,K=L.querySelector(".mc-comment-head").outerHTML,G=L.querySelector(".mc-comment-body").outerHTML,F=q.renderComplaint(E,K,G),N=Cackle.Modal2.show("mc-complaint",z.complaint,null,F,1),M=N.querySelector(".mc-textarea"),D=N.querySelector(".mc-send"),O=N.querySelector(".mc-cancel");
M.focus();
Cackle.AutoSize.main(M);
C(!1);
Cackle.Fastjs.on(D,"click",function(S){var R=this,U=M.value;
if(U){var T=N.querySelector(".mc-complaint-msg");
if(U.length<2){a.alert(T,z.messageSmallError);
return false
}else{if(U.length>1000){a.alert(T,z.messageLimitError);
return false
}}h.addspin(R);
P.complaintajax(A,!1,U,function(V){h.remspin(R);
Cackle.Fastjs.rm(N);
C(V)
})
}else{M.focus()
}return false
});
Cackle.Fastjs.on(O,"click",function(R){Cackle.Fastjs.rm(N);
return false
})
}else{P.complaintajax(A,true,!1,C)
}return false
},complaintajax:function(F,C,D,A){var B=j.host+"/comment/"+j.id+"/complaint/"+F,E=null;
if(C){E={spam:true}
}else{if(D){E={complaint:D}
}}if(E){Cackle.PostMessage.post(j.host,B,E,function(G){A&&A(G)
})
}},url:function(){var B='<input type="text" value="'+this.getAttribute("data-url")+'"></input>',C=Cackle.Modal2.show("mc-comment-url",z.url,null,B,1),A=C.querySelector("input");
A.select();
return false
},share:function(){var G=Cackle.Fastjs.parents(this,"mc-comment"),C=G.querySelector(".mc-comment-wrap"),B=C.querySelector(".mc-comment-time").getAttribute("href"),H=C.querySelector(".mc-comment-username").textContent,J=C.querySelector(".mc-comment-msg").textContent;
var E,D=C.querySelector(".mc-comment-media a");
if(D){E=D.getAttribute("href")
}else{E=G.querySelector(".mc-avatar").getAttribute("src")
}var A=j.shareSocial||["vkontakte","odnoklassniki","mymailru","facebook","twitter","googleplus"],F=q.render(Cackle.Login2.soctemp,{provs:A}),I=Cackle.Modal2.show("mc-comment-share",z.share,null,F,1);
Cackle.Fastjs.onall(I.querySelectorAll(".mc-auth-btn"),"click",function(K){Cackle.Social.Share[this.getAttribute("data-provider")]({url:B,title:H,text:J,img:E});
return false
});
return false
}};
var u={count:0,usernames:{},init:function(B){if(B){var A=this;
Cackle.Fastjs.each(B.content,function(C){A.add(C)
});
this.setCount(B.totalElements);
d.setVisible(B)
}},addCount:function(A){this.count+=A;
this.setCount(this.count)
},setCount:function(D){var A=parseInt(D);
if(A>0){this.count=D;
if(j.ratingOff==true){var E=h.cnt.querySelector(".mc-comment-count");
E.innerHTML=z.commentCount(A);
E.setAttribute("data-count",A)
}else{var C=h.cnt.querySelectorAll(".mc-comment-count");
Cackle.Fastjs.each(C,function(F){F.innerHTML="("+A+")"
})
}if(j.countContainer){var B=document.getElementById(j.countContainer);
if(B){B.innerHTML=A
}}}},load:function(A){if(f.sitePageId==0){A&&A();
return
}var C=this,D=Cackle.Login2.auth||{};
var B=j.host+"/widget/"+j.id+(D.moderator?"/fullComments":"/comments"),E={sitePage:f.sitePageId,order:h.getCommentOrder(),page:d.getPage(),size:j.size||g.pagination};
Cackle.Fastjs.jsonp(B,E,function(F){A&&A();
C.init(F.page)
})
},add:function(F,G,E,B){var D=document.getElementById("cc-"+F.id),J=null;
if(D){J=Cackle.Fastjs.child(D,"mc-comment-wrap");
if(!Cackle.Fastjs.hascl(J,"mc-comment-deleted")){J.setAttribute("class","mc-comment-wrap mc-comment-"+F.status);
return
}}Cackle.Fastjs.rm2(h.cnt,".mc-nocomments");
var K=h.comments;
if(F.parentId>0){if(!(K=this.getParentCnt(F))){return
}if((j.level||g.level)<F.path.length+1){Cackle.Fastjs.addcl(K,"mc-lastlvl")
}}var H=Cackle.Fastjs.create("div","mc-comment"),C=this.getUser(F);
this.usernames[F.id]=C.name;
H.setAttribute("id","cc-"+F.id);
H.setAttribute("data-author-id",C.id);
H.setAttribute("itemtype","http://schema.org/Comment");
H.setAttribute("itemscope","itemscope");
H.innerHTML=q.renderComment(F,C,this.usernames[F.parentId],B);
this.initActs(H,F.id,C.id);
this.updateUserBtn(H,C.id,F.created);
this.changeMessage(H,F.message,F.media);
var A=H.querySelector(".mc-comment-wrap");
if(D){Cackle.Fastjs.rm(J);
Cackle.Fastjs.prependSlide(A,D)
}else{if(G){if(E){Cackle.Fastjs.prependSlide(H,K)
}else{Cackle.Fastjs.prepend(K,H)
}}else{K.appendChild(H)
}}if(B){setTimeout(function(){Cackle.Fastjs.addcl(A,"mc-comment-seen")
},1);
setTimeout(function(){Cackle.Fastjs.remcl(A,"mc-comment-new");
Cackle.Fastjs.remcl(A,"mc-comment-seen")
},10000)
}var I=H.querySelector(".mc-comment-footer");
if(I.offsetWidth<300){Cackle.Fastjs.addcl(I,"mc-footer-sm")
}},getUser:function(F){var E=F.author,D=F.anonym,B=0,A="",G="",C="",H="",I=F.parentId>0?t:m;
if(E){B=E.id;
A=E.name;
G=Cackle.Base.getAvatar(E.avatar,E.hash,I,g);
H=E.provider!="sso"?E.provider:"";
if(E.www&&!g.denyWww){C=E.www.match("^https?://")?E.www:"http://"+E.www
}}else{if(D){B=D.id;
A=D.name;
G=Cackle.Base.getAvatar(null,D.hash,I,g);
if(D.www&&!g.denyWww){C=D.www.match("^https?://")?D.www:"http://"+D.www
}}}return{id:B,name:A||z.guest,avatar:G,www:C,provider:H}
},initActs:function(A,C,B){if(!j.demo){Cackle.Fastjs.on(A.querySelector(".mc-comment-like"),"click",c.vote);
Cackle.Fastjs.on(A.querySelector(".mc-comment-dislike"),"click",c.vote);
Cackle.Fastjs.on(A.querySelector(".mc-comment-reply"),"click",c.reply);
Cackle.Fastjs.on(A.querySelector(".mc-comment-edit"),"click",c.edit);
Cackle.Fastjs.on(A.querySelector(".mc-comment-remove"),"click",c.remove);
Cackle.Fastjs.on(A.querySelector(".mc-comment-parent"),"click",c.scrollToParent);
Cackle.Fastjs.on(A.querySelector(".mc-comment-menu-toggle"),"click",function(D){var E=Cackle.Fastjs.next(this);
if(Cackle.Fastjs.isVisible(E)){E.style.display="none"
}else{E.style.display="block"
}if(Cackle.Login2.isModerator()){w.init(C,B,E)
}return false
});
Cackle.Fastjs.onall(A.querySelectorAll(".mc-comment-menu .mc-dropdown-menu a"),"click",c.menu);
Cackle.Fastjs.on(A.querySelector(".mc-comment-url"),"click",c.url);
Cackle.Fastjs.on(A.querySelector(".mc-comment-share"),"click",c.share)
}},updateAppearance:function(){var D=h.comments.querySelectorAll(".mc-comment-approved");
for(var A=0;
A<D.length;
A++){var F=D[A].querySelector(".mc-comment-username"),B=parseInt(F.getAttribute("data-author-id")),E=D[A].querySelector(".mc-comment-time"),C=parseInt(E.getAttribute("timestamp"));
this.updateUserBtn(D[A],B,C)
}},updateUserBtn:function(A,B,C){this.updateUserBtnState(A,g.editComment,".mc-comment-edit",B,C);
this.updateUserBtnState(A,g.removeComment,".mc-comment-remove",B,C)
},updateUserBtnState:function(B,F,A,E,G){var C=Cackle.Login2.auth;
if(!C){return
}if(F==null&&C.id===E){Cackle.Fastjs.show(A,B)
}else{if(F==0||C.id!=E){Cackle.Fastjs.hide(A,B)
}else{if(F>0&&C.id===E){var D=new Date().getTime();
if(G+(F*60*1000)<D){Cackle.Fastjs.hide(A,B)
}else{Cackle.Fastjs.show(A,B)
}}else{Cackle.Fastjs.hide(A,B)
}}}},getParentCnt:function(G){var A=document.getElementById("cc-"+G.parentId);
if(A){return this.getChildCnt(A)
}if(!G.path){return null
}var C=h.comments;
for(var B=0;
B<G.path.length;
B++){var F=G.path[B],E=document.getElementById("cc-"+F);
if(E){C=this.getChildCnt(E)
}else{var D=this.makeCommentRoot(F,"deleted");
C.appendChild(D);
C=this.getChildCnt(D)
}}return C
},getChildCnt:function(A){var B=Cackle.Fastjs.child(A,"mc-comment-child");
if(B){return B
}else{B=Cackle.Fastjs.create("div","mc-comment-child");
A.appendChild(B);
return B
}},makeCommentRoot:function(C,B){var A=Cackle.Fastjs.create("div");
A.setAttribute("id","cc-"+C);
A.innerHTML=this.makeCommentWrap(B);
return A
},makeCommentWrap:function(A){return'<div class="mc-comment-wrap mc-comment-'+A+'">'+z.commentDeleted+"</div>"
},getMedia:function(A){var B="";
if(A){Cackle.Fastjs.each(A,function(C){B+=" "+C.getAttribute("data-media")
})
}return B.trim()
},changeMessage:function(B,G,F){var E=this,A=B.querySelector(".mc-comment-body");
A.innerHTML=q.renderCommentBody(G,F);
var C=B.querySelector(".mc-comment-msgcnt");
if(g.media&&(G||F)){var D=Cackle.Media.makeContent(G+" "+F,false,function(){E.setTextHigh(C)
});
if(D){C.appendChild(D)
}}else{this.setTextHigh(C)
}},setTextHigh:function(A){if(j.textHigh==0){return
}var B=j.textHigh||374;
if(A.offsetHeight>1.5*B){Cackle.Fastjs.css(A,"height",B);
var C=Cackle.Fastjs.next(A);
Cackle.Fastjs.on(C,"click",function(){A.style.height="";
var D=A.offsetHeight;
Cackle.Fastjs.css(A,"height",B);
setTimeout(function(){Cackle.Fastjs.transCss(A,"height",D);
Cackle.Fastjs.css(A,"height",D)
},1);
setTimeout(function(){C.style.display="none";
A.setAttribute("style","")
},500)
});
C.style.display=""
}},changeRating:function(D,C){var B=h.comments.querySelector("#cc-"+D+" .mc-comment-rating");
if(!B){return
}var A="mc-comment-rating";
if(C>0){A+=" mc-comment-up"
}else{if(C<0){A+=" mc-comment-down"
}}B.setAttribute("class",A);
B.innerHTML=C
},changeStatus:function(B,A){var D=document.getElementById("cc-"+B);
if(!D){return
}if(Cackle.Login2.isModerator()&&A!="deleted"){var C=Cackle.Fastjs.child(D,"mc-comment-wrap");
C.setAttribute("class","mc-comment-wrap mc-comment-"+A)
}else{this.remove(B,D)
}this.addCount(A=="approved"?1:-1)
},remove:function(C,A){A=A||document.getElementById("cc-"+C);
if(A.querySelector(".mc-comment-child")){var B=A.querySelector(".mc-comment-wrap");
B.innerHTML=z.commentDeleted;
B.className="mc-comment-wrap mc-comment-deleted"
}else{Cackle.Fastjs.rm(A)
}}};
var n={streamId:null,rtcomments:{"0":[]},init:function(){var A=this;
if(this.streamId){Cackle.Stream.stop(this.streamId)
}if(f.sitePageId>0){this.streamId="cc"+f.sitePageId;
if(Cackle.Login2.isAuthorized()){this.streamId+="/user"+Cackle.Login2.auth.id
}Cackle.Stream.start(this.streamId,function(B){A.dispatcher(B);
Cackle.Fastjs.cbs(j,B.event,B)
})
}this.initActs()
},dispatcher:function(B){if(B.event==="status"){if(B.status==="approved"&&!Cackle.Login2.isModerator()){this.newcomment(B)
}else{u.changeStatus(B.id,B.status)
}}else{if(B.event==="vote"){u.changeRating(B.id,B.rating)
}else{if(B.event==="edit"){var A=document.getElementById("cc-"+B.id);
if(A){u.changeMessage(A,B.msg,B.media)
}}else{if(B.event==="notice"){h.buildNotice(B.msg)
}else{if(B.status==="approved"||Cackle.Login2.isModerator()){this.newcomment(B)
}}}}}},initActs:function(){var A=this;
Cackle.Fastjs.on(h.rt,"click",function(B){Cackle.Fastjs.each(A.rtcomments[0],function(C){u.add(C,1,!1,1)
});
A.rtcomments[0]=[];
Cackle.Fastjs.hide2(h.rt);
return false
})
},newcomment:function(A){u.addCount(1);
if(j.stream){u.add(A,1,1)
}else{if(Cackle.Login2.auth&&Cackle.Login2.auth.id!=(A.author?A.author.id:A.anonym.id)){if(!A.parentId||!this.newreply(A)){this.rtcomments[0].push(A);
h.rtcount.innerHTML=this.rtcomments[0].length;
Cackle.Fastjs.show2(h.rt)
}}}},newreply:function(H){var F=this,G=H.path.reverse();
for(var C=0;
C<G.length;
C++){var B=G[C],E=document.getElementById("cc-"+B);
if(E){this.rtcomments[B]=this.rtcomments[B]||[];
this.rtcomments[B].push(H);
var A=E.querySelector(".mc-comment-rtreply");
if(!A){A=Cackle.Fastjs.create("a","mc-comment-rtreply");
A.setAttribute("href","#");
var D=E.querySelector(".mc-comment-reply");
Cackle.Fastjs.after(D,A);
Cackle.Fastjs.on(A,"click",function(I){Cackle.Fastjs.each(F.rtcomments[B],function(J){u.add(J,1,!1,1)
});
F.rtcomments[B]=[];
Cackle.Fastjs.rm(A);
return false
})
}A.innerHTML=z.replies+" ("+this.rtcomments[B].length+")";
return true
}}return false
}};
var y={cn:"cc-rating",init:function(){if(!j.ratingOff&&!this.readonly()){var B=this,A=h.cnt.querySelector(".mc-star");
Cackle.Fastjs.onall2(A,"span","mouseover",function(){B.prevHover(this);
B.nextHover(this)
});
Cackle.Fastjs.on(A,"mouseout",function(C){Cackle.Fastjs.each(this.querySelectorAll("span"),function(D){D.className=D.getAttribute("data-orgcls")
})
});
Cackle.Fastjs.onall2(A,"span","click",function(){var C={siteId:j.id,star:this.getAttribute("data-star"),chan:Cackle.getChan(j),url:Cackle.getUrl(j),title:Cackle.Fastjs.title()};
Cackle.PostMessage.post(j.host,j.host+"/comment/"+j.id+"/rating/submit",C,function(D){var F=D.split(":");
if(F.length>2){var E=parseInt(F[2]);
if(E>0){f.sitePageId=E;
Cackle.Cookie.create(B.cn+E,"true",365)
}}h.rating.innerHTML=q.renderRating(D)
});
return false
})
}},prevHover:function(A){if(A){A.className="mcicon-star";
this.prevHover(Cackle.Fastjs.prev(A))
}},nextHover:function(A){var B=Cackle.Fastjs.next(A);
if(B){B.className="mcicon-star-o";
this.nextHover(B)
}},readonly:function(){return Cackle.getCookie(this.cn+f.sitePageId)
}};
var h={init:function(){this.cnt=document.getElementById(j.container||"mc-container");
this.cnt.innerHTML=q.renderContent();
this.cc=this.cnt.querySelector(".cc");
this.rating=this.cc.querySelector(".mc-comment-star");
this.usermenu=this.cc.querySelector(".mc-user-menu");
this.usermenuName=this.usermenu.querySelector(".mc-username");
this.form=this.cc.querySelector(".mc-form");
if(this.form){this.formTextarea=this.form.querySelector(".mc-textarea");
this.formTextareaWrap=this.form.querySelector(".mc-textarea-wrap")
}this.sortMenu=this.cnt.querySelector(".mc-sort.mc-dropdown-menu");
this.sortNav=this.cnt.querySelector(".mc-sort.mc-nav");
this.sortToggle=this.cnt.querySelector(".mc-sort-toggle");
this.sortLabel=this.sortToggle.querySelector(".mc-sort-label");
this.rt=this.cnt.querySelector(".mc-rt");
this.rtcount=this.rt.querySelector(".mc-rt-count");
this.comments=this.cnt.querySelector(".mc-comments");
if(!f.close){var A=this;
r.init(this.cnt.querySelector(".mc-auth-cnt"),function(){});
e.init(this.usermenu);
x.init(this.form);
i.init(this.cnt);
Cackle.AutoSize.main(this.formTextarea);
Cackle.Fastjs.on(this.formTextarea,"mousedown",function(){Cackle.Fastjs.addcl(A.form,"mc-expanded");
A.formTextarea.focus()
});
Cackle.Fastjs.on2(this.form,".mc-submit","click",function(B){c.submit(A.form.querySelector(".mc-postbox"),0);
return false
})
}y.init();
d.init();
u.init(f.comments);
b.init(this.comments)
},setFormAvatar:function(A,C){var B=this.cnt.querySelectorAll(".mc-avatar-cnt");
Cackle.Fastjs.each(B,function(D){D.innerHTML=q.renderAvatar(A,C)
})
},afterLogin:function(A){A=A||{};
if(Cackle.Login2.isAuthorized()){Cackle.Fastjs.addcl(this.cc,"mc-loggedin");
if(A.moderator){Cackle.Fastjs.addcl(this.cc,"mc-admin")
}if(A.notice){this.buildNotice(A.notice)
}var B=Cackle.Base.getAvatar(A.avatar,A.hash,m,g);
this.setFormAvatar(B,A.provider)
}else{Cackle.Fastjs.remcl(this.cc,"mc-loggedin");
Cackle.Fastjs.remcl(this.cc,"mc-admin");
this.setFormAvatar(p)
}Cackle.Fastjs.txt(this.usermenuName,A.name);
k.init(this.cnt,A.provider);
this.buildSubscr(A.subscribed)
},getCommentOrder:function(){return Cackle.Cookie.read("mc-comment-order")||j.sort||g.sort||"desc"
},buildNotice:function(C){var A=q.render("notice",{notice:C}),B=Cackle.Modal2.show("mc-modal-notice",z.notice,"",A,1);
Cackle.Fastjs.on2(B,".mc-notice-agree","click",function(){var D=j.host+"/widget/"+j.id+"/notice/read";
Cackle.PostMessage.post(j.host,D,null);
Cackle.Fastjs.rm(B);
Cackle.Modal2.hide(B)
})
},buildSubscr:function(D){var C=this.cnt.querySelector(".mc-subscr-toggle");
var B=C.parentNode,A="mc-subscribed";
if(D){Cackle.Fastjs.addcl(B,A);
C.appendChild(Cackle.Fastjs.create("i","mcicon-ok"))
}else{Cackle.Fastjs.remcl(B,A);
Cackle.Fastjs.rm2(this.cnt,".mc-subscr-toggle .mcicon-ok")
}},addspin:function(B,A){if(A){B.innerHTML=""
}Cackle.Fastjs.prepend(B,this.spin())
},remspin:function(A){Cackle.Fastjs.each(A.querySelectorAll(".mc-spin2"),function(B){Cackle.Fastjs.rm(B)
})
},spin:function(){var A=Cackle.Fastjs.create("span");
A.innerHTML='<svg class="mc-spin2" width="16px" height="16px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="mc-path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg>';
return A
}};
h.init();
n.init();
Cackle.Base.gotoId("cc");
Cackle.Fastjs.cbs(j,"ready")
};