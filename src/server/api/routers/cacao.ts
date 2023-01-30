import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const cacaoRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAllVenues: publicProcedure.query(async ({ ctx }) => {
    const response = await fetch('https://api.cacao.to/venue/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parsedResponse = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return parsedResponse;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
