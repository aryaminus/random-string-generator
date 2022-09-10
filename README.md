# <p align="center"> Random String Generator </p>

<p align="center">
    <a href="https://i.imgur.com/dAF7GWa.png" target="_blank"><img src="https://i.imgur.com/dAF7GWa.png" height="550"/></a>
</p>

[![Run on Repl.it](https://repl.it/badge/github/aryaminus/random-string-generator)](https://repl.it/github/aryaminus/random-string-generator)

> Alpha release

## Description

Write a string generator that takes a regular expression as argument and returns strings that match the given regular expression.

## Getting Started

### Dependencies

* [Node.js](http://nodejs.org/)

### Installing

```sh
git clone https://github.com/aryaminus/random-string-generator
cd random-string-generator
yarn
```

### Executing program

```sh
yarn start
```

## TODO

- [x] `.` Match any character except newline
- [x] `[` Start character class definition
- [x] `]` End character class definition
- [x] `?` 0 or 1 quantifier
- [x] `*` 0 or more quantifiers
- [x] `+` 1 or more quantifier
- [x] `{` Start min/max quantifier
- [x] `}` End min/max quantifier
- [x] `^` Negate the class, but only if the first character  
- [x] `-` Indicates character range
- [ ] `|` Start of alternative branch
- [ ] `(` Start subpattern
- [ ] `)` End subpattern 
- [ ] `\1` back reference

## Authors

Contributors names and contact info

ex. [@aryaminus](https://github.com/aryaminus)

## Version History

* 0.0.1
  * Initial Release

## License

This project is licensed under the MIT License - see the LICENSE file for details
