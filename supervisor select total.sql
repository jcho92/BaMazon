SELECT * FROM products, departments WHERE products.department_name = "video games";

SELECT SUM(product_sales) as profits FROM products WHERE products.department_name = "video games";

SELECT overhead_costs as expenses FROM departments where department_name = "video games";

SELECT products.product_sales, departments.overhead_costs  from products, departments WHERE departments.department_name = "video games" and products.department_name = "video games" ;