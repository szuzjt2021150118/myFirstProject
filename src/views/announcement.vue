<template>
    <div class="container">
        <h3>公告信息</h3>
        <RouterLink to="/announcementPost"><button class="publish-button" @click="goToCreatePage">发布公告</button></RouterLink>
        <div class="announcementList">
            <div v-for="announcement in announcements" :key="announcement.id" class="announcement-item">
                <h4>{{ announcement.title }}</h4>
                <p class="date">{{ announcement.date }}</p>
                <p class="content">{{ announcement.content }}</p>
                <div v-if="announcement.file" class="file">
                    <a :href="announcement.file.url" target="_blank">{{ announcement.file.name }}</a>
                </div>
                <button class="delete-button" @click="deleteAnnouncement(announcement.id)">删除</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            announcements: [
                {
                    id: 1,
                    title: '公告 1',
                    date: '2024-11-19',
                    content: '这是第一个公告的内容。这里可以是更长的文本描述。',
                    file: { name: '文件1.pdf', url: 'https://example.com/file1.pdf' }
                },
                {
                    id: 2,
                    title: '公告 2',
                    date: '2024-11-18',
                    content: '这是第二个公告的内容。包含重要信息。',
                    file: { name: '文件2.docx', url: 'https://example.com/file2.docx' }
                },
                // 添加更多公告数据
            ]
        };
    },
    methods: {
        deleteAnnouncement(id) {
            this.announcements = this.announcements.filter(announcement => announcement.id !== id);
        }
    }
};
</script>

<style>
.announcementList {
    height: auto;
    margin: 0 auto;
    width: 90%;
    border: 1px solid #999;
    padding: 10px;
}

.announcement-item {
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
    position: relative;
}

.announcement-item:last-child {
    border-bottom: none;
}

.date {
    font-size: 0.9em;
    color: #666;
}

.file a {
    color: #0066cc;
    text-decoration: underline;
}

.container {
    width: 75vw;
    margin: 0 auto;
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
}

.delete-button {
    position: absolute;
    right: 10px;
    bottom: 10px;
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
}

.delete-button:hover {
    background-color: #c0392b;
}

.publish-button {
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
}

.publish-button:hover {
    background-color: #218838;
}
</style>