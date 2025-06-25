package testcases;

import org.junit.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import utils.CoverageUtils;

public class TestModalRendering {
    private WebDriver driver;
    private WebDriverWait wait;

    @Before
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/Users/dhruv.agrawal/Downloads/next_modular_app/selenium/chromedriver");
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, java.time.Duration.ofSeconds(10));
        driver.manage().timeouts().implicitlyWait(java.time.Duration.ofSeconds(10));
        driver.get("http://localhost:3000/calendar");
    }

    @Test
    public void testModalIsMounted() throws InterruptedException {
        // Step 1: Open modal
        WebElement openButton = wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//button[contains(text(),'Open Calendar Modal')]")));
        openButton.click();

        // Step 2: Check modal is visible
        WebElement modalTitle = wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.xpath("//*[contains(text(),'Calendar Event')]")));
        Assert.assertNotNull("Modal title should be visible after opening", modalTitle);

        // Optional wait for visual confirmation during debug
        Thread.sleep(1000);

        // Step 3: Close modal via ESC key
        Actions actions = new Actions(driver);
        actions.sendKeys(Keys.ESCAPE).perform();

        // Step 4: Ensure modal is closed
        wait.until(ExpectedConditions.invisibilityOfElementLocated(
            By.xpath("//*[contains(text(),'Calendar Event')]")));
    }

    @After
    public void tearDown() {
        CoverageUtils.extractCoverage(driver, "TestModalRendering");
        driver.quit();
    }
}