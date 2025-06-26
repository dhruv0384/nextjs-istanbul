package testcases;

import org.junit.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import utils.CoverageUtils;

public class TestLazyMessage {
    private WebDriver driver;
    private WebDriverWait wait;

    @Before
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "selenium/chromedriver");
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, java.time.Duration.ofSeconds(10));
        driver.manage().timeouts().implicitlyWait(java.time.Duration.ofSeconds(10));
        driver.get("http://localhost:3000");
    }

    @Test
    public void testLazyMessageAppears() {
        WebElement button = wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//button[contains(text(),'Show Lazy Message')]")));
        button.click();

        // Lazy message component should be rendered
        WebElement message = wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.xpath("//*[contains(text(),'This message is lazily loaded via dynamic import!')]"))); // Can update to actual message if known
        Assert.assertTrue(message.isDisplayed());
    }

    @After
    public void tearDown() {
        CoverageUtils.extractCoverage(driver, "TestLazyMessage");
        driver.quit();
    }
}