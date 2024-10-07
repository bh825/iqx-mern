const { z } = require("zod");

module.exports = z.array(
  z.object({
    Section: z.string().min(3),
    Domain: z.string().min(3),
    Framework: z.string().min(3),
    Control: z.string().min(3),
    Question: z.string().min(3)
  })
);
