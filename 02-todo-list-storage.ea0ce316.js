const t=(t,e)=>{try{const n=JSON.stringify(e);localStorage.setItem(t,n)}catch(t){console.error(t)}},e=t=>{try{const e=localStorage.getItem(t);return null===e?void 0:JSON.parse(e)}catch(t){console.error(t)}},n=t=>{localStorage.removeItem(t)},o=document.getElementById("myInput"),s=document.getElementById("addBtn"),c=document.getElementById("myUL");let i=0;const d=[];function a(e){const n=document.createElement("li");n.textContent=e,n.setAttribute("id",i),c.append(n),i+=1,function(e){const n={};n.text=e.textContent,n.isDone=!1,n.ID=e.getAttribute("id"),d.push(n),t("tasks",d)}(n),function(t){const e=document.createElement("span");e.textContent="×",e.classList.add("close"),t.append(e)}(n)}s.addEventListener("click",(()=>{const t=o.value.trim();""!==t?(a(t),o.value=""):alert("Please, fill the field")})),c.addEventListener("click",(({target:e})=>{if("LI"===e.nodeName)return e.classList.toggle("checked"),void function(e){const n=e.getAttribute("id"),o=d.findIndex((t=>t.ID==n));e.classList.contains("checked")&&(d[o].isDone=!0);e.classList.contains("checked")||(d[o].isDone=!1);t("tasks",d)}(e);"SPAN"===e.nodeName&&(e.parentNode.remove(),i-=1,function(t){const e=t.parentNode.getAttribute("id"),n=d.findIndex((t=>t.ID==e));d.splice(n,1)}(e),function(){if(i>0){const e=c.querySelectorAll("li");for(let t=0;t<i;t++)e[t].setAttribute("id",t),d[t].ID=t;return void t("tasks",d)}0===i&&n("tasks")}())})),window.addEventListener("DOMContentLoaded",(()=>{const n=e("tasks");n&&n.forEach((e=>{if(a(e.text),!0===e.isDone){document.getElementById(e.ID).classList.add("checked"),d[e.ID].isDone=!0,t("tasks",d)}}))}));
//# sourceMappingURL=02-todo-list-storage.ea0ce316.js.map