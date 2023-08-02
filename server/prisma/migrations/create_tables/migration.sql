-- 1. Criação da tabela "User"
CREATE TABLE "User" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" VARCHAR(255),
  "username" VARCHAR(255) UNIQUE,
  "email" VARCHAR(255),
  "avatarUser" VARCHAR(255),
  "password" VARCHAR(255)
);

-- 2. Criação da tabela "Birthday"
CREATE TABLE "Birthday" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" UUID,
  "personName" VARCHAR(255),
  "dateOfBirth" TIMESTAMP,
  "avatarBirthday" VARCHAR(255),
  FOREIGN KEY ("userId") REFERENCES "User"("id")
);
