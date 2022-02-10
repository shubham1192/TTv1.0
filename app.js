const express = require("express");
const bodyParse = require("body-parser");
const mongoose= require('mongoose');
const read = require("body-parser/lib/read");
// mongoose.connect('mongodb+srv://admin-shubham:test123@cluster0.a5w6k.mongodb.net/todo', {useNewUrlParser: true});
mongoose.connect('mongodb://localhost:27017/TT', {useNewUrlParser: true});
// const date = require(__dirname+"/date.js");
const _ = require("lodash");
const { name } = require("ejs");
const app = express();

app.use(bodyParse.urlencoded({extended:true}));
app.use(express.static("public"));

app.set("view engine", "ejs"); //using ejs & creating a new dir (views/list.ejs)

// var items =["Buy food", "Cook food", "Eat food"];
// let workItems = [];

//SCHEMA
const itemsSchema={
    name: String
};
//MODEL
const Item= mongoose.model("Item",itemsSchema);
//NEW ITEMS
const item1=new Item({
    name:"Welcome"
});
const item2=new Item({
    name:"+ to add an item"
});
const item3=new Item({
    name:"- to delete an item"
});

// adding all the items into an array
const defaultItems=[item1,item2,item3];
let i=0;
const days=["Tuesday","Wednesday","Thursday","Friday"];
var count=0;
var abc=[];
//new schema for custom lists
const listSchema= {
    name: String,
    items:[itemsSchema]
}
const List = mongoose.model("List",listSchema);


app.get("/", function(req, res){
    // let day = date.getDay();
    // let day = date.getDate();
    // console.log(day);
    i=0;
    List.findOne({name: "Monday"},function(err,foundList){
        if(!err){
            if(!foundList)
            {
                const list=new List({
                    name: "Monday",
                    items: defaultItems
                });

                list.save();
                res.redirect("/");
            }
            else{
                res.render("list", {title: foundList.name, newListItems: foundList.items });
            }
            // console.log(i);
        }
    });
});
app.get("/"+"Tuesday", function(req, res){
    List.findOne({name: "Tuesday"},function(err,foundList){
        if(!err){
            if(!foundList)
            {
                const list=new List({
                    name: "Tuesday",
                    items: defaultItems
                });
                list.save();
                res.redirect("/"+"Tuesday");
            }
            else{
                res.render("list", {title: foundList.name, newListItems: foundList.items })
            }
            // console.log(i);
        }
    });
});
app.get("/"+"Wednesday", function(req, res){
    List.findOne({name: "Wednesday"},function(err,foundList){
        if(!err){
            if(!foundList)
            {
                const list=new List({
                    name: "Wednesday",
                    items: defaultItems
                });
                list.save();
                res.redirect("/"+"Wednesday");
            }
            else{
                res.render("list", {title: foundList.name, newListItems: foundList.items })
            }
            // console.log(i);
        }
    });
});
app.get("/"+"Thursday", function(req, res){
    List.findOne({name: "Thursday"},function(err,foundList){
        if(!err){
            if(!foundList)
            {
                const list=new List({
                    name: "Thursday",
                    items: defaultItems
                });
                list.save();
                res.redirect("/"+"Thursday");
            }
            else{
                res.render("list", {title: foundList.name, newListItems: foundList.items })
            }
            // console.log(i);
        }
    });
});
app.get("/"+"Friday", function(req, res){
    List.findOne({name: "Friday"},function(err,foundList){
        if(!err){
            if(!foundList)
            {
                const list=new List({
                    name: "Friday",
                    items: defaultItems
                });
                list.save();
                res.redirect("/"+"Friday");
            }
            else{
                res.render("list", {title: foundList.name, newListItems: foundList.items })
            }
            // console.log(i);
        }
    });
});
    // Item.find({},function(err,found){
       
    //     if(found.length === 0){
    //         Item.insertMany(defaultItems,function(err){
    //             if(err)
    //             {
    //                 console.log(err);
    //             }
    //             else{
    //                 console.log("INSERTED");
    //             }
    //         });
    //         res.render("list", {title: "Monday", newListItems: found})
    //     }
    //     else
    //     {
    //         res.render("list", {title: "Monday", newListItems: found})
    //     } 
    // });
    // res.render("list", {title: Today, newListItems: items});
