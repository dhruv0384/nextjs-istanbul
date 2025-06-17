package testcases;

import org.junit.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import utils.CoverageUtils;

public class TestAdminPage {
    private WebDriver driver;

    @Before
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/Users/dhruv.agrawal/Downloads/next_modular_app/selenium/chromedriver");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(java.time.Duration.ofSeconds(10));
        driver.get("http://localhost:3000/admin");
    }

    @Test
    public void testAdminContent() {
        Assert.assertTrue(driver.getPageSource().contains("Admin Panel"));
        Assert.assertTrue(driver.getPageSource().contains("Server Time"));
    }

    @After
    public void tearDown() {
        CoverageUtils.extractCoverage(driver, "TestAdminPage");
        driver.quit();
    }
}
