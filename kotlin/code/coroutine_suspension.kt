package coroutines

import kotlin.concurrent.thread
import kotlin.coroutines.resume
import kotlin.coroutines.suspendCoroutine


class CoroutineSuspension {

}

suspend fun main(){
    println("Before")
    suspendCoroutine<Unit> { continuation ->
       thread {
           println("1")
           continuation.resume(println(println("2")))
           println("3")
         //  continuation.resumeWith(Result.success(println("Something")))
           println("4")
       }
    }
    println("After")
}