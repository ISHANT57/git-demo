
function generateMatrixInputs() {
    const size = parseInt(document.getElementById("matrix-size").value);
    const matrixContainer = document.getElementById("matrix-inputs");

    // Clear previous inputs and output
    matrixContainer.innerHTML = "";
    document.getElementById("steps-output").innerHTML = "";

    // Check if the size is valid
    if (isNaN(size) || size < 2) {
        alert("Please enter a valid matrix size (minimum 2).");
        return;
    }

    // Create input fields in a grid format
    const table = document.createElement("table");
    for (let i = 0; i < size; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number";
            input.placeholder = "0";
            input.className = "matrix-input";
            input.id = `a${i}${j}`;
            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    matrixContainer.appendChild(table);
}

// Perform LDU factorization and display the steps
function performLDUFactorization() {
    const size = parseInt(document.getElementById("matrix-size").value);
    const inputs = document.querySelectorAll("#matrix-inputs input");
    const output = document.getElementById("steps-output");

    // Check if inputs are generated
    if (inputs.length !== size * size) {
        alert("Please generate the matrix and enter values.");
        return;
    }

    // Create matrices for L, D, U
    const matrix = Array.from({ length: size }, () => Array(size).fill(0));
    const L = Array.from({ length: size }, () => Array(size).fill(0));
    const D = Array.from({ length: size }, () => Array(size).fill(0));
    const U = Array.from({ length: size }, () => Array(size).fill(0));

    // Fill L's diagonal with 1s
    for (let i = 0; i < size; i++) L[i][i] = 1;

    // Populate the input matrix with user values
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            matrix[i][j] = parseFloat(document.getElementById(`a${i}${j}`).value);
        }
    }

    output.innerHTML = "<h2>Steps for LDU Factorization</h2>";

    // Example steps for LDU Factorization
    for (let i = 0; i < size; i++) {
        D[i][i] = matrix[i][i];
        for (let j = i + 1; j < size; j++) {
            U[i][j] = matrix[i][j] / D[i][i];
            L[j][i] = matrix[j][i] / D[i][i];
        }
        addStep(`Step ${i + 1}: L, D, and U after processing row ${i + 1}`, L, D, U, `R${i + 1} operation to normalize row ${i + 1}`);
    }
}

// Function to add each step to the output
function addStep(description, L, D, U, operation) {
    const stepDiv = document.createElement("div");
    stepDiv.className = "step";
    stepDiv.innerHTML = `
        <h3>${description}</h3>
        <p><strong>Row Operation:</strong> ${operation}</p>
        <div><strong>L Matrix:</strong><br>${matrixToHTML(L)}</div>
        <div><strong>D Matrix:</strong><br>${matrixToHTML(D)}</div>
        <div><strong>U Matrix:</strong><br>${matrixToHTML(U)}</div>
    `;
    document.getElementById("steps-output").appendChild(stepDiv);
}

// Helper function to format a matrix as HTML
function matrixToHTML(matrix) {
    return matrix.map(row => `<div class="matrix-row">${row.map(value => `<span class="matrix-cell">${value.toFixed(2)}</span>`).join("")}</div>`).join("");
}
// Helper function to format a matrix as HTML with integer values only
function matrixToHTML(matrix) {
    return matrix.map(row => 
        `<div class="matrix-row">${row.map(value => 
            `<span class="matrix-cell">${Math.round(value)}</span>`).join("")}
        </div>`
    ).join("");
}
