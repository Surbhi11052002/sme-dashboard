-- users table 
create table users(
  user_id serial primary key,
  email varchar(255) unique not null,
  password varchar(255) not null,
  created_at date default current_date
);

CREATE TABLE grading (
  grading_id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  grading_count_daily INT DEFAULT 0,
  submission_date DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE thinkchat (
  thinkchat_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  agent_name varchar(50) not null,
  tickets_handled int default 0,
  tickets_solved int default 0,
  submission_date DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

ALTER TABLE users ADD role varchar(50) , ADD discipline varchar(50) ;
UPDATE users SET role = 'Subject Matter Expert', discipline = 'Engineering' WHERE user_id = 1;

ALTER TABLE users ALTER COLUMN role SET NOT NULL;
