#![allow(non_snake_case)]
mod loops;

use std::cmp::Ordering;
use std::io;
fn main() {
    println!("Hello, world!");
    let mut enterNum: String = String::new();
    io::stdin()
        .read_line(&mut enterNum)
        .expect("Failed to read line");
    println!("{}", enterNum.trim_end());
    println!();

    const _ONE_MILLION: u32 = 1_000_000;
    let age: i32 = 24;
    let age2: i32 = 34;
    match age.cmp(&age2) {
        Ordering::Less => print!("Hello"),
        Ordering::Equal => print!("Hello"),
        Ordering::Greater => print!("Hello"),
    }
}
