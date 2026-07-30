import { describe, it, expect } from 'vitest'
import { render } from 'vitest-browser-vue'
import TodoList from '../../src/components/TodoList.vue'

describe('TodoList Component - Browser Mode', () => {
  it('should render empty todo list', async () => {
    const screen = render(TodoList)

    await expect.element(screen.getByText('待办事项')).toBeVisible()
    await expect.element(screen.getByText('总计: 0')).toBeVisible()
    await expect.element(screen.getByText('已完成: 0')).toBeVisible()
  })

  it('should add a new todo item', async () => {
    const screen = render(TodoList)

    // 输入待办事项
    const input = screen.getByTestId('todo-input')
    await input.fill('学习 Vitest')

    // 点击添加按钮
    await screen.getByTestId('add-button').click()

    // 验证待办事项已添加
    await expect.element(screen.getByText('学习 Vitest')).toBeVisible()
    await expect.element(screen.getByText('总计: 1')).toBeVisible()
  })

  it('should add todo by pressing Enter', async () => {
    const screen = render(TodoList)

    const input = screen.getByTestId('todo-input')
    await input.fill('学习 Playwright')

    // 获取 DOM 元素并发送键盘事件
    const element = input.element()
    element.focus()
    element.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true }))

    await expect.element(screen.getByText('学习 Playwright')).toBeVisible()
    await expect.element(screen.getByText('总计: 1')).toBeVisible()
  })

  it('should not add empty todo', async () => {
    const screen = render(TodoList)

    const input = screen.getByTestId('todo-input')
    await input.fill('   ') // 只输入空格
    await screen.getByTestId('add-button').click()

    // 验证没有添加
    await expect.element(screen.getByText('总计: 0')).toBeVisible()
  })

  it('should mark todo as completed', async () => {
    const screen = render(TodoList)

    // 添加一个待办事项
    const input = screen.getByTestId('todo-input')
    await input.fill('完成任务')
    await screen.getByTestId('add-button').click()

    // 点击复选框标记为完成
    await screen.getByTestId('todo-checkbox-0').click()

    // 验证统计信息更新
    await expect.element(screen.getByText('已完成: 1')).toBeVisible()
  })

  it('should delete a todo item', async () => {
    const screen = render(TodoList)

    // 添加两个待办事项
    const input = screen.getByTestId('todo-input')
    await input.fill('任务1')
    await screen.getByTestId('add-button').click()

    await input.fill('任务2')
    await screen.getByTestId('add-button').click()

    // 验证有两个任务
    await expect.element(screen.getByText('总计: 2')).toBeVisible()

    // 删除第一个任务
    await screen.getByTestId('delete-button-0').click()

    // 验证任务被删除
    await expect.element(screen.getByText('总计: 1')).toBeVisible()
    await expect.element(screen.getByText('任务2')).toBeVisible()
  })

  it('should handle multiple todos', async () => {
    const screen = render(TodoList)

    const input = screen.getByTestId('todo-input')

    // 添加5个待办事项
    const todos = ['任务1', '任务2', '任务3', '任务4', '任务5']
    for (const todo of todos) {
      await input.fill(todo)
      await screen.getByTestId('add-button').click()
    }

    // 验证所有任务都已添加
    await expect.element(screen.getByText('总计: 5')).toBeVisible()

    // 完成其中3个
    await screen.getByTestId('todo-checkbox-0').click()
    await screen.getByTestId('todo-checkbox-2').click()
    await screen.getByTestId('todo-checkbox-4').click()

    // 验证完成数量
    await expect.element(screen.getByText('已完成: 3')).toBeVisible()
  })

  it('should clear input after adding todo', async () => {
    const screen = render(TodoList)

    const input = screen.getByTestId('todo-input')
    await input.fill('测试任务')
    await screen.getByTestId('add-button').click()

    // 验证输入框已清空
    await expect.element(input).toHaveValue('')
  })
})
