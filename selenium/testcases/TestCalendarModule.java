package testcases;

import java.util.List;

import org.junit.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import utils.CoverageUtils;

public class TestCalendarModule {
    private WebDriver driver;

    @Before
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/Users/dhruv.agrawal/Downloads/next_modular_app/selenium/chromedriver");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(java.time.Duration.ofSeconds(10));
        driver.get("http://localhost:3000/calendar");
    }

    @Test
    public void testCalendarRender() throws InterruptedException {
        Thread.sleep(1000);
        Assert.assertTrue("Calendar heading not found", driver.getPageSource().contains("Calendar"));
        Assert.assertTrue("Modal should be visible initially", driver.getPageSource().contains("Calendar Modal"));
        WebElement closeButton = driver.findElement(By.xpath("//button[text()='Close']"));
        closeButton.click();
        Thread.sleep(500);
        List<WebElement> modalHeaders = driver.findElements(By.xpath("//*[contains(text(), 'Calendar Modal')]"));
        Assert.assertEquals("Modal should be removed after closing", 0, modalHeaders.size());
    }

    @After
    public void tearDown() {
        CoverageUtils.extractCoverage(driver, "TestCalendarModule");
        driver.quit();
    }
}
