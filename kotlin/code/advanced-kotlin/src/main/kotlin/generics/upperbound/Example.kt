package generics.upperbound
class Example {

    fun main() {
        display(
            Human()
        )
    }

    // T can be of multiple types
    private fun <T> display(item: T)
        where T: Mammal, T:Vertebrate {
            println("$item")
        }
}

class Human: Mammal, Vertebrate {
    override fun lifespan(): Int {
        TODO("Not yet implemented")
    }

    override val backBone: Boolean
        get() = TODO("Not yet implemented")

}

interface Mammal {
    fun lifespan() : Int
}

interface Vertebrate {
    val backBone: Boolean
}