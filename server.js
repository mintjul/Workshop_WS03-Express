// ========================================
// TODO: Task 1 - Create Express App
// ========================================
// Step 1: Create an Express application instance
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ========================================
// TODO: Task 2 - Serve Static Files
// ========================================
app.use(express.static("public"));

// ========================================
// BONUS: Custom Request Logging Middleware
// ========================================
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});


// ========================================
// TODO: Task 3 - Add Route Handlers
// ========================================

// About home route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// About page route
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "about.html"));
});

// Contact page route
app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "contact.html"));
});

// ========================================
// TODO: Task 4 - Create API Endpoint
// ========================================

// ========================================
// BONUS: Task 6 - Express Router (Optional)
// ========================================
const apiRouter = express.Router();

// Move the /api/time route to the router
apiRouter.get('/time', (req, res) => {
    const now = new Date();
    res.json({
        datetime: now.toISOString(),
        timestamp: now.getTime()
    });
});

// Add more API routes here if needed
apiRouter.get('/info', (req, res) => {
    res.json({
        name: 'Workshop03 Express Server',
        version: '1.0.0',
        nodeVersion: process.version
    });
});

// Mount the API router
app.use('/api', apiRouter);


// ========================================
// TODO: Task 5 - Error Handling Middleware
// ========================================
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});


app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).sendFile(path.join(__dirname, "public", "500.html"));
});


// ========================================
// Start the Server
// ========================================
// TODO: Uncomment the code below to start the server:
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log('\n📍 Available routes:');
    console.log('  GET /              -> Home page');
    console.log('  GET /about         -> About page');
    console.log('  GET /contact       -> Contact page');
    console.log('  GET /api/time      -> Current date/time API');
    console.log('\n⏹️  Press Ctrl+C to stop the server\n');
});

// ========================================
// 🎯 IMPLEMENTATION TIPS
// ========================================
/*
1. Complete tasks in order (Task 1 → Task 6)
2. Uncomment code sections as you work through each task
3. Test each task before moving to the next one
4. Remember: Middleware order matters!
   - Static files first
   - Route handlers second
   - 404 handler third
   - Error handler last

5. Key Express Methods:
   - app.use() → Apply middleware
   - app.get() → Define GET routes
   - res.sendFile() → Send HTML files
   - res.json() → Send JSON responses
   - res.status() → Set HTTP status code

6. Don't forget to:
   - Run 'npm install' before starting
   - Check the console for helpful error messages
   - Test in the browser after each task
*/