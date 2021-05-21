# Contact Map

[![Build Status](https://www.travis-ci.com/mvaradi/component-contact-map.svg?branch=main)](https://www.travis-ci.com/mvaradi/component-contact-map)
[![codecov](https://codecov.io/gh/mvaradi/component-contact-map/branch/main/graph/badge.svg?token=SOBVbtwy8N)](https://codecov.io/gh/mvaradi/component-contact-map)
[![Maintainability](https://api.codeclimate.com/v1/badges/17dd88adf1a08717235a/maintainability)](https://codeclimate.com/github/mvaradi/component-contact-map/maintainability)

This is the code base of an Angular.js & D3.js web component to display an interactive contact map, i.e. a matrix where each cell is a distance value between 2 amino acid residues or nucleic acids.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.8.

### TODOS

* Fix the zoom-out functionality
* Fix the CodeCov configuration
* Improve coverage

## Example

<img src="https://raw.githubusercontent.com/mvaradi/component-contact-map/main/contact-map-example.png">

## Quick Start

Retrieve the code from this repository
```angular2html
git clone https://github.com/mvaradi/component-contact-map.git
```

Install dependencies
```angular2html
cd component-contact-map
npm install
```

Run the application locally
```angular2html
ng serve
```

### Data requirements

The contact map is power by a single CSV file that contains information on the residue pairs and their distances.

For example:
```angular2html
residueA,residueB,distance
1,1,2.16
1,2,5.51
1,3,7.59
1,4,9.91
1,5,12.95
```

The current implementation expects the data on the following path:
```angular2html
'../assets/contact-maps/' + this.accession + '_distogram.csv'
```

Where `this.accession` is an identifier variable defined in `src/app/app.component.ts`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Versioning
 
We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/mvaradi/component-contact-map/tags).
 
## Authors
 
* **Mihaly Varadi** - *Initial Implementation* - [mvaradi](https://github.com/mvaradi)
 
See also the list of [contributors](https://github.com/mvaradi/component-contact-map/contributors) who participated in this project.
 
## License
 
This project is licensed under the EMBL-EBI License - see the [LICENSE](LICENSE) file for details
