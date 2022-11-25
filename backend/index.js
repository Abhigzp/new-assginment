import app from './app';

app.get("/",(req,res)=>{
    res.send("user list")
})


app.listen(4000,()=>{
    console.log("backend is running on 4000")
})