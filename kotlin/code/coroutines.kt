package coroutines

import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking


/*
*
*
* */

fun main() {
    runBlocking {
        launch {
            delay(1000)
            println("World")
        }
        println("Hello")
    }
}