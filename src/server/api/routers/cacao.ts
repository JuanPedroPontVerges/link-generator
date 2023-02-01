import { z } from "zod";
import { env } from "../../../env/server.mjs";
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
    const token = await signIn();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parsedResponse = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return parsedResponse;
  }),


  getMercadopagoInfo: protectedProcedure.query(async ({ ctx }) => {
    const response = await fetch('https://api.cacao.to/venue/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const token = await signIn();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parsedResponse = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return parsedResponse;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

});


async function signIn() {
  const data = {
    username: 'jppontverges@gmail.com',
    password: 'hola1234',
  }
  const response = await fetch('https://api.cacao.to/venue/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const parsedResponse = await response.json();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return parsedResponse.accessToken as string;
}

async function mp() {
  const data = {
    username: 'jppontverges@gmail.com',
    password: 'hola1234',
  }
  const response = await fetch(`https://api.mercadopago.com/checkout/preferences`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${env.MERCADOPAGO_ACCESS_TOKEN}`,
    },
    body: JSON.stringify(data)
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const parsedResponse = await response.json();
}