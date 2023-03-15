import { render, screen } from '@testing-library/react';
import App from './App';
import axios from "axios";

jest.mock('axios');
it('fetches successfully data from an API', async () => {
  const data = [
    {
      "bred_for": "Sled pulling",
      "breed_group": "Working",
      "height": {
        "imperial": "20 - 23.5",
        "metric": "51 - 60"
      },
      "id": 226,
      "life_span": "12 years",
      "name": "Siberian Husky",
      "reference_image_id": "S17ZilqNm",
      "temperament": "Outgoing, Friendly, Alert, Gentle, Intelligent",
      "weight": {
        "imperial": "35 - 60",
        "metric": "16 - 27"
      }
    }
  ];

  axios.get.mockImplementationOnce(() => Promise.resolve(data));

  await expect(App.searchDog('Siberian')).resolves.toEqual(data);
});
