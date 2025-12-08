const convertDate = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);

  const ms = date.getTime() - now.getTime();
  const absMs = Math.abs(ms);

  const minutes = Math.round(absMs / (1000 * 60));
  const hours = Math.round(absMs / (1000 * 60 * 60));
  const days = absMs / (1000 * 60 * 60 * 24);

  if (minutes < 60) {
    return `${minutes} min(s)`;
  } else if (hours < 24) {
    return `${hours} hr`;
  } else if (days < 7) {
    return `${Math.round(days)}d`;
  } else if (days < 30) {
    return `${Math.round(days / 7)}w`;
  } else if (days < 365) {
    return `${Math.round(days / 30)} mo(s)`;
  } else {
    return `${(days / 365).toFixed(1)} yr(s)`;
  }
};

export default convertDate;
