package selenium;
import testcases.*;
import utils.*;

import java.io.*;
import java.io.IOException;
import java.nio.file.*;

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
        };

        for (Class<?> testClass : tests) {
            System.out.println("\n▶️ Running: " + testClass.getSimpleName());
            Result result = JUnitCore.runClasses(testClass);
            for (Failure failure : result.getFailures()) {
                System.out.println("❌ " + failure.toString());
            }
            System.out.println("✅ Tests run: " + result.getRunCount() + ", Failures: " + result.getFailureCount());
        }
    }
}
