# Kotlin

## Variables

```
val byte: Byte = 127
val short: Short = 32767
val int: Int = 2147483647
val long: Long = 9223372036854775807
val character: Char = '#'
val text: String = "Learning about Kotlin's data types"
val float: Float = 3.4028235e38f // f at the end
val double: Double = 1.7976931348623157e308
```

---

### Mapping with Java

| Kotlin Type | Java Type |
| ----------- | --------- |
| Byte        | byte      |
| Short       | short     |
| Int         | int       |
| Long        | long      |
| Float       | float     |
| Double      | double    |
| Char        | char      |
| Boolean     | boolean   |

#### Summary

- Kotlin has Byte, Short, Int, and Long as basic types for integer numbers.

- Kotlin uses Float and Double for floating point numbers. A Float is denoted with a trailing f, as in 17f.

- Kotlin has Char to store single characters and String to store strings of text.

- Kotlin’s basic types map to Java’s primitive types when targeting the JVM (and String maps to String).

---

## Type Inference

> Compiler automatically infers the type.

- int -> long: Simply putting L after value . Or , value.toLong()

  ```
  val long = 42L
  val num = 42.toLong()
  ```

---

### Nullable Types

> #### Declaring Nullable Types

- Each type has a nullable counterpart

```
val input: String? = null
```

\* Input contains either a null or a String

> #### Using Nullable Objects -> Error

```
val input: String? = null

val output = input.toUpperCase()  // Compile-time error: unsafe call on nullable object
```

> #### Safe Call Operator ? -> Fix

- Safely access members of nullable types

```
val input: String? = null

val output = input?.toUpperCase()  // Works and returns null

//input = null, output = null
```

- `In nested structures of nullable objects, you may chain the safe call operator as in:`

  ```
  person?.spouse?.name
  ```

> #### Elvis Operator ?:

- Handles null values by Defining default value

- Similar to Either this , or that

  ```
  val name: String? = null
  val chatName = name ?: "Anonymous"  // Elvis operator
  val displayName = chatName.toUpperCase()

  //Here, chatName is equal to name or else "Anonymous"

  // Here output will be ANONYMOUS
  ```

  **Fun fact:**`The name “Elvis operator” stems from the fact that it looks like an elvis emoji`?:-O

> #### Unsafe Call Operator !!

- Represents a non- null assertion

- Should be used judiciously

- Tells compiler that the object cannot be null

- Raises null pointer exception

```
val input: String? = null

val output = input!!.toUpperCase()

//Output:
Exception in thread "main" java.lang.ExceptionInInitializerError
Caused by: kotlin.KotlinNullPointerException
    at MainKt.<clinit>(main.kt:3)
```

> #### Handling Nullability Handling

- Operators such as ? and ?:

- Various standard library functions such as

  ```
  String?.isNullOrEmpty()
  ```

---

## Using if else , when

#### Equality and Comparison Operators

| _Operator_ | _Meaning_                                  |
| ---------- | ------------------------------------------ |
| ==         | Structural equality ("equals")             |
| !=         | Structural inequality ("!equals")          |
| ===        | Referential equality (same memory address) |
| !==        | Referential inequality                     |
| \>         | Greater than                               |
| <          | Less than                                  |
| \>=        | Greater or equal than                      |
| <=         | Less than or equal                         |

- Comparison operators work on any Comparable by using its **compareTo** method.

#### Logical Operators

| _Operator_ | _Meaning_     |
| ---------- | ------------- |
| &&         | Logical “and” |
|            |               |
| !          | Logical “not” |

#### Using if

```
if (planet == "Jupiter") {
  println("Radius of Jupiter is 69,911km")
} else if (planet == "Saturn") {
  println("Radius of Saturn is 58,232km")
} else {
  println("No data for planet $planet")
}
```

#### Using When

```
when (planet) {
  "Jupiter" -> println("Radius of Jupiter is 69,911km")
  "Saturn"  -> println("Radius of Saturn is 58,232km")
  else      -> println("No data for planet $planet")
}
```

