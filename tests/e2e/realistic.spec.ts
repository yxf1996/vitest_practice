import { test, expect, Page } from '@playwright/test'

/**
 * 真实场景 E2E 测试
 * 模拟更复杂的应用场景，展示与 Browser Mode 的性能差异
 */

test.describe('真实场景 E2E 测试', () => {
  test('复杂表单填写和验证', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/login')

    // 模拟真实用户行为：多次输入、验证、提交
    for (let i = 0; i < 3; i++) {
      await page.getByTestId('username-input').fill('')
      await page.getByTestId('password-input').fill('')
      await page.getByTestId('login-button').click()

      // 等待错误提示
      await expect(page.getByTestId('error-message')).toBeVisible()
    }

    // 最后一次正确登录
    await page.getByTestId('username-input').fill('admin')
    await page.getByTestId('password-input').fill('123456')
    await page.getByTestId('login-button').click()

    // 等待仪表板加载
    await page.locator('h1').filter({ hasText: '仪表板' }).waitFor()

    const totalTime = Date.now() - startTime
    console.log(`复杂表单填写总耗时: ${totalTime}ms`)

    // 验证最终状态
    await expect(page.locator('.stat-card')).toHaveCount(4)
  })

  test('多页面导航和状态保持', async ({ page }) => {
    const startTime = Date.now()

    // 登录
    await page.goto('/login')
    await page.getByTestId('username-input').fill('admin')
    await page.getByTestId('password-input').fill('123456')
    await page.getByTestId('login-button').click()
    await page.locator('h1').filter({ hasText: '仪表板' }).waitFor()

    // 多次导航
    for (let i = 0; i < 5; i++) {
      // 退出
      await page.getByTestId('logout-button').click()
      await page.locator('h1').filter({ hasText: '登录页面' }).waitFor()

      // 重新登录
      await page.getByTestId('username-input').fill('admin')
      await page.getByTestId('password-input').fill('123456')
      await page.getByTestId('login-button').click()
      await page.locator('h1').filter({ hasText: '仪表板' }).waitFor()
    }

    const totalTime = Date.now() - startTime
    console.log(`5次登录退出循环总耗时: ${totalTime}ms`)
    console.log(`平均每次循环耗时: ${totalTime / 5}ms`)
  })

  test('大量DOM操作和渲染', async ({ page }) => {
    await page.goto('/dashboard')

    const startTime = Date.now()

    // 模拟大量DOM查询和验证
    for (let i = 0; i < 20; i++) {
      await expect(page.locator('.stat-card')).toHaveCount(4)
      await expect(page.locator('.stat-value').first()).toBeVisible()
      await expect(page.locator('h1')).toContainText('仪表板')
    }

    const totalTime = Date.now() - startTime
    console.log(`20次DOM查询总耗时: ${totalTime}ms`)
    console.log(`平均每次查询耗时: ${totalTime / 20}ms`)
  })

  test('网络延迟模拟下的性能', async ({ page }) => {
    // 模拟 200ms 网络延迟
    await page.context().route('**/*', async route => {
      await new Promise(resolve => setTimeout(resolve, 200))
      await route.continue()
    })

    const startTime = Date.now()

    await page.goto('/login')
    await page.getByTestId('login-button').waitFor({ state: 'visible' })

    const loadTime = Date.now() - startTime
    console.log(`200ms延迟下页面加载: ${loadTime}ms`)

    // 验证即使有延迟也能正常加载
    expect(loadTime).toBeLessThan(5000)
  })
})
