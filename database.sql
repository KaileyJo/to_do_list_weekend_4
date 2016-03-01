--I'm pretty sure that this is it, I copied and pasted from pgAdmin3 and edited to make it what I did at first

CREATE TABLE public.tasks
(
  id SERIAL PRIMARY KEY,
  task character varying(244) NOT NULL,
  completed boolean DEFAULT false,
);