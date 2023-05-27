CREATE DATABASE IF NOT EXISTS `FitMe`;
USE `FitMe`;


CREATE TABLE users (
  id INT NOT NULL auto_increment PRIMARY KEY,
  email VARCHAR(255),
  username VARCHAR(255),
  password VARCHAR(255),
  age INT,
  gender VARCHAR(10)
);

CREATE TABLE trainers (
  id INT NOT NULL auto_increment PRIMARY KEY,
  email VARCHAR(255),
  username VARCHAR(255),
  password VARCHAR(255),
  age INT,
  gender VARCHAR(10),
  introduction TEXT
);

CREATE TABLE points (
  id INT PRIMARY KEY,
  user_id INT REFERENCES users(id),
  amount INT
);

CREATE TABLE pt_reservations (
  id INT PRIMARY KEY,
  user_id INT REFERENCES users(id),
  trainer_id INT REFERENCES trainers(id),
  date DATE,
  time TIME,
  message TEXT
);

CREATE TABLE community_posts (
  id INT PRIMARY KEY,
  user_id INT REFERENCES users(id),
  title VARCHAR(255),
  content TEXT
);

CREATE TABLE community_comments (
  id INT PRIMARY KEY,
  user_id INT REFERENCES users(id),
  post_id INT REFERENCES community_posts(id),
  content TEXT
);

CREATE TABLE exercise_routines (
  id INT PRIMARY KEY,
  user_id INT REFERENCES users(id),
  trainer_id INT REFERENCES trainers(id),
  name VARCHAR(255),
  user_video_url VARCHAR(255),
  guide_video_url VARCHAR(255)
);

CREATE TABLE meal_plan (
  id INT PRIMARY KEY,
  user_id INT REFERENCES users(id),
  trainer_id INT REFERENCES trainers(id),
  name VARCHAR(255),
  image VARCHAR(255)
);

CREATE TABLE feedbacks (
  id INT PRIMARY KEY,
  user_id INT REFERENCES users(id),
  trainer_id INT REFERENCES trainers(id),
  video_url VARCHAR(255),
  message TEXT
);

CREATE TABLE ads (
  id INT PRIMARY KEY,
  advertiser_id INT REFERENCES users(id),
  title VARCHAR(255),
  content TEXT,
  banner_image VARCHAR(255)
);

CREATE TABLE schedules (
  id INT PRIMARY KEY,
  date DATE,
  meal_plan_id INT REFERENCES meal_plan(id),
  routine_id INT REFERENCES exercise_routines(id)
);

CREATE TABLE calender (
  id INT PRIMARY KEY,
  user_id INT REFERENCES users(id),
  trainer_id INT REFERENCES trainers(id),
  schedule INT REFERENCES schedules(id)
);

CREATE TABLE certifications (
  id INT PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE expertises (
  id INT PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE trainer_cert (
  id INT PRIMARY KEY,
  trainer_id INT REFERENCES trainers(id),
  certification_id INT REFERENCES certifications(id),
  expiration_date DATE,
  issued_date DATE
);

CREATE TABLE trainer_exp (
  id INT PRIMARY KEY,
  trainer_id INT REFERENCES trainers(id),
  expertise_id INT REFERENCES expertises(id)
);