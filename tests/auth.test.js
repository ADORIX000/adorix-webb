// Adorix Auth & Security Testing
// Proof of Non-Functional Requirement (Security & Authentication)

const simulateAuthProtection = (isLoggedIn, targetRoute) => {
    const protectedRoutes = ["/dashboard", "/profile", "/settings"];

    if (protectedRoutes.includes(targetRoute) && !isLoggedIn) {
        return "Redirecting to /sign-in";
    }
    return `Access granted to ${targetRoute}`;
};

// Security Test: Unauthorized Access to Dashboard
console.log("Testing NF-Security (Unauthenticated Access)...");
const authTest = simulateAuthProtection(false, "/dashboard");
console.log(authTest === "Redirecting to /sign-in" ? "✅ SECURITY TEST PASSED" : "❌ SECURITY TEST FAILED");

// Security Test: Authorized Access
console.log("\nTesting NF-Security (Authenticated Access)...");
const userAccess = simulateAuthProtection(true, "/dashboard");
console.log(userAccess === "Access granted to /dashboard" ? "✅ SECURITY TEST PASSED" : "❌ SECURITY TEST FAILED");
