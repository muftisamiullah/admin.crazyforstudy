const Student = require('../../models/student/Student.js');
const Admin = require('../../models/admin/Admin.js');
const Country = require('../../models/Country');
const Token = require('../../models/student/Token.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
var randomBytes = require('randombytes');
const emails = require('../../emails/emailTemplates');

let refreshTokens = [];


const Register = async(req, res) => {
    const body = req.body;
    try {
        let student = await Student.countDocuments(Student.findOne({ Email: body.Email }));
        if (student) {
            return res.status(409).send('User with the same email already registered');
        }
        const newStudent = new Student(body);
        const saved = await newStudent.save();
        if (!saved) return res.status(500).send("Error in saving Student");

        var token = new Token({ _userId: saved._id, token: randomBytes(16).toString('hex') });
        const tsaved = await token.save();
        if (!tsaved) return res.status(500).send("Error in saving Token");

        const admins = await Admin.find({ role:1 }, {email:1});
        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.email,
                pass: process.env.password
            }
        });
        const link = `http:\/\/${req.headers.host}\/student/verify\/${body.Email}\/${token.token}`;
        const studentMail = emails.welcomeEmail(body.Email, body.Password, link)
        const adminMail = emails.adminEmail(body.Name, body.Email)

        var mailOptionsStudent = {
            from: process.env.email,
            to: newStudent.Email,
            subject: 'Welcome to Crazy For Study!',
            // html: `<h1>Welcome</h1><p><a href=${link}>Click here to verify</a></p>`
            html: studentMail
        };

        var mailOptionsAdmin = {
            from: process.env.email,
            to: admins,
            subject: 'A student just signed up! Check now.',
            // html: `<h1>Welcome</h1><p><a href=${link}>Click here to verify</a></p>`
            html: adminMail
        };
        
        Promise.all([
            transporter.sendMail(mailOptionsStudent),
            transporter.sendMail(mailOptionsAdmin),
          ])
            .then((res) => console.log('Email sent: ' + res.response))
            .catch((err) => console.log(err));

        return res.status(200).json({
            message: "Registered Sucessfully"
        });
    } catch (error) {
        res.status(502).json({
            message: error.message
        })
    }
}

const Verify = async(req, res) => {
    try {
        const token = await Token.findOne({ token: req.params.token });
        // token is not found into database i.e. token may have expired 
        if (!token) {
            return res.status(400).send({ msg: 'Your verification link may have expired. Please click on resend for verify your Email.' });
        }
        const stud = await Student.findOneAndUpdate({ _id: token._userId, Email: req.params.email }, { $set: { 'status': true } })
        if (stud) {
            await Token.deleteOne({ token: req.params.token });
            return res.status(200).send({ msg: 'Your account has been successfully verified!' });
        } else {
            return res.status(401).send({ msg: 'We were unable to find a user for this verification. Please SignUp!' });
        }
    } catch (error) {
        return res.status(402).json({
            message: error.message
        });
    }
}

const Login = async(req, res) => {
    try {
        let student = await Student.findOne({ Email: req.body.email }, { __v: 0 });
        if (!student) return res.status(401).send('Invalid email or password');
        let validPassword = "";
        if(student.type === "old"){
            validPassword = (req.body.password == student.Password) ? true : false;
        }else{
            validPassword = await bcrypt.compare(req.body.password, student.Password);
        }
        if (!validPassword) return res.status(401).send("Invalid email or password");

        const accessToken = generateAccessToken(student);
        const refreshToken = generateRefreshToken(student);
        refreshTokens.push(refreshToken);

        return res.status(200).json({
            accessToken,
            refreshToken,
            student
        });
    } catch (error) {
        return res.status(402).json({
            message: error.message
        });
    }
}

const generateAccessToken = (user) => {
    const accessTokenSecret = 'CFSAT2021';
    return jwt.sign({
        id: user._id,
        role: user.role
    }, accessTokenSecret, { expiresIn: '30d' })
}

const generateRefreshToken = (user) => {
    const refreshTokenSecret = 'CFSRT2021';
    return jwt.sign({
        id: user._id,
        role: user.role
    }, refreshTokenSecret);
}

