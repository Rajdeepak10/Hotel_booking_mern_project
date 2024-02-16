import { test, expect } from '@playwright/test';
const UI_URl = "http://localhost:5173/"
test('should allow the user to sign in', async ({ page }) => {
  //page.goto
  await page.goto(UI_URl)
  // get sign in button
  await page.getByRole("link",{name:'Sign In'}).click()
  await expect(page.getByRole("heading",{name:'Sign In'})).toBeVisible();
  await page.locator("[name=email]").fill("1@1.com")
  await page.locator("[name=password]").fill("password123");
  await page.getByRole("button",{name:"Sign-In"}).click()
  //to check whether toast appears with success message
  await expect(page.getByText("Logged In successful!")).toBeVisible();
  //to check whether mybooking and myhotels links appear of page
  await expect(page.getByRole("link",{name:"My Booking"})).toBeVisible()
  await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible()
  await expect(page.getByRole("button",{name:"Sign Out"})).toBeVisible()

});

test("should allow user to register",async({page})=>{
  const testEmail = `test_register_${Math.floor(Math.random()*90000)+10000}@test.com `
  await page.goto(UI_URl)
  // click sign in button
  await page.getByRole("link",{name:'Sign In'}).click()
  await page.getByRole("link",{name:"Create an account here"}).click()
  await expect(page.getByRole("heading",{name:"Create an Account"})).toBeVisible()
  await page.locator("[name=firstName]").fill("test_firstName")
  await page.locator("[name=lastName]").fill("test_lastName")
  await page.locator("[name=email]").fill(testEmail)
  await page.locator("[name=password]").fill("test_password")
  await page.locator("[name=confirmPassword]").fill("test_password")
  await page.getByRole("button",{name:"Create Account"}).click()
  // expect to the home page 
  await expect(page.getByText("Registration Success!")).toBeVisible();
  //to check whether mybooking and myhotels links appear of page
  await expect(page.getByRole("link",{name:"My Booking"})).toBeVisible()
  await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible()
  await expect(page.getByRole("button",{name:"Sign Out"})).toBeVisible()


})