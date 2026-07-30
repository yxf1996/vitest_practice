import { describe, it, expect } from 'vitest'
import { render } from 'vitest-browser-vue'
import Counter from '../../src/components/Counter.vue'

describe('Counter Component - Browser Mode', () => {
  it('should render with initial count', async () => {
    const screen = render(Counter, {
      props: {
        initialCount: 0
      }
    })

    // 验证初始渲染
    await expect.element(screen.getByText('计数器: 0')).toBeVisible()
  })

  it('should render with custom initial count', async () => {
    const screen = render(Counter, {
      props: {
        initialCount: 10
      }
    })

    await expect.element(screen.getByText('计数器: 10')).toBeVisible()
  })

  it('should increment count when button is clicked', async () => {
    const screen = render(Counter, {
      props: {
        initialCount: 0
      }
    })

    // 点击增加按钮
    await screen.getByRole('button', { name: '增加' }).click()

    // 验证计数增加
    await expect.element(screen.getByText('计数器: 1')).toBeVisible()
  })

  it('should decrement count when button is clicked', async () => {
    const screen = render(Counter, {
      props: {
        initialCount: 5
      }
    })

    // 点击减少按钮
    await screen.getByRole('button', { name: '减少' }).click()

    // 验证计数减少
    await expect.element(screen.getByText('计数器: 4')).toBeVisible()
  })

  it('should reset count to initial value', async () => {
    const screen = render(Counter, {
      props: {
        initialCount: 10
      }
    })

    // 先增加几次
    await screen.getByRole('button', { name: '增加' }).click()
    await screen.getByRole('button', { name: '增加' }).click()

    // 验证增加了
    await expect.element(screen.getByText('计数器: 12')).toBeVisible()

    // 点击重置按钮
    await screen.getByRole('button', { name: '重置' }).click()

    // 验证重置到初始值
    await expect.element(screen.getByText('计数器: 10')).toBeVisible()
  })

  it('should handle multiple increments', async () => {
    const screen = render(Counter, {
      props: {
        initialCount: 0
      }
    })

    // 连续点击5次
    for (let i = 0; i < 5; i++) {
      await screen.getByRole('button', { name: '增加' }).click()
    }

    await expect.element(screen.getByText('计数器: 5')).toBeVisible()
  })

  it('should handle negative counts', async () => {
    const screen = render(Counter, {
      props: {
        initialCount: 0
      }
    })

    // 点击减少按钮3次
    for (let i = 0; i < 3; i++) {
      await screen.getByRole('button', { name: '减少' }).click()
    }

    await expect.element(screen.getByText('计数器: -3')).toBeVisible()
  })
})
