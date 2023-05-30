CREATE TABLE users (
  id INT NOT NULL auto_increment PRIMARY KEY,
  email VARCHAR(255),
  password VARCHAR(255),
  name VARCHAR(255),
  age INT,
  gender VARCHAR(10),
  phonenumber VARCHAR(255),
  user_image_url VARCHAR(255),
  s3_key VARCHAR(255)
);

CREATE TABLE trainers (
  id INT NOT NULL auto_increment PRIMARY KEY,
  email VARCHAR(255),
  name VARCHAR(255),
  password VARCHAR(255),
  age INT,
  gender VARCHAR(10),
  phonenumber VARCHAR(255),
  introduction TEXT,
  career TEXT,
  review_avg VARCHAR(255),
  review_count INT,
  s3_key VARCHAR(255),
  trainer_image_url VARCHAR(255)
);

CREATE TABLE trainer_review (
  id INT NOT NULL auto_increment PRIMARY KEY,
  trainer_id INT REFERENCES trainers(id),
  review TEXT,
  review_point INT
);

CREATE TABLE user_points (
  id INT NOT NULL auto_increment PRIMARY KEY,
  user_id INT REFERENCES users(id),
  amount INT
);

CREATE TABLE trainer_points (
  id INT NOT NULL auto_increment PRIMARY KEY,
  trainer_id INT REFERENCES users(id),
  amount INT
);

CREATE TABLE pt_requests (
  id INT NOT NULL auto_increment PRIMARY KEY,
  user_id INT REFERENCES users(id),
  trainer_id INT REFERENCES trainers(id),
  date DATE,
  count INT,
  request TEXT,
  response TEXT,
  age INT,
  gender VARCHAR(10),
  height INT,
  weight INT,
  days VARCHAR(255),
  injury VARCHAR(255),
  career VARCHAR(255),
  significant VARCHAR(255),
  bodyshape VARCHAR(255),
  purpose VARCHAR(255),
  lifestyle VARCHAR(255),
  accept BOOLEAN,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

CREATE TABLE community_posts (
  id INT NOT NULL auto_increment PRIMARY KEY,
  user_id INT REFERENCES users(id),
  title VARCHAR(255),
  content TEXT
);

CREATE TABLE community_comments (
  id INT NOT NULL auto_increment PRIMARY KEY,
  user_id INT REFERENCES users(id),
  post_id INT REFERENCES community_posts(id),
  content TEXT
);


CREATE TABLE meal_plan (
  id INT NOT NULL auto_increment PRIMARY KEY,
  user_id INT REFERENCES users(id),
  trainer_id INT REFERENCES trainers(id),
  breakfast TEXT,
  lunch TEXT,
  dinner TEXT,
  breakfast_image_url VARCHAR(255),
  lunch_image_url VARCHAR(255),
  dinner_image_url VARCHAR(255),
  breakfast_s3_key VARCHAR(255),
  lunch_s3_key VARCHAR(255),
  dinner_s3_key VARCHAR(255)
);

CREATE TABLE feedbacks (
  id INT NOT NULL auto_increment PRIMARY KEY,
  user_id INT REFERENCES users(id),
  trainer_id INT REFERENCES trainers(id),
  feedback_video_url VARCHAR(255),
  s3_key VARCHAR(255),
  feedback_message TEXT
);

CREATE TABLE comments (
  id INT NOT NULL auto_increment PRIMARY KEY,
  user_id INT REFERENCES users(id),
  trainer_id INT REFERENCES trainers(id),
  feedback_id INT REFERENCES feedbacks(id),
  date DATE,
  message TEXT
);

CREATE TABLE trainer_manage (
  id INT NOT NULL auto_increment PRIMARY KEY,
  user_id INT REFERENCES users(id),
  trainer_id INT REFERENCES trainers(id),
  tag_id INT REFERENCES tag(id),
  last_exercise_date DATE,
  last_feedback_date DATE,
  total_pt_count INT,
  remain_pt_count INT,
  manage_memo TEXT,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

CREATE TABLE user_tag (
  id INT NOT NULL auto_increment PRIMARY KEY,
  user_id INT REFERENCES users(id),
  trainer_id INT REFERENCES trainers(id),
  tag_name TEXT,
  tag_color TEXT
);

CREATE TABLE ads (
  id INT NOT NULL auto_increment PRIMARY KEY,
  advertiser_id INT REFERENCES users(id),
  title VARCHAR(255),
  content TEXT,
  banner_image VARCHAR(255)
);

CREATE TABLE schedules (
  id INT NOT NULL auto_increment PRIMARY KEY,
  user_id INT REFERENCES users(id),
  trainer_id INT REFERENCES trainers(id),
  date DATE,
  meal_plan_id INT REFERENCES meal_plan(id),
  feedbacks_id INT REFERENCES feedbacks(id)
);




CREATE TABLE certifications (
  id INT NOT NULL auto_increment PRIMARY KEY,
  trainer_id INT REFERENCES trainers(id),
  name VARCHAR(255),
  image_url VARCHAR(255),
  FOREIGN KEY (`trainer_id`) REFERENCES `trainers` (`id`)
);

CREATE TABLE trainer_cert (
  id INT NOT NULL auto_increment PRIMARY KEY,
  trainer_id INT REFERENCES trainers(id),
  certification_id INT REFERENCES certifications(id),
  expiration_date DATE,
  issued_date DATE,
  FOREIGN KEY (`certification_id`) REFERENCES `certifications` (`id`)
);

CREATE TABLE trainer_exp (
  id INT NOT NULL auto_increment PRIMARY KEY,
  trainer_id INT REFERENCES trainers(id),
  expertise_id INT REFERENCES expertises(id)
);



CREATE TABLE expertises (
  id INT NOT NULL auto_increment PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE bodycheck (
 id INT NOT NULL auto_increment PRIMARY KEY,
 date DATE,
 body_image_url VARCHAR(255),
 height INT,
 weight INT,
 bmi INT,
 user_id INT REFERENCES users(id),
 last BOOLEAN
);

CREATE TABLE exercise_routines (
  id INT NOT NULL auto_increment PRIMARY KEY,
  user_id INT REFERENCES users(id),
  trainer_id INT REFERENCES trainers(id),
  schedule_id INT REFERENCES schedules(id),
  name VARCHAR(255),
  content TEXT,
  set_count INT,
  exercise_count INT,
  user_video_url VARCHAR(255),
  guide_video_url VARCHAR(255),
  user_s3_key VARCHAR(255),
  guide_s3_key VARCHAR(255),
  FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`id`)
);


