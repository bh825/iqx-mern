const { z } = require("zod");

module.exports = z.array(
  z.object({
    domain: z.string().min(3),
    framework: z.string().min(3),
    control: z.string().min(3),
    question: z.string().min(3)
  })
);
