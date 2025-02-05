import type { Snippet } from "svelte";

class AlertsStore {
    #alerts: {snippet: Snippet<[string]>, text: string, uuid: string}[] = $state([])
    get alerts() {
        return this.#alerts
    }
    add(snippet: Snippet<[string]>, text: string) {
        const uuid = crypto.randomUUID()

        this.#alerts.push({snippet, text, uuid })
        setTimeout(() => {
            this.#alerts = this.#alerts.filter(v => v.uuid !== uuid)
        }, 8000)
    }
}
export const alerts = new AlertsStore()


$effect.root(() => console.log(alerts.alerts.length))