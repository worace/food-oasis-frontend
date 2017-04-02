import geocoder from 'google-geocoder';

const geo = geocoder({
  key: 'AIzaSyBP5KxqO9v1sLhXlkrG3vDiDdOJvYLJ0H4'
});

export default {
  lookup: (query) => {
    return new Promise((resolve, reject) => {
      geo.find(query, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response[0]);
        }
      });
    });
  }
};
