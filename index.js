const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Middleware to parse JSON body payloads
app.use(express.json());

// Mock Employee Database (GET /check-employee)
const employeeDatabase = ['EMP001', 'EMP002', 'EMP123', 'EMP999'];

// Mock Receipts Table (7 Sample Records)
const mockReceiptsDatabase = {
    "HLHMUMB00000054": [
        {
            valueDate: "2025-06-06",
            receiptID: 163,
            receiptPurpose: "EarlySettlement",
            receiptMode: "ONLINE",
            subReceiptMode: "NEFT",
            receiptAmount: 103976500,
            status: "R"
        }
    ],
    "HLHMUMB00000055": [
        {
            valueDate: "2025-05-10",
            receiptID: 164,
            receiptPurpose: "EMIPayment",
            receiptMode: "ONLINE",
            subReceiptMode: "UPI",
            receiptAmount: 25000,
            status: "A"
        }
    ],
    "HLHMUMB00000056": [
        {
            valueDate: "2025-07-01",
            receiptID: 165,
            receiptPurpose: "PartPayment",
            receiptMode: "OFFLINE",
            subReceiptMode: "CHEQUE",
            receiptAmount: 50000,
            status: "A"
        }
    ],
    "HLHMUMB00000057": [
        {
            valueDate: "2025-08-15",
            receiptID: 166,
            receiptPurpose: "Foreclosure",
            receiptMode: "ONLINE",
            subReceiptMode: "RTGS",
            receiptAmount: 450000,
            status: "A"
        }
    ],
    "HLHMUMB00000058": [
        {
            valueDate: "2025-09-20",
            receiptID: 167,
            receiptPurpose: "OverdueCharges",
            receiptMode: "ONLINE",
            subReceiptMode: "NETBANKING",
            receiptAmount: 1200,
            status: "A"
        }
    ],
    "HLHMUMB00000059": [
        {
            valueDate: "2025-10-05",
            receiptID: 168,
            receiptPurpose: "EMIPayment",
            receiptMode: "ONLINE",
            subReceiptMode: "NACH",
            receiptAmount: 18500,
            status: "A"
        }
    ],
    "HLHMUMB00000060": [
        {
            valueDate: "2025-11-12",
            receiptID: 169,
            receiptPurpose: "PrePayment",
            receiptMode: "OFFLINE",
            subReceiptMode: "DD",
            receiptAmount: 200000,
            status: "P"
        }
    ]
};

// 1. Employee Check Endpoint (GET)
app.get('/check-employee', (req, res) => {
    const empId = req.query.id;

    if (!empId) {
        return res.status(200).send('no');
    }

    const exists = employeeDatabase.some(
        (id) => id.toLowerCase() === String(empId).trim().toLowerCase()
    );

    return res.status(200).send(exists ? 'yes' : 'no');
});

// 2. Get Receipts Endpoint (POST - Body containing finReference)
app.post('/get-receipts', (req, res) => {
    const { finReference } = req.body;

    if (!finReference) {
        return res.status(400).json({
            statusCode: "400",
            responseId: "err-" + Date.now(),
            message: "Missing required parameter in body: finReference",
            results: { receipts: [] }
        });
    }

    // Direct lookup by finReference
    const receipts = mockReceiptsDatabase[String(finReference).trim()] || [];

    return res.status(200).json({
        statusCode: "200",
        responseId: "d98b80e0-c79c-11f1-b683-" + Math.floor(100000000000 + Math.random() * 900000000000),
        message: receipts.length > 0 ? "Get Receipts Successful!!" : "No Receipts Found",
        results: {
            receipts: receipts
        }
    });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});