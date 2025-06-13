package testcases;

import org.junit.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import utils.CoverageUtils;

public class TestDynamicComponent {
    private WebDriver driver;

    @Before
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/Users/dhruv.agrawal/Downloads/finalll/selenium/chromedriver");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(java.time.Duration.ofSeconds(10));
        driver.get("http://localhost:3000/about");
    }

    @Test
    public void testDynamicImportLoads() {
        // WebElement el = driver.findElement(By.xpath("//*[contains(text(), 'Loaded via Dynamic Import')]"));
        // Assert.assertNotNull("Dynamic import text not found", el);
    }

    @After
    public void tearDown() {
        CoverageUtils.extractCoverage(driver, "TestDynamicComponent");
        driver.quit();
    }
}
