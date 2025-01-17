import { SvelteKitAuth } from "@auth/sveltekit"
import Google from "@auth/core/providers/google"

// import * as SentryNode from '@sentry/node';
// import '@sentry/tracing';
import * as dotenv from 'dotenv' 
dotenv.config()

// SentryNode.init({
//     dsn: process.env.SENTRY_DSN,
//     tracesSampleRate: 1.0,
//     // Add the Http integration for tracing
//     integrations: [new SentryNode.Integrations.Http()]
// });
  
// SentryNode.setTag('svelteKit', 'server');


export const handle = SvelteKitAuth({
    //@ts-ignore
    providers:[ Google({
        //@ts-ignore
        clientId: process.env.GOOGLE_CLIENT_ID,
        //@ts-ignore
        clientSecret: process.env.GOOGLE_SECRET,
        //@ts-ignore
        })], 

    secret: process.env.SECRET,
    trustHost: true,
})

// @ts-ignore
