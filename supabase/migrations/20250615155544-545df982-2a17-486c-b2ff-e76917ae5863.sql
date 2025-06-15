
-- Add a description field to the skills table for detailed descriptions
ALTER TABLE public.skills 
ADD COLUMN description text,
ADD COLUMN image_url text;

-- Create a table for dynamic content sections
CREATE TABLE public.content_sections (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_name text NOT NULL UNIQUE,
  content text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Insert default content for skills section
INSERT INTO public.content_sections (section_name, content) 
VALUES ('skills_description', 'I have experience working with various technologies and frameworks. Here are the skills I''ve developed over the years, ranging from frontend development to backend technologies and tools.');
