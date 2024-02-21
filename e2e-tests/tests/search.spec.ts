import {test,expect,defineConfig }from "@playwright/test";
const UI_URL="http://localhost:5173";

test.beforeEach(async({page})=>{
    await page.goto(UI_URL)
  // get sign in button
    await page.getByRole("link",{name:'Sign In'}).click()
    await expect(page.getByRole("heading",{name:'Sign In'})).toBeVisible();
    await page.locator("[name=email]").fill("fake@gmail.com")
    await page.locator("[name=password]").fill("12345678");
    await page.getByRole("button",{name:"Sign-In"}).click()
    //to check whether toast appears with success message
    await expect(page.getByText("Logged In successful!")).toBeVisible();
})
test("Should show hotel search results",async({page})=>{
    await page.goto(UI_URL)
    await page.getByPlaceholder("Destination").fill("Delhi")
    await page.getByRole("button",{name:"Search"}).click()
    await expect(page.getByText("hotels found in Delhi")).toBeVisible()
    await expect(page.getByText("updated again hotel")).toBeVisible()

})

test("should show hotel details",async({page})=>{
      await page.goto(`${UI_URL}`)
      await page.getByPlaceholder("Destination").fill("Delhi")
      await page.getByRole("button",{name:"Search"}).click()
      await page.getByText("updated again hotel").click()
      await expect(page).toHaveURL(/detail/)
      await expect(page.getByRole("button",{name:"Book Now"})).toBeVisible()
      
})