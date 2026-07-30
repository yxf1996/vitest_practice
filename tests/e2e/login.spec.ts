import { test, expect } from '@playwright/test'

test.describe('登录页面 E2E 测试', () => {
  test.beforeEach(async ({ page }) => {
    // 每个测试前导航到登录页面
    await page.goto('/login')
  })

  test('应该正确显示登录页面', async ({ page }) => {
    // 验证页面标题
    await expect(page.locator('h1')).toContainText('登录页面')

    // 验证表单元素存在
    await expect(page.getByTestId('username-input')).toBeVisible()
    await expect(page.getByTestId('password-input')).toBeVisible()
    await expect(page.getByTestId('login-button')).toBeVisible()
  })

  test('空表单提交应该显示错误提示', async ({ page }) => {
    // 点击登录按钮
    await page.getByTestId('login-button').click()

    // 验证错误消息显示
    await expect(page.getByTestId('error-message')).toBeVisible()
    await expect(page.getByTestId('error-message')).toContainText('用户名和密码不能为空')
  })

  test('只填写用户名应该显示错误提示', async ({ page }) => {
    // 填写用户名
    await page.getByTestId('username-input').fill('admin')

    // 点击登录按钮
    await page.getByTestId('login-button').click()

    // 验证错误消息
    await expect(page.getByTestId('error-message')).toBeVisible()
    await expect(page.getByTestId('error-message')).toContainText('用户名和密码不能为空')
  })

  test('只填写密码应该显示错误提示', async ({ page }) => {
    // 填写密码
    await page.getByTestId('password-input').fill('123456')

    // 点击登录按钮
    await page.getByTestId('login-button').click()

    // 验证错误消息
    await expect(page.getByTestId('error-message')).toBeVisible()
    await expect(page.getByTestId('error-message')).toContainText('用户名和密码不能为空')
  })

  test('错误凭据应该显示错误提示', async ({ page }) => {
    // 填写错误的凭据
    await page.getByTestId('username-input').fill('admin')
    await page.getByTestId('password-input').fill('wrongpassword')

    // 点击登录按钮
    await page.getByTestId('login-button').click()

    // 验证错误消息
    await expect(page.getByTestId('error-message')).toBeVisible()
    await expect(page.getByTestId('error-message')).toContainText('用户名或密码错误')

    // 验证仍然在登录页面
    await expect(page).toHaveURL(/.*login/)
  })

  test('正确凭据应该成功登录并跳转到仪表板', async ({ page }) => {
    // 填写正确的凭据
    await page.getByTestId('username-input').fill('admin')
    await page.getByTestId('password-input').fill('123456')

    // 点击登录按钮
    await page.getByTestId('login-button').click()

    // 验证跳转到仪表板页面
    await expect(page).toHaveURL(/.*dashboard/)
    await expect(page.locator('h1')).toContainText('仪表板')
  })

  test('密码输入框应该是密码类型', async ({ page }) => {
    const passwordInput = page.getByTestId('password-input')

    // 验证输入类型
    await expect(passwordInput).toHaveAttribute('type', 'password')
  })

  test('表单应该支持键盘提交', async ({ page }) => {
    // 填写凭据
    await page.getByTestId('username-input').fill('admin')
    await page.getByTestId('password-input').fill('123456')

    // 按 Enter 键提交
    await page.getByTestId('password-input').press('Enter')

    // 验证跳转
    await expect(page).toHaveURL(/.*dashboard/)
  })
})
