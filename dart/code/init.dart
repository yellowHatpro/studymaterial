void main() {
  int a = 5;
  num b = 5.5;
  print(b.runtimeType);
  var list1 = [1, 2, 3];
  //iterate in list
  for (var i in list1) {
    print(i);
  }
  //print list
  print(list1);
  //add element in list
  list1.add(4);
  print(list1);
  //remove element in list
  list1.remove(4);
  print(list1);
  //remove element in list by index
  list1.removeAt(0);
  print(list1);
  //remove element in list by index
  list1.removeLast();
  print(list1);
  print("Maps");
  //Maps
  //initialise a map
  var map1 = {"name": "Rahul", "age": 25, "city": "Delhi"};
  print(map1);
  //init empty map
  var map2 = Map();
  print(map2);
  //add element in map
  map2["name"] = "Rahul";
  map2["age"] = 25;
  print(map2);
  //remove element in map
  map2.remove("name");
  print(map2);
}
