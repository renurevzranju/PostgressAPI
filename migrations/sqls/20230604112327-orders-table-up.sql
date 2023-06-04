CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(64),
    user_id bigint NOT NULL,
    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);