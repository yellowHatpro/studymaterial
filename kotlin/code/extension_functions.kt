fun main() {
    val number = 5
        println(number.isPrime())
    }
    
    fun Int.isPrime(): Boolean{
        for (i in 2 until this -1){
            return this%i != 0
        }
        return true
    }