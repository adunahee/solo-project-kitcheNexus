CREATE TABLE "person" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "pantry_tags" (
	"id" serial NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT pantry_tags_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "pantry_tags_food" (
	"id" serial NOT NULL,
	"person_id" integer NOT NULL,
	"pantry_tags_id" integer NOT NULL,
	CONSTRAINT pantry_tags_food_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "food" (
	"id" serial NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT food_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "grocery_lists" (
	"list_name" varchar(100) NOT NULL,
	"person_id" integer NOT NULL,
	"id" serial NOT NULL,
	CONSTRAINT grocery_lists_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "foods_grocery_lists" (
	"id" serial NOT NULL,
	"food_id" integer NOT NULL,
	"grocery_list_id" integer NOT NULL,
	CONSTRAINT foods_grocery_lists_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "persons_food" (
	"id" serial NOT NULL,
	"persons_id" integer NOT NULL,
	"food_id" integer NOT NULL,
	"pantry_tags_id" integer NOT NULL,
	CONSTRAINT persons_food_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "pantry_tags_food" ADD CONSTRAINT "pantry_tags_food_fk0" FOREIGN KEY ("person_id") REFERENCES "person"("id");
ALTER TABLE "pantry_tags_food" ADD CONSTRAINT "pantry_tags_food_fk1" FOREIGN KEY ("pantry_tags_id") REFERENCES "pantry_tags"("id");


ALTER TABLE "grocery_lists" ADD CONSTRAINT "grocery_lists_fk0" FOREIGN KEY ("person_id") REFERENCES "person"("id");

ALTER TABLE "foods_grocery_lists" ADD CONSTRAINT "foods_grocery_lists_fk0" FOREIGN KEY ("food_id") REFERENCES "food"("id");
ALTER TABLE "foods_grocery_lists" ADD CONSTRAINT "foods_grocery_lists_fk1" FOREIGN KEY ("grocery_list_id") REFERENCES "grocery_lists"("id");

ALTER TABLE "persons_food" ADD CONSTRAINT "persons_food_fk0" FOREIGN KEY ("persons_id") REFERENCES "person"("id");
ALTER TABLE "persons_food" ADD CONSTRAINT "persons_food_fk1" FOREIGN KEY ("food_id") REFERENCES "food"("id");
ALTER TABLE "persons_food" ADD CONSTRAINT "persons_food_fk2" FOREIGN KEY ("pantry_tags_id") REFERENCES "pantry_tags"("id");
