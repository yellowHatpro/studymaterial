package generics.variance

/*Variance: Relationship between generic types,
that share the same base type but have different type arguments

Need of variance relationship: Type Safety

variance modifiers: determine what the relationship should be between generic types
*/

//Invariant type: When no relation is to be considered
//Factory<T> != Factory<R>, even if T is subtype/supertype of R
class Factory<T>
open class Car
class Ferrari: Car() //Car inherits Car


// Covariant type: use out modifier
class School<out T>
open class Person
class Student: Person()

// Contravariant type: use in modifier
class Bar<in T>
open class Drunkard
class Dinosaur: Drunkard()

/*
* out modifier is only appropriate for type parameters that are in the out-position
* and are thus used as a result type or a read-only property type
*
*  the in modifier is only appropriate for type parameters that are in the in-position
* and are thus used as parameter types.
* */

class Variance {
    fun main(){
        //invariant
        val car: Car = Ferrari() // Works, Ferrari subtype of Car
        // val factoryOfCar: Factory<Car> = Factory<Ferrari>()  // Error

        //covariant
        val person: Person = Student()
        val school: School<Person> = School<Student>() // Subtype can be passed in place of parent

        //contravariant: Supertype has to be passed
        val drunkard: Drunkard = Dinosaur()
        // val bar: Bar<Drunkard> = Bar<Dinosaur>()      //Subtype can't be passed in place of parent
        val bar: Bar<Dinosaur> = Bar<Drunkard>()         //Ok example does not make sense, but you get the idea
    }
}
