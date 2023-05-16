import { LiveProvider } from "@refinedev/core";
import { Alert } from "src/types/Alerts";
import { AlertasClient } from "./AlertasClient";

export const liveProvider = (client: AlertasClient): LiveProvider => {

    return {
        subscribe: ({ channel, types, params, callback }) => {

            const listener = function (dosisAlertas: Alert[]) {
                callback({
                    payload: {
                       alertas: dosisAlertas
                    },
                    date: new Date(),
                    channel,
                    type: '*'
                })
            };
            client.subscribe(listener)

            return { listener };
        },
        unsubscribe: (payload: { listener: () => void }) => {
            client.unsubscribe(payload.listener)
        }
    };
};
