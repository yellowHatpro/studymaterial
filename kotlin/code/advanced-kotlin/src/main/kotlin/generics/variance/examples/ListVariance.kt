package generics.variance.examples
//USE CASE IN LIST, MUTABLE LIST
/*
Covariance(out) is a proper variance modifier,
since List is read-only.
Covariance can't be used for a mutable data structure
*
MutableList interface has an invariant type parameter,
so it has no variance modifier
* */

//For this example, consider List<out T>

interface Animal {
    fun pet()
}
class Cat(private val name: String): Animal {
    override fun pet() {
        println("$name meows")
    }
}

class Dog(private val name: String): Animal {
    override fun pet() {
        println("$name barks")
    }
}

fun petAnimals(animals: List<Animal>) {
    for (animal in animals) {
        animal.pet()
    }
}

fun addAnimal(animals: MutableList<Animal>) {
    // Don't confuse here
    // Dog can be used in place of Animal
    // MutableList<Dog> cannot be used instead of MutableList<Animal>
    animals.add(Dog("Cookie"))
}



class ListVariance {
    fun main() {
        val cats: List<Cat> = listOf(Cat("Puss"), Cat("Suss"))
        petAnimals(cats) // Works, since List interface type parameter is covariant, so it has out modifier
        val dogs: List<Dog> = listOf(Dog("Sheru"), Dog("Rocky"))
        // addAnimal(dogs) // ERROR: Can't use MutableList<Dog> instead of MutableList<Animal>
        // addAnimal(cats) // ERROR: Can't use MutableList<Cat> instead of MutableList<Animal>
    }
}