const servicios=[
["Low Taper Fade","Degradado bajo y limpio, muy versátil.","20"],
["Mid Fade","Degradado medio, uno de los estilos más solicitados.","20"],
["Low Fade + Textura","Laterales bajos y cabello superior texturizado.","22"],
["Textured Crop","Corto arriba con textura y flequillo.","22"],
["French Crop","Parecido al crop, con flequillo definido.","22"],
["Buzz Cut","Corte corto y práctico.","15"],
["Caesar Cut","Corte corto con flequillo frontal.","20"],
["Fluffy Cut","Volumen y textura arriba con taper discreto.","20"],
["Modern Mullet / Baby Mullet","Laterales cortos y nuca ligeramente más larga.","20"],
["Taper Middle Part","Taper con raya al medio y capas.","20"],
["Curly Fade","Degradado para cabello ondulado o rizado.","20"],
["Corte Clásico","Opción elegante y tradicional.","8"]
];

function llenarServicios(selectId="servicio"){
 const select=document.getElementById(selectId);
 if(select) servicios.forEach(s=>{const o=document.createElement("option");o.value=s[0];o.textContent=`${s[0]} — S/ ${s[2]}`;select.appendChild(o)});
}
function renderPrecios(){
 const box=document.getElementById("prices");
 if(!box)return;
 box.innerHTML=servicios.map((s,i)=>`<article class="price-card"><small style="color:#777">CORTE ${String(i+1).padStart(2,"0")}</small><h3>${s[0]}</h3><p>${s[1]}</p><span class="price">S/ ${s[2]}</span></article>`).join("");
}
function renderCards(){
 const box=document.getElementById("cutCards");
 if(!box)return;
 box.innerHTML=servicios.map((s,i)=>`<article class="price-card"><h3>${s[0]}</h3><p>${s[1]}</p><span class="price">S/ ${s[2]}</span><a class="btn gold" style="margin-top:15px;width:100%" href="reservar.html?servicio=${encodeURIComponent(s[0])}">Reservar</a></article>`).join("");
}
document.addEventListener("DOMContentLoaded",()=>{
 const menuBtn=document.getElementById("menuBtn"), menu=document.getElementById("menu");
 if(menuBtn)menuBtn.addEventListener("click",()=>menu.classList.toggle("show"));
 document.querySelectorAll(".menu a").forEach(a=>a.addEventListener("click",()=>menu?.classList.remove("show")));
 llenarServicios();renderPrecios();renderCards();
 const fecha=document.getElementById("fecha"); if(fecha) fecha.min=new Date().toISOString().split("T")[0];
 const params=new URLSearchParams(location.search), selected=params.get("servicio");
 const select=document.getElementById("servicio"); if(select&&selected)select.value=selected;
 const form=document.getElementById("bookingForm");
 if(form)form.addEventListener("submit",e=>{
   e.preventDefault();
   const data=Object.fromEntries(new FormData(form).entries());
   localStorage.setItem("luisBarberReserva",JSON.stringify({...data,creado:new Date().toLocaleString("es-PE")}));
   const m=document.getElementById("message");m.textContent=`✓ Reserva registrada para ${data.nombre}. ${data.servicio}, ${data.fecha} a las ${data.hora}.`;
   form.reset();
 });
 const year=document.getElementById("year");if(year)year.textContent=new Date().getFullYear();
});
