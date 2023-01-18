CREATE


CREATE TABLE IF NOT EXISTS users(
id SERIAL,
login varchar(20) NOT NULL,
password varchar(20) NOT NULL,
email varchar(20) NOT NULL,
role integer NOT NULL,
PRIMARY KEY(id),
UNIQUE(id, login, email)
);


CREATE TABLE IF NOT EXISTS user_info(
id SERIAL,
user_id integer not null,
first_name varchar(20),
second_name varchar(20),
patronymic varchar(30),
birth_date date,
sum integer,
stake_count integer,
PRIMARY KEY(id),
FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE

);


CREATE TABLE IF NOT EXISTS stakes(
id SERIAL, 																			
category varchar(20),
stake_name varchar(20),
user_count integer,
date_end date,
date_event date,
PRIMARY KEY(id)
);



CREATE TABLE IF NOT EXISTS results(
id SERIAL,
stake_id integer,
result_name varchar(20),
coefficient decimal,

PRIMARY KEY(id),
FOREIGN KEY(stake_id) REFERENCES stakes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS stake_review(
id SERIAL,
stake_id integer,
review text,
review_date date,
PRIMARY KEY(id),
FOREIGN KEY(stake_id) REFERENCES stakes(id)
);


CREATE TABLE IF NOT EXISTS stake_info(
id SERIAL,
stake_id integer,
stake_sum integer,
result_id integer,
user_id integer,
	
PRIMARY KEY(id),
FOREIGN KEY(stake_id) REFERENCES stakes(id) ON DELETE CASCADE,
FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY(result_id) REFERENCES results(id) ON DELETE CASCADE
);
