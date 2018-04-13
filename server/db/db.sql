CREATE DATABASE facebook;

USE facebook;

CREATE TABLE users (
  id int NOT NULL auto_increment,
  username varchar(50),
  password varchar(255),
  picture varchar(255),
  PRIMARY KEY(id)
);
--  type 0 = post, 1 = comment, 2 = reply
CREATE TABLE posts (
  id int NOT NULL auto_increment,
  user_id int,
  profile_id int, 
  post varchar(255),
  type int,
  parent_id int,
  PRIMARY KEY(id)
);
CREATE TABLE friends ( 
  id int NOT NULL auto_increment,
  user_id_a int NOT NULL, 
  user_id_b int NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE statuses (
  id int NOT NULL auto_increment,
  mood varchar(50),
  userId int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(userId) REFERENCES users(id)
);

INSERT INTO users (username, password, picture) VALUES('daniel', 'daniel', 'thisisasamplepicture');

INSERT INTO users (username, password, picture) VALUES('darren', 'darren', 'thisisanewsamplepicture');

INSERT INTO friends (user_id_a, user_id_b) VALUES(1, 2);
INSERT INTO friends (user_id_a, user_id_b) VALUES(2, 1);

INSERT INTO posts (user_id, profile_id, post, type) VALUES (2, 2, 'bye', 0);


INSERT INTO statuses (mood, userId) VALUES('happy', 1);

