package testcases;

import org.junit.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;
import utils.CoverageUtils;

public class TestLoginFlow {
    private WebDriver driver;

    @Before
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/Users/dhruv.agrawal/Downloads/next_modular_app/selenium/chromedriver");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(java.time.Duration.ofSeconds(10));
        driver.get("http://localhost:3000/login");
    }

    @Test
    public void testValidAndInvalidLogin() throws InterruptedException {
        WebElement input = driver.findElement(By.tagName("input"));
        WebElement button = driver.findElement(By.tagName("button"));

        input.clear();
        input.sendKeys("ab");  // Invalid
        button.click();
        Thread.sleep(500);
        Assert.assertTrue(driver.getPageSource().contains("Username must be at least 3 characters"));

        input.clear();
        input.sendKeys("admin");
        button.click();
        Thread.sleep(1500);
        Assert.assertTrue(driver.getCurrentUrl().contains("/admin"));
    }

    @After
    public void tearDown() {
        CoverageUtils.extractCoverage(driver, "TestLoginFlow");
        driver.quit();
    }
}
