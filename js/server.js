const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const { error } = require('console');

const app = express();
const port = 5500;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Разрешить доступ к домену
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, POST, DELETE, OPTIONS'); // Добавить метод POST в разрешенные методы
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end(); // Отвечать успешно на запросы OPTIONS
    }

    next();
});


app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

app.post('/getContent', async (req, res) => {
    try {
        const data = await fs.readFile("./content.json", "utf-8");
        content = JSON.parse(data);
        res.json(content);

    } catch (error) {
        console.error('Ошибка при обновлении данных:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});


app.post('/updateLikesDislikes/:postId/:action', async (req, res) => {
    const { postId, action } = req.params;
    try {
        const data = await fs.readFile("./content.json", "utf-8");
        const content = JSON.parse(data);

        const contentToUpdate = content.find(content => content.id == postId);

        if (action == "chevron-up") {
            contentToUpdate.upvotes += 1;
        } else if (action == "chevron-down") {
            contentToUpdate.downvotes += 1;
        }

        await fs.writeFile("./content.json", JSON.stringify(content, null, 2), "utf-8");

        res.json({ upvotes: contentToUpdate.upvotes, downvotes: contentToUpdate.downvotes });

    } catch (error) {
        console.error('Ошибка при обновлении данных:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});


app.post('/addNewPost', async (req, res) => {
    const { postInfo } = req.params;
    try {
        const data = await fs.readFile('./content.json', 'utf-8');
        const content = JSON.parse(data);
        const postId = content.length > 0 ? Math.max(...content.map(post => post.id)) + 1 : 1;

        const folder = req.body.folder;
        const title = req.body.title;
        const text = req.body.text;
        const imgSrc = req.body.imgSrc;

        const newPost = {
            id: postId,
            location: folder,
            visibility: true,
            title: title,
            text: text,
            postSrc: "",
            imgSrc: imgSrc,
            upvotes: 0,
            downvotes: 0
        };

        content.push(newPost);

        await fs.writeFile('./content.json', JSON.stringify(content, null, 2), 'utf-8');
        res.status(200).json({ success: true, message: 'Пост успешно добавлен' });

    } catch (error) {
        console.error('Ошибка при попытке вводы новых данных:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});


app.post('/editPost', async (req, res) => {
    const { postInfo } = req.params;
    try {
        const data = await fs.readFile('./content.json', 'utf-8');
        const content = JSON.parse(data);

        const postId = req.body.postId;

        const contentToEdit = content.find(content => content.id == postId);
        contentToEdit.title = req.body.title;
        contentToEdit.text = req.body.text;
        contentToEdit.imgSrc = req.body.imgSrc;

        await fs.writeFile('./content.json', JSON.stringify(content, null, 2), 'utf-8');
        res.json({ title: contentToEdit.title, text: contentToEdit.text, imgSrc: contentToEdit.imgSrc });

        // res.status(200).json({ success: true, message: 'Пост успешно изменен' });

    } catch (error) {
        console.error('Ошибка при попытке изменения данных:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});


app.delete('/deletePost/:postId', async (req, res) => {
    const { postId } = req.params;
    try {
        const data = await fs.readFile("./content.json", "utf-8");
        const content = JSON.parse(data);

        const contentToDelete = content.findIndex(content => content.id == postId);

        // Если пост существует, удаляем его
        if (contentToDelete !== -1) {
            content.splice(contentToDelete, 1);

            // Записываем обновленные данные в файл JSON
            await fs.writeFile('./content.json', JSON.stringify(content, null, 2), 'utf-8');

            // Отправляем успешный ответ
            res.status(200).json({ success: true, message: 'Пост успешно удален' });
        } else {
            // Если пост не найден, отправляем сообщение об ошибке
            res.status(404).json({ success: false, message: 'Пост с указанным id не найден' });
        }
    } catch (error) {
        console.error('Ошибка при обновлении данных:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});


app.post('/changeVisibility/:postId', async (req, res) => {
    const { postId } = req.params;
    try {
        const data = await fs.readFile("./content.json", "utf-8");
        const content = JSON.parse(data);

        const contentToUpdate = content.find(content => content.id == postId);

        if (contentToUpdate.visibility == true) {
            contentToUpdate.visibility = false;
        } else if (contentToUpdate.visibility == false) {
            contentToUpdate.visibility = true;
        }

        await fs.writeFile("./content.json", JSON.stringify(content, null, 2), "utf-8");

        res.json({ visibility: contentToUpdate.visibility });

    } catch (error) {
        console.error('Ошибка при попытке скрыть пост:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});



// app.post('/addNewPost/:folder/:title/:imgSrc/:text', async (req, res) => {
//     const { folder, title, imgSrc, text } = req.params;
//     try {
//         const data = await fs.readFile('content.json', 'utf-8');
//         const content = JSON.parse(data);
//         const postId = content.length > 0 ? Math.max(...content.map(post => post.id)) + 1 : 1;

//         const newPost = {
//             id: postId,
//             location: folder,
//             title: title,
//             text: text,
//             postSrc: "",
//             imgSrc: imgSrc,
//             upvotes: 0,
//             downvotes: 0
//         };

//         content.push(newPost);

//         await fs.writeFile('content.json', JSON.stringify(content, null, 2), 'utf-8');
//         res.status(200).json({ success: true, message: 'Пост успешно добавлен' });

//     } catch (error) {
//         console.error('Ошибка при попытке вводы новых данных:', error);
//         res.status(500).json({ error: 'Ошибка сервера' });
//     }
// });

// app.listen(port, () => {
//     console.log(`Сервер запущен на порту ${port}`);
// });