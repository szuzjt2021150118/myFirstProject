<template>
  <div class="announcement-container">
    <h2>发布公告</h2>

    <div class="input-group">
      <label for="announcementTitle">公告标题</label>
      <input type="text" v-model="announcement.title" id="announcementTitle" placeholder="输入公告标题" class="input1" />
    </div>


    <div class="input-group">
      <label for="announcementDate">发布日期</label>
      <input type="date" v-model="announcement.date" id="announcementDate" />
    </div>

    <div class="textarea-group">
      <label for="announcementContent">公告内容</label>
      <textarea v-model="announcement.content" id="announcementContent" placeholder="输入公告内容"></textarea>
    </div>



    <div class="input-group">
      <label for="fileUpload">附件上传</label>
      <input type="file" @change="handleFileUpload" id="fileUpload" />
      <span v-if="fileName" class="file-name">已选择文件：{{ fileName }}</span>
    </div>

    <div class="button-group">
      <button class="publish-button" @click="publishAnnouncement">发布</button>
      <button class="cancel-button" @click="cancelAnnouncement">取消</button>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      announcement: {
        title: "",         // 公告标题
        content: "",       // 公告内容
        date: ""           // 发布日期
      },
      file: null,          // 用于存储上传的文件
      fileName: ""         // 文件名称，用于显示
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0]; // 获取上传的文件
      this.fileName = this.file ? this.file.name : ""; // 显示文件名称
    },
    publishAnnouncement() {
      if (!this.announcement.title || !this.announcement.content || !this.announcement.date) {
        alert("请填写所有公告信息！");
        return;
      }

      // 创建 FormData 对象，构建表单数据
      const formData = new FormData();
      formData.append("title", this.announcement.title);
      formData.append("content", this.announcement.content);
      formData.append("date", this.announcement.date);

      if (this.file) {
        formData.append("file", this.file); // 添加文件
      }

      // 使用 fetch 向后端接口发送数据
      fetch("http://127.0.0.1:4523/m1/5394050-5067403-default/announcement/post", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("公告发布成功：", data);
          alert("公告已成功发布！");
          this.resetForm(); // 清空表单数据
        })
        .catch((error) => {
          console.error("公告发布失败：", error);
          alert("公告发布失败，请稍后重试！");
        });
    },
    cancelAnnouncement() {
      this.resetForm();
      alert("发布已取消");
    },
    resetForm() {
      this.announcement = { title: "", content: "", date: "" };
      this.file = null;
      this.fileName = "";
    }
  }
};
</script>
<style scoped>
.announcement-container {
  width: 90%;
  margin: 60px auto;
  background-color: #ffffff;
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #e0e0e0;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 25px;
  font-size: 24px;
}

.input-group {
  margin-bottom: 20px;
  width: 20%;
}

.textarea-group {
  margin-bottom: 20px;
}


label {
  font-weight: 600;
  margin-bottom: 8px;
  color: #4a4a4a;
  display: block;
}

input[type="text"],
input[type="date"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #c2c8d1;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  outline: none;
}

input[type="text"]:focus,
input[type="date"]:focus,
textarea:focus {
  border-color: #00aaff;
  box-shadow: 0 0 6px rgba(0, 170, 255, 0.3);
}

input[type="file"] {
  margin-top: 8px;
  font-size: 16px;
}

.file-name {
  display: block;
  margin-top: 8px;
  font-size: 14px;
  color: #666;
}

.input1 {
  width: 30%;
}

textarea {
  resize: vertical;
  min-height: 120px;
}

.button-group {
  width: 50%;
  display: flex;
  justify-content: space-around;
  gap: 20px;
  margin-top: 20px;
}

.publish-button,
.cancel-button {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.publish-button {
  background-color: #4CAF50;
}

.cancel-button {
  background-color: #f44336;
}

.publish-button:hover {
  background-color: #45a049;
}

.cancel-button:hover {
  background-color: #e53935;
}
</style>