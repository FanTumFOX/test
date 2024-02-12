window.addEventListener('click', function (event) {
    // Проверка id поста и вида действия

    // Если повышение рейтинга
    if (event.target.className.animVal == "chevron-up") {
        const action = event.target.className.animVal;
        // console.log(action);
        const postId = event.target.closest('.feed').dataset.postId;
        // console.log(postId);
        vote(postId, action);
        let rate = event.target.closest('.feed').querySelector('.rate_score');
        rate.innerHTML++;
        checkColor(rate);
    }

    // Если понижение рейтинга
    if (event.target.className.animVal == "chevron-down") {
        const action = event.target.className.animVal;
        // console.log(action);
        const postId = event.target.closest('.feed').dataset.postId;
        // console.log(postId);
        vote(postId, action);
        let rate = event.target.closest('.feed').querySelector('.rate_score');
        rate.innerHTML--;
        checkColor(rate);
    }
})

function checkColor(rate) {
    if (rate.innerHTML >= 0 && rate.className.match('negative') && !rate.className.match('positive')) {
        rate.classList.remove('negative');
        rate.classList.toggle('positive');
    } else if (rate.innerHTML < 0 && !rate.className.match('negative') && rate.className.match('positive')) {
        rate.classList.remove('positive');
        rate.classList.toggle('negative');
    }
}


// Ассинхронная функция/запрос

async function vote(postId, action) {
    try {
        const response = await fetch(`http://localhost:5500/updateLikesDislikes/${postId}/${action}`, {
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
        console.error("Произошла ошибка при запросе:", error);
    }
}