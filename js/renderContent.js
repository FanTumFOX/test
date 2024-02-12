const contentFeed = document.querySelector("main");

getContent();

async function getContent() {
    const response = await fetch("/js/content.json");
    const contentArray = await response.json();
    renderContent(contentArray);
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
                            <div class="popup_menu_option_label" onclick="location.href='../editor.html';">Редактировать</div>
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

