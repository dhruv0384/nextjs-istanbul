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
            if (!(result instanceof String)) {
                System.err.println("❌ Coverage result is null or not a string for " + testName);
                return;
            }

            JSONObject currentCoverage = new JSONObject((String) result);

            // Write to temp file
            Path tempFile = Paths.get("coverage", "tmp-" + testName + ".json");
            Files.write(tempFile, currentCoverage.toString(2).getBytes());
            System.out.println("📄 Wrote current test coverage to: " + tempFile);

            // Merge tmp and final using nyc
            runShellCommand("npx nyc merge coverage coverage/coverage-final.json");
            System.out.println("✅ Merged into coverage-final.json using nyc merge");

            // Clean up temp file
            Files.deleteIfExists(tempFile);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void initializeEmptyCoverageFile() {
        try {
            Path coverageDir = Paths.get("coverage");
            if (Files.exists(coverageDir)) {
                deleteDirectoryRecursively(coverageDir);
                System.out.println("🧹 Cleared previous coverage directory.");
            }

            Files.createDirectories(coverageDir);
            Path finalCoveragePath = coverageDir.resolve("coverage-final.json");

            Files.write(finalCoveragePath, "{}".getBytes());
            System.out.println("📝 Initialized fresh coverage-final.json");

        } catch (IOException e) {
            System.err.println("❌ Failed to initialize coverage-final.json");
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

    private static void deleteDirectoryRecursively(Path path) throws IOException {
        if (Files.isDirectory(path)) {
            try (DirectoryStream<Path> entries = Files.newDirectoryStream(path)) {
                for (Path entry : entries) {
                    deleteDirectoryRecursively(entry);
                }
            }
        }
        Files.delete(path);
    }
}