const ForgotPassword = async(req, res) => {
    try {
        const email = req.body.email;
        const data = await Student.findOne({ Email: email });
        if (data) {
            return res.status(201).json(data)
        } else {
            return res.status(402).json({ message: "Email does not exist in our records" })
        }
    } catch (error) {
        return res.status(502).json({ message: "Somethign went wrong!" })
    }
}

const Logout = async(req, res) => {
    const accessTokenSecret = 'CFSAT2021';
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
        const accessToken = req.headers.authorization.split(' ')[1];
        const decode = await jwt.verify(accessToken, accessTokenSecret);
        const UserData = { id: decode.id, role: decode.role };
        let newAccessToken = await jwt.sign(UserData, 'sasdasd', { expiresIn: '0s' });
        return res.status(200).json({
            message: "successfully loggedout",
            accessToken: newAccessToken
        });
    }
}

const RefreshToken = async(req, res) => {
    const refreshTokenSecret = 'CFSRT2021';
    const refreshToken = req.body.token;
    if (refreshToken === null) return res.status(401).json({ message: 'Invalid refresh token' });
    if (!refreshTokens.includes(refreshToken)) return res.status(401).json({ message: 'Invalid refresh token' });
    jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
        if (err) return res.status(err).json({ message: "Error found" });
        const accessToken = generateAccessToken({ Email: user.email, role: user.role });
        return res.status(200).json({
            accessToken
        });
    })
}

const saveUser = async(req, res) => {
    const body = req.body;
    try {
        // let student = await Student.countDocuments(Student.findOne({ email: body.email }));
        let student = await Student.findOne({ Email: body.Email });
        if (student) {
            
            const accessToken = generateAccessToken(student);
            const refreshToken = generateRefreshToken(student);
            refreshTokens.push(refreshToken);
            
            return res.status(409).json({
                message:'User with the same email already registered',
                accessToken:accessToken,
                refreshToken:refreshToken,
                student:student
            });
        }
        body.Password = new Token({ _userId: body.id, token: randomBytes(16).toString('hex') });
        const newStudent = new Student(body);
        const saved = await newStudent.save();
        if (!saved) return res.status(500).send("Error in saving Student");

        const accessToken = generateAccessToken(saved);
        const refreshToken = generateRefreshToken(saved);
        refreshTokens.push(refreshToken);
        
        return res.status(200).json({
            message: "Registered Sucessfully",
            accessToken:accessToken,
            refreshToken:refreshToken,
            student:saved
        });
    } catch (error) {
        console.log(error)
        res.status(502).json({
            message: error.message
        })
    }
}

const sendResetEmail = async(req, res) =>{
    try{
        const body = req.body;
        let student = await Student.findOne({ Email: body.email });
        if (!student) {
            return res.status(404).send('User not Found');
        }
        const rand = Math.floor(1000 + (9000 - 1000) * Math.random());
        await Token.deleteMany({ _userId: student._id });
        var token = new Token({ _userId: student._id, token: rand });
        const tsaved = await token.save();
        if (!tsaved) return res.status(500).send("Error in saving Token");
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.email,
                pass: process.env.password
            }
        });
        // const link = `http:\/\/${req.headers.host}\/student/verify\/${saved.email}\/${token.token}`;
        const output = emails.forgotPassword(student.Name, student.Email, rand)

        var mailOptions = {
            from: process.env.email,
            to: student.Email,
            subject: 'Forgot Password', 
            // html: `<h1>Welcome</h1><p><b>reset code : ${rand} </b></p>`
            html: output
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return res.status(200).json({
            message: "Reset Code Sent Successfully"
        });

    }catch(e){
        return res.status(502).json({
            message: "Something Went Wrong" + e
        });
    }    
}

