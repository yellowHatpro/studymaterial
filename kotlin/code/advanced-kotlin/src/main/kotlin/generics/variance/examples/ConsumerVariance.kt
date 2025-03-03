package generics.variance.examples


/*
* Class that can be used to send message of certain type.
* */
interface Sender<in T: Message> {
    fun send(message: T)
}

interface Message
interface Order

interface OrderManagerMessage: Message
interface InvoiceManagerMessage: Message

class AddOrder(val order: Order) : OrderManagerMessage
class CancelOrder(val orderId: String): OrderManagerMessage

class GeneralSender(
    private val sendTo: String
) : Sender<Message> {
    override fun send(message: Message) {
        println("$message sent to $sendTo")
    }
}

// We are abe to use Sender<Message>, where Sender<OrderManagerMessage> is needed
// Since we are using contravariance here (in keyword with generic)
val orderManagerSender: Sender<OrderManagerMessage> =
    GeneralSender("orderManager")

// Another example:

class Consumer<in T> {
    fun consume(value: T) {
        println("Consumer $value")
    }
//      Won't work, contravariance (in) makes sense for consumer values, or paramters
//      For return types, or immutable types, use covariance (out)
//    fun produce() : T {
//
//    }
}

class ConsumerVariance {
    fun main(){
        val numberConsumer: Consumer<Number> = Consumer()
        numberConsumer.consume(2.6)
        val intConsumer: Consumer<Int> = numberConsumer // works because of contravariance
        intConsumer.consume(12)
        val floatConsumer: Consumer<Float> = numberConsumer
    }
}