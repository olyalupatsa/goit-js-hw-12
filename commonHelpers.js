import{S as y,i as c,a as v}from"./assets/vendor-951421c8.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const L=document.querySelector(".form"),a=document.querySelector(".gallery"),d=document.querySelector(".preload"),l=document.querySelector(".load-more-btn"),p=new y(".gallery a",{captionsData:"alt",captionDelay:250});let u=1;L.addEventListener("submit",w);l.addEventListener("click",S);async function w(t){t.preventDefault();const s=t.currentTarget.elements.input.value;if(a.innerHTML="",!s.trim()){c.show({title:"❕",theme:"light",message:"Please, fill in the search field",messageSize:"20px",messageColor:"#808080",backgroundColor:"#e7fc44",position:"topLeft",timeout:3e3});return}d.classList.remove("is-hidden"),l.classList.add("is-hidden");try{const i=await h(s);i.hits.length===0?c.show({iconUrl:icon,theme:"dark",message:"Sorry, there are no images matching your search query. Please try again!",messageSize:"16px",messageColor:"white",backgroundColor:"#EF4040",position:"topRight",timeout:5e3}):(a.innerHTML=m(i.hits),p.refresh(),l.classList.remove("is-hidden"))}catch(i){g(i)}finally{d.classList.add("is-hidden")}t.currentTarget.reset()}async function h(t,s=1){const i="https://pixabay.com/api",o="41989541-8f5a4609d6994378f5ee88908";try{return(await v.get(i,{params:{key:o,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",page:s,per_page:40}})).data}catch(e){throw new Error(e.message)}}function m(t){return t.map(({webformatURL:s,largeImageURL:i,tags:o,likes:e,views:r,comments:n,downloads:f})=>`<li class="gallery-item">
        <a class="gallery-link" href="${i}">
           <img
            class="gallery-image"
            src="${s}"
            alt="${o}"
          />
        </a>
        <div class="container-additional-info">
          <div class="container-descr-inner"><p class="description">Likes</p><span class="description-value">${e}</span></div>
          <div class="container-descr-inner"><p class="description">Views</p><span class="description-value">${r}</span></div>
          <div class="container-descr-inner"><p class="description">Comments</p><span class="description-value">${n}</span></div>
          <div class="container-descr-inner"><p class="description">Downloads</p><span class="description-value">${f}</span></div>
        </div>
      </li>`).join("")}async function S(){u+=1;try{const t=await h(event.currentTarget.value,u);if(t.hits.length===0)document.querySelector(".preload").classList.add("is-hidden"),event.currentTarget.classList.add("is-hidden"),c.show({title:"❕",theme:"light",message:"We're sorry, but you've reached the end of search results.",messageSize:"20px",messageColor:"#808080",backgroundColor:"#e7fc44",position:"topLeft",timeout:5e3});else{a.innerHTML+=m(t.hits),p.refresh();const s=a.lastElementChild.getBoundingClientRect().height;window.scrollBy(0,s)}}catch(t){g(t)}}function g(t){console.error(t),a.innerHTML="",c.show({iconUrl:icon,theme:"dark",message:"Sorry, there is a problem with connection with the server.",messageSize:"16px",messageColor:"white",backgroundColor:"#EF4040",position:"center",timeout:5e3})}
//# sourceMappingURL=commonHelpers.js.map