- `when`keyword is followed by the variable it compares against

- LHS is value to be checked , followed by -> , then block of code to execute if value matches.

```
when(temperatureInKelvin) {
      700              -> println("This is Mercury’s max surface temperature")
      0, 1, 2          -> println("This is as cold as it can physically get")
      in 300..699      -> println("This temperature is possible on Mercury")
      !in 0..300       -> println("This is pretty hot")
      earthSurfaceTemp() -> println("This is earth’s average surface temperature")
      is Int             -> println("The given temperature is of type Int")
      else               -> {
        // Example of a multiline code block
        println("Default case")
      }
    }
```

> #### Various ways to define the values to compare against:

1. Fixed value (700)

2. Multiple fixed values (0, 1, 2)

3. Ranges (in 300..699)

4. Ranges with negation (“not in range”) (!in 0..300)

5. Function call (earthSurfaceTemp())

6. Type check (is Int)

7. Default case (else)

   > NOTE: Kotlin adds a break to the end of each case implicitly

> #### when construct is even more powerful as it allows arbitrary conditions by leaving out the variable after the when keyword:

```
when {
      age >= 18 && !hasAccess -> println("Falsely rejected")
      age < 18 && hasAccess -> println("Falsely approved")
      else -> println("Correctly authorized")
    }
```

> Summary :

- if conditions are useful for simple if-then-else logic.

- when conditions are often more succinct if you have many branches, especially when checking against specific distinct values.

---

## FUNDAMENTAL COLLECTION TYPES :

## Lists:

> #### Creating a list

```
val siUnits = listOf("s", "m", "kg", "A", "K", "mol", "cd")                   // Creates readonly list
val quarks = mutableListOf("up", "down", "charm", "strange", "top", "bottom") // Creates mutable list
val physicists = arrayListOf("Albert Einstein", "Isaac Newton")               // Creates mutable list
```

- Difference between the different lists are:

  - listOf : cant modify after creation

  - mutableListOf: add/delete elements after creating list

> #### Why Immutability?

#### 1. avoids variety of hard-to-fix bugs.

#### 2. immutability is a fundamental principle of functional programming.

> #### Working with Lists

- Accessing / Manipulating using index

---

## Sets:

- Unordered Collections

> #### About Sets

- No duplicates

- No indexing

- Linear Data Structure

> #### Creating a Set

```
val awards = setOf("World's Best Programmer 2019", "Best Programming Language 2020")
val members = mutableSetOf("Susan", "Jake", "Jenny")
```

> #### Accessing Element in a Set

- No fix method

```
mySet.first() //to get an element from a set to try it out. Maybe any element.
```

> #### Adding and Removing Elements

```
val members = mutableSetOf("Susan", "Jake", "Jenny")
members.add("Greg")
members.remove("Jake")
members.clear()
members.addAll(setOf("Adam", "Eve"))
```

---

## Array:

- Array size fixed

- Array and read only lists are pretty much similar, values can be overwritten but can’t be added or removed.

- Differences between arrays and read-only lists exists only on a lower level, i.e., in the exact API they provide, the storage structure in memory, and their resulting runtime performance.

> #### Creating an Array

```
val priorities = arrayOf("HIGH", "MEDIUM", "LOW")
```

- The arrayOf function accepts any number of arguments and returns an Array<Something>.

> #### Working with Arrays

```
val priorities = arrayOf("HIGH", "MEDIUM", "LOW")
println(priorities[1])
priorities[1] = "NORMAL"
println(priorities[1])
println(priorities.size)
```

---

## Maps:

- Unordered Collections

- Similar to Dictionaries in Python

> #### Creating a Map

```
val grades = mapOf(
  "Kate" to 3.9,
  "Jake" to 3.4,
  "Susan" to 3.5
)
```

or maibi

```
val grades = mapOf(
  Pair("Kate", 3.9),
  Pair("Jake", 3.4),
  Pair("Susan", 3.5)
)
```

