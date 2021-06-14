CREATE TABLE "transactions" (
    "id" SERIAL PRIMARY KEY,
    "user" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "was_successful" boolean default true
)