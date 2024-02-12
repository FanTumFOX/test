window.addEventListener('click', function (event) {

    if (event.target.className === "new_post") {
        title = "";
        imgSrc = "";
        text = "";

        // folder = location.pathname.match(/\/([^\/]+)\//g)[0].slice(1, -1)
        if (this.document.referrer.match('list')) {
            folder = "list";
        }
        if (this.document.referrer.match('analytics')) {
            folder = "analytics";
        }

        try {
            if (this.document.querySelector('#title').value && this.document.querySelector('#text').value) {
                const postInfo = {
                    folder: folder,
                    title: title = this.document.querySelector('#title').value,
                    imgSrc: imgSrc = this.document.querySelector('#img').value,
                    text: text = this.document.querySelector('#text').value
                };
                console.log(postInfo);
                newPost(postInfo);
                this.document.querySelector('#title').value = '';
                this.document.querySelector('#img').value = '';
                this.document.querySelector('#text').value = '';
            } else {
                this.alert('Введите название публикации и текст')
            }
        } catch (error) {
            console.error('Ошибка заполнения полей:', error)
        }
    };

    if (event.target.className == "popup_menu_option_label") {
        if (event.target.innerHTML.match('Удалить')) {
            // console.log(event.target.innerHTML, event.target.closest('.feed').dataset.postId);
            const postId = event.target.closest('.feed').dataset.postId;
            deletePost(postId);
        }

        if (event.target.innerHTML.match('Скрыть')) {
            console.log(event.target.innerHTML, event.target.closest('.feed').dataset.postId);
            const postId = event.target.closest('.feed').dataset.postId;
            changeVisibility(postId);
            this.location.reload();
        }

        if (event.target.innerHTML.match('Редактировать')) {
            console.log(event.target.innerHTML, event.target.closest('.feed').dataset.postId);
            const postId = event.target.closest('.feed').dataset.postId;
            localStorage.setItem('postId', postId);
        }
    };

    if (event.target.className == "cross" || event.target.className == "feed_edit") {
        localStorage.clear();
    }

    if (event.target.className == "changeVisibility") {
        const postId = event.target.closest('.feed').dataset.postId;
        changeVisibility(postId);
        this.location.reload();
    }

    if (event.target.className === "new_post edit") {
        try {
            if (this.document.querySelector('#title').value && this.document.querySelector('#text').value) {
                const postInfo = {
                    postId: localStorage.getItem('postId'),
                    title: title = this.document.querySelector('#title').value,
                    imgSrc: imgSrc = this.document.querySelector('#img').value,
                    text: text = this.document.querySelector('#text').value
                };
                console.log(postInfo);
                editPost(postInfo);
                this.document.querySelector('#title').value = '';
                this.document.querySelector('#img').value = '';
                this.document.querySelector('#text').value = '';
            } else {
                this.alert('Введите название публикации и текст');
            }
        } catch (error) {
            console.error('Ошибка заполнения полей:', error);
        }
    }
});

window.addEventListener('load', function (event) {
    if (event.target.location.href.match('editor') && localStorage.getItem('postId')) {
        // console.log(event);
        const postId = localStorage.getItem('postId');
        // console.log(postId);
        this.document.querySelector('.new_post').classList.toggle('edit');

        getContent();

        async function getContent() {
            const response = await fetch("../../js/content.json");
            const contentArray = await response.json();

            const contentToUpdate = contentArray.find(contentArray => contentArray.id == postId);
            document.querySelector('#title').value = contentToUpdate.title;
            document.querySelector('#img').value = contentToUpdate.imgSrc;
            document.querySelector('#text').value = contentToUpdate.text;
        }
    }
})


// Ассинхронная функция/запрос






async function newPost(postInfo) {
    try {
        const response = await fetch(`http://localhost:5500/addNewPost`, {
            method: 'POST',
            body: JSON.stringify(postInfo),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Успешный ответ от сервера:", data);
    } catch (error) {
        console.error("Произошла ошибка при запросе:", error);
    }
};

async function editPost(postInfo) {
    try {
        const response = await fetch(`http://localhost:5500/editPost`, {
            method: 'POST',
            body: JSON.stringify(postInfo),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Успешный ответ от сервера:", data);
    } catch (error) {
        console.error("Произошла ошибка при запросе:", error);
    }
};

async function deletePost(postId) {
    try {
        const response = await fetch(`http://localhost:5500/deletePost/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Успешный ответ от сервера:", data);
    } catch (error) {
        console.error("Произошла ошибка при запросе на удаление:", error);
    }
};

async function changeVisibility(postId) {
    try {
        const response = await fetch(`http://localhost:5500/changeVisibility/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Успешный ответ от сервера:", data);
    } catch (error) {
        console.error("Произошла ошибка при запросе на скрытие:", error);
    }
};



// async function newPost(folder, title, imgSrc, text) {
//     try {
//         const response = await fetch(`http://localhost:5501/addNewPost/${folder}/${title}/${imgSrc}/${text}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'text/plain',
//             },
//         })

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("Успешный ответ от сервера:", data);
//     } catch (error) {
//         console.error("Произошла ошибка при запросе:", error);
//     }
// }