// });

// app.get("/work", function(req, res){
//     res.render("list", {title: "Work List", newListItems: workItems})
// });

// app.get("/:customList",function(req,res){
//     const customListName = _.capitalize(req.params.customList);  //after the slash
//     List.findOne({name: customListName},function(err,foundList){
//         if(!err){
//             if(!foundList)
//             {
//                 const list=new List({
//                     name: customListName,
//                     items: defaultItems
//                 });
//                 list.save();
//                 res.redirect("/" + customListName); 
//             }
//             else{
//                 res.render("list", {title: foundList.name, newListItems: foundList.items })
//             }
//         }
//     });

// });

// app.post("/work", function(req,res)
// {
//     let item = req.body.listItem
//     workItems.push(item);
    
//     res.redirect("/work")
// })

app.post("/", function(req,res){
    const itemName = req.body.listItem
    const listName = req.body.list
    const item=new Item({
        name:itemName
    }); 
   
    // if(listName==="Monday"){
    // item.save();
    // res.redirect("/");}
    // else{
        List.findOne({name:listName},function(err,foundList){
            foundList.items.push(item);
            foundList.save();
            if(listName=="Monday")
            res.redirect("/");
            else if(i===1)
            {
                res.redirect("/"+"Tuesday");
            }
            else if(i===2)
            {
                res.redirect("/"+days[i-1]);
            }
            else if(i===3)
            {
                res.redirect("/"+days[i-1]);
            }
            else if(i===4)
            {
                res.redirect("/"+days[i-1]);
            }
           
        });

    // if (req.body.list === "Work") {
    //     workItems.push(item);
    //     res.redirect("/work");
    // }
    // else{
    //     items.push(item)
    //     console.log(items);
    //     res.redirect("/");}
});

// app.post("/:tue", function(req,res){
//     res.redirect("/Tuesday");
// });

// app.post("/:wed", function(req,res){
//     res.redirect("/Wednesday");
// });
app.post("/days",function(req,res){
    
    res.redirect("/"+days[i]);
    i++;
    
})
// app.post("/delete",function(req,res){
//     console.log(req.body);
//     const checkedItem=req.body.checkbox;
//     const listName = req.body.listName;
//     if (listName==="Today") {
//         Item.findByIdAndRemove(checkedItem,function(err){
//             if(err){
//                 console.log(err);
//             }
//             else
//             {
//                 console.log("deleted checked item");
//                 res.redirect("/");
//             }
//         });
//     }
//     else{
//         List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItem}}},function(err,founndList){
//             if(!err){
//                 res.redirect("/"+listName);
//             }
//         });
//     }   
// });
// Here we start for the second page



// app.get("/"+"nextpage",(req,res)=>{

//     weekdays.forEach((result)=>{

//          List.findOne({name:result},function(err,found){

//             if(!err)
//             {
//                 if(found)
//                 {
//                     const abc=[];
                    
//                     for(let i=3;i<found.items.length;i++)
//                     {
//                         abc.push(found.items[i]);
//                     }
//                     res.render('secondpage',{title:found.name, data:abc})
//                     res.red
//                     // res.json(ans)
//                 }
//             }

//         });


//     })

// app.get("/nxt",function(req,res){

// count=0;    
// for(var j=0;j<weekdays.length;j++)
// { 
//     List.findOne({name:weekdays[count]},function(err,found){

//     if(!err)
//     {
//         if(found)
//         {
            
//                 abc.push(found.items);
            
//             // res.render('secondpage',{title:found.name, data:abc})
//         }
//     }           
//     // console.log(abc.length);    
//     });
//     count++;
// }
// console.log( abc.length);
// res.render("secondpage",{title:weekdays, data:abc})

// })
  
