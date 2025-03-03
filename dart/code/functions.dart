//Functions in dart
printHelloWorld() {
  return "Hello World";
}

printFib(int n) {
  if (n == 0) return 0;
  if (n == 1) return 1;
  return printFib(n - 1) + printFib(n - 2);
}

//Passing list as parameter
printList(List list) {
  for (var i in list) {
    print(i);
  }
}

//Passing list of sting
printListString(List<String> list) {
  for (var i in list) {
    print(i);
  }
}

void main() {
  print(printHelloWorld());
  printNumber() {
    return 5;
  }

  print(printNumber());
  print("Fibonnaci");
  print(printFib(6));
  print("List");
  var list1 = [1, 2, 3];
  printList(list1);
  print("List of string");
  var list2 = ["Rahul", "Raj", "Ravi"];
  printListString(list2);
}
