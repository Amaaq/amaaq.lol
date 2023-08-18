(()=>{var e={672:(e,t,n)=>{"use strict";n.d(t,{B:()=>a,aS:()=>s,q:()=>o,rk:()=>i,th:()=>d});let o=[new l("separate","black")];function l(e,t){this.id=Date.now(),this.name=e.toLowerCase(),this.color=t,this.todos=[]}function r(e,t,n,o,l){this.id=Date.now(),this.title=e.toLowerCase(),this.description=t,this.dueDate=n,this.priority=o,this.status="to-do",this.projectTitle=l.toLowerCase().replace("-"," ")}function a(e,t){o.push(new l(e,t))}function d(e){let t=0;for(let n of o)n.id==e&&o.splice(t,1),t++}function i(e,t,n,l,a){for(let d of o)d.name==a.toLowerCase().replace("-"," ")&&d.todos.push(new r(e,t,n,l,a))}function s(e){for(let t of o){let n=0;for(let o of t.todos)o.id==e&&t.todos.splice(n,1),n++}}},138:(e,t,n)=>{"use strict";var o=n(672);let l=document.querySelector("#to-do"),r=document.querySelector("#in-progress"),a=document.querySelector("#done"),d=document.querySelector("h2"),i=document.querySelector("#projects"),s=document.querySelector("#options"),c=document.querySelector(".add-todo-div"),u=document.querySelector(".add-project-div"),p=document.querySelector("#form1"),f=document.querySelector("#form2"),v=document.querySelectorAll(".drop-target"),m=document.querySelector("#log-out");function y(){c.style.display="flex",f.parentElement.style.display="none"}function h(){u.style.display="flex",p.style.display="none"}function E(){i.textContent="";for(let e=0;e<o.q.length;e++){let t=document.createElement("li"),n=document.createElement("h4"),l=document.createElement("span"),r=document.createElement("i");n.textContent=o.q[e].name,n.addEventListener("click",(()=>{L(o.q[e].id)})),l.style.backgroundColor=o.q[e].color,r.setAttribute("class","fa-solid fa-trash-can"),r.addEventListener("click",(()=>{(0,o.th)(o.q[e].id),E(),L(o.q[0].id)})),t.appendChild(l),t.appendChild(n),"separate"!=o.q[e].name&&t.appendChild(r),i.appendChild(t)}}function L(e){l.textContent="",r.textContent="",a.textContent="";for(let t of o.q)if(t.id==e){d.textContent=t.name;for(let n of t.todos){let d=document.createElement("li"),i=document.createElement("p"),s=document.createElement("span"),c=document.createElement("i"),u=document.createElement("i"),p=document.createElement("div");switch(d.setAttribute("draggable","true"),d.addEventListener("dragstart",(e=>{e.dataTransfer.setData("text",[n.id,t.id])})),i.textContent=n.title,s.textContent=n.dueDate,c.setAttribute("class","fa-solid fa-trash-can"),c.addEventListener("click",(()=>{(0,o.aS)(n.id),L(e)})),p.textContent=n.description,p.setAttribute("class","information"),u.setAttribute("class","fa-solid fa-circle-info"),u.addEventListener("click",(function(){let e=document.querySelectorAll(".information");p.classList.contains("displayed")?p.classList.remove("displayed"):(e.forEach((e=>{e.classList.contains("displayed")&&e.classList.remove("displayed")})),p.classList.add("displayed"))})),d.appendChild(c),d.appendChild(u),d.appendChild(i),d.appendChild(s),d.appendChild(p),n.status){case"to-do":l.appendChild(d);break;case"in-progress":r.appendChild(d);break;case"done":a.appendChild(d)}}}}function q(){let e="";for(let t of o.q)e+=`<option value='${t.name.toLowerCase().replaceAll(" ","-").replaceAll("'",",")}'>${t.name.toUpperCase()}</option>`;e+='<option value="new" id="new-project">New Project</option>',s.innerHTML=e}function C(e){e.preventDefault()}function g(e){e.preventDefault()}function b(e){e.preventDefault();let t=e.dataTransfer.getData("text").split(",");for(let n of o.q)if(n.id==Number(t[1])){for(let o of n.todos)if(o.id==Number(t[0])){let t=e.target;for(;"drop-target"!=t.classList[0];)t=t.parentElement;o.status=t.lastElementChild.id}L(n.id)}}document.addEventListener("DOMContentLoaded",(()=>{null!=i&&(L(o.q.find((e=>"separate"==e.name)).id),y(),h(),m.addEventListener("click",(()=>{fetch(window.location.hostname+"/auth/logout",{method:"POST",body:{email:signUpForm[0].value,password:signUpForm[1].value}})})),c.addEventListener("click",(e=>{c.style.display="none",f.parentElement.style.display="flex",f[0].style.borderColor="var(--btcolor)",f[5].style.borderColor="var(--btcolor)",f[0].focus(),h()})),u.addEventListener("click",(()=>{u.style.display="none",p.style.display="flex",p[0].style.borderColor="var(--btcolor)",p[0].focus(),y()})),v.forEach((e=>{e.addEventListener("dragenter",C),e.addEventListener("dragover",g),e.addEventListener("drop",b)})),f[4].addEventListener("change",(e=>{"new"==e.currentTarget.value?(f[5].disabled=!1,f[6].disabled=!1):(f[5].disabled=!0,f[6].disabled=!0)})),f[8].addEventListener("click",y),p[3].addEventListener("click",h),p[2].addEventListener("click",(e=>{e.preventDefault(),""==p[0].value?p[0].style.borderColor="red":((0,o.B)(p[0].value,p[1].value),p.reset(),h(),E(),q())})),f[7].addEventListener("click",(e=>{e.preventDefault(),""==f[0].value?f[0].style.borderColor="red":"new"==f[4].value&&""==f[5].value?f[5].style.borderColor="red":("new"==f[4].value&&""!=f[5].value?((0,o.B)(f[5].value,f[6].value),(0,o.rk)(f[0].value,""!=f[3].value?f[3].value:"NO DESCRIPTION AVAILABLE",""!=f[1].value?f[1].value:"No due Date",f[2].value,f[5].value),E(),L(o.q[o.q.length-1].id)):((0,o.rk)(f[0].value,""!=f[3].value?f[3].value:"NO DESCRIPTION AVAILABLE",""!=f[1].value?f[1].value:"No due Date",f[2].value,f[4].value),E(),L(o.q.find((e=>e.name==f[4].value.toLowerCase().replaceAll("-"," "))).id)),f.reset(),f[5].disabled=!0,f[6].disabled=!0,y(),q())})))}))},832:()=>{let e=document.querySelector("#sign-in-button"),t=document.querySelector("#sign-up-button"),n=document.querySelector("#sign-in-form"),o=document.querySelector("#sign-up-form"),l=document.querySelector("#sign-up-cancel"),r=document.querySelector("#signup-div"),a=(document.querySelector("#sign-up-error"),document.querySelector("#sign-in-error"),document.querySelector("#sign-up-success")),d=document.querySelector("#login-success");document.addEventListener("DOMContentLoaded",(()=>{null!=n&&(t.addEventListener("click",(e=>{e.preventDefault(),fetch("http://amaaq.lol/auth/signup",{method:"POST"}).then((e=>{console.log(e)})).catch((e=>{console.log(e)}))})),e.addEventListener("click",(e=>{e.preventDefault(),fetch("http://amaaq.lol/auth/signin",{method:"POST",body:{email:n[0].value,password:n[1].value}}).then((e=>{console.log(e)})).catch((e=>{console.log(e)}))})),l.addEventListener("click",(e=>{e.preventDefault(),o.style.display="none"})),d.addEventListener("click",(e=>{e.preventDefault(),a.style.display="none"})),r.addEventListener("click",(e=>{e.preventDefault(),o.style.display="flex"})))}))}},t={};function n(o){var l=t[o];if(void 0!==l)return l.exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n(138),n(672),n(832)})();