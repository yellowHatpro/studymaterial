# GoLang

- In 2007, Google began developing the Go programming language as an internal project.

- In 2009, Google announced the open source release of Go.

- In 2012, Go became an official programming language of the Cloud Native Computing Foundation.

## Advantages

- Go has a clean syntax.

- Used in web servers databases, and other systems.

- Handles concurrency well.

## Go Basics

1. fmt is a package in GoLang which is used for formatting the input and output. It is used for printing the output in a formatted way.

2. In Go, a function whose name starts with a capital letter can be called by a function not in the same package.This is known in Go as an exported name.

3. In Go, the := operator is a shortcut for declaring and initializing a variable in one line (Go uses the value on the right to determine the variable's type).

4. <b>defer</b> in Golang
   A defer statement defers the execution of a function until the surrounding function returns.

```go
func main() {
	fmt.Println("counting")

	for i := 0; i < 10; i++ {
		defer fmt.Println(i)
	}

	fmt.Println("done")
}

```

5. struct in Golang
   A struct is a collection of fields.
   Struct fields are accessed using a dot.

```go
type Vertex struct {
    X int
    Y int
}

func main() {
    fmt.Println(Vertex{1, 2})
}

```
