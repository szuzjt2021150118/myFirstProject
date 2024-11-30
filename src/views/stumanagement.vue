<template>
    <div class="container">
        <h3 class="h">学生信息</h3>
        <div class="student-list">
            <ul>
                <li v-for="(student, index) in stuInfo" :key="index" class="student-item">
                    <div class="student-info">
                        <span><strong>姓名：</strong> {{ student.name }}</span>
                        <span><strong>学号：</strong> {{ student.stuId }}</span>
                        <span><strong>分组：</strong> {{ student.group }}</span>
                        <span><strong>邮箱：</strong> {{ student.email }}</span>
                    </div>
                    <div class="button-group">
                        <button class="edit-button" @click="editStudent(index)">修改</button>
                        <button class="delete-button" @click="deleteStudent(index)">删除</button>
                    </div>
                </li>
            </ul>
        </div>

        <!-- 添加或编辑学生信息表单 -->
        <transition name="slide">
            <div v-if="showForm" class="form-container">
                <input type="text" placeholder="姓名" v-model="newStudent.name" />
                <input type="text" placeholder="学号" v-model="newStudent.stuId" />
                <input type="text" placeholder="分组" v-model="newStudent.group" />
                <input type="email" placeholder="邮箱" v-model="newStudent.email" />
                <button @click="addOrUpdateStudent">{{ isEditing ? '更新' : '添加' }}</button>
            </div>
        </transition>
        <button class="add-button" @click="showForm = true; resetForm()">+</button>
    </div>
</template>

<script>
import axios from 'axios'; // 导入 axios

export default {
    data() {
        return {
            showForm: false, // 控制输入表单显示
            isEditing: false, // 是否为编辑模式
            editIndex: null, // 当前编辑的学生索引
            stuInfo: [
                {
                    name: "郑景天",
                    stuId: 2021150118,
                    group: 1,
                    email: "1507883427@qq.com"
                }
            ],
            newStudent: {
                name: "",
                stuId: "",
                group: "",
                email: ""
            }
        };
    },
    methods: {
        async addOrUpdateStudent() {
            if (this.newStudent.name && this.newStudent.stuId && this.newStudent.group && this.newStudent.email) {
                const studentData = { ...this.newStudent };

                try {
                    if (this.isEditing) {
                        // 编辑模式，发送 PUT 请求更新
                        await axios.put('http://127.0.0.1:4523/m1/5394050-5067403-default/updateStuInfo', studentData);
                        this.stuInfo.splice(this.editIndex, 1, studentData);
                        console.log("学生信息已成功更新：", studentData); // 控制台输出
                    } else {
                        // 添加新学生，发送 POST 请求
                        await axios.post('http://127.0.0.1:4523/m1/5394050-5067403-default/addStuInfo', studentData);
                        this.stuInfo.push(studentData);
                        console.log("新学生已成功添加：", studentData); // 控制台输出
                    }
                    this.resetForm();
                    this.showForm = false; // 隐藏表单
                } catch (error) {
                    console.error("请求失败", error);
                    alert("请求失败，请稍后再试");
                }
            } else {
                alert("请填写所有字段");
            }
        },
        editStudent(index) {
            this.newStudent = { ...this.stuInfo[index] }; // 填充表单用于编辑
            this.isEditing = true;
            this.editIndex = index;
            this.showForm = true;
        },
        deleteStudent(index) {
            this.stuInfo.splice(index, 1); // 删除学生信息
        },
        resetForm() {
            this.newStudent = { name: "", stuId: "", group: "", email: "" }; // 重置表单
            this.isEditing = false;
            this.editIndex = null;
        }
    }
};
</script>


<style scoped>
.container {
    width: 75vw;
    margin: 0 auto;
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
}

.h {
    text-align: center;
    margin-bottom: 20px;
}

.add-button{
    position: fixed;
    bottom: 20px;
    right: 30px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 24px;
    cursor: pointer;
}

.form-container {
    position: fixed;
    bottom: 80px;
    right: 20px;
    background-color: white;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.slide-enter-active, .slide-leave-active {
    transition: all 0.5s;
}
.slide-enter {
    transform: translateX(100%);
}
.slide-leave-to {
    transform: translateX(100%);
}

.student-list {
    list-style-type: none;
    padding: 0;
}
.student-item {
    border-bottom: 1px solid #ddd;
    margin-bottom: 15px;
    padding: 15px;
    background-color: #ffffff; /* 每个学生条目背景色 */
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    display: flex; /* 使用 flex 布局 */
    justify-content: space-between; /* 将内容和按钮组分开 */
    align-items: center; /* 垂直居中 */
    width: 90%; /* 根据需求调整宽度 */
}
.student-item:hover {
    transform: translateY(-2px); /* 鼠标悬停效果 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.student-info {
    display: flex;
    flex-grow: 1; /* 确保占据可用空间，使按钮组靠右 */
    align-items: center;
    gap: 20px; /* 每个字段之间的间距 */
}
.student-info span {
    margin-right: 20px; /* 每个字段之间的间距 */
}

.button-group {
    display: flex;
    gap: 10px; /* 按钮之间的间距 */
    
}

.edit-button, .delete-button {
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    color: #fff;
}

.edit-button {
    background-color: #4CAF50; /* 绿色背景 */
}

.delete-button {
    background-color: #f44336; /* 红色背景 */
}

.edit-button:hover {
    background-color: #45a049; /* 修改按钮悬停效果 */
}

.delete-button:hover {
    background-color: #e53935; /* 删除按钮悬停效果 */
}
</style>
