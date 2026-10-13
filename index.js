const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Mock Database for testing (Add or change IDs as needed)
const employeeDatabase = ['EMP001', 'EMP002', 'EMP123', 'EMP999'];

// IVR Endpoint: GET /check-employee?id=EMP001
app.get('/check-employee', (req, res) => {
    const empId = req.query.id || req.body?.id;

    if (!empId) {
        return res.status(400).send('no');
    }

    // Check if ID exists in array (case-insensitive & trimmed)
    const exists = employeeDatabase.some(
        (id) => id.toLowerCase() === empId.trim().toLowerCase()
    );

    if (exists) {
        return res.status(200).send('yes');
    } else {
        return res.status(200).send('no');
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});