const verifyOtp = async(req,res) => {
    try{
        let code = req.body.otp;
        let otp = code[1]+code[2]+code[3]+code[4];
        const token = await Token.findOne({ token: otp });
        // token is not found into database i.e. token may have expired 
        if (!token) {
            return res.status(400).send({ msg: 'Otp not found.' });
        }else{
            return res.status(200).send({ msg: 'Otp matched.', userId: token._userId });
        }
    }catch(e){
        return res.status(502).json({
            message: "Something Went Wrong" + e
        });
    }
}
const changePassword = async(req,res) => {
    try{
        const stud = await Student.findOneAndUpdate({ _id: req.body.id }, {'Password': req.body.password })
        if (stud) {
            await Token.deleteOne({ token: req.body.otp });
            return res.status(200).send({ msg: 'Password changed successfully' });
        } else {
            return res.status(401).send({ msg: 'Password couldnt be changed!' });
        }
    }catch(e){
        return res.status(502).json({
            message: "Something Went Wrong" + e
        });
    }
}

const getUser = async(req,res) => {
    try{
        let user = await Student.findOne({Email : req.body.email});
        return res.status(200).json(user);        
    }catch(e){
        return res.status(500).json({
            message: "Something Went Wrong" + e
        });
    }
}

const editUser = async(req,res) => {
    try{
        console.log(req.body)
        const filter = {Email: req.body.email};
        let data = {};
        if(req.file != undefined && req?.file.filename != undefined){
            data = {
                college: req.body.college != 'undefined' ? req.body.college : '',
                dob: req.body.dob != 'undefined' ? req.body.dob : '', 
                Country: req.body.Country != 'undefined' ? req.body.Country : '',
                Address: req.body.Address != 'undefined' ? req.body.Address : '',
                Zipcode: req.body.Zipcode != 'undefined' ? req.body.Zipcode : '',
                Contact: req.body.Contact != 'undefined' ? req.body.Contact : '',
                Name: req.body.Name != 'undefined' ? req.body.Name : '',
                img: req?.file.filename,
            }
        }else{
            data = {
                college: req.body.college != 'undefined' ? req.body.college : '',
                dob: req.body.dob != 'undefined' ? req.body.dob : '', 
                Country: req.body.Country != 'undefined' ? req.body.Country : '',
                Address: req.body.Address != 'undefined' ? req.body.Address : '',
                Zipcode: req.body.Zipcode != 'undefined' ? req.body.Zipcode : '',
                Contact: req.body.Contact != 'undefined' ? req.body.Contact : '',
                Name: req.body.Name != 'undefined' ? req.body.Name : '',
            }
        }
       
        let user = await Student.findOneAndUpdate(filter,{$set: data});
        return res.status(200).send({ msg: 'user updated successfully',user: user });
    }catch(e){
        return res.status(502).json({
            message: "Something Went Wrong" + e
        });
    }
}

const getCountryList = async(req,res) => {
    try{
        let countries = await Country.find();
        return res.send(countries);
    }catch(e){
        return res.status(502).json({
            message: "Something Went Wrong" + e
        });
    }
}

const updatePass = async(req,res) => {
    try{
        if(req.body.pass != req.body.confirmPass){
            return res.status(401).send({ msg: 'Password mismatch' });
        }
        const stud = await Student.findOneAndUpdate({ _id: req.body.id }, {'Password': req.body.confirmPass })
        if (stud) {
            return res.status(200).send({ msg: 'Password changed successfully' });
        } else {
            return res.status(401).send({ msg: 'Password couldnt be changed!' });
        }
    }catch(e){
        return res.status(502).json({
            message: "Something Went Wrong" + e
        });
    }
}

const updateImageName = async(req,res) => {
    try{
        const filter = {Email: req.body.email};
        const stud = await Student.findOneAndUpdate(filter, {'img': req.body.image_name })
        if (stud) {
            return res.status(200).send({ msg: 'Image changed successfully' });
        } else {
            return res.status(401).send({ msg: 'Image couldnt be changed!' });
        }
    }catch(e){
        return res.status(502).json({
            message: "Something Went Wrong" + e
        });
    }
}


module.exports = {
    Register,
    Login,
    ForgotPassword,
    RefreshToken,
    Logout,
    Verify,
    saveUser,
    sendResetEmail,
    verifyOtp,
    changePassword,
    getUser,
    getCountryList,
    editUser,
    updatePass,
    updateImageName
}
