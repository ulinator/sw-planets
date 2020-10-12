export const fetchData = (url) => {
  return fetch(url)
    .then(result => result.json())
    .then(data => {
        return data;
    });
};

const API = 'https://swapi.dev/api/'

export const fetchFilms = async () => {
  const data = await fetchData(API + 'films/')
  return data;
};

export const searchPlanets = async (query) => {
  const planets = await fetchData(API + `planets/?search=${query}`)
  return planets;
};

export const compareValues = (key, order = 'asc') => {
  return (a, b) => {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    };

    const varA = isNaN(a[key]) ? a[key] : parseInt(a[key]);
    const varB = isNaN(b[key]) ? b[key] : parseInt(b[key]);

    let comparison = 0;

    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }

    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
};

export const validateTitle = (title) => {
  const validatedCapitalLetter = /[A-Z]/.test(title[0]) ? true : false;
  const validatedLength = title.length > 2 ? true : false;

  return validatedCapitalLetter && validatedLength;
};

export const validatePlanets = (planets) => {
  return planets.length > 0;
};