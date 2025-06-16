package utils;

import org.json.JSONObject;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;

import java.io.*;
import java.nio.file.*;

public class CoverageUtils {

    public static void extractCoverage(WebDriver driver, String testName) {
        try {
            // Step 1: Get coverage object from browser
            JavascriptExecutor js = (JavascriptExecutor) driver;
            Object result = js.executeScript("return window.__coverage__ ? JSON.stringify(window.__coverage__) : null;");
            if (result == null) {
                System.err.println("❌ No coverage data found for " + testName);
                return;
            }

            JSONObject currentCoverage = new JSONObject((String) result);
            JSONObject filteredCoverage = new JSONObject();

            // Step 2: Filter node_modules
            for (String file : currentCoverage.keySet()) {
                if (!file.contains("node_modules")) {
                    filteredCoverage.put(file, currentCoverage.get(file));
                }
            }

            // Step 3: Save per-test file in separate directory
            Path perTestDir = Paths.get("per-test-coverage");
            Files.createDirectories(perTestDir);
            Path perTestPath = perTestDir.resolve(testName + "-coverage.json");
            Files.write(perTestPath, filteredCoverage.toString(2).getBytes());
            System.out.println("📄 Per-test coverage written to: " + perTestPath.toAbsolutePath());

            // Step 4: Merge all coverage files in per-test-coverage/
            runShellCommand("npx nyc merge per-test-coverage coverage/coverage-final.json");

            // Step 5: Generate HTML report
            // runShellCommand("npx nyc report --reporter=html --report-dir=coverage");

            // runShellCommand("npx nyc merge per-test-coverage selenium/coverage/coverage-final.json");
            runShellCommand("mkdir -p ../.nyc_output && cp coverage/coverage-final.json ../.nyc_output/out.json");
            runShellCommand("npx nyc report --report-dir=coverage --reporter=html");

            System.out.println("📦 Final merged coverage + HTML report updated");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void runShellCommand(String command) {
        try {
            ProcessBuilder builder = new ProcessBuilder("bash", "-c", command); // For Unix/macOS
            builder.redirectErrorStream(true);
            Process process = builder.start();

            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println("▶ " + line);
                }
            }

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                System.err.println("❌ Command failed: " + command);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
