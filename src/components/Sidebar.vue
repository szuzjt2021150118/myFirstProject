<template>
  <div class="sidebar">
    <ul>
      <li><RouterLink to="/">首页</RouterLink></li>
      
      <!-- 学生管理菜单 -->
      <li @click="toggleSubMenu('studentManagement')" class="menu-item">
        学生管理
        <ul v-if="openMenu === 'studentManagement'" class="submenu">
          <li><RouterLink to="/Infoimport">批量导入</RouterLink></li>
          <li><RouterLink to="/stumanagement/list">学生列表</RouterLink></li>
        </ul>
      </li>
      
      <li><RouterLink to="/publishResources">资源发布</RouterLink></li>
      <li><RouterLink to="/announcement">学生分组情况</RouterLink></li>
      <li><RouterLink to="/groupInfo">学生汇报时间</RouterLink></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      openMenu: null, // 当前打开的菜单
    };
  },
  methods: {
    toggleSubMenu(menu) {
      // 如果当前打开的菜单已经打开，则关闭；否则切换到新的菜单
      this.openMenu = this.openMenu === menu ? null : menu;
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 15vw;
  height: 85vh;
  background-color: #333;
  color: white;
  padding: 15px;
  position: relative;
  top: 0;
  left: 0;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  margin: 15px 0;
  cursor: pointer;
}

.submenu {
  padding-left: 20px;
}

.submenu li {
  margin: 10px 0;
}

.sidebar a {
  color: white;
  text-decoration: none;
}

.sidebar a:hover {
  text-decoration: underline;
}

.menu-item:hover {
  background-color: #444;
  transition: 0.3s;
}
</style>
