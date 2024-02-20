import {test,expect,defineConfig }from "@playwright/test";
import path from "path"
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
test("should allow user to add a hotel",async({page})=>{
    await page.goto(`${UI_URL}/add-hotel`)
    await page.locator('[name="name"]').fill("Test Hotel")
    await page.locator('[name="city"]').fill("Test City")
    await page.locator('[name="country"]').fill("Test Country")
    await page.locator('[name="description"]').fill("Test Description")
    await page.locator('[name="pricePerNight"]').fill("100")
    await page.selectOption('select[name="starRating"]',"3")
    await page.getByText("All Inclusive").click()
    await page.getByText("Free Wifi").check()
    await page.getByText("Spa").check()

    await page.locator('[name="adultCount"]').fill("2")
    await page.locator('[name="childCount"]').fill("4")
    await page.setInputFiles('[name="imageFiles"]',[
        path.join(__dirname,"files","test-image1.png"),
        path.join(__dirname,"files","test-image2.png"),
        path.join(__dirname,"files","test-image3.png"),
        path.join(__dirname,"files","test-image4.png"),
    ])
    await page.getByRole("button",{name:"Save"}).click()
    await expect(page.getByText("Hotel Registration Successfull")).toBeVisible()
})
test('should display hotels', async ({page}) => {
    await page.goto(`${UI_URL}/my-hotels`)
    await expect(page.getByText("Hotel Hill Palace")).toBeVisible();
    await expect(page.getByText("overall a nice and friendly hotel")).toBeVisible();
    await expect(page.getByText("Delhi,India")).toBeVisible();
    await expect(page.getByText("Budget")).toBeVisible();
    await expect(page.getByText("2 adults,2 children")).toBeVisible();
    await expect(page.getByText("2 Star Rating")).toBeVisible();


    await expect(page.getByRole("link",{name:"View Details"})).toBeVisible()
    await expect(page.getByRole("link",{name:"Add Hotel"})).toBeVisible()
})
test("should edit hotel",async({page})=>{
    await page.goto(`${UI_URL}/my-hotels`)
    await page.getByRole("link",{name:"View Details"}).click()
    await page.waitForSelector('[name="name"]',{state:'attached'})
    await expect(page.locator('[name="name"]')).toHaveValue("updated hotel")
    await page.locator('[name="name"]').fill("updated again hotel")
    await page.getByRole("button",{name:"Save"}).click()
    await expect(page.getByText("hotel save")).toBeVisible()
    await page.reload()
    await expect(page.locator('[name="name"]')).toHaveValue("updated again hotel")
})
