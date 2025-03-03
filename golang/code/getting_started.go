package main

import (
	"fmt"
	"time"
)

func main() {

	fmt.Println(Hello("ashu"))
	fmt.Println(time.Now())
	fmt.Println(nakedReturn("Ashu "))
	sum := 0
	for i := 0; i < 5; i++ {
		sum++
	}
	fmt.Println(sum)
	fmt.Println(Vertex{1, 2})
}

func Hello(name string) (string, string, string) {
	message := fmt.Sprintf("Hi, %v. Welcome!", name)
	return message, message + "Hi", message + "Yo"
}

func nakedReturn(name string) (newName string) {
	newName = name + " Haha"
	return
}

type Vertex struct {
	X int
	Y int
}
