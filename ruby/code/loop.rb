$i = 0
$num = 5
while $i < $num do
    puts "#$i"
    $i +=1
end

puts "for loop"

for i in 0..$num
    puts "#{i}"
end

(0..5).each do |i|
    puts "#{i}"
end
