
export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}

export const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {  month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h12' })
}

export const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hourCycle: 'h12' })
}