import { useSubscription } from "@refinedev/core";


export const AlertasNotificaciones = () => {
    useSubscription({
        channel: "alertas",
        types: ["*"],
        onLiveEvent: (event) => {console.log('ALERT NOTIFICATION',event)},
    });

  return (
    <></>
  )
}
