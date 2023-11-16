import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// const MAX_FILE_SIZE = 500000;

export const profileFormSchema = z.object({
  firstname: z
    .string()
    .min(2, {
      message: "Firstname must be at least 2 charchterd.",
    })
    .max(30, {
      message: "Firstname must not be longer than 30 characters.",
    }),
  lastname: z
    .string()
    .min(2, {
      message: "Firstname must be at least 2 charchterd.",
    })
    .max(30, {
      message: "Firstname must not be longer than 30 characters.",
    }),
  nationality: z
    .string()
    .min(2, {
      message: "Firstname must be at least 2 charchterd.",
    })
    .max(30, {
      message: "Firstname must not be longer than 30 characters.",
    }),
  university: z
    .string()
    .min(2, {
      message: "university must be at least 2 charchterd.",
    })
    .max(30, {
      message: "university must not be longer than 30 characters.",
    }),
  major: z
    .string()
    .min(2, {
      message: "university must be at least 2 charchterd.",
    })
    .max(30, {
      message: "university must not be longer than 30 characters.",
    }),
  description: z.string().min(2, {
    message: "description must be at least 20 character.",
  }),
});
