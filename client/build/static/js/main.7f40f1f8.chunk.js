(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{112:function(e,t){},118:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(3),s=a(4),l=a(6),o=a(5),i=a(7),m=(a(50),a(52),a(54),a(56),a(11)),u=a.n(m),d=a(12),p=a.n(d),h=a(9),y=a.n(h),f=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(l.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(r)))).state={weather:{},updated:"",icon:""},a}return Object(i.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.socket.on("data",function(t){t.weather&&e.setState({updated:t.weather.timestamp,icon:t.weather.body.currently.icon,weather:t.weather.body})})}},{key:"render",value:function(){var e="--",t="--",a="--",n=[];return u.a.isEmpty(this.state.weather)||(e=Math.round(this.state.weather.currently.temperature),a=Math.round(this.state.weather.currently.apparentTemperature),t=this.state.weather.minutely.summary,n=this.state.weather.daily.data),r.a.createElement("div",{style:{backgroundColor:this.props.color},className:"weather module"},u.a.isEmpty(this.state.weather)?r.a.createElement("div",null,"Loading"):r.a.createElement("div",null,r.a.createElement("div",{className:"now"},r.a.createElement("div",null,r.a.createElement("span",{className:"temperature"},e,"\xb0"),r.a.createElement("span",null,"Feels like ",a,"\xb0")),r.a.createElement("div",{className:"summary"},t)),r.a.createElement("div",{className:"day"},r.a.createElement("h2",{className:"group-name"},"Today H",Math.round(n[0].temperatureHigh),"\xb0 L",Math.round(n[0].temperatureLow),"\xb0"),r.a.createElement("div",{className:"day-summary"},n[0].summary)),r.a.createElement("div",{className:"day"},r.a.createElement("h2",{className:"group-name"},"Tomorrow H",Math.round(n[1].temperatureHigh),"\xb0 L",Math.round(n[1].temperatureLow),"\xb0"),r.a.createElement("div",{className:"day-summary"},n[1].summary)),r.a.createElement("div",{className:"day"},r.a.createElement("h2",{className:"group-name"},p.a.unix(n[2].time).format("dddd")," H",Math.round(n[2].temperatureHigh),"\xb0 L",Math.round(n[2].temperatureLow),"\xb0"),r.a.createElement("div",{className:"day-summary"},n[2].summary)),r.a.createElement("p",{className:"updated"},r.a.createElement(y.a,{fromNow:!0},this.state.updated))))}}]),t}(n.Component),v=(a(58),function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this.refs.canvas;e.width=400,e.height=400,e.style.width="80%",e.style.height=e.style.width;var t=this.refs.canvas.getContext("2d"),a=e.height/4;t.scale(2,2),t.translate(a,a),function(e,t){var a;e.font=.15*t+"px arial",e.fillStyle="white",e.textBaseline="middle",e.textAlign="center",["Jan","\u2022","\u2022","Apr","\u2022","\u2022","Jul","\u2022","\u2022","Oct","\u2022","\u2022"].forEach(function(n,r){a=r*Math.PI/6,e.rotate(a),e.translate(0,.85*-t),e.rotate(-a),e.fillText(n,0,0),e.rotate(a),e.translate(0,.85*t),e.rotate(-a)})}(t,a*=.9),setInterval(function(){!function(e,t){var a=(new Date).getTime(),n=new Date((new Date).getFullYear(),0,1).getTime(),r=new Date((new Date).getFullYear(),11,31).getTime(),c=(a-n)/(r-n)*360*(Math.PI/180);c=c.toFixed(6),e.beginPath(),e.strokeStyle="white",e.lineWidth=.02*t,e.lineCap="round",e.moveTo(0,0),e.rotate(c),e.lineTo(0,.9*-t),e.stroke(),e.rotate(-c)}(t,a)},100)}},{key:"render",value:function(){return r.a.createElement("div",{style:{backgroundImage:"url(".concat(this.props.image,")"),backgroundColor:this.props.color},className:"module time"},r.a.createElement("div",{className:"content"},r.a.createElement("div",{className:"time"},r.a.createElement(y.a,{format:"h:mm"}),r.a.createElement("span",{className:"ampm"},r.a.createElement(y.a,{format:"A"}))),r.a.createElement("div",{className:"date"},r.a.createElement(y.a,{format:"dddd, MMMM Do"})),r.a.createElement("div",null,r.a.createElement("canvas",{ref:"canvas"}))))}}]),t}(n.Component)),E=(a(60),function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(l.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(r)))).state={calendar:{},updated:""},a}return Object(i.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.socket.on("data",function(t){t["calendar-"+e.props.calendar]&&e.setState({calendar:t["calendar-"+e.props.calendar].body,updated:t["calendar-"+e.props.calendar].timestamp})})}},{key:"render",value:function(){if(!u.a.isEmpty(this.state.calendar)){var e=this.state.calendar.items,t=[],a=[],n=[];e.forEach(function(r,c){r.start.dateTime?(e[c].friendlyTime=p()(r.start.dateTime).format("h:mma"),e[c].day=p()(r.start.dateTime).format("YYYY-MM-DD")):r.start.date&&(e[c].friendlyTime="All day",e[c].day=p()(r.start.date).format("YYYY-MM-DD")),p()().format("YYYY-MM-DD")===e[c].day?t.push(r):p()().add(1,"days").format("YYYY-MM-DD")===e[c].day?a.push(r):n.push(r)})}return r.a.createElement("div",{style:{backgroundColor:this.props.color},className:"module calendar"},u.a.isEmpty(this.state.calendar)?r.a.createElement("div",null,"Loading"):r.a.createElement("div",null,r.a.createElement("h1",{className:"calendar-name"},this.state.calendar.summary),t.length?r.a.createElement("div",{className:"group"},r.a.createElement("h2",{className:"group-name"},"Today"),t.map(function(e){return r.a.createElement("div",{className:"event",key:e.id},r.a.createElement("p",{className:"time"},e.friendlyTime)," ",r.a.createElement("p",{className:"summary"},e.summary))})):null,a.length?r.a.createElement("div",{className:"group"},r.a.createElement("h2",{className:"group-name"},"Tomorrow"),a.map(function(e){return r.a.createElement("div",{className:"event",key:e.id},r.a.createElement("p",{className:"time"},e.friendlyTime)," ",r.a.createElement("p",{className:"summary"},e.summary))})):null,n.length?r.a.createElement("div",{className:"group"},r.a.createElement("h2",{className:"group-name"},"2+ Days From Now"),n.map(function(e){return r.a.createElement("div",{className:"event",key:e.id},r.a.createElement("p",{className:"time"},r.a.createElement(y.a,{format:"M/D"},e.day))," ",r.a.createElement("p",{className:"summary"},e.summary))})):null,e.length?null:r.a.createElement("div",{className:"none"},"No events"),r.a.createElement("p",{className:"updated"},r.a.createElement(y.a,{fromNow:!0},this.state.updated))))}}]),t}(n.Component)),g=(a(62),a(44)),b=a.n(g),k=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(l.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(r)))).state={feed:{},updated:""},a}return Object(i.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.socket.on("data",function(t){t.feed&&e.setState({updated:t.feed.timestamp,feed:t.feed.body})}),this.createMarkup=this.createMarkup.bind(this)}},{key:"createMarkup",value:function(e){return{__html:e}}},{key:"render",value:function(){var e=this,t=[];return u.a.isEmpty(this.state.feed)||(t=this.state.feed.items),r.a.createElement("div",{style:{backgroundColor:this.props.color},className:"module feed"},u.a.isEmpty(this.state.feed)?r.a.createElement("div",null,"Loading"):r.a.createElement("div",null,r.a.createElement(b.a,{dots:!1,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,autoplaySpeed:2e4,autoplay:!0},t.map(function(t){return r.a.createElement("div",{key:t.id},t.visual&&"none"!==t.visual.url?r.a.createElement("div",{className:"image",style:{backgroundImage:"url(".concat(t.visual.url,")")}}):null,r.a.createElement("div",{className:"content"},r.a.createElement("h1",{className:"title"},t.title),r.a.createElement("p",{className:"published"},r.a.createElement(y.a,{fromNow:!0},t.published)),r.a.createElement("p",{className:"summary",dangerouslySetInnerHTML:e.createMarkup(t.summary?t.summary.content:t.content.content)})))})),r.a.createElement("p",{className:"updated"},r.a.createElement(y.a,{fromNow:!0},this.state.updated))))}}]),t}(n.Component),N=(a(82),function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(l.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(r)))).state={subway:{},updated:""},a}return Object(i.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.socket.on("data",function(t){t.subway&&e.setState({subway:t.subway.body,updated:t.subway.timestamp})})}},{key:"render",value:function(){if(!u.a.isEmpty(this.state.subway)){var e=this.state.subway,t=[];e.forEach(function(e){e.stops.forEach(function(e){e.updates.length>3&&(e.updates.length=3),t.push(e)})})}return r.a.createElement("div",{style:{backgroundColor:this.props.color},className:"module subway"},u.a.isEmpty(this.state.subway)?r.a.createElement("div",null,"Loading"):r.a.createElement("div",null,t.map(function(e,t){return r.a.createElement("div",{className:"stop",key:t},r.a.createElement("div",null,r.a.createElement("div",{className:"line-"+e.line},e.line)),r.a.createElement("div",null,r.a.createElement("h2",{className:"group-name"},e.station),e.updates.map(function(e,t){return r.a.createElement("div",{className:"update",key:t},p()(1e3*e.time.low).fromNow())}),e.updates.length?null:r.a.createElement("div",{className:"update"},"No trains")))}),r.a.createElement("p",{className:"updated"},r.a.createElement(y.a,{fromNow:!0},this.state.updated))))}}]),t}(n.Component)),w=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(o.a)(t).call(this,e))).state={background:"",opacity:""},a}return Object(i.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.socket.on("display",function(t){t.background&&e.setState({background:t.background}),t.opacity&&e.setState({opacity:t.opacity})})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"cards",style:{backgroundImage:"url(".concat(this.state.background,")")}},r.a.createElement(v,{color:"rgba(0, 0, 0, 0.35)"}),r.a.createElement(E,{socket:this.props.socket,color:"rgb(121, 112, 255)",calendar:"7afrbvotf8p1qcjcpbqp2639as@group.calendar.google.com"}),r.a.createElement(E,{socket:this.props.socket,color:"rgb(253, 147, 72)",calendar:"iamnickvolpe@gmail.com"}),r.a.createElement(E,{socket:this.props.socket,color:"rgb(210, 102, 255)",calendar:"jenn.sager@gmail.com"}),r.a.createElement(f,{socket:this.props.socket,color:"rgba(0, 0, 0, 0.35)"}),r.a.createElement(N,{socket:this.props.socket,color:"rgba(0, 0, 0, 0.35)"}),r.a.createElement(k,{socket:this.props.socket,color:"white"})),r.a.createElement("div",{className:"cover",style:{opacity:this.state.opacity}}))}}]),t}(n.Component),O=a(14),j=(a(84),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(o.a)(t).call(this,e))).state={value:""},a.changeImage=a.changeImage.bind(Object(O.a)(Object(O.a)(a))),a.changeOpacity=a.changeOpacity.bind(Object(O.a)(Object(O.a)(a))),a.handleChange=a.handleChange.bind(Object(O.a)(Object(O.a)(a))),a}return Object(i.a)(t,e),Object(s.a)(t,[{key:"changeImage",value:function(){fetch("/api/randomize-background",{credentials:"same-origin",headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({q:this.state.value})}).then(function(e){console.log(e)}).catch(function(e){console.log(e)})}},{key:"changeOpacity",value:function(e){fetch("/api/display",{credentials:"same-origin",headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({opacity:e})}).then(function(e){console.log(e)}).catch(function(e){console.log(e)})}},{key:"handleChange",value:function(e){this.setState({value:e.target.value})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"remote"},r.a.createElement("div",{className:"card image"},r.a.createElement("input",{type:"text",placeholder:"Search Images...",value:this.state.value,onChange:this.handleChange}),r.a.createElement("button",{onClick:this.changeImage},"Change Image")),r.a.createElement("div",{className:"card opacity"},r.a.createElement("button",{onClick:function(){return e.changeOpacity("0")}},"100%"),r.a.createElement("button",{onClick:function(){return e.changeOpacity(".5")}},"50%"),r.a.createElement("button",{onClick:function(){return e.changeOpacity("1")}},"0%")))}}]),t}(n.Component)),M=a(120),C=a(121),T=a(45),D=a.n(T);function S(){return D()()}var Y=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(M.a,null,r.a.createElement(C.a,{exact:!0,path:"/",render:function(e){return r.a.createElement(j,Object.assign({},e,{socket:S()}))}}),r.a.createElement(C.a,{path:"/app",render:function(e){return r.a.createElement(w,Object.assign({},e,{socket:S()}))}})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var I=a(23),L=a(119);Object(I.render)(r.a.createElement(L.a,null,r.a.createElement(Y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},48:function(e,t,a){e.exports=a(118)},52:function(e,t,a){},54:function(e,t,a){},56:function(e,t,a){},58:function(e,t,a){},60:function(e,t,a){},62:function(e,t,a){},82:function(e,t,a){},84:function(e,t,a){}},[[48,2,1]]]);
//# sourceMappingURL=main.7f40f1f8.chunk.js.map