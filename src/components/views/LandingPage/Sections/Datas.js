
const countries = [ 
    {
    "_id":1,
    "name":"Korean"
},
{
    "_id":2,
    "name":"Western"
},
{
    "_id":3,
    "name":"Chinese"
},
{   "_id":4,
    "name":"Japanese"
},
{   "_id":5,
    "name":"Others"
}
// {    "_id":5,
//     "name":"Mesh Lining"
// },
// {    "_id":6,
//     "name":"Knit"
// },
//  {   "_id":7,
//     "name":"Zipper"
// }
]

const price = [
    {
        "_id":0,
        "name":"Any",
        "array":[]
    },
    {
        "_id":1,
        "name":"$0 to $9.99",
        "array":[0,9.99]
    },
    {
        "_id":2,
        "name":"$10 ~ $49.99",
        "array":[10,49.99]
    },
    {
        "_id":3,
        "name":"$50 ~ $99.99",
        "array":[50,99.99]
    },
    {
        "_id":4,
        "name":"$100 ~ $199.99",
        "array":[150,199]
    },
    {
        "_id":5,
        "name":"$More than $200",
        "array":[200, 1500000]
    }
]

export {
    countries,
    price
}