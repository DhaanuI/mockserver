const express = require("express")
const { DogModel } = require("../model/post.model")
require('dotenv').config()

const dogRoute = express.Router();

dogRoute.get("/dogs/", async (req, res) => {
    //console.log(req.headers.token)
    token = req.headers.token
    if (token) {
        const query = req.query
        try {
            const post = await DogModel.find()
            // console.log(post)
            res.send(post)
        } catch (error) {
            console.log(error);
            res.send({ "err": "Something went wrong" })
        }
    }
    else res.send({ "message": "Not Authorised" })

})

dogRoute.post("/dogs/", async (req, res) => {
    const body = req.body
    try {
        const post = new DogModel(body)
        await post.save()


        // await DogModel.insertMany(body);
        res.send("Post has been inserted")
    } catch (error) {
        console.log(error);
        res.send({ "err": "Something went wrong" })
    }
})

dogRoute.patch("/update/:id", async (req, res) => {

    token = req.headers.token
    if (token) {
        let id = req.params.id;

        const body = req.body;
        console.log(id, body)
        // id=String(id);
        //const post = await DogModel.findOne({"_id":id})
        // const userID_in_post = post.userID;
        // const userID_in_req = req.body.userID
        try {
            const post = await DogModel.findOneAndUpdate({ _id: id }, body)
            console.log(post)
            res.send("Post has been updated")
            // if (userID_in_req !== userID_in_post) {
            //     res.send({"Msg":"Your not Authorized"})
            // } else {
            //     await DogModel.findByIdAndUpdate({_id:id},body)
            //     res.send("Post has been updated")
            // }
        } catch (error) {
            console.log(error);
            res.send({ "err": "Something went wrong" })
        }
    }
    else res.send({ "message": "Not Authorised" })
})

dogRoute.delete("/delete/:id", async (req, res) => {
    token = req.headers.token
    if (token) {
        const id = req.params.id;
        // const post = await DogModel.findOne({"_id":id})
        // const userID_in_post = post.userID;
        // const userID_in_req = req.body.userID
        try {
            const post = await DogModel.findOneAndDelete({ _id: id })
            res.send("Post has been Deleted")
            // if (userID_in_req !== userID_in_post) {
            //     res.send({"Msg":"Your not Authorized"})
            // } else {
            //     await DogModel.findByIdAndDelete({_id:id})
            //     res.send("Post has been Deleted")
            // }
        } catch (error) {
            console.log(error);
            res.send({ "err": "Something went wrong" })
        }
    }
    else res.send({ "message": "Not Authorised" })
})

module.exports = { dogRoute }




// const express = require("express")
// const fs = require("fs")
// const dogRoute = express.Router();
// //const {validator}=require("./middlewares/validator.middleware.js")

// dogRoute.get("/dogs", (req, res) => {
//     const read = fs.readFileSync("./db.json");
//     const parsedData = JSON.parse(read);
//     res.send(parsedData.dogs)
// })

// // studentRoute.get("/students/:rollNo", (req, res) => {
// //     const read = fs.readFileSync("./db.json");

// //     const parsedData = JSON.parse(read);
// //     let data = req.params.rollNo;
// //     data = data.split("").map(Number)
// //     data = data.slice(1)
// //     data = data.join("")
// //     console.log(data)
// //     console.log(req.params.rollNo.slice(1))
// //     let flag = true;
// //     parsedData.students.forEach((item, index) => {

// //         if (item.id == data) {
// //             res.send(item)
// //             flag = false;
// //         }
// //     });
// //     if (flag) {
// //         res.send("Bad request")
// //     }

// // })


// dogRoute.post("/dogs/add", (req, res) => {
//     const read = fs.readFileSync("./db.json");
//     const parsedData = JSON.parse(read);
//     // console.log(parsedData.dogs.length)
//     req.body.id = parsedData.dogs.length + 1
//     parsedData.dogs.push(req.body);
//     fs.writeFileSync("./db.json", JSON.stringify(parsedData));
//     res.send("Dog information added")
// })

// //studentRoute.use(validator)

// dogRoute.patch("/dogs/:id", (req, res) => {
//     const read = fs.readFileSync("./db.json");
//     const parsedData = JSON.parse(read);
//     let data = req.params.id;
//     console.log(data)
//     // data = data.split("").map(Number)
//     // data = data.slice(1)
//     // data = data.join("")
//     parsedData.dogs.forEach((item, index) => {
//         //  console.log(req.body)
//         //console.log(data)
//         if (item.id == data) {
//             if (item.name !== req.body.name && req.body.name !== undefined) {
//                 console.log(item.name, req.body.name)
//                 item.name = req.body.name
//             }
//             if (item.age !== req.body.age && req.body.age !== undefined) {
//                 console.log(item.age, req.body.age)
//                 item.age = req.body.age
//             }
//             if (item.place !== req.body.place && req.body.place !== undefined) {
//                 console.log(item.place, req.body.place)
//                 item.place = req.body.place
//             }
//             if (item.gender !== req.body.gender && req.body.gender !== undefined) {
//                 console.log(item.gender, req.body.gender)
//                 item.gender = req.body.gender
//             }


//         }
//     });

//     fs.writeFileSync("./db.json", JSON.stringify(parsedData));
//     res.send("Dog information modified")
// })

// dogRoute.delete("/dogs/:id", (req, res) => {
//     const read = fs.readFileSync("./db.json");
//     const parsedData = JSON.parse(read);
//     let data = req.params.id;
//     // data = data.split("").map(Number)
//     // data = data.slice(1)
//     // data = data.join("")
//     parsedData.dogs.forEach((item, index) => {
//         console.log(req.body)
//         if (item.id == data) {
//             parsedData.dogs.splice(index, 1)
//         }
//     });
//     fs.writeFileSync("./db.json", JSON.stringify(parsedData));
//     res.send("Dog information deleted")
// })


// module.exports = {
//     dogRoute
// }