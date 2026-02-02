CREATE TABLE transaction (
      id SERIAL PRIMARY KEY,
      createdat TIMESTAMP NOT NULL DEFAULT NOW(),
      username TEXT NOT NULL,
      action TEXT NOT NULL,
      price REAL NOT NULL
);