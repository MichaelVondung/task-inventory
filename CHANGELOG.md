# Changelog

Notable changes to this learning project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]
### Changed
- New file structure: Task related views are in their own folder now.
- Streamlined the tasks controller and switched to better function names.

## [0.0.3] - 2020-06-08
### Added
- Included a proper CHANGELOG.md file.
- Made tasks clickable and added an "edit" link in /view/tasks.ejs.
- Task details can be displayed in a separate view now.
- Confirmation request when deleting all records from the database.
- method-override package is now a dependency.
- It is now possible to edit and update tasks.
- It is now possible to delete individual tasks.

### Changed
- Using a router object for routes/etc. now.
- Navigation links are not partials.

### Fixed
- CSS is now correctly used with views in sub-folders.

## [0.0.2] - 2020-06-03
### Added
- CSS with simple styles.
- Functionality for clearing/resetting the database.

### Changed
- Rewrote the database controller.
- Updated the database model to include automated timestamps.
- "importance" property changed to "priority".

## [0.0.1] - 2020-05-28
### Added
- First version of this project with basic web server and database functionality.