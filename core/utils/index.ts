import axios from 'axios';
import { truncAddress } from './stringUtils';
import { MAX_NAME_LENGTH, MIN_NAME_LENGTH, SOCIAL_URLS } from './constants';
import { BaseNftJson } from './reverse';
//import crypto from 'crypto';

const sleep = async (ms: number) => new Promise((r) => setTimeout(r, ms));
const capFirstLetter = (str: string) => {
  if (str === '') return '';
  const words = str.split(' ');
  const final = words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
  return String(final);
};

const arrayRemove = (arr: any, index: number) => {
  return arr.filter((item: any, ind: number) => index !== ind && item);
};

const withHttps = (url: string) =>
  url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) =>
    schemma ? match : `https://${nonSchemmaUrl}`
  );

function isValidUsername(name: string) {
  var length = Buffer.byteLength(name);
  if (length <= MIN_NAME_LENGTH || length > MAX_NAME_LENGTH) {
    return false;
  }
  var nameAsBytes = Buffer.from(name);
  if (nameAsBytes[0] === 0x2d || nameAsBytes[length - 1] === 0x2d) {
    // starts or ends with char '-'
    return false;
  }
  for (var i = 0; i < length; i++) {
    var char = nameAsBytes[i];
    var ok = (char >= 0x61 && char <= 0x7a) || (char >= 0x30 && char <= 0x39) || char === 0x2d; // a-z0-9-
    if (!ok) {
      return false;
    }
  }
  return true;
}

function invalidUsernameMessage(name: string) {
  var length = Buffer.byteLength(name);
  if (length <= MIN_NAME_LENGTH || length > MAX_NAME_LENGTH) {
    return 'Domain name must contain more than 2 letters!';
  }
  var nameAsBytes = Buffer.from(name);
  if (nameAsBytes[0] === 0x2d || nameAsBytes[length - 1] === 0x2d) {
    // starts or ends with char '-'
    return 'Domain Name can not start or end with hyphen (-)';
  }
  for (var i = 0; i < length; i++) {
    var char = nameAsBytes[i];
    var ok = (char >= 0x61 && char <= 0x7a) || (char >= 0x30 && char <= 0x39) || char === 0x2d; // a-z0-9-
    if (!ok) {
      return 'Domain Name can consist English letters, numbers, and hyphen (-)';
    }
  }
  return '';
}

const isValidEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function isValidVenomAddress(address: string | undefined) {
  if (!address) return false;
  if (!address.startsWith('0:') || address.length !== 66) {
    return false;
  }

  const hexChars = '0123456789abcdef';
  for (let i = 2; i < address.length; i++) {
    if (!hexChars.includes(address[i])) {
      return false;
    }
  }

  return true;
}

function isValidSignHash(signature: string, date: number) {
  // const verifier = crypto.createVerify('sha256');
  // // console.log(signature,publicKey,data)
  // verifier.update(data);
  // const isValid = verifier.verify(publicKey, signature, 'base64');
  if (signature.length !== 88) {
    return false;
  }
  //// console.log(Date.now() - date)
  if (Date.now() - date < 172800000) {
    return true;
  } else {
    return false;
  }
}

const getAvatarUrl = async (nft: BaseNftJson) => {
  const ipfsData = nft.attributes?.find((att) => att.trait_type === 'DATA')?.value;
  if (ipfsData === '') {
    return String(nft.preview?.source);
  } else {
    await axios.get('https://ipfs.io/ipfs/' + ipfsData).then((res) => {
      return res.data.avatar
        ? String(res.data.avatar)
        : nft.files
        ? String(nft?.files[0]?.source)
        : nft.preview?.source;
    });
  }
};

function base64ToBlob(b64Data: string, contentType: string, sliceSize?: number) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  // console.log(byteArrays);

  return new File(byteArrays, 'vid', { type: contentType });
}

const getColor = (variant: string, buttonBg: string, lightMode: boolean) => {
  if (variant === 'solid') {
    if (lightMode) {
      if (
        buttonBg === 'light' ||
        buttonBg === 'gray' ||
        buttonBg === 'yellow' ||
        buttonBg === 'cyan'
      ) {
        return 'dark.800';
      } else {
        return 'white';
      }
    } else {
      if (buttonBg === 'light') {
        return 'dark.800';
      } else if (buttonBg === 'dark') {
        return 'white';
      } else if (buttonBg === 'gray') {
        return 'white';
      } else {
        return 'gray.800';
      }
    }
  }

  if (variant === 'outline') {
    if (lightMode) {
      if (buttonBg === 'light') {
        return 'white';
      } else if (buttonBg === 'dark') {
        return 'gray.800';
      } else if (buttonBg === 'gray') {
        return 'gray.600';
      } else {
        return `${buttonBg}.600`;
      }
    } else {
      if (buttonBg === 'light') {
        return 'white';
      } else if (buttonBg === 'dark') {
        return `${buttonBg}.300`;
      } else if (buttonBg === 'gray') {
        return 'gray.600';
      } else {
        return `${buttonBg}.300`;
      }
    }
  }

  if (variant === 'pop') {
    if (lightMode) {
      if (buttonBg === 'light' || buttonBg === 'yellow' || buttonBg === 'cyan') {
        return 'gray.800';
      } else {
        return 'white';
      }
    } else {
      if (buttonBg === 'light') {
        return 'gray.800';
      } else if (buttonBg === 'dark') {
        return 'white';
      } else if (buttonBg === 'gray') {
        return 'gray.800';
      } else {
        return 'gray.800';
      }
    }
  }

  if (variant === 'border' || variant === 'border2') {
    if (lightMode) {
      if (buttonBg === 'dark') {
        return 'white';
      } else {
        return 'black';
      }
    } else {
      if (buttonBg === 'light') {
        return 'gray.800';
      } else if (buttonBg === 'dark') {
        return 'white';
      } else if (buttonBg === 'gray') {
        return 'gray.800';
      } else {
        return 'gray.800';
      }
    }
  }

  if (variant === 'fill') {
    if (lightMode) {
      if (buttonBg === 'light') {
        return 'white';
      } else if (buttonBg === 'dark') {
        return 'gray.800';
      } else if (buttonBg === 'gray') {
        return 'gray.800';
      } else {
        return `${buttonBg}.600`;
      }
    } else {
      if (buttonBg === 'light') {
        return 'white';
      } else if (buttonBg === 'dark') {
        return `${buttonBg}.300`;
      } else if (buttonBg === 'gray') {
        return 'gray.600';
      } else {
        return `${buttonBg}.300`;
      }
    }
  }
};

