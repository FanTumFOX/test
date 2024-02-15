window.addEventListener('load', function (event) {
    const pathname = {
        postId: event.target.querySelector('.description').dataset.postId,
        postSrc: event.target.location.pathname
    };

    viewCounter(pathname);
})

async function viewCounter(pathname) {
    try {
        const response = await fetch(`http://localhost:5500/viewCounter`, {
            method: 'POST',
            body: JSON.stringify(pathname),
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