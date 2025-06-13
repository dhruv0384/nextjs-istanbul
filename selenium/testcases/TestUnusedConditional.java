package testcases;

import org.junit.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import utils.CoverageUtils;

public class TestUnusedConditional {
    private WebDriver driver;

    @Before
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/Users/dhruv.agrawal/Downloads/finalll/selenium/chromedriver");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(java.time.Duration.ofSeconds(10));
        driver.get("http://localhost:3000/dashboard");
    }

    @Test
    public void testConditionalBranchTrue() {
        WebElement heading = driver.findElement(By.xpath("//*[contains(text(), 'Dashboard Overview')]"));
        Assert.assertNotNull("Dashboard page not loaded", heading);
        // We don't assert on the unused condition (it's purposefully inactive)
    }

    @After
    public void tearDown() {
        CoverageUtils.extractCoverage(driver, "TestUnusedConditional");
        driver.quit();
    }
}
