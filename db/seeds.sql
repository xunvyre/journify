INSERT INTO user (username, email, password)
VALUES
("stinkman", "stinkman@gmail.com", "stinkman"),
("nuggie", "nugz@gmail.com", "uggie");

INSERT INTO journal (title, entry, user_id, created_at, updated_at)
VALUES
("example", "example", 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("test", "test", 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);