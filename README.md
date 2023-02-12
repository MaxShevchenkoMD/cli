# CLI
A tool to parse csv and rotate matrix inside each row

## Usage
For *development* usage you need to
1. Install all dependencies `npm install`
2. Run `npm start` to start tsc in watch mode
3. After changes test your program using root `.js` file `node cli.js test.csv`
4. In case you want to see the results in file add piping to previous command `node cli.js test.csv > out.csv`

Setup eslint in your IDE. Our recommendation is to run eslint on save.
If you want to use linter from cli you can simply use `npm run lint` command

For *production* usage you need to
1. Install all dependencies `npm i`
2. Run command `node cli.js ./example-files/test.csv > ./out.csv`
Given a CSV file representing a series of tables, implement a rotation engine that parses, verifies and rotates each table, and finally outputs a CSV file with all valid and rotated tables

