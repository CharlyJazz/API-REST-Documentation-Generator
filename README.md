# React application to create a ui from your JSON API REST schema

- The point of this project is provide to the devs a structure and logical flow to create a REST API documentation without swagger or other tool. Why? I dont know. :start:. But you can use it instead install gems or packages to your backend project, Why? I dont know :start2:

## Stack

- TypeScript
- Storybook
- Sass
- create-react-app

## Steps

- You can put your json in `src/data/` and import it in generateData.ts.

- If your json dont have this structure you can edit the `generateData()` function in `generateData.ts` and make sure the output satisfy the typescript interface `Endpoint`. This is a implementation of a strategy pattern to allow you use this project with any json structure of your api schema, not only a OpenAPI structure.

```JSON
{
  [
    "title": "Food",
    "description": "Check food of a restaurant",
    "endpoint": "restaurant/:id_restaurant/food",
    "fields": [
      {
          "field": "id_restaurant",
          "rules": {
              "description": "Id of restaurant",
              "location": "path",
              "required": true
          }
      }
    ],
    "methods": [
      {
        "description": "Return all dishes from a restaurant",
        "method": "GET",
        "title": "Get Dishes",
        "url": "restaurant/:id_restaurant/food",
        "response": {
          "body": {
            "status" 200,
            "payload": [
              {
                "id": 2,
                "name": "X"
              },
              {
                "id": 3,
                "name": "X"
              }
            ]
          }
        }
      }
    ]
  },
```

- In `src/config.ts` you can use Firebase for implement a Login form, you need create a .env file and set your application key REACT_APP_FIREBASE=KEY. You can turn off the login with the `withLogin` flag in `src/config.ts`.

## Features

- You can customize all the styles of this project, this project dont have any framework or ui library, just scss files


## Code Structure

- `src/compositions` is the implementation of the `src/ui` components to build the documentation screen
- `src/compositions/DocumentationApp/index.tsx` is the core of the documentation screen
- `src/providers` are providers and contexts to share state with `src/compositions` components like `src/compositions/DocumentationApp/Navigation`

## Project Status

- This project is not finished. We going add tiny features like a search input.
