package utils;

import org.json.JSONObject;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;

import java.io.*;
import java.nio.file.*;

public class CoverageUtils {

    public static void extractCoverage(WebDriver driver, String testName) {
        try {
            JavascriptExecutor js = (JavascriptExecutor) driver;
            Object result = js.executeScript("return window.__coverage__ ? JSON.stringify(window.__coverage__) : null;");
            if (result == null) {
                System.err.println("❌ No coverage data found for " + testName);
                return;
            }

            JSONObject currentCoverage = new JSONObject((String) result);
            JSONObject filteredCoverage = new JSONObject();

            // Filter node_modules and write per-test coverage
            for (String file : currentCoverage.keySet()) {
                if (!file.contains("node_modules")) {
                    filteredCoverage.put(file, currentCoverage.get(file));
                }
            }

            // Write per-test coverage
            Path perTestPath = Paths.get("coverage", testName + "-coverage.json");
            Files.createDirectories(perTestPath.getParent());
            Files.write(perTestPath, filteredCoverage.toString(2).getBytes());
            System.out.println("📄 Per-test coverage written to: " + perTestPath.toAbsolutePath());


        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}