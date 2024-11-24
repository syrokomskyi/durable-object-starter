import { DurableObject } from "cloudflare:workers";

/**
 * Welcome to Cloudflare Workers! This is your first Durable Objects application.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your Durable Object in action
 * - Run `npm run deploy` to publish your application
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/durable-objects
 */

export class MyDurableObject extends DurableObject {
  async sayHello(): Promise<string> {
    return "Hello, World!";
  }
}

// Worker
export default {
  async fetch(request, env, ctx): Promise<Response> {
    // Every unique ID refers to an individual instance of the Durable Object class
    const id = env.MY_DURABLE_OBJECT.idFromName("foo");

    // A stub is a client used to invoke methods on the Durable Object
    const stub = env.MY_DURABLE_OBJECT.get(id);

    // Methods on the Durable Object are invoked via the stub
    const rpcResponse = await stub.sayHello();

    return new Response(rpcResponse);
  },
} satisfies ExportedHandler<Env>;