```
val enrollments = mutableMapOf(
  "Kate" to listOf("Maths", "Engineering"),
  "Jake" to listOf("CS", "Bioengineering", "Psychology"),
  "Susan" to listOf("Engineering", "Psychology")
)
```

> #### Working with Maps

```
val enrollments = mutableMapOf(
  "Kate" to listOf("Maths", "Engineering"),
  "Jake" to listOf("CS", "Bioengineering", "Psychology"),
  "Susan" to listOf("Engineering", "Psychology")
)

val classes = enrollments["Kate"]
println(classes)   // ["Maths", "Engineering"]
```

#####

- If no entry with the given key exists, the indexed access operator returns `null`.

- To avoid nullability , we can use `getOrDefault` and `getOrElse`.

- With `getOrDefault`, you pass in an additional default value which is used in case the key doesn’t exist.

- With `getOrElse`, you can pass in a block of code that computes the value to use in case the key doesn’t exist.

- Both work almost the same, but `getOrElse` lets you compute more complex expressions inline, whereas, with `getOrDefault`, the desired value should be readily available.

  ```
  val enrollments = mutableMapOf(
    "Kate" to listOf("Maths", "Engineering"),
    "Jake" to listOf("CS", "Bioengineering", "Psychology"),
    "Susan" to listOf("Engineering", "Psychology")
  )

  val marcusClasses = enrollments.getOrDefault("Marcus", emptyList())
  println(marcusClasses)   // [], not null

  val simonsClasses = enrollments.getOrElse("Simon", {
      /* compute... */
      emptyList()
  })
  println(simonsClasses)   // [], not null
  ```

  > #### Manipulate Entries

- Using put to add new entry which accepts a key value pair

```
enrollments.put("Marcus", listOf("Maths", "CS"))
enrollments["Susan"].add("Business Administration") // If already present key
// Can be written more idiomatically as:
enrollments["Marcus"] = listOf("Maths", "CS")
```

- Use remove by passing the key entry

```
enrollments.remove("Jake")
```

- To overwrite similar to add an entry

```
enrollments["Susan"] = listOf("CS", "Psychology")
```

---

## Loops

> #### while Loop

```
val input = 17
var sqrtApprox = 1.0
var delta = 1.0

while (delta > 0.001) {
  sqrtApprox = 0.5 * (sqrtApprox + input / sqrtApprox)
  delta = Math.abs((input - sqrtApprox*sqrtApprox) / (2*sqrtApprox))
}

println("sqrt($input) is approximately $sqrtApprox")
```

> #### for Loop

```
for (number in 1..5) println(number)        // 1, 2, 3, 4, 5

for (number in 1 until 5) println(number)   // 1, 2, 3, 4

for (number in 1..5 step 2) println(number) // 1, 3, 5

for (number in 5 downTo 1) println(number)  // 5, 4, 3, 2, 1

for (number in 5 downTo 1 step 2) println(number)  // 5, 3, 1

for (char in 'a'..'c') println(char)        // 'a', 'b', 'c'

for (planet in planets) println(planet)     // "Jupiter", "Saturn", ...

for (char in "Venus") println(char)         // 'V', 'e', 'n', 'u', 's'
```

> ###### Note:

1. Ranges are commonly used for basic loops

   - There are utilities to construct more complex ranges, e.g., `downTo` and `step`

   - Kotlin’s strings are also iterable.

---

## Functions

> #### Function Signature

```
fun fibonacci(index: Int): Long
```

- function name: fibonacci

- parameter: index

- parameter type: int

- output type: Long

> #### Declaring a function

```
fun fibonacci(index: Int): Long {
  return if (index < 2) {
    1
  } else {
    fibonacci(index-2) + fibonacci(index-1)  // Calls `fibonacci` recursively
  }
}
```

> #### Calling a Function

```
val output = fibonacci(6)
println(output)
```

> #### Shorthand notation for a function

```
fun isValidUsername(username: String): Boolean {
  if (username.length >= 3) {
    return true
  } else {
    return false
  }
}
```

can be written as

```
fun isValidUsername(username: String): Boolean = username.length >= 3
```

> #### Default Values & Named Parameters

