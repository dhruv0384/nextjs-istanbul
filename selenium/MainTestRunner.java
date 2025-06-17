import org.junit.runner.JUnitCore;
import org.junit.runner.Result;
import org.junit.runner.notification.Failure;
import testcases.TestDashboard;
import testcases.TestLoginFlow;
import testcases.TestAdminPage;
import testcases.TestCFMFeedbackPage;
import testcases.TestCalendarModule;

public class MainTestRunner {
    public static void main(String[] args) {
        Class<?>[] tests = {
            TestDashboard.class,
            TestLoginFlow.class,
            TestAdminPage.class,
            TestCalendarModule.class,
            TestCFMFeedbackPage.class
        };

        for (Class<?> testClass : tests) {
            System.out.println("\n▶️ Running: " + testClass.getSimpleName());
            Result result = JUnitCore.runClasses(testClass);
            for (Failure failure : result.getFailures()) {
                System.out.println("❌ " + failure.toString());
            }
            System.out.println("✅ Tests run: " + result.getRunCount() + ", Failures: " + result.getFailureCount());
        }

        // Write merged result at the end
        // CoverageUtils.writeMergedCoverageToFile();
    }
}
