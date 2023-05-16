import axios, { AxiosInstance } from "axios";
import { Alert } from "src/types/Alerts";

export class AlertasClient {
    private subscribers: ((dosisAlertas: Alert[]) => void)[] = []
    private axiosClient: AxiosInstance

    constructor(
        apiUrl: string
    ){
        this.axiosClient = axios.create({ baseURL: apiUrl })
        this.init()
    } 

    private init(){
        if(typeof window === 'undefined') return
        
        // console.log('init alerts');
        // setTimeout(() => {
        //     this.checkAlerts()
        // }, 500);
    
        // setInterval(() => {
        //     this.checkAlerts()
        // }, 60000)
    }

    subscribe(callback: ((dosisAlertas: Alert[]) => void)){
        this.subscribers.push(callback)
    }

    unsubscribe(callback: ((dosisAlertas: Alert[]) => void)){
        this.subscribers = this.subscribers.filter((val) => val !== callback)
    }

    async checkAlerts(){
        try {
            console.log('check alerts');
            
            const response = await this.axiosClient.get('/alerta')
            if(response.status !== 200) return

            const alertas = response.data as Alert[]
            if(!alertas?.length) return
            
            console.log('alerts:', alertas);
            await Promise.allSettled(this.subscribers.map((callback) => callback(alertas)))
            await Promise.allSettled(alertas.map(async ({ dosis }) => {
                await this.axiosClient.post('/alerta/registrar/' + dosis.id)
            }))

        } catch (error) { console.error(error) }
    }
}