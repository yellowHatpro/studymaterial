fn main() {
    let arr: [i32; 5] = [1, 2, 3, 4, 5];
    //let mut i: usize = 0;

    //LOOP

    // loop {
    //     if i == arr.len() {
    //         break;
    //     }
    //     if arr[i] % 2 == 1 {
    //         println!("{} is odd", arr[i]);
    //     } else {
    //         println!("{} is even", arr[i]);
    //     }
    //     i += 1;
    // }

    //WHILE LOOP

    // while i < arr.len() {
    //     if arr[i] % 2 == 0 {
    //         println!("{} is even", arr[i])
    //     } else {
    //         println!("{} is odd", arr[i])
    //     }
    //     i += 1
    // }

    //FOR LOOP
    for i in arr.iter() {
        if i % 2 == 0 {
            println!("{} is even", i)
        } else {
            println!("{} is odd", i)
        }
    }
}
