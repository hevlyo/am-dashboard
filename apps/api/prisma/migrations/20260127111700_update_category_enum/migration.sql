-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('REDACAO', 'LINGUAGENS', 'MATEMATICA', 'CIENCIAS_NATUREZA', 'CIENCIAS_HUMANAS');
ALTER TABLE "courses" ALTER COLUMN "category" TYPE "Category_new" USING (
  CASE
    WHEN "category"::text = 'PORTUGUES' THEN 'LINGUAGENS'
    WHEN "category"::text IN ('HISTORIA', 'GEOGRAFIA') THEN 'CIENCIAS_HUMANAS'
    WHEN "category"::text = 'CIENCIAS' THEN 'CIENCIAS_NATUREZA'
    ELSE "category"::text
  END::"Category_new"
);
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;
