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
Cackle.Storage.init();var Cackle=Cackle||{};
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
}}};/* Laura Doktorova https://github.com/olado/doT */
(function(){function o(){var a={"&":"&#38;","<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","/":"&#47;"},b=/&(?!#?\w+;)|<|>|"|'|\//g;return function(){return this?this.replace(b,function(c){return a[c]||c}):this}}function p(a,b,c){return(typeof b==="string"?b:b.toString()).replace(a.define||i,function(l,e,f,g){if(e.indexOf("def.")===0)e=e.substring(4);if(!(e in c))if(f===":"){a.defineParams&&g.replace(a.defineParams,function(n,h,d){c[e]={arg:h,text:d}});e in c||(c[e]=g)}else(new Function("def","def['"+
e+"']="+g))(c);return""}).replace(a.use||i,function(l,e){if(a.useParams)e=e.replace(a.useParams,function(g,n,h,d){if(c[h]&&c[h].arg&&d){g=(h+":"+d).replace(/'|\\/g,"_");c.__exp=c.__exp||{};c.__exp[g]=c[h].text.replace(RegExp("(^|[^\\w$])"+c[h].arg+"([^\\w$])","g"),"$1"+d+"$2");return n+"def.__exp['"+g+"']"}});var f=(new Function("def","return "+e))(c);return f?p(a,f,c):f})}function m(a){return a.replace(/\\('|\\)/g,"$1").replace(/[\r\t\n]/g," ")}var j={version:"1.0.1",templateSettings:{evaluate:/\{\{([\s\S]+?(\}?)+)\}\}/g,
interpolate:/\{\{=([\s\S]+?)\}\}/g,encode:/\{\{!([\s\S]+?)\}\}/g,use:/\{\{#([\s\S]+?)\}\}/g,useParams:/(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,define:/\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,defineParams:/^\s*([\w$]+):([\s\S]+)/,conditional:/\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,iterate:/\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,varname:"it",strip:true,append:true,selfcontained:false},template:undefined,
compile:undefined},q;q=function(){return this||(0,eval)("this")}();q.doT=j;String.prototype.encodeHTML=o();var r={append:{start:"'+(",end:")+'",endencode:"||'').toString().encodeHTML()+'"},split:{start:"';out+=(",end:");out+='",endencode:"||'').toString().encodeHTML();out+='"}},i=/$^/;j.template=function(a,b,c){b=b||j.templateSettings;var l=b.append?r.append:
r.split,e,f=0,g;a=b.use||b.define?p(b,a,c||{}):a;a=("var out='"+(b.strip?a.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""):a).replace(/'|\\/g,"\\$&").replace(b.interpolate||i,function(h,d){return l.start+m(d)+l.end}).replace(b.encode||i,function(h,d){e=true;return l.start+m(d)+l.endencode}).replace(b.conditional||i,function(h,d,k){return d?k?"';}else if("+m(k)+"){out+='":"';}else{out+='":k?"';if("+m(k)+"){out+='":"';}out+='"}).replace(b.iterate||i,function(h,
d,k,s){if(!d)return"';} } out+='";f+=1;g=s||"i"+f;d=m(d);return"';var arr"+f+"="+d+";if(arr"+f+"){var "+k+","+g+"=-1,l"+f+"=arr"+f+".length-1;while("+g+"<l"+f+"){"+k+"=arr"+f+"["+g+"+=1];out+='"}).replace(b.evaluate||i,function(h,d){return"';"+m(d)+"out+='"})+"';return out;").replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\r/g,"\\r").replace(/(\s|;|\}|^|\{)out\+='';/g,"$1").replace(/\+''/g,"").replace(/(\s|;|\}|^|\{)out\+=''\+/g,"$1out+=");if(e&&b.selfcontained)a="String.prototype.encodeHTML=("+
o.toString()+"());"+a;try{return new Function(b.varname,a)}catch(n){typeof console!=="undefined"&&console.log("Could not create a template function: "+a);throw n;}};j.compile=function(a,b){return j.template(a,null,b)}})();
Cackle.AutoSize=Cackle.AutoSize||{css:"position:absolute!important;top:-999px!important;left:0!important;right:auto!important;bottom:auto!important;border:0!important;padding: 0!important;-moz-box-sizing:content-box!important;-webkit-box-sizing:content-box!important;box-sizing:content-box!important;word-wrap:break-word!important;height:0!important;min-height:0!important;overflow:hidden!important;transition:none!important;-webkit-transition:none!important;-moz-transition:none!important;"};
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
};var Cackle=Cackle||{};
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
}};!function(a){"use strict";function b(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c}function c(a,b){return a<<b|a>>>32-b}function d(a,d,e,f,g,h){return b(c(b(b(d,a),b(f,h)),g),e)}function e(a,b,c,e,f,g,h){return d(b&c|~b&e,a,b,f,g,h)}function f(a,b,c,e,f,g,h){return d(b&e|c&~e,a,b,f,g,h)}function g(a,b,c,e,f,g,h){return d(b^c^e,a,b,f,g,h)}function h(a,b,c,e,f,g,h){return d(c^(b|~e),a,b,f,g,h)}function i(a,c){a[c>>5]|=128<<c%32,a[(c+64>>>9<<4)+14]=c;var d,i,j,k,l,m=1732584193,n=-271733879,o=-1732584194,p=271733878;for(d=0;d<a.length;d+=16)i=m,j=n,k=o,l=p,m=e(m,n,o,p,a[d],7,-680876936),p=e(p,m,n,o,a[d+1],12,-389564586),o=e(o,p,m,n,a[d+2],17,606105819),n=e(n,o,p,m,a[d+3],22,-1044525330),m=e(m,n,o,p,a[d+4],7,-176418897),p=e(p,m,n,o,a[d+5],12,1200080426),o=e(o,p,m,n,a[d+6],17,-1473231341),n=e(n,o,p,m,a[d+7],22,-45705983),m=e(m,n,o,p,a[d+8],7,1770035416),p=e(p,m,n,o,a[d+9],12,-1958414417),o=e(o,p,m,n,a[d+10],17,-42063),n=e(n,o,p,m,a[d+11],22,-1990404162),m=e(m,n,o,p,a[d+12],7,1804603682),p=e(p,m,n,o,a[d+13],12,-40341101),o=e(o,p,m,n,a[d+14],17,-1502002290),n=e(n,o,p,m,a[d+15],22,1236535329),m=f(m,n,o,p,a[d+1],5,-165796510),p=f(p,m,n,o,a[d+6],9,-1069501632),o=f(o,p,m,n,a[d+11],14,643717713),n=f(n,o,p,m,a[d],20,-373897302),m=f(m,n,o,p,a[d+5],5,-701558691),p=f(p,m,n,o,a[d+10],9,38016083),o=f(o,p,m,n,a[d+15],14,-660478335),n=f(n,o,p,m,a[d+4],20,-405537848),m=f(m,n,o,p,a[d+9],5,568446438),p=f(p,m,n,o,a[d+14],9,-1019803690),o=f(o,p,m,n,a[d+3],14,-187363961),n=f(n,o,p,m,a[d+8],20,1163531501),m=f(m,n,o,p,a[d+13],5,-1444681467),p=f(p,m,n,o,a[d+2],9,-51403784),o=f(o,p,m,n,a[d+7],14,1735328473),n=f(n,o,p,m,a[d+12],20,-1926607734),m=g(m,n,o,p,a[d+5],4,-378558),p=g(p,m,n,o,a[d+8],11,-2022574463),o=g(o,p,m,n,a[d+11],16,1839030562),n=g(n,o,p,m,a[d+14],23,-35309556),m=g(m,n,o,p,a[d+1],4,-1530992060),p=g(p,m,n,o,a[d+4],11,1272893353),o=g(o,p,m,n,a[d+7],16,-155497632),n=g(n,o,p,m,a[d+10],23,-1094730640),m=g(m,n,o,p,a[d+13],4,681279174),p=g(p,m,n,o,a[d],11,-358537222),o=g(o,p,m,n,a[d+3],16,-722521979),n=g(n,o,p,m,a[d+6],23,76029189),m=g(m,n,o,p,a[d+9],4,-640364487),p=g(p,m,n,o,a[d+12],11,-421815835),o=g(o,p,m,n,a[d+15],16,530742520),n=g(n,o,p,m,a[d+2],23,-995338651),m=h(m,n,o,p,a[d],6,-198630844),p=h(p,m,n,o,a[d+7],10,1126891415),o=h(o,p,m,n,a[d+14],15,-1416354905),n=h(n,o,p,m,a[d+5],21,-57434055),m=h(m,n,o,p,a[d+12],6,1700485571),p=h(p,m,n,o,a[d+3],10,-1894986606),o=h(o,p,m,n,a[d+10],15,-1051523),n=h(n,o,p,m,a[d+1],21,-2054922799),m=h(m,n,o,p,a[d+8],6,1873313359),p=h(p,m,n,o,a[d+15],10,-30611744),o=h(o,p,m,n,a[d+6],15,-1560198380),n=h(n,o,p,m,a[d+13],21,1309151649),m=h(m,n,o,p,a[d+4],6,-145523070),p=h(p,m,n,o,a[d+11],10,-1120210379),o=h(o,p,m,n,a[d+2],15,718787259),n=h(n,o,p,m,a[d+9],21,-343485551),m=b(m,i),n=b(n,j),o=b(o,k),p=b(p,l);return[m,n,o,p]}function j(a){var b,c="";for(b=0;b<32*a.length;b+=8)c+=String.fromCharCode(a[b>>5]>>>b%32&255);return c}function k(a){var b,c=[];for(c[(a.length>>2)-1]=void 0,b=0;b<c.length;b+=1)c[b]=0;for(b=0;b<8*a.length;b+=8)c[b>>5]|=(255&a.charCodeAt(b/8))<<b%32;return c}function l(a){return j(i(k(a),8*a.length))}function m(a,b){var c,d,e=k(a),f=[],g=[];for(f[15]=g[15]=void 0,e.length>16&&(e=i(e,8*a.length)),c=0;16>c;c+=1)f[c]=909522486^e[c],g[c]=1549556828^e[c];return d=i(f.concat(k(b)),512+8*b.length),j(i(g.concat(d),640))}function n(a){var b,c,d="0123456789abcdef",e="";for(c=0;c<a.length;c+=1)b=a.charCodeAt(c),e+=d.charAt(b>>>4&15)+d.charAt(15&b);return e}function o(a){return unescape(encodeURIComponent(a))}function p(a){return l(o(a))}function q(a){return n(p(a))}function r(a,b){return m(o(a),o(b))}function s(a,b){return n(r(a,b))}function t(a,b,c){return b?c?r(b,a):s(b,a):c?p(a):q(a)}"function"==typeof define&&define.amd?define(function(){return t}):a.md5=t}(this);Cackle.Login2=Cackle.Login2||{prov:{googleplus:{name:"Google+",url:"/signin/proxy?provider=googleplus&scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email"},yahoo:{name:"Yahoo",url:"/signin/proxy?openid_identifier=http://me.yahoo.com/"},yandex:{name:"Яндекс",url:"/signin/proxy?provider=yandex"},vkontakte:{name:"Вконтакте",url:"/signin/proxy?provider=vkontakte&scope=wall,offline,notify,email"},facebook:{name:"Facebook",url:"/signin/proxy?provider=facebook&scope=email"},twitter:{name:"Twitter",url:"/signin/proxy?provider=twitter"},linkedin:{name:"Linkedin",url:"/signin/proxy?provider=linkedin&scope=r_basicprofile,r_emailaddress"},mymailru:{name:"Мой Мир",url:"/signin/proxy?provider=mymailru&scope=stream"},odnoklassniki:{name:"OK",url:"/signin/proxy?provider=odnoklassniki&scope=VALUABLE%20ACCESS"},"500px":{name:"500px",url:"/signin/proxy?provider=500px"},dropbox:{name:"Dropbox",url:"/signin/proxy?provider=dropbox"},foursquare:{name:"Foursquare",url:"/signin/proxy?provider=foursquare"},instagram:{name:"Instagram",url:"/signin/proxy?provider=instagram&scope=basic"},live:{name:"Live",url:"/signin/proxy?provider=live&scope=wl.basic,wl.emails"},stackoverflow:{name:"Stackoverflow",url:"/signin/proxy?provider=stackoverflow"},yammer:{name:"Yammer",url:"/signin/proxy?provider=yammer"},tumblr:{name:"Tumblr",url:"/signin/proxy?provider=tumblr"},soundcloud:{name:"Soundcloud",url:"/signin/proxy?provider=soundcloud"},livejournal:{name:"Живой Журнал",url:"/signin/livejournal"},wordpress:{name:"WordPress",url:"/signin/wordpress"},cackle:{name:"Cackle",url:"/account/signin?returnUrl=/login/success"}},timeout:100,popupSize:{width:670,height:520},temp:'<div class="mc-authbox">{{?it.conf.anonym != false}}<div class="mc-grid">{{?it.conf.guestFirst == true}}<div class="mc-auth-anonym mc-grid-lg"><div class="mc-h6">{{=it.msg.anonym2}}</div>{{=it.anonym}}</div><div class="mc-auth-social mc-grid-lg"><div class="mc-h6">{{=it.msg.social2}}</div><div class="mc-authsoc">{{=it.soc}}</div></div>{{??}}<div class="mc-auth-social mc-grid-lg"><div class="mc-h6">{{=it.msg.social}}</div><div class="mc-authsoc">{{=it.soc}}</div></div><div class="mc-auth-anonym mc-grid-lg"><div class="mc-h6">{{=it.msg.anonym}}</div>{{=it.anonym}}</div>{{?}}</div>{{??}}<div class="mc-auth-social"><div class="mc-h6">{{=it.msg.social}}</div><div class="mc-authsoc">{{=it.soc}}</div></div>{{?}}</div>',anonym:'<div class="mc-p"><a href="//gravatar.com" class="mc-avatar-wrap" target="_blank" title="{{=it.msg.grava}}"><img src="{{=it.conf.avatar}}" class="mc-anonym-avatar"></a><input type="text" class="mc-anonym-name" placeholder="{{=it.msg.name}}"/></div>{{?it.conf.anonymExpand}}<div class="mc-hide">{{?}}{{?it.conf.guestHideEmail != true}}<div class="mc-p"><input type="text" class="mc-anonym-email" placeholder="Email"/></div>{{?}}<div class="mc-captcha"></div><div class="mc-p"><button class="mc-btn2 mc-btn2-sm mc-btn2-bck mc-anonym-login">{{=it.msg.alogin}}</button></div>{{?it.conf.anonymExpand}}</div>{{?}}',soctemp:'{{~it.provs :p}}{{?p && Cackle.Login2.prov[p]}}<a href="#" class="mc-auth-btn" data-provider="{{=p}}" title="{{=Cackle.Login2.prov[p].name}}"><div class="mc-{{=p}}"></div></a>{{?}}{{~}}',captcha:'<div class="g-recaptcha" data-sitekey="{{=it.key}}" data-callback="{{=it.cb}}" data-theme="{{=it.tm}}" data-size="compact"></div>',render:function(a,b){return(doT.template(Cackle.Login2[a]))(b)
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
}};Cackle.Review=Cackle.Review||{};
Cackle.Review.lang=Cackle.Review.lang||{};
Cackle.Review.lang.en={starError:"Please select a rating",prosMaxError:"The maximum length of pros is 2000 characters",consMaxError:"The maximum length of cons is 2000 characters",commentMaxError:"Maximum comment length is 2000 characters",socialError:"Social reviews are disabled",anonymError:"Anonymous reviews are disabled",loginError:"To publish a review you need to login",existError:"You have already shared your review",banError:"You are banned",banUntil:"until",banReason:"Reason:",bannorule:"Failure to comply with rules of site",baninsult:"Insults, obscene language",banspam:"Spam, unauthorized advertising",bangov:"Inconsistency government requirements",ipBanError:"Your IP address is banned",badWordsError:"Your message has been blocked for foul language",pending:"Your review will be published immediately after moderation",formhead:"Review about",rating:"Rating",votes:function(a){return Cackle.Time.declineMsg(a,"review","reviews","reviews")
},sortid:"By date",sortstar:"By rating",sortup:"By utility",addReview:"Add review",guest:"Guest",star:"Rating",pros:"Pros",cons:"Cons",comment:"Comment",login:"Login",xpost:"Post to social network",logout:"Logout",submit:"Submit",noReviews:"Be the first to review.",share:"Share",stars1:"Bad",stars2:"Poor",stars3:"Regular",stars4:"Good",stars5:"Gorgeous",url:"Review link",voteup:"Helpful review",votedown:"Useless review",nextReviews:"Next reviews",cr:"Powered by service",detl:"Detailed ratings",recom:"I recommend product",yes:"Yes",no:"No",social:"To post a review, please login via social network",anonym2:"Introduce yourself",social2:"or leave a social review",name:"Your name",alogin:"Login as guest",yRecom:"I recommend this product",nRecom:"I do not recommend this product",vbtitle:"This user purchased this product.",ym:'Review from <span style="color:red!important">Y</span>andex.Market',comments:"Comments",commentNext:"Show all comments",reply:"Reply",badge:"Administration",useful:"The review useful?"};Cackle.Review=Cackle.Review||{};
Cackle.Review.lang=Cackle.Review.lang||{};
Cackle.Review.lang.ru=Cackle.Fastjs.extend(Cackle.Review.lang.en,{starError:"Пожалуйста, выберите оценку",prosMaxError:"Максимальная длина описания достоинств 2000 символов",consMaxError:"Максимальная длина описания недостатков 2000 символов",commentMaxError:"Максимальная длина комментария 2000 символов",socialError:"Социальные отзывы отключены",anonymError:"Анонимные отзывы отключены",loginError:"Для публикации отзыва необходимо авторизоваться",existError:"Вы уже оставили отзыв",banError:"Вы забанены на этом ресурсе",banUntil:"до",banReason:"Причина:",bannorule:"Несоблюдение правил сайта",baninsult:"Мат, оскорбления, нецензурная лексика",banspam:"Спам, несанкционированная реклама",bangov:"Несоответствие требований Роскомнадзора",ipBanError:"Ваш IP адрес забанен",badWordsError:"Ваше сообщение заблокировано за нецензурную лексику",pending:"Ваш отзыв будет опубликован сразу после проверки модератором",formhead:"Отзыв о продукте",rating:"Рейтинг",votes:function(a){return Cackle.Time.declineMsg(a,"отзыв","отзыва","отзывов")
},sortid:"По дате",sortstar:"По оценке",sortup:"По полезности",addReview:"Оставить отзыв",guest:"Гость",star:"Оценка",pros:"Достоинства",cons:"Недостатки",comment:"Комментарий",login:"Войдите",xpost:"Опубликовать в социальную сеть",logout:"Выход",submit:"Опубликовать",noReviews:"Никто ещё не оставил отзывов, станьте первым.",share:"Поделиться",stars1:"ужасно",stars2:"плохо",stars3:"нормально",stars4:"хорошо",stars5:"отлично",url:"Ссылка на отзыв",voteup:"Полезный отзыв",votedown:"Бесполезный отзыв",nextReviews:"Следующие отзывы",cr:"Сервис сбора отзывов",detl:"Подробные оценки",recom:"Рекомендую продукт",yes:"Да",no:"Нет",social:"Чтобы опубликовать отзыв войдите через социальную сеть",anonym2:"Представьтесь пожалуйста",social2:"или войдите через социальную сеть",name:"Ваше имя",alogin:"Войти как гость",yRecom:"Я рекомендую данный продукт",nRecom:"Я не рекомендую данный продукт",vbtitle:"Этот пользователь купил данный продукт.",ym:'Отзыв с <span style="color:red!important">Я</span>ндекс.Маркета',comments:"Комментировать",commentNext:"Показать все комментарии",reply:"Ответить",badge:"Администрация",useful:"Отзыв полезен?"});Cackle.Review=Cackle.Review||{};
Cackle.Review.main=function(f){var c=f.data;
if(!c){return
}var d=c.widget,r=c.rate?c.rate.count:0,o=f.providers?f.providers.split(";"):(c.login?c.login.providers.split(";"):[]),k=Cackle.Base.getDefaultAvatar(d),i=48,n=36,j=Cackle.Review.lang[f.lang],s=f.msg&&Cackle.Fastjs.extend(j,f.msg)||j;
var m={content:'<div class="cr mc-c"{{?it.product}} itemscope itemtype="http://schema.org/Product"{{?}}>{{?it.product}}{{?it.product.category}}<meta itemprop="category" content="{{!it.product.category}}">{{?}}{{?it.product.brand}}<meta itemprop="brand" content="{{!it.product.brand}}">{{?}}{{?it.product.name}}<meta itemprop="name" content="{{!it.product.name}}">{{?}}{{?it.product.photo}}<meta itemprop="image" content="{{!it.product.photo}}">{{?}}<meta itemprop="url" content="{{!it.url}}">{{?it.product.price}}<span itemscope itemprop="offers" itemtype="http://schema.org/Offer"><meta itemprop="price" content="{{!it.product.price}}"><meta itemprop="priceCurrency" content="{{!it.product.priceCurrency}}"></span>{{?}}{{?}}<div class="mc-score"><div class="mc-rate">{{=it.rateHTML}}</div><div class="mc-breakdwn">{{=it.breakdwnHTML}}</div><div class="mc-formbtn"><button class="mc-btn2 mc-newreview"><span class="mcicon-pencil"></span> {{=it.msg.addReview}}</button></div></div><div class="mc-details">{{=it.detailsHTML}}</div><div class="mc-menu mc-grid"><div class="mc-grid-xs">{{=it.sortMenu}}{{=it.sortNav}}</div><div class="mc-grid-xs">{{?!it.wl}}<div class="mc-cr mc-sm">{{=it.msg.cr}} <a href="http://cackle.me/reviews" target="_blank">Cackle Reviews &trade;</a></div>{{?}}</div></div><div class="mc-alert-cnt"></div><div class="mc-noreviews">{{=it.msg.noReviews}}</div><div class="mc-reviews"></div><div class="mc-reviews-pagination" style="display:none"><button class="mc-btn2 mc-btn2-bck mc-next-reviews" data-page="1">{{=it.msg.nextReviews}}</button></div></div>',stars:'<span class="mc-star{{?!it.editable}} mc-readonly{{?}}" data-star="{{!it.rate}}">{{~[1, 2, 3, 4, 5] :c}}{{?it.rate >= c}}<span class="mcicon-star" data-orgcls="mcicon-star" data-star="{{=c}}"></span>{{??}}{{?c - it.rate < 1}}<span class="mcicon-star-half-o" data-orgcls="mcicon-star-half-o" data-star="{{=c}}"></span>{{??}}<span class="mcicon-star-o" data-orgcls="mcicon-star-o" data-star="{{=c}}"></span>{{?}}{{?}}{{~}}{{?it.review}}<span itemprop="reviewRating" itemscope="" itemtype="http://schema.org/Rating"><meta itemprop="ratingValue" content="{{=it.rate}}"><meta itemprop="bestRating" content="{{=it.rate}}"></span>{{?}}</span>',rating:'{{?it.count > 0}}<span class="mc-star-text" itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating"><span class="mc-rating" itemprop="ratingValue">{{=it.stars}}</span><span class="mc-count-cnt"><span class="mc-count" itemprop="ratingCount">{{=it.count}}</span> {{=it.msg.votes(it.count)}}</span></span>{{?}}',breakdwn:'{{~[5, 4, 3, 2, 1] :r}}<div class="mc-breakdwn-itm"><div class="mc-breakdwn-star">{{~[1, 2, 3, 4, 5] :c}}{{?r < c}}<span class="mcicon-star-o"></span>{{??}}<span class="mcicon-star"></span>{{?}}{{~}}</div><div class="mc-breakdwn-rate"><div class="mc-breakdwn-bar">{{?it.breakdwn[r] > 0}}<span style="width:{{=(it.breakdwn[r])*100/it.count}}%!important"></span>{{?}}</div><span class="mc-breakdwn-count mc-sm">{{=it.breakdwn[r] || 0}}</span></div></div>{{~}}',detail:'<div class="mc-details-rate"><div class="mc-h4">{{=it.msg.detl}}</div><ul>{{~it.details :d}}{{?it.detailStat[d.id] > 0}}<li class="mc-sm"><div>{{!d.name}}</div><div>{{~[1, 2, 3, 4, 5] :c}}{{?it.detailStat[d.id] < c}}<span class="mcicon-star-o"></span>{{??}}<span class="mcicon-star"></span>{{?}}{{~}}</div></li>{{?}}{{~}}</ul></div>',sort:'{{?it.cls == "mc-dropdown-menu"}}<a href="#" class="mc-sort-toggle"><span class="mc-sort-label">{{=it.msg["sort" + it.sort]}}</span> <span class="mcicon-sort"></span></a>{{?}}<ul class="mc-sort {{=it.cls}}" style="{{!it.style}}"><li {{?it.sort == "id"}}class="mc-active"{{?}}><a href="#" data-sort="id">{{=it.msg.sortid}} <span class="mc-caret mc-caret-{{=it.order}}" data-order="{{=it.order}}"></span><span class="{{=it.clshover}}"></span></a></li><li {{?it.sort == "star"}}class="mc-active"{{?}}><a href="#" data-sort="star">{{=it.msg.sortstar}} <span class="{{=it.clshover}}"></span></a></li><li {{?it.sort == "up"}}class="mc-active"{{?}}><a href="#" data-sort="up">{{=it.msg.sortup}} <span class="{{=it.clshover}}"></span></a></li></ul>',form:'<div class="mc-form-group mc-star-head"><div class="mc-star-title">{{=it.msg.star}}</div>{{=it.starsHTML}}</div><div class="mc-clear"></div>{{?it.sett.pros != false}}<div class="mc-form-group"><textarea class="mc-form-control" data-type="pros" placeholder="{{=it.msg.pros}}">{{=it.pros}}</textarea></div>{{?}}{{?it.sett.cons != false}}<div class="mc-form-group"><textarea class="mc-form-control" data-type="cons" placeholder="{{=it.msg.cons}}">{{=it.cons}}</textarea></div>{{?}}{{?it.sett.comment != false}}<div class="mc-form-group mc-review-comment"><textarea class="mc-form-control mc-form-comment" data-type="comment" placeholder="{{=it.msg.comment}}">{{=it.comment}}</textarea></div>{{?}}{{?it.sett.recom != false}}<div class="mc-form-checkbox mc-recom"><label class="mc-form-label">{{=it.msg.recom}} <input type="checkbox" value="true" name="crrec"></label></div>{{?}}<div class="mc-auth-cnt"></div><div class="mc-user"><div class="mc-grid"><div class="mc-grid-lg7"><div class="mc-avatar-cnt">{{=it.avatar}}</div><div class="mc-user-info"><div class="mc-user-name"></div><div class="mc-social-xpost" style="display:none"><label><input type="checkbox" rel="button" class="mc-social-xpost-checkbox">{{=it.msg.xpost}}<span class="mc-social-xpost-icon"></span></label></div><div class="mc-social-logout"><a href="#">{{=it.msg.logout}}</a></div></div></div><div class="mc-grid-lg3 mc-submit-cnt"><span class="mc-spin" style="display:none;margin:5px!important;"></span><button class="mc-btn2 mc-submit">{{=it.msg.submit}}</button></div></div></div><div class="mc-modal-alert"></div>',formTitle:'<div class="mc-form-head">{{=it.msg.formhead}}:</div><div class="mc-form-prod">{{!it.name}}</div>',review:'<div class="mc-review-wrap mc-status-{{=it.review.status}}"><div class="mc-review-user"><a href="javascript:void(0)" class="mc-review-author">{{=it.avatar}}</a>{{?it.review.vb == true}}<span class="mcicon-check-circle mc-vb" title="{{=it.msg.vbtitle}}"></span>{{?}}</div><div class="mc-review-info"><div class="mc-review-head">{{?it.user.www}}<a href="{{!it.user.www}}" class="mc-review-username" target="_blank"><span itemprop="author">{{!it.user.name}}</span></a>{{??}}<span class="mc-review-username" itemprop="author">{{!it.user.name}}</span>{{?}}<a href="{{!it.url}}#cr-{{=it.review.id}}" class="mc-review-time" timestamp="{{=it.review.created}}">{{=it.created}}</a><meta itemprop="datePublished" content="{{=it.datePublished}}"></div><div class="mc-review-stars">{{=it.starsHTML}}</div><div class="mc-review-body">{{?it.review.recom == true}}<div class="mc-recom mc-h4">{{=it.msg.yRecom}}</div>{{??it.review.recom == false}}<div class="mc-norecom">{{=it.msg.nRecom}}</div>{{?}}{{?it.review.pros}}<div><div class="mc-revtitle mc-h4">{{=it.msg.pros}}: </div><div class="mc-revtxt {{=it.prosStl}}">{{!it.review.pros}}</div></div>{{?}}{{?it.review.cons}}<div><div class="mc-revtitle mc-h4">{{=it.msg.cons}}: </div><div class="mc-revtxt {{=it.consStl}}">{{!it.review.cons}}</div></div>{{?}}{{?it.review.comment}}<div><div class="mc-revtitle mc-h4">{{=it.msg.comment}}: </div><div class="mc-revtxt {{=it.commentStl}}">{{!it.review.comment}}</div></div>{{?}}{{?it.review.details && it.review.details.length > 0}}<div class="mc-revdrate"><div class="mc-h4">{{=it.msg.detl}}: </div>{{~it.review.details :d}}<div class="mc-sm">{{!d.name}}</div><div class="mc-drate">{{~["1", "2", "3", "4", "5"] :s}}<label><input type="radio" value="{{=d.star}}" {{?d.star == s}}checked="checked"{{?}} disabled="disabled">{{=s}}</label>{{~}}</div>{{~}}</div>{{?}}</div><div class="mc-review-footer">{{?it.sett.reply != "deny" && it.review.ym != true}}<a href="#" class="mc-review-reply"><span class="mcicon-comments"></span> {{=it.msg.comments}}</a>{{?}}{{?it.review.ym == true}}<a href="http://market.yandex.ru/product/{{=it.prod.ymId}}/reviews" target="_blank">{{=it.msg.ym}}</a>{{?}}<div class="mc-review-vote"><span class="mc-useful">{{=it.msg.useful}}</span><a href="#" class="mc-review-dislike" data-vote="-1" data-id="{{=it.review.id}}" title="{{=it.msg.votedown}}"><span class="mcicon-thumbs-down"></span> <span class="mc-review-rating mc-review-down">{{=it.review.down}}</span></a><a href="#" class="mc-review-like" data-vote="1" data-id="{{=it.review.id}}" title="{{=it.msg.voteup}}"><span class="mcicon-thumbs-up"></span> <span class="mc-review-rating mc-review-up">{{=it.review.up}}</span></a></div></div></div></div><div class="mc-review-menu"><a href="#" class="mc-review-url mcicon-link" data-url="{{!it.url}}#cr-{{=it.review.id}}" title="{{=it.msg.url}}"></a><a href="#" class="mc-review-share mcicon-share-alt" title="{{=it.msg.share}}"></a></div><div class="mc-review-comment"><div class="mc-comment-pagn" style="display:none"><button class="mc-btn2 mc-btn2-bck mc-comment-next" data-page="0">{{=it.msg.commentNext}} ({{!it.review.reply}})</button></div><div class="mc-comments"></div></div>',avatar:'<div class="mc-avatar-wrap"><img src="{{!it.avatar}}" class="mc-avatar" onerror="if(this.src!=\'{{=it.defava}}\')this.src=\'{{=it.defava}}\';"></div>{{?it.social && it.social != "sso"}}<div class="mc-social-wrap"><div class="mc-social mc-{{=it.social}}" style="display:none"></div></div>{{?}}',comment:'<div class="mc-comment-wrap"><div class="mc-comment-user"><a href="javascript:void(0)" class="mc-comment-author">{{=it.avatar}}</a></div><div class="mc-comment-info"><div class="mc-comment-head">{{?it.u.www}}<a href="{{!it.u.www}}" class="mc-comment-username" target="_blank">{{!it.u.name}}</a>{{??}}<span class="mc-comment-username">{{!it.u.name}}</span>{{?}}{{?it.c.admin}}<span class="mc-comment-badge">{{!it.badge || it.msg.badge}}</span>{{?}}<span class="mc-comment-time">{{=it.time}}</a></div><div class="mc-comment-body">{{!it.c.msg}}</div><div class="mc-comment-footer"><a class="mc-comment-reply" data-id="{{=it.c.id}}" href="#">{{=it.msg.reply}}</a></div></div></div>',commentReply:'<div class="mc-postbox"><div class="mc-avatar-cnt">{{=it.avatar}}</div><div class="mc-text-cnt"><div class="mc-text-wrap"><div class="mc-textarea-wrap"><textarea class="mc-textarea"></textarea></div></div></div><div class="mc-auth-cnt"></div><div class="mc-submit-cnt"><button class="mc-btn2 mc-reply">{{=it.msg.comments}}</button></div></div>',renderContent:function(){return this.render("content",{wl:c.wl,product:f.product||c.product,rateHTML:this.renderRate(c.rate),breakdwnHTML:this.renderBreakdwn(c.rate,c.stat),detailsHTML:this.renderDetails(c.stat),url:Cackle.getUrl(f),sortMenu:this.render("sort",{cls:"mc-dropdown-menu",style:"display:none",clshover:"",sort:Cackle.getCookie("cr-sort")||"id",order:Cackle.getCookie("cr-order")||"desc"}),sortNav:this.render("sort",{cls:"mc-nav",clshover:"mc-sort-hover",sort:Cackle.getCookie("cr-sort")||"id",order:Cackle.getCookie("cr-order")||"desc"})})
},renderRate:function(x){var u=x?x.stars:0,z=x?x.count:0,w=this.calcRate(u,z);
var v=this.render("stars",{rate:w});
var y=this.render("rating",{stars:w,count:z});
return v+y
},calcRate:function(u,v){if(u&&v>0){return(u/v).toFixed(1)
}else{return""
}},renderBreakdwn:function(v,u){if(v&&v.count>0&&u&&!this.isEmpty(u.breakdwn)){return this.render("breakdwn",{breakdwn:u.breakdwn,count:v.count})
}return""
},renderDetails:function(u){if(d.details&&u&&!this.isEmpty(u.detail)){return this.render("detail",{details:d.details,detailStat:u.detail})
}return""
},isEmpty:function(v){for(var u in v){if(v.hasOwnProperty(u)){return false
}}return true
},renderForm:function(){return this.render("form",{id:f.id,host:f.host,starsHTML:this.render("stars",{rate:5,editable:true}),pros:"",cons:"",comment:"",sett:d,details:this.isEmpty(d.details)?null:d.details,avatar:this.renderAvatar(k)})
},renderAvatar:function(u,v){return this.render("avatar",{avatar:u,defava:Cackle.Base.getCackleAvatar(),social:v})
},renderReview:function(u,v){return this.render("review",{host:f.host,prod:c.product,user:v,review:u,avatar:this.renderAvatar(v.avatar,v.provider),sett:d,starsHTML:this.render("stars",{rate:u.star,review:true}),created:Cackle.Time.getTime(u.created,f.lang||"ru"),datePublished:Cackle.Time.getTime(u.created,f.lang||"ru","yyyy-MM-ddTHH:mm:ss"),prosStl:this.getStyle(u.pros),consStl:this.getStyle(u.cons),commentStl:this.getStyle(u.comment),url:Cackle.getUrl(f)})
},renderAvatar:function(u,v){return this.render("avatar",{avatar:u,defava:Cackle.Base.getCackleAvatar(),social:v})
},renderComment:function(v,u){return this.render("comment",{badge:d.badge,c:v,u:u,avatar:this.renderAvatar(u.avatar,u.provider),time:Cackle.Time.getTime(v.created,f.lang,f.timeFormat),})
},renderCommentReply:function(u,v){return this.render("commentReply",{avatar:this.renderAvatar(u||k,v)})
},getStyle:function(u){return u?(u.indexOf("\n")>-1?"mc-newline":""):""
},render:function(u,v){v.msg=s;
return(doT.template(this[u]))(v)
}};
var h={id:null,time:null,orderId:null,init:function(){var v=decodeURIComponent(window.location.hash);
if(v){var u=/cr\/(.*?)\//.exec(v);
if(u&&u.length>1){var w=u[1].split(":");
if(w&&w.length>6){if(w[0]){f.open=true
}if(w[1]){this.id=w[1]
}if(w[2]){this.time=w[2]
}if(w[3]){this.orderId=w[3]
}if(w[4]){f.ssoAuth=w[4];
f.ssoPrimary=true
}else{f.anonym={name:w[5],email:w[6]}
}}}}}};
var a={el:null,showError:function(u,v){var w=s[v];
u.appendChild(this.alert(w))
},showError2:function(v,u){var w=Cackle.Base.error(u,s);
v.appendChild(this.alert(w))
},alert:function(v){if(this.el){Cackle.Fastjs.rm(this.el)
}this.el=Cackle.Fastjs.create("div","mc-alert mc-alert-error");
this.el.innerHTML=v+".";
var u=this.el;
setTimeout(function(){Cackle.Fastjs.rm(u)
},3000);
return u
}};
var g={providers:{vkontakte:true,mymailru:true,twitter:true},init:function(u,v){if(this.providers[v]){this.show(u,v)
}else{this.hide(u)
}},show:function(v,y){var w=this,u=Cackle.getCookie("mc-xpost-"+y),x=u?(u=="on"?true:false):true;
Cackle.Fastjs.each(v.querySelectorAll(".mc-social-xpost"),function(z){w.showOne(z,x,y);
z.style.display="inline-block"
})
},showOne:function(u,w,y){var x=u.querySelector(".mc-social-xpost-checkbox"),v=u.querySelector(".mc-social-xpost-icon");
if(!x){return
}x.checked=w;
v.setAttribute("class","mc-social-xpost-icon mc-social mc-"+y);
v.setAttribute("title",Cackle.Login2.prov[y].name);
Cackle.Fastjs.on(x,"click",function(){var z="mc-xpost-"+y;
Cackle.Cookie.create(z,this.checked?"on":"off",365)
})
},hide:function(u){Cackle.Fastjs.each(u.querySelectorAll(".mc-social-xpost"),function(v){Cackle.Fastjs.hide2(v)
})
}};
var q={init:function(u){var v=this;
Cackle.Fastjs.onall2(u,"span","mouseover",function(){v.prevHover(this);
v.nextHover(this)
});
Cackle.Fastjs.onall2(u,"span","click",function(){u.setAttribute("data-star",this.getAttribute("data-star"));
Cackle.Fastjs.each(u.querySelectorAll("span"),function(w){w.setAttribute("data-orgcls",w.className)
})
});
Cackle.Fastjs.on(u,"mouseout",function(w){Cackle.Fastjs.each(u.querySelectorAll("span"),function(x){x.className=x.getAttribute("data-orgcls")
})
})
},prevHover:function(u){if(u){u.className="mcicon-star";
this.prevHover(Cackle.Fastjs.prev(u))
}},nextHover:function(u){var v=Cackle.Fastjs.next(u);
if(v){v.className="mcicon-star-o";
this.nextHover(v)
}}};
var p={count:0,init:function(v,u){var w=this;
this.load(v,u,u.comments);
Cackle.Fastjs.on(v.querySelector(".mc-comment-pagn button"),"click",function(){var z=this,x=f.host+"/review/"+f.id+"/comment/list",y=parseInt(this.getAttribute("data-page")),A={reviewId:u.id,page:y};
e.addspin(z);
Cackle.PostMessage.get(f.host,x,A,function(B){var C=y==0?B.reviewCommentDtoList.slice(f.replies||5):B.reviewCommentDtoList;
w.load(v,u,C);
z.setAttribute("data-page",y+1)
},function(){e.remspin(z)
});
return false
})
},load:function(v,u,z){var x=v.querySelector(".mc-comments");
for(var w=0;
w<z.length;
w++){this.add(v,u,x,z[w])
}var y=v.querySelector(".mc-comment-pagn");
if(u.reply>this.count){Cackle.Fastjs.show2(y)
}else{Cackle.Fastjs.hide2(y)
}},add:function(w,v,y,A,u){var x=l.getUser(A),z=Cackle.Fastjs.create("div","mc-comment");
z.innerHTML=m.renderComment(A,x);
if(u){y.appendChild(z)
}else{Cackle.Fastjs.prepend(y,z)
}this.count+=1;
Cackle.Fastjs.on(z.querySelector(".mc-comment-reply"),"click",function(){t.reply(w,v);
return false
})
}};
var t={submit:function(w,A){var E=this,C=w.querySelector(".mc-modal-alert");
var v=f.host+"/review/"+f.id+"/submit",B=w.querySelectorAll("textarea"),y={chan:Cackle.getChan(f),url:Cackle.getUrl(f),star:w.querySelector(".mc-star").getAttribute("data-star"),media:this.getMedia(w.querySelectorAll(".mc-media-surface")),title:f.title||Cackle.Fastjs.title(),lang:f.lang};
if(!y.star){a.showError(C,"starError");
return
}Cackle.Fastjs.each(B,function(F){y[F.getAttribute("data-type")]=F.value
});
var D=w.querySelector('.mc-recom input[type="checkbox"]:checked');
if(D){y.recom=D.value
}if(h.id){y.folwId=h.id
}if(h.time){y.folwtime=h.time
}if(h.orderId){y.orderId=h.orderId
}y.detailId=[];
y.detailStar=[];
var z=w.querySelectorAll('.mc-formdetails input[type="radio"]:checked');
Cackle.Fastjs.each(z,function(F){var H=F.getAttribute("data-id"),G=F.value;
y.detailId.push(H);
y.detailStar.push(G)
});
var x=w.querySelector('.mc-social-xpost input[type="checkbox"]:checked');
if(x){y.social="true"
}Cackle.Fastjs.cbs(f,"submit",y);
A.disabled=true;
var u=Cackle.Fastjs.prev(A);
Cackle.Fastjs.show2(u);
Cackle.PostMessage.post(f.host,v,y,function(H){var I=H.reviewResponse;
if(!I){return
}var F=I.review,G=I.error;
if(G){a.showError2(C,G);
return
}Cackle.Modal2.hide(w);
if(F.status!="approved"){var J=e.cnt.querySelector(".mc-alert-cnt");
a.showError(J,F.status);
return
}l.add(F,true);
E.changeRate(I.rate);
E.changeBreakdwn(I.rate,I.stat);
E.changeDetails(I.stat);
Cackle.Fastjs.cbs(f,"create",F)
},function(){Cackle.Fastjs.hide2(u);
A.disabled=false
})
},changeRate:function(w){var v=m.renderRate(w);
e.cnt.querySelector(".mc-rate").innerHTML=v;
if(f.countContainer&&w.count){var u=document.getElementById(f.countContainer);
if(u){u.innerHTML=w.count
}}},changeBreakdwn:function(v,u){var w=m.renderBreakdwn(v,u);
e.cnt.querySelector(".mc-breakdwn").innerHTML=w
},changeDetails:function(v){var u=m.renderDetails(v);
e.cnt.querySelector(".mc-details").innerHTML=u
},getMedia:function(u){var v="";
if(u){Cackle.Fastjs.each(u,function(w){v+=" "+w.getAttribute("data-media")
})
}return v.trim()
},reply:function(y,B){var A="mc-comment-replybox",v=y.querySelector("."+A);
if(v){if(Cackle.Fastjs.isVisible(v)){Cackle.Fastjs.hide2(v)
}else{Cackle.Fastjs.show2(v);
v.querySelector("textarea").focus()
}}else{var u=y.querySelector(".mc-review-comment"),x=Cackle.Base.getAvatar(k,null,n,d);
v=Cackle.Fastjs.create("div",A);
v.innerHTML=m.renderCommentReply(x);
var z=v.querySelector("textarea"),C=v.querySelector(".mc-avatar-cnt"),w=function(){var D=Cackle.Login2.auth||{};
if(Cackle.Login2.isAuthorized()){Cackle.Fastjs.addcl(v,"mc-loggedin");
var E=Cackle.Base.getAvatar(D.avatar,D.hash,n,d);
C.innerHTML=m.renderAvatar(E,D.provider)
}else{Cackle.Fastjs.remcl(v,"mc-loggedin");
C.innerHTML=m.renderAvatar(k)
}};
Cackle.Login2.main(v.querySelector(".mc-auth-cnt"),{host:f.host,id:f.id,logcb:false,providers:o,avatar:k,anonym:d.anonym,anonymExpand:true,guestFirst:f.guestFirst||true,guestHideEmail:f.guestHideEmail,theme:f.theme,captchaPub:d.captchaPub,ssoEl:"div",widget:"review",ssoAuth:f.ssoAuth,ssoPrimary:f.ssoPrimary,ssoProvider:f.ssoProvider,callback:Cackle.Fastjs.extendcbs(f,{loggedin:w,logout:w}),action:function(){if(Cackle.Login2.isAuthorized()){z.focus()
}},msg:s});
u.appendChild(v);
w();
z.focus();
Cackle.AutoSize.main(z);
Cackle.Fastjs.on2(v,".mc-reply","click",function(F){var E=F.target,D=f.host+"/review/"+f.id+"/comment/submit",G={reviewId:B.id,msg:z.value};
if(!z.value){z.focus();
return false
}e.addspin(E);
E.disabled=true;
Cackle.PostMessage.post(f.host,D,G,function(I){var H=I.commentResponse;
if(H.error){}else{p.add(y,B,y.querySelector(".mc-comments"),H.comment,true);
Cackle.Fastjs.hide2(v);
Cackle.Fastjs.cbs(f,"reply",H.comment)
}},function(){z.value="";
E.disabled=false;
e.remspin(E)
});
return false
})
}},vote:function(){var y=this,u=this.getAttribute("data-id"),v=this.getAttribute("data-vote"),w=f.host+"/review/"+f.id+"/vote/"+u+"/"+v;
var x=this.querySelector(".mc-review-rating");
Cackle.Fastjs.addcl(x,"mc-spin");
Cackle.PostMessage.post(f.host,w,null,function(B){var A=B.reviewSmallDto;
if(A){Cackle.Fastjs.cbs(f,"vote",A);
var C=y.parentNode,z=C.querySelector(".mc-review-up"),D=C.querySelector(".mc-review-down");
if(z){z.innerHTML=A.up
}if(D){D.innerHTML=A.down
}}},function(){Cackle.Fastjs.remcl(x,"mc-spin")
});
return false
},url:function(){var v='<input type="text" value="'+this.getAttribute("data-url")+'"></input>',w=Cackle.Modal2.show("mc-review-url",s.url,null,v,1),u=w.querySelector("input");
u.select();
return false
},share:function(C,w){var u=Cackle.getUrl(f)+"#cr-"+C.id,z=(f.product||c.product)?(f.product||c.product).name:Cackle.Fastjs.title(),B=s.star+" - "+s["stars"+C.star]+"\n\n",x=C.media?C.media.split(" ")[0]:w.avatar;
if(C.pros){B+=s.pros+": "+C.pros+"\n\n"
}if(C.cons){B+=s.cons+": "+C.cons+"\n\n"
}if(C.comment){B+=s.comment+": "+C.comment+"\n\n"
}var v=f.shareSocial||["vkontakte","odnoklassniki","mymailru","facebook","twitter","googleplus"],y=(doT.template(Cackle.Login2.soctemp))({provs:v}),A=Cackle.Modal2.show("mc-review-share",s.share,null,y,1);
Cackle.Fastjs.onall(A.querySelectorAll(".mc-auth-btn"),"click",function(D){Cackle.Social.Share[this.getAttribute("data-provider")]({url:u,title:z,text:B,img:x});
return false
});
return false
}};
var b={init:function(){var x=this,u=f.product||c.product,y="",w="";
if(u){y=m.render("formTitle",{name:u.name});
w=Cackle.Base.ssl(u.photo)
}this.modal=Cackle.Modal2.create("cr-form",y,w,m.renderForm(),false,true);
var v=this.modal.querySelector(".mc-avatar-cnt"),z=this.modal.querySelector(".mc-user-name");
Cackle.Login2.main(this.modal.querySelector(".mc-auth-cnt"),{host:f.host,id:f.id,logcb:true,redirect:f.redirect,callbackjs:f.callbackjs,providers:o,avatar:k,anonym:d.anonym,anonymExpand:true,guestFirst:f.guestFirst||true,guestHideEmail:f.guestHideEmail,theme:f.theme,captchaPub:d.captchaPub,ssoEl:"div",widget:"review",ssoAuth:f.ssoAuth,ssoPrimary:f.ssoPrimary,ssoProvider:f.ssoProvider,callback:Cackle.Fastjs.extendcbs(f,{loggedin:function(B){if(Cackle.Login2.isAuthorized()){Cackle.Fastjs.addcl(x.modal,"mc-loggedin");
var A=Cackle.Base.getAvatar(B.avatar,B.hash,i,d);
v.innerHTML=m.renderAvatar(A,B.provider);
z.innerHTML=B.name
}else{Cackle.Fastjs.remcl(x.modal,"mc-loggedin");
v.innerHTML=m.renderAvatar(k)
}g.init(x.modal,B.provider)
},logout:function(){Cackle.Fastjs.remcl(x.modal,"mc-loggedin");
v.innerHTML=m.renderAvatar(k);
z.innerHTML=""
}}),msg:s});
this.initAct();
if(f.open){Cackle.Modal2.show2(this.modal)
}},initAct:function(){var w=this,v=e.cnt.querySelector(".mc-newreview"),x=this.modal.querySelector(".mc-submit"),u=this.modal.querySelector(".mc-social-logout a");
Cackle.Fastjs.on(v,"click",function(){Cackle.Modal2.show2(w.modal);
return false
});
Cackle.Fastjs.on(u,"click",function(){Cackle.Login2.logout(f);
return false
});
Cackle.Fastjs.on(x,"click",function(){t.submit(w.modal,this);
return false
});
q.init(this.modal.querySelector(".mc-star"));
Cackle.AutoSize.mainall(this.modal.querySelectorAll("textarea"));
Cackle.Media.main(this.modal.querySelector(".mc-review-comment"))
}};
var l={load:function(v,w){this.cnt=this.cnt||e.cnt.querySelector(".mc-reviews");
this.pagnt=this.pagnt||e.cnt.querySelector(".mc-next-reviews");
if(v&&v.length){if(w){Cackle.Fastjs.rm2(e.cnt,".mc-noreviews")
}for(var u=0;
u<v.length;
u++){this.add(v[u])
}if(this.isPagnShow()){Cackle.Fastjs.show2(this.pagnt.parentNode)
}else{Cackle.Fastjs.hide2(this.pagnt.parentNode)
}}},isPagnShow:function(){return e.cnt.querySelectorAll(".mc-reviews > div").length<r
},add:function(v,x){if(v.ym&&!c.product){return
}var w=Cackle.Fastjs.create("div"),y=this.getUser(v);
w.id="cr-"+v.id;
w.setAttribute("itemprop","review");
w.setAttribute("itemscope","");
w.setAttribute("itemtype","http://schema.org/Review");
w.innerHTML=m.renderReview(v,y);
if(v.pros||v.cons||v.comment||v.media){var u=w.querySelector(".mc-review-body"),z=Cackle.Media.makeContent([v.pros,v.cons,v.comment,v.media].join(" "),false);
if(z){u.appendChild(z)
}}this.initActs(w,v,y);
if(v.reply>0){p.init(w,v)
}if(x){Cackle.Fastjs.rm2(e.cnt,".mc-noreviews");
Cackle.Fastjs.prependSlide(w,this.cnt);
Cackle.Fastjs.addcl(w,"mc-blink")
}else{this.cnt.appendChild(w)
}},getUser:function(u){var w=u.author,v=u.anonym,B=0,y="",x="",z="",A="";
if(w){B=w.id;
y=w.name;
x=Cackle.Base.getAvatar(w.avatar,w.hash,i,d);
A=w.provider!="sso"?w.provider:"";
if(w.www&&!d.denyWww){z=w.www.match("^https?://")?w.www:"http://"+w.www
}}else{if(v){B=v.id;
y=v.name;
x=Cackle.Base.getAvatar(null,v.hash,i,d);
if(v.www&&!d.denyWww){z=v.www.match("^https?://")?v.www:"http://"+v.www
}}}return{id:B,name:y||s.guest,avatar:x,www:z,provider:A}
},initActs:function(v,u,w){Cackle.Fastjs.on(v.querySelector(".mc-review-reply"),"click",function(){t.reply(v,u);
return false
});
Cackle.Fastjs.onall(v.querySelectorAll(".mc-review-vote a"),"click",t.vote);
Cackle.Fastjs.on(v.querySelector(".mc-review-url"),"click",t.url);
Cackle.Fastjs.on(v.querySelector(".mc-review-share"),"click",function(){t.share(u,w);
return false
})
}};
var e={init:function(){this.cnt=document.getElementById(f.container||"mc-review");
this.cnt.innerHTML=m.renderContent();
this.initSort();
this.initActs();
h.init();
b.init();
l.load(c.reviews,true);
var w=this.cnt.querySelector(".mc-score"),x=this.cnt.querySelector(".mc-menu"),v=this.cnt.offsetWidth;
if(f.small==true||(v>0&&v<700)){Cackle.Fastjs.addcl(w,"mc-score-sm");
Cackle.Fastjs.addcl(x,"mc-menu-sm")
}else{Cackle.Fastjs.remcl(w,"mc-score-sm");
Cackle.Fastjs.remcl(x,"mc-menu-sm")
}if(f.countContainer){var u=document.getElementById(f.countContainer);
if(u){u.innerHTML=r
}}},initSort:function(w){var v="mc-active",y=Cackle.Cookie.read("cr-sort")||"id",u=Cackle.Cookie.read("cr-order")||"desc",x=this.cnt.querySelector('.mc-sort.mc-dropdown-menu a[data-sort="'+y+'"]'),z=this.cnt.querySelector('.mc-sort.mc-nav a[data-sort="'+y+'"]');
ddcaret=this.cnt.querySelector(".mc-sort.mc-dropdown-menu .mc-caret"),navcaret=this.cnt.querySelector(".mc-sort.mc-nav .mc-caret"),pagnbtn=this.cnt.querySelector(".mc-next-reviews");
if(z){Cackle.Fastjs.remcl(this.cnt.querySelector(".mc-sort.mc-dropdown-menu ."+v),v);
Cackle.Fastjs.remcl(this.cnt.querySelector(".mc-sort.mc-nav ."+v),v);
Cackle.Fastjs.addcl(x.parentNode,v);
Cackle.Fastjs.addcl(z.parentNode,v);
Cackle.Fastjs.txt(this.cnt.querySelector(".mc-menu .mc-sort-label"),s["sort"+y]);
Cackle.Fastjs.hide2(this.cnt.querySelector(".mc-sort.mc-dropdown-menu"));
ddcaret.setAttribute("data-order",u);
ddcaret.className="mc-caret mc-caret-"+u;
x.appendChild(ddcaret);
navcaret.setAttribute("data-order",u);
navcaret.className="mc-caret mc-caret-"+u;
z.appendChild(navcaret);
if(pagnbtn){pagnbtn.setAttribute("data-page",1)
}}},initActs:function(){var v=this,u=this.cnt.querySelectorAll(".mc-sort a"),w=this.cnt.querySelector(".mc-next-reviews");
Cackle.Fastjs.onall(u,"click",function(){var B=this.getAttribute("data-sort"),z=this.querySelector(".mc-caret"),D=z||v.cnt.querySelector(".mc-sort.mc-nav .mc-caret"),x=z&&D.getAttribute("data-order")=="desc"?"asc":"desc",y=f.host+"/review/"+f.id+"/list",C={order:x,prop:B};
if(c.chanId){C.chanId=c.chanId
}else{return false
}if(f.size){C.size=f.size
}if(f.replies){C.replies=f.replies
}Cackle.Cookie.create("cr-sort",B,365);
Cackle.Cookie.create("cr-order",x,365);
var A=v.cnt.querySelector(".mc-reviews");
v.addspin(A,true);
Cackle.PostMessage.get(f.host,y,C,function(E){v.remspin(A);
l.load(E.reviewMiniDtoList,true)
},function(){v.initSort(D)
});
return false
});
Cackle.Fastjs.on2(this.cnt,".mc-menu .mc-sort-toggle","click",function(){var x=Cackle.Fastjs.next(this);
x.style.display=Cackle.Fastjs.isVisible(x)?"none":"block";
return false
});
Cackle.Fastjs.on(w,"click",function(){var B=this,A=this.getAttribute("data-page"),z=Cackle.Cookie.read("cr-sort"),x=Cackle.Cookie.read("cr-order"),y=f.host+"/review/"+f.id+"/list",C={page:A};
if(c.pagn){C.size=c.pagn
}if(c.chanId){C.chanId=c.chanId
}else{return false
}if(z){C.prop=z
}if(x){C.order=x
}if(f.size){C.size=f.size
}if(f.replies){C.replies=f.replies
}var D=Cackle.Fastjs.create("span","mc-spin");
this.appendChild(D);
this.disabled=true;
Cackle.PostMessage.get(f.host,y,C,function(E){l.load(E.reviewMiniDtoList)
},function(){Cackle.Fastjs.rm(D);
B.setAttribute("data-page",parseInt(A)+1);
B.disabled=false
});
return false
})
},addspin:function(v,u){if(u){v.innerHTML=""
}v.appendChild(this.spin())
},remspin:function(u){Cackle.Fastjs.each(u.querySelectorAll(".mc-spin"),function(v){Cackle.Fastjs.rm(v)
})
},spin:function(){return Cackle.Fastjs.create("div","mc-spin")
}};
e.init();
Cackle.Base.gotoId("cr");
Cackle.Fastjs.cbs(f,"ready")
};