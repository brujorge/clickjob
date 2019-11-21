# Clickjob client 
## Dependencies 
- Node >= 10.0 
- npm >= 6.0 


## Development Setup

### `yarn install`
Install the required dependencies

## Available Scripts

In the project directory, you can run:

### `yarn start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`
Build for production

## Implementation notes
- Used Reach Router for routing the different views.
- Utilized axios for sending requests to the API.
- Used CSS modules for styling the components.
- Avoided using Redux and prevented props drilling by utilizing Contexts whenever possible.
- Added a `jsconfig.json` file to make the imports absolute instead of relative.

## Pending

- [ ] Implement mobile version.
- [ ] Refactor SignUp/Login forms and other reusable components in general. 



