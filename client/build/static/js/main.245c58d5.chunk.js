(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{48:function(e,t,n){},69:function(e,t,n){},82:function(e,t,n){},84:function(e,t,n){"use strict";n.r(t);var s=n(0),a=n.n(s),r=n(40),c=n.n(r),i=(n(48),n(23)),o=n(5),u=n(7),l=n.n(u),p=n(12),m=n(28),d=n(8),j=n(19),f=n.n(j),h="http://localHost:8080",b="CHAT_MESSAGE",g="USER_JOINED",O="USER_LEFT",x="USER_TYPING",v=[];function y(e){return w.apply(this,arguments)}function w(){return(w=Object(p.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.post("".concat(h,"/login/"),{name:t});case 3:return n=e.sent,e.abrupt("return",{status:!0,message:n.data.message,name:n.data.name});case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",{status:!1,message:e.t0.response.data.message||"something went wrong :("});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}function N(){return(N=Object(p.a)(l.a.mark((function e(t,n){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.post("".concat(h,"/message/send?user=").concat(t),{message:n});case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),console.log(e.t0.response);case 8:case"end":return e.stop()}}),e,null,[[0,5]])})))).apply(this,arguments)}function S(){return(S=Object(p.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.post("".concat(h,"/message/typing?user=").concat(t));case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),console.log(e.t0.response);case 8:case"end":return e.stop()}}),e,null,[[0,5]])})))).apply(this,arguments)}function E(){return k.apply(this,arguments)}function k(){return(k=Object(p.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.get("".concat(h,"/message/userList?user=admin"));case 3:return t=e.sent,e.abrupt("return",t.data);case 7:return e.prev=7,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",[]);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}function C(){return L.apply(this,arguments)}function L(){return(L=Object(p.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.get("".concat(h,"/message/history?user=admin"));case 3:return t=e.sent,e.abrupt("return",t.data);case 7:return e.prev=7,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",[]);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}var U=function(){};function M(){return M=Object(p.a)(l.a.mark((function e(t){var n,s,a,r,c,i=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=i.length>1&&void 0!==i[1]?i[1]:U,s=i.length>2&&void 0!==i[2]?i[2]:U,a=i.length>3&&void 0!==i[3]?i[3]:U,r=i.length>4&&void 0!==i[4]?i[4]:U,c=i.length>5&&void 0!==i[5]?i[5]:U,v[0]&&v[0].close(),v[0]=new EventSource("".concat(h,"/message/stream?user=").concat(t)),v[0].onopen=function(){console.log("EventStream opened")},v[0].addEventListener(g,(function(e){e=JSON.parse(e.data),s(e.username,e.time)})),v[0].addEventListener(O,(function(e){e=JSON.parse(e.data),console.log("User ".concat(e.username," left!")),a(e.username,e.time)})),v[0].addEventListener(b,(function(e){e=JSON.parse(e.data),n(e.username,e.message,e.time)})),v[0].addEventListener(x,(function(e){var t=JSON.parse(e.data).typing;r(t)})),v[0].onerror=function(e){console.log("Error\n",e),v[0].close(),c()},e.abrupt("return",(function(){v[0].close()}));case 14:case"end":return e.stop()}}),e)}))),M.apply(this,arguments)}var T=n(1),J=Object(s.createContext)("");var R=function(e){var t=Object(s.useState)(),n=Object(d.a)(t,2),a=n[0],r=n[1],c=Object(s.useState)([]),i=Object(d.a)(c,2),o=i[0],u=i[1],j=Object(s.useState)([]),f=Object(d.a)(j,2),h=f[0],b=f[1],g=function(){var e=Object(p.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=b,e.t1=m.a,e.next=4,E();case 4:e.t2=e.sent,e.t3=(0,e.t1)(e.t2),(0,e.t0)(e.t3);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),O=function(){var e=Object(p.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=u,e.next=3,C();case 3:e.t1=e.sent,(0,e.t0)(e.t1),console.log("Got history");case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(T.jsx)(J.Provider,{value:{username:a,setUsername:r,messages:o,setMessages:u,addMessage:function(e){o.push(e),u(Object(m.a)(o))},users:h,requestUsers:g,clearMessages:function(){u([])},requestHistory:O},children:e.children})},q=n(86),B=n(85),D=n(87);n(69);var G=function(e){var t=Object(o.f)(),n=Object(s.useContext)(J),a=Object(s.useRef)(null),r=Object(s.useState)([]),c=Object(d.a)(r,2),i=c[0],u=c[1],l=(new Date).getTime(),p=function(e,t,s){n.addMessage({username:e,message:t,time:s})},m=function(e,t){n.addMessage({username:"Server",message:"".concat(e," left"),time:t}),n.requestUsers()},j=function(e,t){n.addMessage({username:"Server",message:"".concat(e," joined"),time:t}),n.requestUsers()},f=function(e){u(e)},h=function(){t("/")};return Object(s.useEffect)((function(){!function(e){M.apply(this,arguments)}(n.username,p,j,m,f,h)}),[]),Object(T.jsxs)("div",{className:"chat",children:[Object(T.jsxs)(q.a,{body:!0,style:{textAlign:"left",marginBottom:"0.5em"},children:["Logged in as"," ",Object(T.jsx)("span",{style:{fontWeight:"bold"},children:n.username})]}),Object(T.jsxs)("div",{className:"content",children:[Object(T.jsxs)("div",{className:"message-area",children:[Object(T.jsxs)("div",{className:"history-wrapper",children:[Object(T.jsx)("div",{className:"history",children:n.messages.map((function(e,t){return Object(T.jsx)(q.a,{className:"msg",children:Object(T.jsxs)(q.a.Body,{children:[Object(T.jsxs)("span",{className:"msg-sender",children:[e.username,":"]}),Object(T.jsxs)("span",{className:"msg-body",children:[" ",e.message]}),Object(T.jsxs)("span",{className:"time",children:[new Date(e.time).toLocaleTimeString()," "]})]})},t)}))}),Object(T.jsx)("span",{children:0===i.length?"":"Currently Typing: "+i.map((function(e){return"".concat(e," ")}))})]}),Object(T.jsxs)("div",{style:{display:"flex",flexDirection:"row"},children:[Object(T.jsx)(B.a.Control,{as:"textarea",placeholder:"Write your message here",style:{height:"100px"},className:"messagebox",ref:a,onChange:function(){var e=(new Date).getTime();e-l>500&&(!function(e){S.apply(this,arguments)}(n.username),l=e)}}),Object(T.jsx)(D.a,{className:"send",onClick:function(){!function(e,t){N.apply(this,arguments)}(n.username,a.current.value),a.current.value=""},children:"Send!"})]})]}),Object(T.jsxs)("ul",{className:"online list-group",children:[Object(T.jsx)("span",{className:"online-label",children:"Online"}),n.users.map((function(e,t){return Object(T.jsx)("li",{className:"list-group-item",children:e.name},t)}))]})]})]})},H=n(27),z=n.n(H),_=(n(82),n(88)),A=n(41);function I(e){z.a.fire({icon:"success",title:"Hooray!",text:e,showConfirmButton:!1,timer:1500})}function P(e){z.a.fire({icon:"error",title:"Oops!",text:e,showConfirmButton:!1,timer:1500})}var W=function(e){var t=Object(s.useRef)(null),n=Object(s.useContext)(J),a=Object(o.f)(),r=Object(o.e)();Object(s.useEffect)((function(){console.log(v[0]),v[0]&&(v[0].close(),v[0]=void 0,console.log("Closed"))}),[r]);var c=function(){var e=Object(p.a)(l.a.mark((function e(s){var r,c,i,o,u;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.current.value,e.next=3,y(r);case 3:if(c=e.sent,i=c.status,o=c.message,u=c.name,i?I(o):P(o),!i){e.next=13;break}return n.setUsername(u),e.next=12,n.requestHistory();case 12:a("/chat");case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(T.jsxs)("div",{className:"login",children:[Object(T.jsx)("span",{className:"title card-title",children:"Chat Room!"}),Object(T.jsxs)(_.a,{size:"lg",id:"inputGroup-sizing-sm",className:"mb-3 name-input login-elm",placeholder:"Enter Login Name",children:[Object(T.jsx)(_.a.Text,{children:"Login Name:"}),Object(T.jsx)(A.a,{"aria-label":"Small","aria-describedby":"inputGroup-sizing-sm",ref:t})]}),Object(T.jsx)("div",{className:"btn-container login-elm",children:Object(T.jsx)(D.a,{id:"login-btn",size:"lg",onClick:c,children:"Login"})})]})};var F=function(){return Object(T.jsx)(R,{children:Object(T.jsx)(i.a,{children:Object(T.jsxs)(o.c,{children:[Object(T.jsx)(o.a,{path:"/",element:Object(T.jsx)(W,{})}),Object(T.jsx)(o.a,{path:"/chat",element:Object(T.jsx)(G,{})})]})})})};n(83);c.a.render(Object(T.jsx)(a.a.StrictMode,{children:Object(T.jsx)(F,{})}),document.getElementById("root"))}},[[84,1,2]]]);
//# sourceMappingURL=main.245c58d5.chunk.js.map