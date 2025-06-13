package testcases;

import org.junit.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import utils.CoverageUtils;

public class TestModalRendering {
    private WebDriver driver;

    @Before
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/Users/dhruv.agrawal/Downloads/finalll/selenium/chromedriver");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(java.time.Duration.ofSeconds(10));
        driver.get("http://localhost:3000/contact");
    }

    @Test
    public void testOpenCloseModal() {
        WebElement textarea = driver.findElement(By.tagName("textarea"));
        textarea.sendKeys("Test message");

        WebElement sendButton = driver.findElement(By.xpath("//button[text()='Send']"));
        sendButton.click();

        driver.switchTo().alert().accept(); // Accept the alert

        WebElement modal = driver.findElement(By.xpath("//*[contains(text(), 'Modal: Your message was sent!')]"));
        Assert.assertNotNull("Modal did not appear after submitting the form", modal);

        WebElement closeButton = driver.findElement(By.xpath("//button[text()='Close']"));
        closeButton.click();
    }

    @After
    public void tearDown() {
        CoverageUtils.extractCoverage(driver, "TestModalRendering");
        driver.quit();
    }
}
