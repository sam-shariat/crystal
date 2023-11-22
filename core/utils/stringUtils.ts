function truncAddress(address: string) {
  return address.slice(0, 5) + '...' + address.slice(address.length - 4);
}

function isValidUsername(name: string) {
  const nameRegex = /^[a-zA-Z0-9]{2,32}$/;
  return nameRegex.test(name);
}


export {truncAddress, isValidUsername} 