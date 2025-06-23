package testcases;

import org.junit.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import utils.CoverageUtils;

public class TestAssistantToggle {
    private WebDriver driver;

    @Before
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/Users/dhruv.agrawal/Downloads/next_modular_app/selenium/chromedriver");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(java.time.Duration.ofSeconds(10));
        driver.get("http://localhost:3000/calendar");
    }

    @Test
    public void testShowAndHideAssistant() throws InterruptedException {
        WebElement button = driver.findElement(By.tagName("button"));
        Assert.assertTrue(button.getText().contains("Show Assistant"));

        // Show
        button.click();
        Thread.sleep(500);
        WebElement assistant = driver.findElement(By.className("bg-blue-100"));
        Assert.assertTrue(assistant.getText().contains("Hi! I’m your Calendar Assistant"));

        // Hide
        button.click();
        Thread.sleep(500);
        Assert.assertTrue(driver.findElements(By.className("bg-blue-100")).isEmpty());
    }

    @After
    public void tearDown() {
        CoverageUtils.extractCoverage(driver, "TestAssistantToggle");
        driver.quit();
    }
}
