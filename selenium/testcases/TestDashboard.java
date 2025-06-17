package testcases;

import org.junit.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import utils.CoverageUtils;

public class TestDashboard {
    private WebDriver driver;

    @Before
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/Users/dhruv.agrawal/Downloads/next_modular_app/selenium/chromedriver");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(java.time.Duration.ofSeconds(10));
        driver.get("http://localhost:3000/");
    }

    @Test
    public void testDashboardAndNavLinks() throws InterruptedException {
        Assert.assertTrue(driver.getPageSource().contains("Welcome to the Next App"));

        WebElement calendarLink = driver.findElement(By.linkText("Calendar Page"));
        calendarLink.click();
        Thread.sleep(1000);
        Assert.assertTrue(driver.getCurrentUrl().contains("/calendar"));

        driver.navigate().back();
        WebElement cfmLink = driver.findElement(By.linkText("Customer Feedback"));
        cfmLink.click();
        Thread.sleep(1000);
        Assert.assertTrue(driver.getCurrentUrl().contains("/cfm"));
    }

    @After
    public void tearDown() {
        CoverageUtils.extractCoverage(driver, "TestDashboard");
        driver.quit();
    }
}
