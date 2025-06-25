package testcases;

import org.junit.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import utils.CoverageUtils;

public class TestToggleRawFeedback {
    private WebDriver driver;
    private WebDriverWait wait;

    @Before
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "selenium/chromedriver");
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, java.time.Duration.ofSeconds(10));
        driver.manage().timeouts().implicitlyWait(java.time.Duration.ofSeconds(10));
        driver.get("http://localhost:3000/cfm");
    }

    @Test
    public void testToggleRawFeedbackView() {
        WebElement toggle = wait.until(ExpectedConditions.presenceOfElementLocated(
            By.id("raw-toggle")));
        toggle.click(); // Turn it on

        // Check raw JSON appears
        WebElement pre = wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.xpath("//pre[contains(text(), 'Great app')]")));
        Assert.assertTrue(pre.getText().contains("Great app"));

        toggle.click(); // Turn it off
        Assert.assertTrue(driver.findElements(By.xpath("//pre")).isEmpty());
    }

    @After
    public void tearDown() {
        CoverageUtils.extractCoverage(driver, "TestToggleRawFeedback");
        driver.quit();
    }
}