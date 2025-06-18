package utils;

import org.json.JSONObject;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;

import java.io.*;
import java.nio.file.*;

public class CoverageUtils {

    public static void extractCoverage(WebDriver driver, String testName) {
        try {
            if (!(driver instanceof JavascriptExecutor)) {
                System.err.println("❌ Driver is not a JavascriptExecutor.");
                return;
            }

            JavascriptExecutor js = (JavascriptExecutor) driver;
            Object result = js.executeScript("return window.__coverage__ ? JSON.stringify(window.__coverage__) : null;");
            if (!(result instanceof String)) {
                System.err.println("❌ Coverage result is null or not a string for " + testName);
                return;
            }

            JSONObject currentCoverage = new JSONObject((String) result);
            JSONObject filteredCoverage = new JSONObject();

            for (String file : currentCoverage.keySet()) {
                if (!file.contains("node_modules")) {
                    filteredCoverage.put(file, currentCoverage.get(file));
                }
            }

            Path perTestDir = Paths.get("per-test-coverage");
            Files.createDirectories(perTestDir);
            Path perTestPath = perTestDir.resolve(testName + "-coverage.json");
            Files.write(perTestPath, filteredCoverage.toString(2).getBytes());
            System.out.println("📄 Per-test coverage written to: " + perTestPath.toAbsolutePath());

            runShellCommand("npx nyc merge per-test-coverage coverage/coverage-final.json");
            // runShellCommand("mkdir -p ../.nyc_output && cp coverage/coverage-final.json ../.nyc_output/out.json");
            // runShellCommand("npx nyc report --report-dir=coverage --reporter=html");

            System.out.println("📦 Final merged coverage + HTML report updated");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void runShellCommand(String command) {
        try {
            ProcessBuilder builder = new ProcessBuilder("bash", "-c", command);
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
                System.err.println("❌ Command failed (code " + exitCode + "): " + command);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
