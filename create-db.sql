/*CREATE DATABASE `auth`;*/
USE `auth`;
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user'
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb3;
INSERT INTO `users` (`name`, `email`, `password`)
VALUES ('John Doe', 'john@doe.com', 'password');
SELECT *
FROM users;