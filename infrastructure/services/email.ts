import { env } from "../../shared/config.ts";
import { Mailer } from "../../shared/deps.ts";

export default class EmailService {
  static async send(bodyOptions: Mailer.SendConfig) {
    const clientOptions: Mailer.ClientOptions = {
      connection: {
        hostname: env.INFRA_MAIL_HOST,
        port: Number(env.INFRA_MAIL_PORT),
        tls: true,
        auth: {
          username: env.INFRA_MAIL_USERNAME,
          password: env.INFRA_MAIL_PASSWORD,
        },
      },
      debug: {
        noStartTLS: env.DENO_MODE === "dev",
      },
    };
    const client = new Mailer.SMTPClient(clientOptions);
    const prettyFrom = bodyOptions.from
      ? `${env.INFRA_MAIL_POST_NAME} <${bodyOptions.from}>`
      : `${env.INFRA_MAIL_POST_NAME} <${env.INFRA_MAIL_USERNAME}>`;
    const sendOptions: Mailer.SendConfig = Object.assign(
      {},
      bodyOptions,
      {
        from: prettyFrom,
      },
    );
    await client.send(sendOptions);
    await client.close();
  }
}
