<template>
  <div class="todo-list">
    <h2>待办事项</h2>
    <div class="input-group">
      <input
        v-model="newTodo"
        @keyup.enter="addTodo"
        placeholder="输入新的待办事项"
        data-testid="todo-input"
      />
      <button @click="addTodo" data-testid="add-button">添加</button>
    </div>
    <ul class="todo-items">
      <li
        v-for="(todo, index) in todos"
        :key="todo.id"
        :class="{ completed: todo.completed }"
      >
        <input
          type="checkbox"
          v-model="todo.completed"
          :data-testid="`todo-checkbox-${index}`"
        />
        <span class="todo-text">{{ todo.text }}</span>
        <button
          @click="removeTodo(index)"
          class="delete-btn"
          :data-testid="`delete-button-${index}`"
        >
          删除
        </button>
      </li>
    </ul>
    <div class="stats">
      <p>总计: {{ todos.length }}</p>
      <p>已完成: {{ completedCount }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Todo {
  id: number
  text: string
  completed: boolean
}

const newTodo = ref('')
const todos = ref<Todo[]>([])
let nextId = 1

const completedCount = computed(() => {
  return todos.value.filter(todo => todo.completed).length
})

const addTodo = () => {
  const text = newTodo.value.trim()
  if (text) {
    todos.value.push({
      id: nextId++,
      text,
      completed: false
    })
    newTodo.value = ''
  }
}

const removeTodo = (index: number) => {
  todos.value.splice(index, 1)
}

defineExpose({
  todos,
  newTodo,
  completedCount,
  addTodo,
  removeTodo
})
</script>

<style scoped>
.todo-list {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 500px;
}

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input[type="text"] {
  flex: 1;
  padding: 8px;
}

.todo-items {
  list-style: none;
  padding: 0;
}

.todo-items li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.todo-items li.completed .todo-text {
  text-decoration: line-through;
  color: #999;
}

.todo-text {
  flex: 1;
}

.delete-btn {
  padding: 4px 8px;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.stats {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #ccc;
}
</style>
