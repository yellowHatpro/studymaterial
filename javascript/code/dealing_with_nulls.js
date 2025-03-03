// result = a ?? b; // return a if a not null/undefined, otherwise return b
// above sentence can be rewritten as:
// result = (a !== null && a !== undefined) ? a : b;

//Examples:

let user;
alert(user ?? "Anonymous"); // Anonymous

// Sequence of use of ?? operator
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

//shows the first defined value:
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoders
//can also use OR operator for such purposes
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder

// Using OR operator for such purposes
alert(0 || -1 || 2); // -1 (first truthy value)
alert(null || 1); // 1 (first truthy value)
alert(null || 0 || 1); // 1 (the first truthy value)
alert(undefined || null || 0); // 0 (all falsy, returns the last value)

// '&&' finds first falsy value