<template>
  <div class="login-page">
    <h1>登录页面</h1>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="username">用户名</label>
        <input
          id="username"
          v-model="username"
          type="text"
          data-testid="username-input"
          placeholder="请输入用户名"
        />
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input
          id="password"
          v-model="password"
          type="password"
          data-testid="password-input"
          placeholder="请输入密码"
        />
      </div>
      <button type="submit" data-testid="login-button">登录</button>
    </form>
    <div v-if="error" class="error-message" data-testid="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
  error.value = ''

  if (!username.value || !password.value) {
    error.value = '用户名和密码不能为空'
    return
  }

  if (username.value === 'admin' && password.value === '123456') {
    // 登录成功，跳转到仪表板
    router.push('/dashboard')
  } else {
    error.value = '用户名或密码错误'
  }
}
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 100px auto;
  padding: 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}

.error-message {
  margin-top: 20px;
  padding: 10px;
  background: #ffe0e0;
  color: #d00;
  border-radius: 4px;
}
</style>
