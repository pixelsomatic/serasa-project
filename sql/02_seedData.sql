-- Insert multiple producers
WITH inserted_producers AS (
  INSERT INTO "RuralProducers" ("producerName", "farmName", "taxId", "taxIdType", "city", "state", "totalArea", "arableArea", "vegetationArea", "createdAt", "updatedAt")
  VALUES 
    ('John Doe', 'SmallVille', '94567032071', 'CPF', 'Belo Horizonte', 'Minas Gerais', 200, 150, 50, NOW(), NOW()),
    ('Jane Smith', 'BigVille', '74567032071', 'CPF', 'São Paulo', 'São Paulo', 300, 200, 100, NOW(), NOW())
  RETURNING "id", "taxId"
),
-- Define producer-crop relationships
producer_crops AS (
  SELECT "id" as producerId, "taxId",
         UNNEST(ARRAY['Milho', 'Café']) as cropName,
         UNNEST(ARRAY[75, 50]) as cropArea
  FROM inserted_producers
  WHERE "taxId" = '94567032071'
  UNION ALL
  SELECT "id" as producerId, "taxId",
         UNNEST(ARRAY['Soja', 'Algodão']) as cropName,
         UNNEST(ARRAY[120, 80]) as cropArea
  FROM inserted_producers
  WHERE "taxId" = '74567032071'
)
-- Insert multiple crops for each producer
INSERT INTO "Crops" ("producerId", "cropName", "area", "createdAt", "updatedAt")
SELECT producerId, cropName, cropArea, NOW(), NOW()
FROM producer_crops;
