<template>
    <el-header><!-- 头部区 -->
      <div>
        <img src="../assets/logo2.png" alt="" height="50px" />
        <span>岗位实践学生管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
  </template>
  
  <script>
  export default {
    name: 'Top',
    methods: {
      logout() {
        // 添加登出逻辑
        console.log('用户已登出');
      },
    },
  };
  </script>
  
  <style scoped>
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    font-size: 20px;
    height: 15vh;
  }
  .el-header > div {
    display: flex;
    align-items: center;
  }
  .el-header span {
    margin-left: 15px;
  }
  </style>
  