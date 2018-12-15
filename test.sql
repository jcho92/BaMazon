SELECT products.product_sales, departments.overhead_costs
FROM
products 
CROSS JOIN departments;