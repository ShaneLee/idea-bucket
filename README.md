# Idea Bucket

A node js application for submitting ideas to.

The application allows the user to submit ideas for later retrieval.

### Setup

Run the below sql script to create the databases.

```

CREATE DATABASE  IF NOT EXISTS `idea_bucket`;
USE `idea_bucket`;

CREATE TABLE `categories` (
  `category` varchar(45) NOT NULL,
  PRIMARY KEY (`category`)
)

CREATE TABLE `ideas` (
  `ideas_id` int(11) NOT NULL AUTO_INCREMENT,
  `time_submitted` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `idea` mediumtext NOT NULL,
  `category` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ideas_id`)
) ;

```

__Create a .env file__ in the same directory as server.js.

Set your variables out in this file as below:

```

DB_HOST=YOUR_DATABASE_HOST
DB_USER=YOUR_DATABASE_USER
DB_PORT=YOUR_DATABASE_PORT
DB_PASS=YOUR_DATABASE_PASSWORD


```

__Then__ run:

``` node server.js ```

### The routes

> /ideas

Displays the users ideas in a table.

> /category

Allows the user to insert a new category.
