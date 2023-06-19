CREATE TABLE "RuralProducers" (
  "id" SERIAL PRIMARY KEY,
  "producerName" VARCHAR NOT NULL,
  "farmName" VARCHAR NOT NULL,
  "taxId" VARCHAR NOT NULL,
  "city" VARCHAR NOT NULL,
  "state" VARCHAR NOT NULL,
  "totalArea" DOUBLE PRECISION NOT NULL,
  "arableArea" DOUBLE PRECISION NOT NULL,
  "vegetationArea" DOUBLE PRECISION NOT NULL,
  "cropsPlanted" DOUBLE PRECISION NOT NULL,
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL
);

CREATE TABLE "Crops" (
  "id" SERIAL PRIMARY KEY,
  "producerId" INTEGER NOT NULL REFERENCES "RuralProducers"("id") ON DELETE CASCADE,
  "cropName" VARCHAR NOT NULL,
  "area" DOUBLE PRECISION NOT NULL,
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL
);