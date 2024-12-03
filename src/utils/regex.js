function validMiniUrl(url) {
  // standard alphanumeric check
  // also can do another check to see if it matches in database
  // could also have baked in redirect & check strategy here
  // but seems better structure to forward it to the controller
  const minifyPattern = /^[a-zA-Z0-9]{6}$/;
  return minifyPattern.test(url);
}

function validOriginalUrl(url) {
  const originalUrlPattern =
    /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  return originalUrlPattern.test(url);
}

module.exports = {
  validMiniUrl,
  validOriginalUrl,
};
