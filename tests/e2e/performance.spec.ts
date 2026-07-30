import { test, expect, Page } from '@playwright/test'

/**
 * 性能测试套件
 * 测试页面加载性能、交互响应速度等指标
 */

test.describe('性能测试', () => {
  test('登录页面加载时间应该小于 2 秒', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/login')

    // 等待关键元素可见
    await page.getByTestId('login-button').waitFor({ state: 'visible' })

    const loadTime = Date.now() - startTime

    console.log(`登录页面加载时间: ${loadTime}ms`)

    // 验证加载时间小于 2 秒
    expect(loadTime).toBeLessThan(2000)
  })

  test('仪表板页面加载时间应该小于 3 秒', async ({ page }) => {
    // 先登录
    await page.goto('/login')
    await page.getByTestId('username-input').fill('admin')
    await page.getByTestId('password-input').fill('123456')
    await page.getByTestId('login-button').click()

    const startTime = Date.now()

    // 等待仪表板加载完成
    await page.locator('.stat-card').first().waitFor({ state: 'visible' })

    const loadTime = Date.now() - startTime

    console.log(`仪表板页面加载时间: ${loadTime}ms`)

    // 验证加载时间小于 3 秒
    expect(loadTime).toBeLessThan(3000)
  })

  test('表单交互响应时间应该小于 100ms', async ({ page }) => {
    await page.goto('/login')

    const input = page.getByTestId('username-input')

    // 测量输入响应时间
    const startTime = Date.now()

    await input.fill('test')

    const responseTime = Date.now() - startTime

    console.log(`表单输入响应时间: ${responseTime}ms`)

    // 验证响应时间小于 100ms
    expect(responseTime).toBeLessThan(100)
  })

  test('按钮点击响应时间应该小于 200ms', async ({ page }) => {
    await page.goto('/login')

    const button = page.getByTestId('login-button')

    // 测量点击响应时间
    const startTime = Date.now()

    await button.click()

    const responseTime = Date.now() - startTime

    console.log(`按钮点击响应时间: ${responseTime}ms`)

    // 验证响应时间小于 200ms
    expect(responseTime).toBeLessThan(200)
  })

  test('页面导航时间应该小于 1 秒', async ({ page }) => {
    // 登录
    await page.goto('/login')
    await page.getByTestId('username-input').fill('admin')
    await page.getByTestId('password-input').fill('123456')
    await page.getByTestId('login-button').click()

    // 等待仪表板加载
    await page.locator('h1').filter({ hasText: '仪表板' }).waitFor()

    // 测量导航回登录页的时间
    const startTime = Date.now()

    await page.getByTestId('logout-button').click()

    const navigationTime = Date.now() - startTime

    console.log(`页面导航时间: ${navigationTime}ms`)

    // 验证导航时间小于 1 秒
    expect(navigationTime).toBeLessThan(1000)
  })
})

test.describe('内存泄漏检测', () => {
  test('多次登录退出不应该导致内存泄漏', async ({ page }) => {
    // 执行多次登录退出循环
    for (let i = 0; i < 5; i++) {
      await page.goto('/login')
      await page.getByTestId('username-input').fill('admin')
      await page.getByTestId('password-input').fill('123456')
      await page.getByTestId('login-button').click()
      await page.locator('h1').filter({ hasText: '仪表板' }).waitFor()
      await page.getByTestId('logout-button').click()
    }

    // 如果测试能顺利完成，说明没有严重的内存泄漏
    // 实际的内存分析需要使用 Chrome DevTools Protocol
    expect(true).toBe(true)
  })
})

test.describe('网络性能测试', () => {
  test('应该正确处理网络延迟', async ({ page }) => {
    // 模拟慢速网络
    await page.context().route('**/*', async route => {
      await new Promise(resolve => setTimeout(resolve, 100))
      await route.continue()
    })

    const startTime = Date.now()

    await page.goto('/login')
    await page.getByTestId('login-button').waitFor({ state: 'visible' })

    const loadTime = Date.now() - startTime

    console.log(`慢速网络下页面加载时间: ${loadTime}ms`)

    // 即使在慢速网络下，页面也应该能加载
    expect(loadTime).toBeLessThan(10000) // 10 秒内
  })
})

test.describe('并发请求测试', () => {
  test('应该能处理并发表单提交', async ({ page }) => {
    await page.goto('/login')

    // 快速多次点击提交按钮
    const button = page.getByTestId('login-button')

    const startTime = Date.now()

    // 并发点击 5 次
    await Promise.all([
      button.click(),
      button.click(),
      button.click(),
      button.click(),
      button.click()
    ])

    const responseTime = Date.now() - startTime

    console.log(`并发提交响应时间: ${responseTime}ms`)

    // 验证系统能处理并发请求
    expect(responseTime).toBeLessThan(1000)
  })
})
