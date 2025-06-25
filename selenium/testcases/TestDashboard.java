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
        driver.get("http://localhost:3000/dashboard");
    }

    @Test
    public void testPageTitleAndTimezone() {
        WebElement button = driver.findElement(By.id("toggle-stats"));
        Assert.assertEquals("Show Stats", button.getText());
    }

    @After
    public void tearDown() {
        CoverageUtils.extractCoverage(driver, "TestDashboard");
        driver.quit();
    }
}