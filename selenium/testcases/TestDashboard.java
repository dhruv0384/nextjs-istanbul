package testcases;

import org.junit.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import utils.CoverageUtils;

public class TestDashboard {
    private WebDriver driver;

    @Before
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/Users/dhruv.agrawal/Downloads/finalll/selenium/chromedriver");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(java.time.Duration.ofSeconds(10));
        driver.get("http://localhost:3000/");
    }

    @Test
    public void testDashboardAndContact() throws InterruptedException {
        driver.findElement(By.linkText("Dashboard")).click();
        Thread.sleep(1000);
        driver.findElement(By.linkText("Contact")).click();
        Thread.sleep(1000);
        WebElement textarea = driver.findElement(By.tagName("textarea"));
        // textarea.sendKeys("Test from TestDashboard");
        // driver.findElement(By.tagName("button")).click();
        // Alert alert = driver.switchTo().alert();
        // alert.accept();
    }

    @After
    public void tearDown() {
        CoverageUtils.extractCoverage(driver, "TestDashboard");
        driver.quit();
    }
}
