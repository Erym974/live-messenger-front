export const convertDate = (date, language) => {
    const currentDate = new Date()
    const messageDate = new Date(date);

    const currentTimestamp = currentDate.getTime()
    const messageTimestamp = messageDate.getTime()

    const diffMilliseconds = currentTimestamp - messageTimestamp;

    switch(true){
      case diffMilliseconds < 43200000:
        return messageDate.toLocaleTimeString(language, { hour: '2-digit', minute: '2-digit' });
      case diffMilliseconds < 604800000:
        return messageDate.toLocaleDateString(language, { weekday: 'long', hour: 'numeric', minute: 'numeric' });
      default: 
        return messageDate.toLocaleDateString(language, { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' });
    }
}