// })
// let a=[],b=[],c=[]
var arr=new Array();
let weekdays= ["Monday","Tuesday","Wednesday","Thursday","Friday"]
app.get("/nxt",async function(req,res){

    
    //     List.findOne({name:"Monday"},function(err,found){
    //         if(!err)
    //         {
    //             if(found)
    //             {
    //                 for(let i=3;i<found.items.length;i++)
    //                 {
    //                         a.push(found.items[i].name);
                            
    //                 }

    //             }
    //         }
    //     });
    // List.findOne({name:"Tuesday"},function(err,found){
    //     if(!err)
    //     {
    //         if(found)
    //         {
    //                 for(let i=3;i<found.items.length;i++)
    //                 {
    //                     b.push(found.items[i].name);
    //                 }
    //         }
    //         res.render('secondpage',{name:"Tuesday",data:b})
    //         b=[]
    //     }
    // });
  
    let x = await List.find({})

    // res.json(x)
    // let b=JSON.stringify(x);
    // console.log(x[0].items[0].name)
    for(let i=0;i<x.length;i++)
    {
        arr[i] = new Array(x[i].items.length-2);
        for(let j=0;j<x[i].items.length;j++)
        {
            if(j==0)
            {
                arr[i][j]=x[i].name;
                continue;
            }
            if(j>=3)
            arr[i][j-2]=x[i].items[j].name;
        }
    }
    console.log(arr);
    res.redirect("/next")
});
app.get("/next",function(req,res){
    // console.log(arr.length)
    // const d= new Date();
    // console.log(d.getDay())
   
    res.render("secondpage",{data:arr})
});




// ! Third Page starts from Here


const subjectSchema={
    name: String,
    data:[]
}
const Subject = mongoose.model("Subject",subjectSchema);

// function check(y,z)
// {
//     for(var i=0;i<y.length;i++)
//     {
//         if(y[i].name===z)return false;
//         console.log(y[i].name)
//     }
//     return true;
// }

var count=0

//POST - ADDING DATES
app.post("/attendance",function(req,res){

    const sol = req.body.datas;
    let today = new Date().toISOString().slice(0, 10);
    // let t=new Item({
    //     name:today
    // })
    // console.log(sol);
    JSON.stringify(sol)
    console.log(sol.length)
    for(let i=0;i<sol.length;i++)
    {
        console.log(i)
        const x=sol[i]
        Subject.findOne({name:sol[i]},function(err,found){
            if(!err){
                console.log(found.name)
                Subject.findOneAndUpdate({name:found.name},{$push:{data:today}},function(err,added){
                    if(!err)
                    {
                        console.log("Added")
                    }
                })
                // found.data.push(today);
        }
    })
}         
            
})
//

let work=[]

//CREATING DATABASE FOR SUBJECTS ON A PARTICULAR DAY
app.get("/subject", function(req,res)
{
    for(let i=1;i<work.length;i++)
    {
    Subject.findOne({name:work[i]},function(err,foundsub){
        if(!err)
        {
            if(!foundsub)
            {
                const sub=new Subject({

                    name:work[i],
                    
                    
                })
                sub.save();
                Subject.findOne({name:work[i]},function(err,foundsub){
                    if(!err)
                    {
                        if(foundsub)
                        {
                            Subject.findOneAndDelete({name:work[i]},function(err,replace){
                                if(!err)
                                {
                                    console.log("DELETED")
                                }
                            })
                                
                            }
                     }
                    })
                }
   
            }          
    })
    }

res.redirect("/attend")
})
//

// CAN BE MERGED:-
app.get("/sub",function (req,res){
    
    res.redirect("/subject")
})
// 

app.get("/attendence",async function (req,res){
    const d= new Date();
    let day = d.getDay();
    const a = await List.findOne({name:weekdays[day-1]})
    work.push(weekdays[day-1]);
    for(let i=3;i<a.items.length;i++)
    {
        work.push(a.items[i].name);
    }
    res.redirect("/sub")
    
})
app.get("/attend",function(req,res){
    res.render('thirdpage',{day:work})
})

app.listen(3000, function(){
    console.log("Server UP");
    
});
