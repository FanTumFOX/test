const contentSidebar = document.querySelector(".feed_link");
const buttonSidebar = document.querySelector(".sidebar");

getContent();
renderButtonSidebar();

// async function getContent() {
//     const response = await fetch("../../js/content.json");
//     const contentArray = await response.json();
//     renderSidebar(contentArray);
// }

async function getContent() {
    try {
        const response = await fetch(`http://localhost:5500/getContent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const contentArray = await response.json();

        renderSidebar(contentArray);

    } catch (error) {
        console.error("Произошла ошибка при запросе:", error);
    }
}

function renderSidebar(contentArray) {
    contentArray.forEach(function (content) {
        shorterTitle = content.title.split(' ').slice(0, 4).join(' ');
        if (location.pathname.match(`${content.location}`) && content.location == `${content.location}` && content.visibility == true) {
            const contentHTML = `<li><a href="${content.postSrc}">${shorterTitle}</a></li>`
            contentSidebar.insertAdjacentHTML("beforeend", contentHTML);
        }
    })
}

function renderButtonSidebar() {
    const contentHTML = `<ul><a class="feed_edit_link" href="../main/editor.html">
    <button class="feed_edit">Новый пост</button>
    </a>
</ul>`
    buttonSidebar.insertAdjacentHTML("beforeend", contentHTML);
}