import fastify, { FastifyRequest, FastifyServerOptions } from "fastify";
import { CustomError } from "utils/customError";
import config from "./config/config"
import fastifySwagger from "@fastify/swagger";
import { swaggerOption } from "./config/swagger";
import {authRouter, userRouter, articleRouter} from "./routes";

declare module "fastify" {
	interface FastifyRequest {
		UserId?: string;
	}
}

const App = (options: FastifyServerOptions) => {
	const app = fastify(options)

	app.register(require('@fastify/cors'), {
		origin: (origin: string | undefined, callback: (err: Error | null, allow: boolean) => void) => {
			// This is NOT recommended for production as it enables reflection exploits
			// do not include CORS headers for requests from localhost
			if (origin && /^localhost$/m.test(origin)) {
				callback(null, false);
			} else {
				callback(null, true);
			}
		}
	})

	// swagger api documentation
	app.register(fastifySwagger, swaggerOption.options);

	app.get("/", async () => "SERVER");
	app.register(authRouter, { prefix: "/api/auth" });
	app.register(userRouter, { prefix: "/api/users" });
	app.register(articleRouter, { prefix: "/api/articles" });

	app.setErrorHandler((error, request, reply) => {
		const customError = error instanceof CustomError ? error : new CustomError(
			error instanceof Error ? error.message : 'Internal Server Error',
			undefined,
			500
		);
		reply.status(customError.statusCode || 500).send({
			error: {
				message: customError.message,
				code: customError.code,
				data: customError.data,
			}
		})
	})
	return app
}

export default App;