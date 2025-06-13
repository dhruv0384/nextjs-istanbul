package testcases;

import org.junit.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import utils.CoverageUtils;

public class TestHome {
    private WebDriver driver;

    @Before
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/Users/dhruv.agrawal/Downloads/finalll/selenium/chromedriver");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(java.time.Duration.ofSeconds(10));
        driver.get("http://localhost:3000/");
    }

    @Test
    public void testNavigateHomeAndAbout() throws InterruptedException {
        Thread.sleep(1000);
        driver.findElement(By.linkText("About")).click();
        Thread.sleep(1000);
    }

    @After
    public void tearDown() {
        CoverageUtils.extractCoverage(driver, "TestHome");
        driver.quit();
    }
}
