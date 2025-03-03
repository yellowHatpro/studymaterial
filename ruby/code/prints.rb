# Normal print
print "Hello, Ruby!"

# Here document in Ruby

print <<ANYTHING_HERE
    This is the first way of creating
    here document i.e. multiple line string.
ANYTHING_HERE

# Same as above
print <<"SAME AS ABOVE"
    This works same as above.
SAME AS ABOVE

# Executes commands
print <<`EOC`
    echo hi there
    echo lo there
EOC

# You can stack them
print <<"foo", <<"bar"
    I said foo.
foo
    I said bar.
bar