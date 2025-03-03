# Rust Cheat Sheet

## Basic Types and Variables

- bool

### Unsigned Integers

- u8, u16 .. u128

### Signed Integers

- i8, i16 .. i128

### Floating point numbers

- f32, f64

### Platform specific integers

- usize

- isize

- char

- &str - string slice

- String - owned string

### Tuple

- (T, U)

```rust
let tuple = (1, 2);
let score = ("Team A", 12);
```

### Array and Slice

- Arrays must have a known length and all elements must be initialized.
- Slices can be created without initialization. Determined at runtime.
- Slices can be created from arrays.
- Slices are a view into a contiguous piece of memory. 
- They are a pointer to a start and a length.
-  The length is the number of elements in the slice.
-  The start is the index of the first element in the slice.
- The end is the index of the last element in the slice.

```rust
let arr = [1,2,3,4,5];
let arr2 = [0;3]; // [0, 0, 0]
let slice = &arr[1..3]; // [2, 3]
```

### HashMap

- HashMap<K, V>
- K: key type
- V: value type
- import: ```use std::collections::HashMap```

```rust
let mut map = HashMap::new();
map.insert("key", "value");
```

### Mutability

```rust
let mut x = 5;
x = 6;
```
### Shadowing

```rust
let x = 5;
let x = x + 1;

let spaces = "   ";
let spaces = spaces.len();
```
- Shadowing means that a variable is defined twice in the same scope.

### Type alias

```rust
type NanoSecond = u64;
```

### Control Flow

#### if and if let

//TODO()
