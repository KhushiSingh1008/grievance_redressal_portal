const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require ('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/users', require('./routes/userRoutes'))   // Routes are specified 
app.use('/api/complaints', require('./routes/complaintRoutes'));

const { errorHandler } = require('./middleware/errorMiddleware');
app.use(errorHandler);

app.get('/',(req,res)=>{
    res.send('Server is running');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});