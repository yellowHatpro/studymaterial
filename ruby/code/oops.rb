# Ruby is perfect Object Oriented Programming Language

class Customer
    @@no_of_customers = 0 # this is static variable
    def initialize(id, name, addr)
        @cust_id = id
        @cust_name = name
        @cust_addr = addr
    end
end

cust1 = Customer. new("1", "ashu", "India")
puts cust1.cust_id
