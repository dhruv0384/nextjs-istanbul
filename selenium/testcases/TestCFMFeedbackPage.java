package testcases;

import org.junit.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import utils.CoverageUtils;

public class TestCFMFeedbackPage {
    private WebDriver driver;

    @Before
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/Users/dhruv.agrawal/Downloads/next_modular_app/selenium/chromedriver");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(java.time.Duration.ofSeconds(10));
        driver.get("http://localhost:3000/cfm");
    }

    @Test
    public void testFeedbackRendering() throws InterruptedException {
        Thread.sleep(1000);
        Assert.assertTrue(driver.getPageSource().contains("Customer Feedback"));
        Thread.sleep(1000);
        Assert.assertTrue(driver.getPageSource().contains("Could be better"));
    }

    @After
    public void tearDown() {
        CoverageUtils.extractCoverage(driver, "TestCFMFeedbackPage");
        driver.quit();
    }
}
