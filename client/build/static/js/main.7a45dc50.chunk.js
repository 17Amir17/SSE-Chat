(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{49:function(e,t,n){},70:function(e,t,n){},83:function(e,t,n){},85:function(e,t,n){"use strict";n.r(t);var s,a=n(0),r=n.n(a),c=n(40),i=n.n(c),o=(n(49),n(23)),u=n(5),l=n(7),p=n.n(l),d=n(10),m=n(28),f=n(8),h=n(14),j=n.n(h),b=n(41),g="https://dockerchat.herokuapp.com",O="CHAT_MESSAGE",v="USER_JOINED",x="USER_LEFT",y="USER_TYPING";function w(){return(w=Object(d.a)(p.a.mark((function e(t,n){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,j.a.post("".concat(g,"/message/send"),{message:t},{headers:{Authorization:n}});case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),console.log(e.t0.response);case 8:case"end":return e.stop()}}),e,null,[[0,5]])})))).apply(this,arguments)}function k(){return(k=Object(d.a)(p.a.mark((function e(t){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,j.a.post("".concat(g,"/message/typing"),null,{headers:{Authorization:t}});case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),console.log(e.t0.response);case 8:case"end":return e.stop()}}),e,null,[[0,5]])})))).apply(this,arguments)}function N(e){return S.apply(this,arguments)}function S(){return(S=Object(d.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,j.a.get("".concat(g,"/message/userList"),{headers:{Authorization:t}});case 3:return n=e.sent,console.log(n.data),e.abrupt("return",n.data);case 8:return e.prev=8,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",[]);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function T(e){return E.apply(this,arguments)}function E(){return(E=Object(d.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,j.a.get("".concat(g,"/message/history"),{headers:{Authorization:t}});case 3:return n=e.sent,e.abrupt("return",n.data);case 7:return e.prev=7,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",[]);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}var C=function(){};function z(){return z=Object(d.a)(p.a.mark((function e(t){var n,a,r,c,i,o=arguments;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=o.length>1&&void 0!==o[1]?o[1]:C,a=o.length>2&&void 0!==o[2]?o[2]:C,r=o.length>3&&void 0!==o[3]?o[3]:C,c=o.length>4&&void 0!==o[4]?o[4]:C,i=o.length>5&&void 0!==o[5]?o[5]:C,s&&s.close(),(s=new b.EventSourcePolyfill("".concat(g,"/message/stream"),{headers:{Authorization:t}})).onopen=function(){console.log("EventStream opened")},s.addEventListener(v,(function(e){e=JSON.parse(e.data),a(e.username,e.time)})),s.addEventListener(x,(function(e){e=JSON.parse(e.data),console.log("User ".concat(e.username," left!")),r(e.username,e.time)})),s.addEventListener(O,(function(e){e=JSON.parse(e.data),n(e.username,e.message,e.time)})),s.addEventListener(y,(function(e){var t=JSON.parse(e.data).typing;c(t)})),s.onerror=function(e){console.log("Error\n",e),s.close(),i()},e.abrupt("return",(function(){s.close()}));case 14:case"end":return e.stop()}}),e)}))),z.apply(this,arguments)}var L=n(1),A=Object(a.createContext)("");var M=function(e){var t=Object(a.useState)(),n=Object(f.a)(t,2),s=n[0],r=n[1],c=Object(a.useState)(),i=Object(f.a)(c,2),o=i[0],u=i[1],l=Object(a.useState)(),h=Object(f.a)(l,2),j=h[0],b=h[1],g=Object(a.useState)([]),O=Object(f.a)(g,2),v=O[0],x=O[1],y=Object(a.useState)([]),w=Object(f.a)(y,2),k=w[0],S=w[1],E=function(){var e=Object(d.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=S,e.t1=m.a,e.next=4,N(o);case 4:e.t2=e.sent,e.t3=(0,e.t1)(e.t2),(0,e.t0)(e.t3);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),C=function(){var e=Object(d.a)(p.a.mark((function e(t){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=x,e.next=3,T(t);case 3:e.t1=e.sent,(0,e.t0)(e.t1),console.log("Got history");case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(L.jsx)(A.Provider,{value:{username:s,setInitial:function(e,t,n){r(e),u(t),b(n)},messages:v,setMessages:x,addMessage:function(e){v.push(e),x(Object(m.a)(v))},users:k,requestUsers:E,clearMessages:function(){x([])},requestHistory:C,accessToken:o,refreshToken:j,clearSession:function(){r(void 0),u(void 0),b(void 0)}},children:e.children})},R=n(87),U=n(86),G=n(88);n(70);var J=function(e){var t=Object(u.f)(),n=Object(a.useContext)(A),s=Object(a.useRef)(null),r=Object(a.useState)([]),c=Object(f.a)(r,2),i=c[0],o=c[1],l=(new Date).getTime(),p=function(e,t,s){n.addMessage({username:e,message:t,time:s})},d=function(e,t){n.addMessage({username:"Server",message:"".concat(e," left"),time:t}),n.requestUsers()},m=function(e,t){n.addMessage({username:"Server",message:"".concat(e," joined"),time:t}),n.requestUsers()},h=function(e){o(e)},j=function(){t("/")};return Object(a.useEffect)((function(){!function(e){z.apply(this,arguments)}(n.accessToken,p,m,d,h,j)}),[]),Object(L.jsxs)("div",{className:"chat",children:[Object(L.jsxs)(R.a,{body:!0,style:{textAlign:"left",marginBottom:"0.5em"},children:["Logged in as"," ",Object(L.jsx)("span",{style:{fontWeight:"bold"},children:n.username})]}),Object(L.jsxs)("div",{className:"content",children:[Object(L.jsxs)("div",{className:"message-area",children:[Object(L.jsxs)("div",{className:"history-wrapper",children:[Object(L.jsx)("div",{className:"history",children:n.messages.map((function(e,t){return Object(L.jsx)(R.a,{className:"msg",children:Object(L.jsxs)(R.a.Body,{children:[Object(L.jsxs)("span",{className:"msg-sender",children:[e.username,":"]}),Object(L.jsxs)("span",{className:"msg-body",children:[" ",e.message]}),Object(L.jsxs)("span",{className:"time",children:[new Date(e.time).toLocaleTimeString()," "]})]})},t)}))}),Object(L.jsx)("span",{children:0===i.length?"":"Currently Typing: "+i.map((function(e){return"".concat(e," ")}))})]}),Object(L.jsxs)("div",{style:{display:"flex",flexDirection:"row"},children:[Object(L.jsx)(U.a.Control,{as:"textarea",placeholder:"Write your message here",style:{height:"100px"},className:"messagebox",ref:s,onChange:function(){var e=(new Date).getTime();e-l>500&&(!function(e){k.apply(this,arguments)}(n.accessToken),l=e)}}),Object(L.jsx)(G.a,{className:"send",onClick:function(){!function(e,t){w.apply(this,arguments)}(s.current.value,n.accessToken),s.current.value=""},children:"Send!"})]})]}),Object(L.jsxs)("ul",{className:"online list-group",children:[Object(L.jsx)("span",{className:"online-label",children:"Online"}),n.users.map((function(e,t){return Object(L.jsx)("li",{className:"list-group-item",children:e.name},t)}))]})]})]})},q="".concat(g,"/auth");function B(e,t){return D.apply(this,arguments)}function D(){return(D=Object(d.a)(p.a.mark((function e(t,n){var s;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,j.a.post("".concat(q,"/login/"),{username:t,password:n});case 3:return s=e.sent,e.abrupt("return",{status:!0,message:s.data.message,username:s.data.username,accessToken:s.data.accessToken,refreshToken:s.data.refreshToken});case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",{status:!1,message:e.t0.response.data.message||"something went wrong :("});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}function H(e,t){return I.apply(this,arguments)}function I(){return(I=Object(d.a)(p.a.mark((function e(t,n){var s;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,j.a.post("".concat(q,"/register/"),{username:t,password:n});case 3:return s=e.sent,e.abrupt("return",{status:!0,message:s.data.message});case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",{status:!1,message:e.t0.response.data.message||"something went wrong :("});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}var P=n(27),_=n.n(P),W=(n(83),n(89)),F=n(42);function Y(e){_.a.fire({icon:"success",title:"Hooray!",text:e,showConfirmButton:!1,timer:1500})}function K(e){_.a.fire({icon:"error",title:"Oops!",text:e,showConfirmButton:!1,timer:1500})}var Q=function(e){var t=Object(a.useRef)(null),n=Object(a.useRef)(null),r=Object(a.useContext)(A),c=Object(u.f)(),i=Object(u.e)();Object(a.useEffect)((function(){s&&(s.close(),s=void 0,console.log("Closed")),r.clearSession()}),[i]);var o=function(){var e=Object(d.a)(p.a.mark((function e(s){var a,i,o,u,l,d,m,f;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.current.value,i=n.current.value,e.next=4,B(a,i);case 4:if(o=e.sent,u=o.status,l=o.message,d=o.username,m=o.accessToken,f=o.refreshToken,u?Y(l):K(l),!u){e.next=16;break}return r.setInitial(d,m,f),e.next=15,r.requestHistory(m);case 15:c("/chat");case 16:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),l=function(){var e=Object(d.a)(p.a.mark((function e(s){var a,r,c,i,o;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.current.value,r=n.current.value,e.next=4,H(a,r);case 4:c=e.sent,i=c.status,o=c.message,i?Y(o):K(o);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(L.jsxs)("div",{className:"login",children:[Object(L.jsx)("span",{className:"title card-title",children:"Chat Room!"}),Object(L.jsxs)(W.a,{size:"lg",id:"inputGroup-sizing-sm",className:"mb-3 name-input login-elm",placeholder:"Enter Login Name",children:[Object(L.jsx)(W.a.Text,{children:"Username:"}),Object(L.jsx)(F.a,{"aria-label":"Small","aria-describedby":"inputGroup-sizing-sm",ref:t})]}),Object(L.jsxs)(W.a,{size:"lg",id:"inputGroup-sizing-sm",className:"mb-3 name-input login-elm",placeholder:"Enter Login Name",children:[Object(L.jsx)(W.a.Text,{children:"Password:"}),Object(L.jsx)(F.a,{"aria-label":"Small","aria-describedby":"inputGroup-sizing-sm",ref:n,type:"password"})]}),Object(L.jsxs)("div",{className:"btn-container login-elm",children:[Object(L.jsx)(G.a,{id:"login-btn",size:"lg",onClick:o,children:"Login"}),Object(L.jsx)(G.a,{id:"register-btn",size:"lg",onClick:l,children:"Register"})]})]})};var V=function(){return Object(L.jsx)(M,{children:Object(L.jsx)(o.a,{children:Object(L.jsxs)(u.c,{children:[Object(L.jsx)(u.a,{path:"/",element:Object(L.jsx)(Q,{})}),Object(L.jsx)(u.a,{path:"/chat",element:Object(L.jsx)(J,{})})]})})})};n(84);i.a.render(Object(L.jsx)(r.a.StrictMode,{children:Object(L.jsx)(V,{})}),document.getElementById("root"))}},[[85,1,2]]]);
//# sourceMappingURL=main.7a45dc50.chunk.js.map