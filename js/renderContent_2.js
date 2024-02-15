const contentFeed = document.querySelector("main");

getContent();

// async function getContent() {
//     const response = await fetch("../../js/content.json");
//     const contentArray = await response.json();
//     renderContent(contentArray);
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

        renderContent(contentArray);

    } catch (error) {
        console.error("Произошла ошибка при запросе:", error);
    }
}

function renderContent(contentArray) {
    contentArray.forEach(function (content) {
        let votes = content.upvotes - content.downvotes;
        let votesColor;
        if ((votes) >= 0) {
            votesColor = " positive";
        }
        if ((votes) < 0) {
            votesColor = " negative";
        }

        if (location.pathname.match(`${content.location}`) && content.location == `${content.location}`) {
            if (content.visibility == false) {
                const contentHTML = `<div class="feed" data-post-id="${content.id}">
                <div class="content_block">
                    <p>Этот пост был скрыт, <a class="changeVisibility">показать</a></p>
                </div>
            </div>`;
                contentFeed.insertAdjacentHTML("beforeend", contentHTML);
            } else {
                const contentHTML = `<div class="feed" data-post-id="${content.id}">
            <div class="edit_block">
                <div class="edit_block_button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        class="icon_button" viewBox="0 0 16 16">
                        <path
                            d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                    </svg>
                </div>

                <div class="popup">
                    <div class="popup_menu">
                        <div class="popup_menu_option">
                            <div class="popup_menu_option_label" onclick="location.href='../main/editor.html';">Редактировать</div>
                        </div>
                        <div class="popup_menu_option">
                            <div class="popup_menu_option_label">Скрыть</div>
                        </div>
                        <div class="popup_menu_option">
                            <div class="popup_menu_option_label">Удалить</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content_block">
                <a href="${content.postSrc}" class="content_link"></a>
                <h2>${content.title}</h2>
                <p>${content.text}</p>
                <img src="${content.imgSrc}" alt="">
            </div>
            <div class="rate_section">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="chevron-up"
                    viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
                </svg>
                <span class="rate_score${votesColor}">${votes}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="chevron-down"
                    viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                </svg>
                <div class="space"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>
                    <span class="view_counter">${content.view_count}</span>
            </div>
        </div>`;
                contentFeed.insertAdjacentHTML("beforeend", contentHTML);
            };
        };
    })
}

window.addEventListener('click', function (event) {
    if (event.target.className.animVal == 'icon_button') {
        event.target.closest('.feed').querySelector('.popup').classList.toggle('show');
    } else if (event.target.className.animVal !== 'icon_button') {
        const popups = document.getElementsByClassName('popup');
        for (let i = 0; i < popups.length; i++) {
            if (popups[i].classList.contains('show')) {
                popups[i].classList.remove('show');
            }
        }
    }
})

