import org.junit.runner.JUnitCore;
import org.junit.runner.Result;
import org.junit.runner.notification.Failure;
import testcases.TestHome;
import testcases.TestModalRendering;
import testcases.TestUnusedConditional;
import testcases.TestUnusedImports;
import testcases.TestDashboard;
import testcases.TestDynamicComponent;

public class MainTestRunner {
    public static void main(String[] args) {
        Class<?>[] tests = {
            TestHome.class,
            TestDashboard.class,
            TestDynamicComponent.class,
            TestModalRendering.class,
            TestUnusedConditional.class,
            TestUnusedImports.class
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
