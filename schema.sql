
use bmazon_db;

CREATE TABLE `bmazon_db`.`products` (
  `item_id` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(150) NOT NULL,
  `department_name` VARCHAR(45) NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `stock` INT NOT NULL,
  PRIMARY KEY (`item_id`),
  UNIQUE INDEX `ID_UNIQUE` (`item_id` ASC) VISIBLE
  );
  

  
 


