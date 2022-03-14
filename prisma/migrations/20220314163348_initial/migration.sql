-- CreateTable
CREATE TABLE "Dev" (
    "id" TEXT NOT NULL,
    "Nome" TEXT NOT NULL,
    "Avatar" TEXT NOT NULL,
    "Carreira" TEXT NOT NULL,
    "Github" TEXT NOT NULL,
    "Linkedin" TEXT NOT NULL,

    CONSTRAINT "Dev_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dev_id_key" ON "Dev"("id");
