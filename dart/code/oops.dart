//Encapsulation
class BankAccount {
  num? _balance = 0;
  //get keyword is used to get the value of the variable
  num get balance =>
      _balance!; // ! is used to tell the compiler that the variable is not null
}

void main() {
  var account = BankAccount();
  print(account._balance);
}
