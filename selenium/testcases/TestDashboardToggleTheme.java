package testcases;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import org.junit.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import utils.CoverageUtils;

public class TestDashboardToggleTheme {
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
        WebElement button = driver.findElement(By.id("toggle-theme"));
        assertTrue(button.isDisplayed());
        
        button.click();

        try {
            Alert alert = driver.switchTo().alert();

            String alertText = alert.getText();
            System.out.println("Alert says: " + alertText);
            assertTrue(alertText.toLowerCase().contains("theme toggled to:"));

            alert.accept();
        } catch (NoAlertPresentException e) {
            fail("Alert not shown after clicking toggle button.");
        }

    }

    @After
    public void tearDown() {
        CoverageUtils.extractCoverage(driver, "TestDashboardToggleTheme");
        driver.quit();
    }
}
