<template>
  <div class="dashboard-page">
    <header class="header">
      <h1>仪表板</h1>
      <button @click="handleLogout" data-testid="logout-button">退出登录</button>
    </header>
    <div class="content">
      <h2>欢迎回来！</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <h3>总任务数</h3>
          <p class="stat-value">{{ stats.totalTasks }}</p>
        </div>
        <div class="stat-card">
          <h3>已完成</h3>
          <p class="stat-value">{{ stats.completedTasks }}</p>
        </div>
        <div class="stat-card">
          <h3>进行中</h3>
          <p class="stat-value">{{ stats.inProgressTasks }}</p>
        </div>
        <div class="stat-card">
          <h3>完成率</h3>
          <p class="stat-value">{{ completionRate }}%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const stats = ref({
  totalTasks: 100,
  completedTasks: 65,
  inProgressTasks: 35
})

const completionRate = computed(() => {
  return Math.round((stats.value.completedTasks / stats.value.totalTasks) * 100)
})

const handleLogout = () => {
  router.push('/login')
}
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

button {
  padding: 10px 20px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #c82333;
}

.content {
  padding: 40px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.stat-card {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
}

.stat-value {
  font-size: 48px;
  font-weight: bold;
  color: #007bff;
  margin: 20px 0;
}
</style>
