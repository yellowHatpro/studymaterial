puts "Some program"
puts "Some code again- this works"

=begin 
This is comment
This is comment too.
This is actually block comment
=end

BEGIN {
    puts "Initializing Ruby program"
}

END {
    puts "Terminating Ruby program"
}