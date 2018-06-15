const fetchJson = () =>
  fetch('/api')
    .then(result => result.json())
    .catch(err => console.error(err));

module.exports = {
  fetchJson
};
