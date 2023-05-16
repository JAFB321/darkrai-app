
export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}


export const formatDateMonthYear = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })
}

export const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {  month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h12' })
}

export const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hourCycle: 'h12' })
}

export const toDateStringInput = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript empiezan en 0, por lo que hay que sumar 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;      
}
