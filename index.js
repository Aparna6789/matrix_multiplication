const express = require('express');
const app = express();

function matrixMultiplication(matrix1, matrix2) {
    let result = [];
    if (matrix1[0].length !== matrix2.length) {
        console.log("Cannot multiply these matrices. Invalid dimensions.");
        return result;
    }

    for (let i = 0; i < matrix1.length; i++) {
        result[i] = [];
        for (let j = 0; j < matrix2[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < matrix1[0].length; k++) {
                sum += matrix1[i][k] * matrix2[k][j];
            }
            result[i][j] = sum;
        }
    }

    return result;
}

app.get('/multiply', (req, res) => {
    const { rowsA, columnsA, rowsB, columnsB } = req.query;

    // Convert query parameters to integers
    const numRowsA = parseInt(rowsA);
    const numColumnsA = parseInt(columnsA);
    const numRowsB = parseInt(rowsB);
    const numColumnsB = parseInt(columnsB);

    // Generate matrices with random values
    let matrixA = [];
    let matrixB = [];
    for (let i = 0; i < numRowsA; i++) {
        matrixA[i] = [];
        for (let j = 0; j < numColumnsA; j++) {
            matrixA[i][j] = Math.floor(Math.random() * 10); // Generate random values (change as needed)
        }
    }
    for (let i = 0; i < numRowsB; i++) {
        matrixB[i] = [];
        for (let j = 0; j < numColumnsB; j++) {
            matrixB[i][j] = Math.floor(Math.random() * 10); // Generate random values (change as needed)
        }
    }

    // Multiply matrices
    let resultMatrix = matrixMultiplication(matrixA, matrixB);

    res.json({
        matrixA,
        matrixB,
        resultMatrix
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