const getIconColor = (lightMode: boolean) => {
  if (lightMode) {
    return 'var(--chakra-colors-gray-800)';
  } else {
    return 'white';
  }
};

const getIconInButtonColor = (variant: string, buttonBg: string, lightMode: boolean) => {
  let color = getColor(variant, buttonBg, lightMode);
  //// console.log(color);
  if (color === undefined) return undefined;
  let colorString = 'var(--chakra-colors-' + color.replace('.', '-') + ')';
  //// console.log(colorString);
  return colorString;
};

const getUrl = (type: string, url: string): string => {
  switch (type) {
    case 'email':
    case 'phone':
    case 'skype':
      return url.includes(SOCIAL_URLS[type]) ? url : SOCIAL_URLS[type] + url;

    case 'substack':
    case 'slack':
      return url.includes(SOCIAL_URLS[type].slice(0, -1))
        ? withHttps(url)
        : withHttps(url + '.' + SOCIAL_URLS[type]);

    default:
      return url.includes(SOCIAL_URLS[type].slice(0, -1))
        ? withHttps(url)
        : withHttps(SOCIAL_URLS[type] + url);
  }
};

const getRandomNumber = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const openWindow = (url: string, e: any) => {
  window.open(url, 'newwindow', 'width=420,height=800');
  e !== null && e.preventDefault();
};

const arrayRemoveDuplicates = (arr: any) => {
  const unique = arr.filter((obj: any, index: number) => {
    return index === arr.findIndex((o: any) => obj.name === o.name);
  });

  return unique;
};


const sumUint128 = (a:any, b:any)=> {
  const maxSafeInteger = Number.MAX_SAFE_INTEGER;

  // Convert the input numbers to arrays of digits
  const digitsA = Array.from(String(a), Number);
  const digitsB = Array.from(String(b), Number);

  // Pad the shorter number with leading zeros
  const maxLength = Math.max(digitsA.length, digitsB.length);
  while (digitsA.length < maxLength) {
    digitsA.unshift(0);
  }
  while (digitsB.length < maxLength) {
    digitsB.unshift(0);
  }

  let carry = 0;
  const sum = [];

  // Perform the addition digit by digit
  for (let i = maxLength - 1; i >= 0; i--) {
    const digitSum = digitsA[i] + digitsB[i] + carry;
    const digit = digitSum % 10;
    carry = Math.floor(digitSum / 10);
    sum.unshift(digit);
  }

  // Add the remaining carry if any
  if (carry > 0) {
    sum.unshift(carry);
  }

  // Convert the array of digits back to a string
  const result = sum.join('');

  // Check if the result exceeds the safe integer range
  if (result.length > 15 || Number(result) > maxSafeInteger) {
    throw new Error('Sum exceeds the safe integer range');
  }

  return Number(result);
}

const getCurrentDateUnix = () => Math.floor(Date.now() / 1000);

const formatDateDifference = (unix: number): string => {
  const now = new Date();
  const diff = (unix*1000) - now.getTime();

  const units: { label: string; duration: number }[] = [
    { label: 'year', duration: 1000 * 60 * 60 * 24 * 365 },
    { label: 'month', duration: 1000 * 60 * 60 * 24 * 30 },
    { label: 'day', duration: 1000 * 60 * 60 * 24 },
    { label: 'hour', duration: 1000 * 60 * 60 },
    { label: 'minute', duration: 1000 * 60 },
  ];

  for (const unit of units) {
    const value = Math.floor(diff / unit.duration);
    if (value > 0) {
      return value > 1 ? `${value} ${unit.label}s` : `about a ${unit.label}`;
    }
  }

  return 'just now';
};


export {
  formatDateDifference,
  withHttps,
  getCurrentDateUnix,
  base64ToBlob,
  truncAddress,
  sleep,
  isValidEmail,
  capFirstLetter,
  getUrl,
  arrayRemove,
  arrayRemoveDuplicates,
  isValidUsername,
  invalidUsernameMessage,
  getColor,
  getIconColor,
  getIconInButtonColor,
  getAvatarUrl,
  getRandomNumber,
  isValidVenomAddress,
  isValidSignHash,
  openWindow,
  sumUint128
};
