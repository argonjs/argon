# Contributing to Argon

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

#### Table of Contents

[How can I help?](#how-can-i-help)
 * [Submitting an Issue](#submitting-an-issue)
 * [Opening a Pull Request](#opening-a-pull-request)

[:sparkles:Style:sparkles:](#style-guidelines)
 * [Branching Scheme](#our-branching-model)
 * [Typescript](#typescript-style)

[Tests](#testing)

## How can I help?

You can help in so many ways!
Whether it's asking questions on our slack or on StackOverflow or even contributing code, we love any help we can get!

### Submitting an Issue

If you think you've found a bug, first search the issues. If an issue already exists, please add a comment expressing your interest and any additional information.  This helps us prioritize issues.

If a related issue does not exist, submit a new one.  Please be concise and include as much of the following information as is relevant:
* Minimum amount of sample code or steps to demonstrate or reproduce the issue
* Screenshot or video capture if appropriate.
* Your device operating system and version, the Argon Browser version, and the argon.js version.  Are they all up-to-date?  Is the issue specific to one of them?
* Did this work in a previous version?
* Ideas for how to fix or workaround the issue.  Also mention if you are willing to help fix it.  If so, we can often provide guidance and the issue may get fixed more quickly with your help.

### Opening a Pull Request

In general, you should make your pull request against the `develop` branch.
You can use the following prefixes in your branch name to make the purpose clear:
 * `fix/`
 * `feat/`

 Pull request tips
   * If your pull request fixes an existing issue, include a link to the issue in the description (like this: [#1]).
   * If your pull request needs additional work, include a [task list](https://github.com/blog/1375%0A-task-lists-in-gfm-issues-pulls-comments).
   * Once you are done making new commits to address feedback, add a comment to the pull request such as `"this is ready"` since GitHub doesn't notify us about commits.


## Style Guidelines

The general style guidelines are as follows:

 * We use 4 spaces to indent **all** source files
 * No trailing spaces
 
The typescript style is described in our `.tslint.json` file.
Our tests will automatically check for style and print out helpful messages.


### Our Branching Model

We follow a pretty simple branching model. 

Our primary working branh is the `develop` branch. Once in a while, the `develop` branch is
tagged with a new release version and merged into the master branch. 

## Testing

In general, all our tests should run by executing `npm test`.
