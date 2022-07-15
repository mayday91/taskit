//////////////Import Dependencies////////
const mongoose = require('./connection')
const List = require('./list')
const fetch = require('node-fetch')
const Task = require('../models/task.js')
const db = mongoose.connection
const apiKey = process.env.apiKey
const apiSecret = process.env.apiSecret
//////////////Seed Code/////////////////

db.on('open', () => {
    const APIrequestUrl = "https://evernotestefan-skliarovv1.p.rapidapi.com/getNote"
    fetch(APIrequestUrl)
        .then(res => res.json())
        .then(data => {
            const APIdata = data.items
            // console.log('data here-->', data)
            console.log(APIdata)
            //when we seed data, we usually clear the db first
            Task.deleteMany({})
            //then we create the data
                .then(deletedEvents => {
                    console.log('this is what remove returns', deletedEvents)
                    Task.create(APIdata)
                        .then(data => {
                            console.log('New data', data)
                            db.close()
                        })
                        .catch(error => {
                            console.log('error', error)
                            db.close()
                        })
                })
                .catch(error => {
                    console.log('error', error)
                    db.close()
                })
                 // whether it's succesful or not we want to close our db connection
            })
        .catch(err => console.log(err.json())) 
    })

