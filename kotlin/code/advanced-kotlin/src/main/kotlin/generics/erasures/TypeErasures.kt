package generics.erasures

/**
 * Type safety checks Kotlin performs for generic declaration
 * are done at compile time
 * During runtime, the instances of generic types do not hold any information about
 * their actual type argument
 * This specific information related to the type is said to be erased.
 * Due to this: no general way to check the instance of the generic type
 * was created with a certain type argument at runtime
 *  Thus, compiler forbids any is checks for generic types,
 */

class TypeErasures {

    // fun check(a: Any): Boolean = a is Animal<Amphibian> //ERROR: won't work
    fun check(a: Any): Boolean = a is Animal<*>
    fun main(){
       val salmon = Animal(Fish())
       val toad = Animal(Amphibian())
    }
}

class Animal <T> (private val t: T) {
    fun produce(): T {
        return t
    }

    fun consume(input: T){
        println("T: $t, input: $input, ")
    }
}

class Fish
class Amphibian