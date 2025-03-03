# SQL

## Joins

1. (Inner) Join : Intersection of 2 tables (data is matching across 2 tables)
2. Left (Outer) Join : Intersection of 2 tables + first table complete
3. Right (Outer) Join : Intersection of 2 tables + second table complete  
4. Full (Outer) Join : Combination of all 3 types of joins
    -Ex;

    ```sql
    select e.emp_name, d.dept_name
    from employee e
    full join department d on d.dept_id = e.dept_id;
    ```

5. Cross Join: Returns cartesian product, and doesn't need join condition (on clause). This is suitable when we dont have any matching column in the2 tables.
    - Ex:

    ```sql
    select e.emp_name, d.dept_name
    from employee e 
    cross join department d;
    ```

6. Natural Join: Similar to Inner Join,but here SQL decides the columns based on same name in the 2 tables, i.e, if 2 tables have a column with same names, it will do a inner join between those 2 tables. Again, no need of on clause here. If there are no columns with same name, it will do a Cross Join.
    - Ex:

    ```sql
    select e.emp_name, d.dept_name
    from employee e
    natural join department d;
    ```

7. Self Join: When we perform any join on the same table.
    - Ex:

    ```sql
    select child.name as child_name
    , child.age as child_age
    , parent.name as parent_name
    , parent.age as parent_age
    from family as child
    join family as parent on child.parent_id = parent.member_id;
    ```

## Subquery

QUESTION: Find the employees who's salary is more than the average salary earned by all employees
ANSWER:

1. Find the avg salary
2. filter the employees based on the above avg result.

A neat way:

```sql
select * -- outer query/ main query
from employee
where salary > (select avg(salary) from employee); -- subquery/ inner query

```

this can also be written like this:

```sql
select *
from employee e
join (select avg(salary) sal from employee) avg_sal
on e.salary > avg_sal.sal;
```

### Different types of subqueries

1. Scalar Subquery
    - Always returns 1 row and 1 column.
    - Ex. above given example is an example of scalar subquery
2. Multiple Row Subquery
    - 2 Types:
        1. Multiple columns, Multiple rows
        2. 1 column, Multiple rows
    - Example:

    ```sql
    -- Type 1: Multiple Column, Multiple Row
    -- Q: Find the employees who earn the highest salary in each department. 
    --step 1: frame the inner query
    select dept_name, max(salary)
    from employee
    group by dept_name

    -- step2: create the main query
    select *
    from employeee
    where (dept_name, salary) in (select dept_name, max(salary)
    from employee
    group by dept_name)


    --Type 2: 1 Column, Multiple Row (said so because the inner query returns a list (1 column with multiple rows))
    --Q. Find department which does not have any employees.
    --step 1: Find the departments from employee table
    select distinct dept_name
    from employee;

    --step 2: Frame the main query
    select * 
    from department
    where dept_name 
    not in (select distinct dept_name from employee); 

    ```

3. Correlated Subquery
    - A subquery which is related to the outer query
    - These are a bit time consuming, we generally prefer doing joins and other subqueries over correlated subquery if possible
    - Ex:

    ```sql
    --Q: Find the employees in each department who earn more than the average salary in that department.
    -- Step 1: Try to formulate a general subquery:
    -- select avg(salary) from employee where dept_name = "specific dept"
    -- Step 2: There is a variable in the subquery ("specific dept"), which depends on the outer query
    select *
    from employee e1
    where salary > (select avg(salary)
    from employee e2
    where e2.dept_name = e1.dept_name);
    ```

## WITH clause

1. WITH clause is also reffered to as CTE (Common Table Expression) or Sub-Query Factoring

- Examples:

```sql
--Q: Fetch employees who earn more than average salary of all employees
select *
from employee e
where e.salary > average_salary; --we need to find this average_salary

-- how to find the average salary using WITH clause:
with average_salary (avg_sal) as (select avg(salary) from employee) -- avg_sal, or the values in the first () are the columns we return frm average_salary
-- first the second () query -> "select avg(salary) from employee" will run and store the result temporarily in the average_salary table (temporary, and the scope is till the query runs)
-- 
select *
from employee e, average_salary av
where e.salary > av.avg_sal;
```

## VIEW

- View is a Database Object
- View is created over an SQL query
- View does not store any data
- View is like a virtual table
- Main Purposes of using a view:
    1. Security
    2. To simplify complex sql queries

## GROUP BY

- The GROUP BY statement groups rows that have the same values into summary rows, like "find the number of customers in each country".
- The GROUP BY statement is often used with aggregate functions (COUNT(), MAX(), MIN(), SUM(), AVG()) to group the result-set by one or more columns.

```sql
SELECT COUNT(CustomerID), Country
FROM Customers
GROUP BY Country;
```
