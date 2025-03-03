##  Classes in Kotlin

### Inheritence

- If we want any class to be inherited from, we have to declare them ```open```.
- If Class A is inherited from Class B, we can use variables and functions of B in A, even though we haven't declared them in A.
- Every object in kotlin inherits from ```Any``` superclass.
- 
### Visibility Modifiers

- ```private``` will prevent from accessing properties outside class
- We don't need ```public``` modifier
- ```protected``` will let properties to be used within inherited classes and the class itself only. Unlike private in which property cant be used even in the inherited class.

- We can even create ```private``` constructors.

### Abstract Class

- When we dont want to create objects of a class, rather we want it to define some entity in general and let other classes inherit from it.
- We can't create instance of abstract class.

    - #### Abstract functions
    
      ```kotlin
        abstract class Shape(
      var name:String) {
      
      //secondary constructor
      constructor(name:String, vararg dimension: Double) : this(name)
      
      //no function body of abstract fun, just used to define property
      abstract fun area(): Double
      
      abstract fun perimeter(): Double
      
      fun changeName(newName: String){
      name = newName}
      } 
      ```
      
        - We only create abstract fun when we dont know the implementation yet.
        - We use override modifier to use abstract fun in the inherited classes.

### Anonymous Class

- We know we cant create an instance of abstract class, but there is a way by using Anonymous class.
  - To do so, we use ```object``` keyword.
  - Example:
    ```kotlin
    fun coroutines.main(){
    val a = 3.0
    val b = 4.0
    val height = 2.0
    
    val parallelogram = object: Shape("parallelogram",a,b,height){
        override fun area() : Double {
            return a*height
            }
    
        override fun perimeter() : Double {
            return 2*a + 2*b
            }
        }
    }
    ```