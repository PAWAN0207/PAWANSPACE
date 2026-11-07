const Y = require("yjs");

// Create two independent clients
const docA = new Y.Doc();
const docB = new Y.Doc();

// Shared text structures
const textA = docA.getText("content");
const textB = docB.getText("content");

// Synchronization functions
function syncAtoB(update) {
    Y.applyUpdate(docB, update);
}

function syncBtoA(update) {
    Y.applyUpdate(docA, update);
}

// Listen for document updates
docA.on("update", syncAtoB);
docB.on("update", syncBtoA);

// Client A edits
textA.insert(0, "Hello from User A. ");

console.log("After User A edit:");
console.log("Client A:", textA.toString());
console.log("Client B:", textB.toString());

// Client B edits
textB.insert(textB.length, "Hello from User B.");

console.log("\nAfter User B edit:");
console.log("Client A:", textA.toString());
console.log("Client B:", textB.toString());

// Verify synchronization
if (textA.toString() === textB.toString()) {
    console.log("\nSUCCESS: Both clients synchronized!");
} else {
    console.log("\nFAILED: Synchronization mismatch!");
}

// Cleanup
docA.destroy();
docB.destroy();