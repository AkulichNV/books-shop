let BooksData = [];
fetch('./books.json') //path to the file with json data
        .then(response => {
            return response.json();
        })
        .then(data => {
            // console.log(data);
            BooksData = data.map(a => {return {...a}});
            console.log(BooksData);
        });

console.log(BooksData); // output 'testing'

