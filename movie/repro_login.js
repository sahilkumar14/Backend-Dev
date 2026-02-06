
import axios from 'axios';

async function testLogin() {
    try {
        // Test with existing user having plain text password (expected to fail or crash)
        console.log("Testing text password login...");
        try {
            await axios.post('http://localhost:8080/login', {
                email: 'ks@gmail.com',
                password: 'ks9988'
            });
        } catch (e) {
            console.log("Text password login result:", e.response ? e.response.status : e.message);
        }

        // Test with existing user having hashed password
        // We don't know the plain password for 'aman', so we can't test it easily unless we register a new one.

        // Register new user
        console.log("Registering new user...");
        const email = `test${Date.now()}@example.com`;
        const password = 'password123';

        await axios.post('http://localhost:8080/signup', {
            name: 'Test User',
            email: email,
            password: password
        });
        console.log("Registered:", email);

        // Login with new user
        console.log("Logging in with new user...");
        const res = await axios.post('http://localhost:8080/login', {
            email: email,
            password: password
        });
        console.log("Login success! Status:", res.status);

    } catch (error) {
        console.error("Test Failed:", error.response ? error.response.data : error.message);
    }
}

testLogin();
