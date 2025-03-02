export function groupCallsByDay(calls) {
    calls.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const callsByDay = new Map();

    calls.forEach(call => {
        const date = new Date(call.created_at).toISOString().split('T')[0];
        if (!callsByDay.has(date)) {
            callsByDay.set(date, []);
        }

        callsByDay.get(date).push(call);
    });

    const result = Array.from(callsByDay.values());

    return result;
}


export function formatDate(dateString) {
    const inputDate = new Date(dateString);
    const today = new Date();

    if (
        inputDate.getDate() === today.getDate() &&
        inputDate.getMonth() === today.getMonth() &&
        inputDate.getFullYear() === today.getFullYear()
    ) {
        return "today";
    }

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return inputDate.toLocaleDateString('en-US', options);
}


export const formatCallDuration = (duration) => {
    const seconds = duration % 60;
    const minutes = Math.floor(duration / 60);
    if (minutes) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
};

export const formatPhoneNumber = (phoneNumber) => {
    const strPhoneNumber = phoneNumber.toString();
    if (strPhoneNumber.length === 10)
        return `(${strPhoneNumber.slice(0, 3)}) ${strPhoneNumber.slice(
            3,
            6
        )}-${strPhoneNumber.slice(6)}`;
    else if (strPhoneNumber.length === 11)
        return `+${strPhoneNumber.slice(0, 1)} (${strPhoneNumber.slice(
            1,
            4
        )}) ${strPhoneNumber.slice(4, 7)}-${strPhoneNumber.slice(7)}`;
    return strPhoneNumber;
};