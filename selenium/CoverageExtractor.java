import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import java.io.*;
import java.nio.file.*;
import java.util.concurrent.TimeUnit;

public class CoverageExtractor {
    public static void main(String[] args) {
        System.setProperty("webdriver.chrome.driver", "/Users/dhruv.agrawal/Downloads/finalll/selenium/chromedriver");
        WebDriver driver = new ChromeDriver();

        driver.manage().timeouts().implicitlyWait(java.time.Duration.ofSeconds(10));

        try {
            // Visit pages
            String[] pages = {
                "http://localhost:3000/",
                "http://localhost:3000/about",
                "http://localhost:3000/contact",
                "http://localhost:3000/dashboard",
                "http://localhost:3000/dashboard/analytics"
            };

            for (String page : pages) {
                driver.get(page);
                Thread.sleep(1000); // wait for coverage hooks to run
            }

            // Capture __coverage__
            JavascriptExecutor js = (JavascriptExecutor) driver;
            String coverage = (String) js.executeScript("return JSON.stringify(window.__coverage__);");

            // Write to file
            Path outputPath = Paths.get("coverage/coverage-final.json");
            Files.createDirectories(outputPath.getParent());
            Files.write(outputPath, coverage.getBytes());

            System.out.println("✅ Coverage extracted to: " + outputPath.toAbsolutePath());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
