# Merge MD API

Project to test Merge MD API 

## Getting Started

To  start the project it is mandatory to have Node JS V6 installed


### Installing

First, clone this repository locally with:


```
git clone https://github.com/ajarac/merge-md-api.git
```

Then, install node modules with:

```
cd merge-md-api
npm install
```


## Running the tests

To running the API RestFUll just into:

```
npm start
```

To test that it is working, make a request http:

```
http://localhost:8080/
```

It returns a html simple with a message that it is working fine.


### Create File

To create a File make a POST request to:

```
http://localhost:8080/api/merge
```
 with a body

```
{
	"name":"nameFile",
	"content":"Content file\nSepare the sentence with literal '\ n '"
}
```

### Merge Files

To merge files just make a GET request to:

```
localhost:8080/api/merge?fichero1='nameFile'&extend='nameExtend'
```

Changing the names files to real files to merge.


