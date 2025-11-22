import{a as u,S as p}from"./assets/vendor-BUa-3Y32.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const y="53315678-7a3c0068dfc1cc7897b28f029",m="https://pixabay.com/api/",h=15;async function g(o,i=1){if(!o||typeof o!="string"||o.trim()===""){const t=new Error("EMPTY_QUERY");throw t.code="EMPTY_QUERY",t}try{const t=await u.get(m,{params:{key:y,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:i,per_page:h}}),{hits:n,totalHits:e}=t.data;if(!Array.isArray(n)||n.length===0){const r=new Error("NO_RESULTS");throw r.code="NO_RESULTS",r.totalHits=e??0,r}return{hits:n,totalHits:e}}catch(t){if(t.code==="EMPTY_QUERY"||t.code==="NO_RESULTS")throw t;const n=new Error("NETWORK_ERROR");throw n.code="NETWORK_ERROR",n.original=t,n}}let a=null;function E(){a?a.refresh():a=new p(".gallery-item a",{captions:!0,captionsData:"alt",captionPosition:"bottom",captionDelay:250})}function b(){a&&(a.destroy(),a=null)}function L(o,i){if(!Array.isArray(i))return;const t=i.map(({webformatURL:n,largeImageURL:e,tags:r,likes:s,views:l,comments:d,downloads:f})=>`
        <li class="gallery-item">
          <a href="${e}">
            <img src="${n}" alt="${r}" loading="lazy" />
          </a>
          <div class="gallery-info">
            <p><b>Likes:</b> ${s}</p>
            <p><b>Views:</b> ${l}</p>
            <p><b>Comments:</b> ${d}</p>
            <p><b>Downloads:</b> ${f}</p>
          </div>
        </li>
      `).join("");o.insertAdjacentHTML("beforeend",t),E()}function R(o){b(),o.innerHTML=""}function w(o){o.classList.remove("visually-hidden")}function O(o){o.classList.add("visually-hidden")}const c={searchFormEl:document.querySelector(".form"),galleryContainer:document.querySelector(".gallery"),loaderEl:document.querySelector(".loader")};async function S(o){o.preventDefault();const i=o.target.elements["search-text"].value.trim();if(i){R(c.galleryContainer),w(c.loaderEl);try{const{hits:t}=await g(i);if(!t||t.length===0)return;L(c.galleryContainer,t)}catch{}finally{O(c.loaderEl)}}}c.searchFormEl.addEventListener("submit",S);
//# sourceMappingURL=index.js.map
