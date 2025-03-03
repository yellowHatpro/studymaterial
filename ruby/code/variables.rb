$global_variable = 10
class Global
    def print_global
        puts "#$global_variable"
    end
end

class Local
    @@static_var = 1
    CONSTANT = 100
    def print_static
        puts "#@@static_var"
    end
    def print_anotherlocal
        @anotherlocal = 11
        puts "#@anotherlocal"
    end
end

obj1 = Global.new
obj2 = Local.new
obj1.print_global
obj2.print_static
obj2.print_anotherlocal
