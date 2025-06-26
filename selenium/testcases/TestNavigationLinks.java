package testcases;

import org.junit.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import utils.CoverageUtils;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class TestNavigationLinks {
    private WebDriver driver;

    @Before
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "selenium/chromedriver");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(java.time.Duration.ofSeconds(10));
        driver.get("http://localhost:3000");
    }

    @Test
    public void testAllLinksPresent () throws InterruptedException {
        // Step 1: Test Calendar Page Link
        WebElement calendarLink = driver.findElement(By.linkText("📅 Calendar Page"));
        Assert.assertTrue(calendarLink.isDisplayed());
        calendarLink.click();
        Assert.assertTrue(driver.getCurrentUrl().contains("/calendar"));
        Thread.sleep(1000);

        driver.navigate().back();  // Go back to home
        waitForHomePage();

        // Step 2: Test Customer Feedback Link
        WebElement feedbackLink = driver.findElement(By.linkText("📝 Customer Feedback"));
        Assert.assertTrue(feedbackLink.isDisplayed());
        feedbackLink.click();
        Assert.assertTrue(driver.getCurrentUrl().contains("/cfm"));
        Thread.sleep(1000);

        driver.navigate().back();  // Go back to home
        waitForHomePage();

        // Step 3: Test Login Link
        WebElement loginLink = driver.findElement(By.linkText("🔐 Login"));
        Assert.assertTrue(loginLink.isDisplayed());
        loginLink.click();
        Assert.assertTrue(driver.getCurrentUrl().contains("/login"));
    }

    // Helper method to ensure homepage has fully loaded again
    private void waitForHomePage() {
        new WebDriverWait(driver, java.time.Duration.ofSeconds(5)).until(
            ExpectedConditions.presenceOfElementLocated(By.xpath("//title[contains(text(),'Next App Dashboard')]"))
        );
    }

    @After
    public void tearDown() {
        CoverageUtils.extractCoverage(driver, "TestNavigationLinks");
        driver.quit();
    }
}