# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

- Date format: 1475-03-06
- Options: Added / Changed / Deprecated / Removed / Fixed / Security


## [0.5.3] - 2022-06-17
### Fixed
- Github init script was not working when the project did not exist
### Changed
- Some minor improvements and refactoring

## [0.5.0] - 2021-06-17
### Fixed
- Vuepress was not working, upgrading to version 2 fixed it
- Using the current directory was not working for some cases, like `some-project1` because it was converted to `some-project-1` hence not matching the current directory
- README-GITHUB commands were not working properly
### Added
- Created .npmrc file

## [0.4.2] - 2021-06-17
### Added
- Added support for Google Cloud Functions
### Changed
- Modified Readme, including the updated file structure
- Added more publishing scripts

## [0.2.0] - 2021-06-08
### Changed
- Started using standard (https://standardjs.com/) for eslint formatting

## [0.1.10] - 2021-06-08
### Fixed
- Exec was not working ok when using the default directory (bug was introduced in v0.1.9)

## [0.1.9] - 2021-05-10
### Fixed
- Exec was not receiving the second parameter

## [0.1.8] - 2020-09-22
### Fixed
- Promisified version of exec was not working as expected, use my own custom promisified version solved the issue
- Project name was not being set up correctly when using the default name (current directory)

## [0.1.2] - 2020-06-24
### Changed
- Improving README.md
- Added resulting directory structure

## [0.1.0] - 2020-06-24
### Added
- First working version
