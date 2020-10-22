# Generator of API REST Documentation
[![Build Status](https://travis-ci.org/CharlyJazz/API-REST-Documentation-Generator.svg?branch=master)](https://travis-ci.org/CharlyJazz/API-REST-Documentation-Generator)
[![All Contributors](https://img.shields.io/github/all-contributors/CharlyJazz/API-REST-Documentation-Generator)](#contributors-)

- The point of this project is provide to the devs a structure and logical flow to create a REST API documentation without swagger or other tool. Why? I dont know. :star:. But you can use it instead install gems or packages to your backend project, Why? I dont know :star2:

## Stack

- TypeScript
- Storybook
- Sass
- create-react-app

## Steps

- You can put your json in `public/data/` and edit the value of `endpoint_url` in `config.ts`.

- If your json dont have this structure you can edit the `generateData()` function in `generateData.ts` and make sure the output satisfy the typescript interface `Endpoint`. This is a implementation of a strategy pattern to allow you use this project with any json structure of your api schema, not only a OpenAPI structure.

```JSON
[
  {
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
            "status": "200",
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
  }
],
```

- In `src/config.ts` you can use Firebase for implement a Login form, you need create a .env file and set your application key REACT_APP_FIREBASE=KEY. You can turn off the login with the `with_login` flag in `src/config.ts`.

## Features

- You can customize all the styles of this project, this project dont have any framework or ui library, just scss files

## Code Structure

- `src/compositions` is the implementation of the `src/ui` components to build the documentation screen
- `src/compositions/DocumentationApp/index.tsx` is the core of the documentation screen
- `src/providers` are providers and contexts to share state with `src/compositions` components like `src/compositions/DocumentationApp/Navigation`

## Project Status

- This project is not finished. We going add tiny features like a search input.

## Example:

![Desktop](https://user-images.githubusercontent.com/12489333/71376044-0315a780-259f-11ea-95d1-c3d51368f777.png)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://charlyjazz.com"><img src="https://avatars0.githubusercontent.com/u/12489333?v=4" width="100px;" alt=""/><br /><sub><b>Carlos Azuaje</b></sub></a><br /><a href="https://github.com/CharlyJazz/API-REST-Documentation-Generator/issues?q=author%3ACharlyJazz" title="Bug reports">🐛</a> <a href="https://github.com/CharlyJazz/API-REST-Documentation-Generator/commits?author=CharlyJazz" title="Documentation">📖</a> <a href="#ideas-CharlyJazz" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/CharlyJazz/API-REST-Documentation-Generator/commits?author=CharlyJazz" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/aradkdj"><img src="https://avatars0.githubusercontent.com/u/47002300?v=4" width="100px;" alt=""/><br /><sub><b>aradkdj</b></sub></a><br /><a href="https://github.com/CharlyJazz/API-REST-Documentation-Generator/commits?author=aradkdj" title="Code">💻</a> <a href="https://github.com/CharlyJazz/API-REST-Documentation-Generator/commits?author=aradkdj" title="Documentation">📖</a> <a href="https://github.com/CharlyJazz/API-REST-Documentation-Generator/pulls?q=is%3Apr+reviewed-by%3Aaradkdj" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://rich-97.github.io"><img src="https://avatars3.githubusercontent.com/u/19614614?v=4" width="100px;" alt=""/><br /><sub><b>Ricardo Moreno</b></sub></a><br /><a href="https://github.com/CharlyJazz/API-REST-Documentation-Generator/commits?author=rich-97" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
