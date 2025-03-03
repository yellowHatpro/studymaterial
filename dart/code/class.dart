//classes in dart

class Person {
  String _name;
  int age;
  Person(this._name, this.age);
  void printName() {
    print(_name);
  }
}

void main() {
  var person1 = new Person("Rahul", 25);
  print(person1._name);
  person1.printName();
}
