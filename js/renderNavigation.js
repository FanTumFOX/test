const contentNav = document.querySelector("nav");

getContent();

async function getContent() {
    const response = await fetch("/js/memes.json");
    const memesArray = await response.json();
    renderNavigation(memesArray);
}

function renderNavigation(memesArray) {
    memesArray.forEach(function (mem) {
        if (location.pathname.match(`${mem.location}`) && (mem.location == `${mem.location}`)) {
            const contentHTML = `<ul>
    <li><a href="/view/index.html">Home</a></li>
    <li><a href="/view/list/list.html">List</a></li>
    <li><a href="/view/analytics/analytics.html">Analytics</a></li>
    <li><a><span><img src="${mem.src}"
                    alt="${mem.alt}"></span></a></li>
    </li>
</ul>`;
            contentNav.insertAdjacentHTML("beforeend", contentHTML);
        };
    })

};