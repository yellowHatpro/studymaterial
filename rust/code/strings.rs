fn main() {
    let mut str1: String = String::new();
    str1.push('A');
    str1.push('B');
    str1.push('C');
    str1.push('D');
    str1.push_str("EFG");
    println!("{}", str1);
    let str2: String = String::from("a b c d e f");
    let mut v1: Vec<char> = str2.chars().collect();
    v1.sort();
    v1.dedup();
    println!("{:?}", v1);
}
