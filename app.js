var express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
//const date  = require(__dirname +"/date.js")



const app = express();

// var items = ["Buy Food","Cook Food","Eat Food"];
// let workItems = []
//mongodb://127.0.0.1:27017/todolistDB
//mongodb+srv://darkrider200011:12345@cluster0.86h7emd.mongodb.net/todolistDB
mongoose.connect("mongodb+srv://darkrider200011:12345@cluster0.86h7emd.mongodb.net/todolistDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const itemSchema = {
    name:String
  }
  const Item = mongoose.model("Item",itemSchema);

 const item1 = new Item({
   name: "Welcome ot your todolist"
 });
 const item2 = new Item({
   name: "Hit the + button to aff a new item"
 });
 const item3 = new Item({
   name: "nice"
 });
 const defaultItem =[item1,item2,item3]

 const listSchema = {
    name : String,
    items: [itemSchema]
 };
 const  List = mongoose.model("List",listSchema);

//   const defaultItem =[item1,item2,item3]
//  Item.insertMany(defaultItem)
//  .then(()=>{
//     console.log("Successfully updated");
// })
// .catch((err)=>{
//     console.log("Error updating:",error)
// })



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("views"))



// app.get("/", function(req,res){
//     Item.find({},function(req,foundItems){
//         console.log(Item);
//        // res.render("list",{listTitle: "Today" ,newListItems: founditems});
//     });

//for to chech find item
app.get('/', async function (req, res) {
    try {
      const foundItems = await Item.find({});
      if(foundItems.length === 0 ){
        Item.insertMany(defaultItem)
        .then(()=>{
            console.log("Successfully updated");
        })
        .catch((err)=>{
            console.log("Error updating:")
        })
        .finally(()=>{
            res.render("/");
        });
        
      }else{
          res.render('list', { listTitle: 'Today', newListItems: foundItems });

      }
      // Assuming you have a 'list' view/template to display the items
     // res.render('list', { listTitle: 'Today', newListItems: foundItems });
    } catch (error) {
      console.error(error);
      res.send('Error retrieving data');
    }
  });

 
  
  app.get("/",function(req,res){
    // Item.find(foundItems)
      if(foundItems.length === 0 ){
        Item.insertMany(defaultItem)
        .then(()=>{
            console.log("Successfully updated");
        })
        .catch((err)=>{
            console.log("Error updating:",error)
        })
        // .finally(()=>{
            res.render("/");
        // });
        
      }else{
          res.render('list', { listTitle: 'Today', newListItems: foundItems });

      }
   

});

//for custom list
app.get("/:customListName",function(req,res){
   const customListName = _.capitalize(req.params.customListName);
    List.findOne({name: customListName})
   .then(foundList=>{
    if(!foundList ){
        const list = new List({
        name : customListName,
        items: defaultItem
     })
     list.save();
     res.redirect("/"+ customListName);
    }else{
       res.render("list",{listTitle: foundList.name,newListItems: foundList.items});
    }
    })
    .catch((err)=>{
        console.log("Error updating:",error)
    })
   
   
    //res.render("list",{listTitle: "work List",newListItems: workItems});
    
    });
    
    //let day = date.getDay();
   // let day = date.getDate();

    // var currentDay = today.getDay();
    // var day = "";

    // switch (currentDay ) {
    //     case 0:
    //         day = "Sunday";
    //         break;
    //     case 1:
    //         day = "Monday";
    //         break;
    //     case 2:
    //         day = "Tuesday";
    //         break;
    //     case 3:
    //         day = "Wednesday";
    //         break;
    //     case 4:
    //         day = "Thrusday";
    //         break;
    //     case 5:
    //         day = "Friday";
    //         break;
    //     case 6:
    //         day = "Saturday";
    //         break;
    
    //     default:
    //         console.log("Error: current day is equla to : "+ currentDay);
    // }

//     if(today.getDay() === 6 || today.getDay === 0)
//     {
//         day="weekend";
//     //   res.write("Yeay it's the weekend");
//     //   res.sendFile(__dirname +"/weekend.html");

//      // res.render("list","{kindOfDay: day}");
//     }
//     else{
//         day ="weekdya";
// //       res.write("oops its a week day"+today.getDay());
// //       res.write("oops its a week day"+today.getDay());
//       // res.write("oops its a week day"+today.getDay());
      
//         // res.sendFile(__dirname+"/weekday.html");
//         // res.send();
//        // res.render("list","{kindOfDay: day}");

//    }

  

//});


//    app.post("/",function(req,res){
//     var item  = req.body.newItem
//      items.push(item);
//     //console.log(item);
//     res.redirect("/")
//    });

//to insert item in list
    // app.post("/",function(req,res){
        
    //     const itemName  = req.body.newItem;
    //     const listName = req.body.list;

    //      const item = Item({
    //         name: itemName
    //     }); 
    //     if(listName === "Today"){
    //       item.save();
    //       res.redirect("/");
    //     }else{
    //         List.findOne({name:listName})
    //         .this(foundList=>{
    //            foundList.items.push(item);
    //            foundList.save();
    //            res.redirect("/" + listName);
    //         })
    //     }
        
    //     // if(req.body.list === "work"){
    //     // workItems.push(item);
    //     // res.redirect("/work") 
    //     // }
    //     // else{
    //     //     items.push(item);
    //     //     res.redirect("/")
    //     // }
    // });


    app.post("/", function(req, res) {
    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
        name: itemName
    });

    if (listName === "Today") {
        item.save()
            .then(() => {
                res.redirect("/");
            })
            .catch(err => {
                console.log("Error saving item:", err);
                // Handle the error and send an appropriate response to the client
                res.status(500).send("Error occurred while saving the item.");
            });
    } else {
        List.findOne({ name: listName })
            .then(foundList => {
                if (!foundList) {
                    console.log("List not found");
                    // Handle the case when the list is not found and send an appropriate response to the client
                    res.status(404).send("List not found.");
                } else {
                    foundList.items.push(item);
                    foundList.save()
                        .then(() => {
                            res.redirect("/" + listName);
                        })
                        .catch(err => {
                            console.log("Error saving item to the list:", err);
                            // Handle the error and send an appropriate response to the client
                            res.status(500).send("Error occurred while saving the item to the list.");
                        });
                }
            })
            .catch(err => {
                console.log("Error finding the list:", err);
                // Handle the error and send an appropriate response to the client
                res.status(500).send("Error occurred while processing the request.");
            });
    }
});



    app.post("/delete",function(req,res){
        const checkedItemId = req.body.checkbox ;
        const  listName = req.body.listName;

         if(listName === "Today")
        {
          Item.findByIdAndRemove(checkedItemId)
            .then(()=>{
            console.log("Successfully deleted");
          })
          .catch((err)=>{
            console.log("Error updating:")
          })
            res.redirect("/");
        }else{
            List.findOneAndUpdate({name: listName},{$pull:{items:{_id:checkedItemId}}})
            .then(() =>{
                res.redirect("/"+listName);
            })
            .catch((err)=>{
              console.log("Error updating:")
            })
        }
    })

   

 app.get("/about",function(req,res){
   res.render("about");
 });

    
 app.listen(3000,function(req,res){
  console.log("Server running on port 3000");
 });

// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 3000;
// }
// app.listen(port);

// app.listen(port,function(){
//     console.log("server has started successfully");
// });