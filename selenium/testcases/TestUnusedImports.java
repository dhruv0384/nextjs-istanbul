package testcases;

import org.junit.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import utils.CoverageUtils;

public class TestUnusedImports {
    private WebDriver driver;

    @Before
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/Users/dhruv.agrawal/Downloads/finalll/selenium/chromedriver");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(java.time.Duration.ofSeconds(10));
        driver.get("http://localhost:3000/dashboard/analytics");
    }

    @Test
    public void testAnalyticsPageLoads() {
        WebElement heading = driver.findElement(By.xpath("//*[contains(text(), 'Analytics')]"));
        Assert.assertNotNull("Analytics page not loaded", heading);
    }

    @After
    public void tearDown() {
        CoverageUtils.extractCoverage(driver, "TestUnusedImports");
        driver.quit();
    }
}
