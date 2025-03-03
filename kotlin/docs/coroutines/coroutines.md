# Kotlin Coroutines

## TOPICS

- Coroutine Builders
- Concurrences
- Coroutine Scopes
- Coroutine Suspension
- Suspend Functions



## Coroutine Suspension

- Suspending coroutine means stopping it in the middle

> Analogy:
Similar to stopping a video game:
you save at a checkpoint, turn off the game,
and both you and your computer can focus on doing different things.
Then, when you would like to continue some time later,
you turn on the game again, resume from the saved checkpoint,
and thus you can play from where you previously left off.


- When coroutines are suspended they return a **Continuation**
- It is like a save in a game: we can use it to continue from the point where we stopped.

> It is different from Thread ,
which cannot be saved, only blocked.

-  A coroutine can be resumed on a different thread, and (at least in theory) a continuation can be serialized, deserialized and then resumed.

## Suspend Functions
- We suspend a coroutine, not a function
- Suspending functions are not coroutines, just functions that can suspend a coroutine