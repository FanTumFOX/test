const contentSidebar = document.querySelector(".feed_link");
const buttonSidebar = document.querySelector(".sidebar");

getContent();
renderButtonSidebar();

async function getContent() {
    const response = await fetch("/js/content.json");
    const contentArray = await response.json();
    renderSidebar(contentArray);
}

function renderSidebar(contentArray) {
    contentArray.forEach(function (content) {
        shorterTitle = content.title.split(' ').slice(0, 4).join(' ');
        if (location.pathname.match(`${content.location}`) && content.location == `${content.location}`) {
            const contentHTML = `<li><a href="../${content.location}/${content.postSrc}">${shorterTitle}</a></li>`
            contentSidebar.insertAdjacentHTML("beforeend", contentHTML);
        }
    })
}

function renderButtonSidebar() {
    const contentHTML = `<ul><a class="feed_edit_link" href="../editor.html">
    <button class="feed_edit">Новый пост</button>
    </a>
</ul>`
    buttonSidebar.insertAdjacentHTML("beforeend", contentHTML);
}