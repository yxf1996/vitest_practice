import { test, expect } from '@playwright/test'

test.describe('仪表板页面 E2E 测试', () => {
  test.beforeEach(async ({ page }) => {
    // 模拟登录状态 - 直接访问仪表板
    // 实际项目中可能需要处理认证
    await page.goto('/dashboard')
  })

  test('应该正确显示仪表板页面', async ({ page }) => {
    // 验证页面标题
    await expect(page.locator('h1')).toContainText('仪表板')

    // 验证欢迎消息
    await expect(page.locator('h2')).toContainText('欢迎回来')
  })

  test('应该显示统计卡片', async ({ page }) => {
    // 验证所有统计卡片存在
    const statCards = page.locator('.stat-card')
    await expect(statCards).toHaveCount(4)

    // 验证每个卡片的内容
    await expect(page.locator('.stat-card').nth(0)).toContainText('总任务数')
    await expect(page.locator('.stat-card').nth(1)).toContainText('已完成')
    await expect(page.locator('.stat-card').nth(2)).toContainText('进行中')
    await expect(page.locator('.stat-card').nth(3)).toContainText('完成率')
  })

  test('应该显示正确的统计数据', async ({ page }) => {
    // 验证统计数值
    const statValues = page.locator('.stat-value')

    await expect(statValues.nth(0)).toContainText('100')  // 总任务数
    await expect(statValues.nth(1)).toContainText('65')   // 已完成
    await expect(statValues.nth(2)).toContainText('35')   // 进行中
    await expect(statValues.nth(3)).toContainText('65%')  // 完成率
  })

  test('退出按钮应该存在并可点击', async ({ page }) => {
    const logoutButton = page.getByTestId('logout-button')

    // 验证按钮存在
    await expect(logoutButton).toBeVisible()
    await expect(logoutButton).toContainText('退出登录')

    // 点击退出按钮
    await logoutButton.click()

    // 验证跳转到登录页面
    await expect(page).toHaveURL(/.*login/)
  })

  test('页面应该响应式布局', async ({ page }) => {
    // 设置移动端视口
    await page.setViewportSize({ width: 375, height: 667 })

    // 验证统计卡片仍然存在
    const statCards = page.locator('.stat-card')
    await expect(statCards).toHaveCount(4)

    // 设置桌面视口
    await page.setViewportSize({ width: 1920, height: 1080 })

    // 验证统计卡片仍然存在
    await expect(statCards).toHaveCount(4)
  })
})

test.describe('完整用户流程测试', () => {
  test('应该完成登录到退出的完整流程', async ({ page }) => {
    // 1. 访问登录页面
    await page.goto('/login')
    await expect(page.locator('h1')).toContainText('登录页面')

    // 2. 填写登录表单
    await page.getByTestId('username-input').fill('admin')
    await page.getByTestId('password-input').fill('123456')

    // 3. 提交登录
    await page.getByTestId('login-button').click()

    // 4. 验证跳转到仪表板
    await expect(page).toHaveURL(/.*dashboard/)
    await expect(page.locator('h1')).toContainText('仪表板')

    // 5. 验证仪表板内容
    await expect(page.locator('.stat-card')).toHaveCount(4)

    // 6. 点击退出按钮
    await page.getByTestId('logout-button').click()

    // 7. 验证返回登录页面
    await expect(page).toHaveURL(/.*login/)
  })

  test('应该处理多次登录尝试', async ({ page }) => {
    await page.goto('/login')

    // 第一次尝试 - 错误凭据
    await page.getByTestId('username-input').fill('admin')
    await page.getByTestId('password-input').fill('wrong')
    await page.getByTestId('login-button').click()
    await expect(page.getByTestId('error-message')).toContainText('用户名或密码错误')

    // 第二次尝试 - 正确凭据
    await page.getByTestId('password-input').fill('123456')
    await page.getByTestId('login-button').click()
    await expect(page).toHaveURL(/.*dashboard/)
  })
})
