
-- Create skills table for managing developer skills
CREATE TABLE public.skills (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  proficiency integer NOT NULL DEFAULT 80,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Add order_position column to projects table for custom ordering
ALTER TABLE public.projects 
ADD COLUMN order_position integer;

-- Update existing projects with order positions using a subquery
WITH numbered_projects AS (
  SELECT id, row_number() OVER (ORDER BY created_at) as position
  FROM public.projects
  WHERE order_position IS NULL
)
UPDATE public.projects 
SET order_position = numbered_projects.position
FROM numbered_projects
WHERE public.projects.id = numbered_projects.id;
