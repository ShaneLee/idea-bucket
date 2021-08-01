CREATE DATABASE IF NOT EXISTS `idea_bucket`;
USE `idea_bucket`;

CREATE TABLE `categories` (
  `category` varchar(45) NOT NULL,
  PRIMARY KEY (`category`)
) ; 

CREATE TABLE `ideas` (
  `ideas_id` int(11) NOT NULL AUTO_INCREMENT,
  `time_submitted` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `idea` mediumtext NOT NULL,
  `category` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ideas_id`)
) ;
