var express =require('express');
var parser =require('body-parser');
var mongoose =require('mongoose');

var app =express();
app.use(parser.urlencoded({extended:false}));
const productSchema= new mongoose.Schema(
    {
        name: String,
        code:Number,
        description:String,
        price:Number,
        distributor:String,
        quantity:Number

    }
)
const productmodel= mongoose.model('products',productSchema);
mongoose.connect("mongodb+srv://7ananthan:godisgrea7@cluster0-fcx3v.mongodb.net/test?retryWrites=true&w=majority");

app.get('/',(req,res)=>{
    res.send("hai..");
});
app.post('/insert',async(req,res)=>{
    try {
        var productdata=new productmodel(req.body);
        var result =await productdata.save();
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
app.get('/viewall',async(req,res)=>{
    try {
        var result = await productmodel.find();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
app.post('/searchname',async(req,res)=>{
    try {
        var searchkey =req.body.key;

        await productmodel.find({"name":key},(error,data)=>{

            if (error) {

                throw error;
            
            } else {
                res.send(data);    
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
app.post('/searchcode',async(req,res)=>{
    try {
        var searchkey =req.body.key;

        productmodel.find({"code":key},(error,data)=>{

            if (error) {

                throw error;
            
            } else {
                res.send(data);    
            }
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
app.listen(process.env.PORT || 3000,()=>{
    console.log("server started");
});