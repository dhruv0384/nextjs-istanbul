package testcases;

import org.junit.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import utils.CoverageUtils;

public class TestCalendarPageLoad {
    private WebDriver driver;

    @Before
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/Users/dhruv.agrawal/Downloads/next_modular_app/selenium/chromedriver");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(java.time.Duration.ofSeconds(10));
        driver.get("http://localhost:3000/calendar");
    }

    @Test
    public void testPageTitleAndTimezone() {
        WebElement title = driver.findElement(By.tagName("h1"));
        Assert.assertEquals("Calendar Page", title.getText());

        WebElement timezone = driver.findElement(By.tagName("p"));
        Assert.assertTrue(timezone.getText().contains("Timezone: Asia/Kolkata"));
    }

    @After
    public void tearDown() {
        CoverageUtils.extractCoverage(driver, "TestCalendarPageLoad");
        driver.quit();
    }
}