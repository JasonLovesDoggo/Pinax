import matter from "gray-matter";
import { write } from "bun";
import { z } from "zod";
import { fromError } from "zod-validation-error";

const BlogPostSchema = z.object({
  title: z.string(),
  description: z.string(),
  published: z.boolean(),
  og_image: z.string().optional(),
  date: z.string().datetime(),
  updatedOn: z.string().datetime(),
});

const ProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  links: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    }),
  ),
  og_image: z.string().optional(),
  published: z.boolean(),
  date: z.string().datetime(),
  updatedOn: z.string().datetime(),
});

const validateFile = (file: any, schema: any) => {
  try {
    schema.parse(file.data); // Validate the file's data
  } catch (error) {
    const validationError = fromError(error); // Convert error
    console.log(validationError.toString()); // Log the error message
    console.table(file.data); // Log the file data in a table for debugging
    process.exit(1); // Exit with an error code
  }
  return null; // No error if validation passes
};

const updateFrontmatter = async () => {
  // Grab the file paths passed in as arguments
  const mdFilePaths = process.argv.slice(2);

  for (const path of mdFilePaths) {
    if (!path.endsWith(".mdx") && !path.endsWith(".md")) {
      continue; // Skip non-MDX files
    }
    const file = matter.read(path);
    const { data: currentFrontmatter } = file;

    // add published: false if it doesn't exist
    if (!currentFrontmatter.published) {
      file.data.published = false;
    }

    // add the date if it doesn't exist
    if (!currentFrontmatter.date) {
      file.data.date = new Date().toISOString();
    }

    // Update the updatedOn date
    file.data.updatedOn = new Date().toISOString();

    // Valid schema for blog posts and projects
    if (path.includes("posts")) {
      return validateFile(file, BlogPostSchema);
    } else if (path.includes("projects")) {
      return validateFile(file, ProjectSchema);
    }

    // // format the file content
    // file.content = file.content.trim();

    // @ts-ignore
    const updatedFileContent = matter.stringify(file);
    await write(path, updatedFileContent);
  }
};

await updateFrontmatter();
