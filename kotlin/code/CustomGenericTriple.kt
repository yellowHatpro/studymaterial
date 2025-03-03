package classes

class CustomGenericTriple<A: Any,B:Any,C:Any> (
    var first: A,
    var second: B,
    var third: C
){
    fun printTypes() {
        println(first::class)
        println(second::class)
        println(third::class)
    }
}

fun main() {
    val triple = CustomGenericTriple<Int, String, Boolean>(1,"hello",true)
    triple.printTypes()
}