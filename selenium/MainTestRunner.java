package selenium;
import testcases.*;
import utils.*;

import java.io.*;
import java.io.IOException;
import java.nio.file.*;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.junit.runner.JUnitCore;
import org.junit.runner.Result;
import org.junit.runner.notification.Failure;

import junit.framework.Test;

public class MainTestRunner {
    public static void main(String[] args) {
        CoverageUtils.initializeEmptyCoverageFile();

        Class<?>[] tests = {
            TestCalendarPageLoad.class,
            TestAssistantToggle.class,
            TestModalRendering.class,
            TestFeedbackModalOpenClose.class,
            TestToggleRawFeedback.class,
            TestNavigationLinks.class,
            TestLazyMessage.class,
            TestDashboard.class,
            TestDashboardToggleButton.class,
        };

        int totalTests = 0;
        int totalFailures = 0;
        Map<String, List<Failure>> allFailures = new LinkedHashMap<>();

        for (Class<?> testClass : tests) {
            System.out.println("\n▶️ Running: " + testClass.getSimpleName());
            Result result = JUnitCore.runClasses(testClass);
            totalTests += result.getRunCount();
            totalFailures += result.getFailureCount();

            if (!result.getFailures().isEmpty()) {
                allFailures.put(testClass.getSimpleName(), result.getFailures());
            }

            for (Failure failure : result.getFailures()) {
                System.out.println("❌ " + failure.toString());
            }

            System.out.println("✅ Tests run: " + result.getRunCount() + ", Failures: " + result.getFailureCount());
        }

        System.out.println("\n========================= 📋 FINAL SUMMARY =========================");
        System.out.println("🔢 Total tests run   : " + totalTests);
        System.out.println("❌ Total failures    : " + totalFailures);

        if (totalFailures > 0) {
            System.out.println("\n🛑 Detailed Failures:");
            for (Map.Entry<String, List<Failure>> entry : allFailures.entrySet()) {
                System.out.println("🔍 In " + entry.getKey() + ":");
                for (Failure failure : entry.getValue()) {
                    System.out.println("   ➤ " + failure.getTestHeader());
                    System.out.println("     ↳ " + failure.getMessage());
                }
            }
        } else {
            System.out.println("\n✅ All tests passed successfully!");
        }
        System.out.println("===================================================================");
    }
}
