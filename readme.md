# Report Module

This package is a micro frontend module that provides reporting functionalities to sync data between an online and an offline application. It uses Next.js, TypeScript, and React Table.

## Installation

To install this package, run the following command:
```bash
npm install report-module
```
## Usage

After installing, you need to import the module and the associated styles in your application. Here is a simple example:

```javascript
import ReportModule from 'report-module';
import 'report-module/dist/main.css';
```
Then you can use it in your code like any React component:

```javascript
function MyApp() {
  return (
    <div>
      <ReportModule />
    </div>
  );
}
```

Note: If you're using TypeScript, the type definitions are included in the package.

# Development

If you'd like to contribute to this project, here are the steps to get it up and running on your local machine:

Clone the repository:

```bash
git clone https://github.com/akiijadhav/report-module-v2.git
```
Navigate into the project directory and install the dependencies:

```bash
cd report-module-v2
```

```bash
npm install
```
Start the development server:
```bash
npm run dev
```

Make sure you follow the contribution guidelines when making a pull request.

# Scripts
```bash
npm run dev: Starts the development server.
npm run build: Builds the project for production.
npm run start: Runs the built project in production mode.
npm run lint: Lints the code.
npm run format: Formats the code using Prettier.
npm run prepare: Builds the project and prepares it for publishing.
```
# Author
This project is maintained by Akhilesh. You can contact him through his GitHub profile.

# License
This project is licensed under the MIT License.
