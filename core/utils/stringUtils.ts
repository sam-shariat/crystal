function truncAddress(address: string) {
  if (address === '') return ''
  return address.slice(0, 5) + '...' + address.slice(address.length - 4);
}

function isValidUsername(name: string) {
  const nameRegex = /^[a-zA-Z0-9]{2,32}$/;
  return nameRegex.test(name);
}

const formatDateDifference = (date:Date) => {
  const now = new Date();
  const targetDate = new Date(date);

  const timeDifference = targetDate.getTime() - now.getTime();

  if (timeDifference < 0) {
    return 'Expiring';
  }

  if (timeDifference === 0) {
    return 'Today!';
  }

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const days = Math.floor(timeDifference / millisecondsPerDay);
  const years = Math.floor(days / 365);
  const months = Math.floor(days / 30) % 12;

  let remainingDays = days - (years * 365 + months * 30);
  let result = '';

  if (years > 0) {
    result += `${years} year${years > 1 ? 's' : ''} `;
  }

  if (months > 0 && years < 1) {
    result += `${months} month${months > 1 ? 's' : ''} `;
  }

  if (remainingDays > 0 && years < 1 && months < 1) {
    result += `${remainingDays} day${remainingDays > 1 ? 's' : ''} `;
  }

  return result;
};


export { truncAddress, isValidUsername, formatDateDifference } 