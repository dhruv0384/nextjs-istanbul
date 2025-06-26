
package testcases;

import org.junit.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import utils.CoverageUtils;

public class TestDashboardToggleButton {
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

        button.click();

        Assert.assertEquals("Hide Stats", button.getText());
    }

    @After
    public void tearDown() {
        CoverageUtils.extractCoverage(driver, "TestDashboardToggleButton");
        driver.quit();
    }
}