##### Default Parameters Values:

```
fun join(strings: Collection<String>, delimiter: String) = strings.joinToString(delimiter)
```

But we want comma to be default delimiter , So:

```
fun join(strings: Collection<String>, delimiter: String = ", ") = strings.joinToString(delimiter)
```

Usage:

```
fun join(strings: Collection<String>, delimiter: String = ", ") = strings.joinToString(delimiter)

fun main() {
  val planets = listOf("Saturn", "Jupiter", "Earth", "Uranus")

  val joined1 = join(planets, " - ")
  val joined2 = join(planets)

  println(joined1)
  println(joined2)
}
```

> #### Named Parameters

- Name the parameters so that we can shuffle their positions while passing parameters to the function

```
fun join(strings: Collection<String>, delimiter: String = ", ") = strings.joinToString(delimiter)

fun main() {
  val planets = listOf("Saturn", "Jupiter", "Earth", "Uranus")

  val joined1 = join(planets, delimiter = " - ")
  val joined2 = join(strings = planets)
  val joined3 = join(strings = planets, delimiter = " - ")
  val joined4 = join(delimiter = ", ", strings = planets)

  println(joined1)
  println(joined2)
  println(joined3)
  println(joined4)
}
```

> ### EXTENSION FUNCTIONS

- Extension Functions allow to attach new functions to existing types

- This includes one that we don’t own , such as Int, String, any predefined Java class such as Date, Instant, and any type imported from a library.

  ```
  fun Date.plusDays(count: Int) = Date(this.time + count * 86400000L)
  ```

  **Note:** The function signature contains the Date class in front of the function name.

  - This implicitly makes Date the first parameter of the function, and you can access it inside the function body as this.

    Now we can do this:

```
val now = Date()
val tomorrow = now.plusDays(1)
```

> #### Extensions are resolved statically

```
fun Number.print() = println("$this is a Number")
//Int is a subclass of Number class
fun Int.print() = println("$this is an Int")

val num: Number = 17
num.print()  // Prints "17 is a Number"
```

> #### Real World Examples of Extension Functions

$Android$

- On Android, when you’re inside an Activity class (imagine a “screen” in an Android app), and you want to get its ViewModel (imagine “data provider” for that activity), you usually write this:

  ```
  val viewModel = ViewModelProviders.of(this).get(MyViewModel::class.java)
  ```

  - This is an Android API.

can be rewritten as:

```
val viewModel = getViewModel(MyViewModel::class)
```

- To do so, we need an extension function on the Activity which handles getting a ViewModel from the context of the activity:

```
fun <T : ViewModel> FragmentActivity.getViewModel(modelClass: KClass<T>): T {
  return ViewModelProviders.of(this).get(modelClass.java)
}
```

> #### An Extension on String

```
val original = "Extension functions allow you to attach new functions to existing types *including ones that you don't own*"
val edited1 = original.removeAll("*")  // Should remove both *
val edited2 = original.removeAll("you")  // Should remove all "you"s
```

> ## Infix Functions

- Examples : to ,step

- To implement our own , use infix modifier

```
val str = "Ho "
str.repeat(3)
```

I want to be able to call this function using infix notations as `3 times “Ho”`.

To do so , we can define an infix function called `times` :

```
infix fun Int.times(str: String) = str.repeat(this)
```

- `infix` modifier signifies that we are defining an infix function.

- An infix function must have two parameters, but the function signature in the example only has one.

- This is because an infix function must be either a class member or an extension function. The extended class becomes the first parameter type. Here, this is an extension function on the Int class, making the first parameter of type Int, and the second parameter is of type String. Inside the function body, you refer to the first parameter’s value using this.

  ```
  infix fun Int.times(str: String) = str.repeat(this)

  val greeting = 3 times "Ho "
  println(greeting)
  ```

  > #### Restrictions for infix functions

  Infix functions must…

  - be either _member functions_ or _extension functions_.

  - have exactly one additional parameter in the function signature (in addition to the extended class, which acts as the first parameter’s type).

  - _not_ have default values.
