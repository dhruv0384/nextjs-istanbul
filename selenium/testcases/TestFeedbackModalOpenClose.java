package testcases;

import org.junit.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.*;
import utils.CoverageUtils;

public class TestFeedbackModalOpenClose {
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
    public void testFeedbackModalFlow() throws InterruptedException {
        WebElement triggerBtn = wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//button[contains(text(),'View Feedback Modal')]")));
        triggerBtn.click();

        // Check if modal is visible
        WebElement summary = wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.xpath("//*[contains(text(),'Feedback Summary')]")));
        Assert.assertNotNull(summary);

        Thread.sleep(500); // visual check

        // Try to close via ESC
        Actions actions = new Actions(driver);
        actions.sendKeys(Keys.ESCAPE).perform();

        // Modal should disappear
        wait.until(ExpectedConditions.invisibilityOfElementLocated(
            By.xpath("//*[contains(text(),'Feedback Summary')]")));
    }

    @After
    public void tearDown() {
        CoverageUtils.extractCoverage(driver, "TestFeedbackModalOpenClose");
        driver.quit();
    }
}