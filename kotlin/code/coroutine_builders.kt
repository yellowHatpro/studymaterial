package coroutines

import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

/*  Every suspending function needs to be called by another suspending function,
 *  which is called by another suspending function, and so on.
 *  This all needs to start somewhere.
 *  It starts with a coroutine builder,
 *  a bridge from the normal to the suspending world..*/

/* In kotlinx.coroutines library, we have 3 essential coroutine builders
   1. launch
   2. runBlocking
   3. async
 */

//Launch

/*
* The launch function is an extension function on the CoroutineScope interface.
*  This is part of an important mechanism called structured concurrency,
*  whose purpose is to build a relationship between the parent coroutine and a child coroutine.
*  Later in this chapter, we will learn about structured concurrency,
*  but for now we will avoid this topic by calling launch (and later async) on the GlobalScope object.
* This is not a standard practice though as we should rarely use GlobalScope in real-life projects.
*
* */
fun main () {
    GlobalScope.launch {
        delay(1000)
        println("World!")
    }


}