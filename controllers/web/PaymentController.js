const Student = require('../../models/student/Student.js');
const Assignment = require('../../models/admin/Assignment.js');
const Admin = require('../../models/admin/Admin.js');
var nodemailer = require('nodemailer');
const emails = require('../../emails/emailTemplates');

const Razorpay = require('razorpay');

var instance = new Razorpay({
    key_id: process.env.razor_pay_key,
    key_secret: process.env.razor_pay_secret
})

const stripe = require('stripe')(process.env.stripe_p_key);

const createSubscription = async(req, res) => {
    try {
        const data = await instance.subscriptions.create({plan_id: process.env.plan_id,"quantity": 1,"total_count":12,customer_notify:1})
        return res.status(200).json({
            data: data
        });
    } catch (error) {
        res.status(409).json({
            message: "Error occured",
            errors: error
        });
    }
}

const cancelSubscription = async(req, res) => {
    try {
        const filter = {_id: req.body.user_Id, Subscribe: true};
        const subscriptionId = req.body.subscribe_Id
        const cancelAtCycleEnd = Boolean(req.body.cancel_at_cycle_end)
        const data = await instance.subscriptions.cancel(subscriptionId,cancelAtCycleEnd)
        const dataUpdate = {
            SubscribeDate: Date.now(),
            subscription_status: 'cancelled',
            subscription_id: req.body.subscribe_Id, 
            payment_id: data.payment_id,
            type: "subscription",
            reason: req.body.reason,
            message:req.body.message,   
        }
        if(data){
            const admins = await Admin.find({ role:1 }, {email:1});
            const stud = await Student.findOneAndUpdate(filter, {$set: { transactions : dataUpdate, Subscribe: false } });
            const reason = req.body.reason;
            const message = req.body.message;
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.email,
                    pass: process.env.password
                }
            });
            
            const output = emails.cancelSubscription(stud.Name)
            const start_date = new Date(stud.transactions[0].created_at);
            const start_date1 = new Date(stud.transactions[0].created_at).getDate();
            const current_date =  new Date().getDate();
            const difference = current_date - start_date1;
            const output2 = emails.adminCancelSubsciptionMail(stud.Name, reason, message, start_date, difference)

            let mailOptionsStudent = {
                from: process.env.email,
                to: stud.Email,
                subject: 'Cancel Subscription',
                // html: `<h1>Welcome</h1><p><a href=${link}>Click here to verify</a></p>`
                html: output
            };

            var mailOptionsAdmin = {
                from: process.env.email,
                to: admins,
                subject: `${stud.Name} just Cancelled his/her CFS Subscription`,
                // html: `<h1>Welcome</h1><p><a href=${link}>Click here to verify</a></p>`
                html: output2
            };

            Promise.all([
                transporter.sendMail(mailOptionsStudent),
                transporter.sendMail(mailOptionsAdmin),
              ])
                .then((res) => console.log('Email sent: ' + res.response))
                .catch((err) => console.log(err));
        }
        return res.status(200).json({
            message: 'Subscripion cancelled'
        });
    } catch (error) {
        console.log(error)
        res.status(409).json({
            message: "Error occured",
            errors: error
        });
    }
}

const createOrder = async(req, res) => {
    try {
        const options = {
            amount: req.body.amt,  // amount in the smallest currency unit
            currency: "USD",
        };
        const data = await instance.orders.create(options)
        return res.status(200).json({
            data: data
        });
    } catch (error) {
        res.status(409).json({
            message: "Error occured",
            errors: error
        });
    }
}

const createCustomer = async(req, res) => {
    try {
        
        return res.status(200).json({
            data: data
        });
    } catch (error) {
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}

const saveTransaction = async(req, res) => {
    try {
        const filter = {_id: req.body.userId};
        const data = {
            subscription_id: req.body.subscription_id, 
            payment_id: req.body.payment_id,
            type: "subscription",
            SubscribeDate: Date.now(),
            subscription_status: 'active'
        }
        const transaction = await Student.findOneAndUpdate(filter,{$set: { transactions : data } });
        if(transaction){
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.email,
                    pass: process.env.password
                }
            });
            const output = emails.subscriptionEmail(transaction.Name, transaction.Email, req.body.payment_id, req.body.subscription_id)
            let mailOptionsStudent = {
                from: process.env.email,
                to: transaction.Email,
                subject: 'Subscription',
                // html: `<h1>Welcome</h1><p><a href=${link}>Click here to verify</a></p>`
                html: output
            };
            transporter.sendMail(mailOptionsStudent, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            const stud = await Student.findOneAndUpdate(filter, {Subscribe : true});
            return res.status(200).json({
                data: stud
            });
        }
    } catch (error) {
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}

const failedPaymentSubscription = async(req, res) => {
    try {
        //all data in req.body
        console.log(req.body);
        const filter = {_id: req.body.userId};
        const student = await Student.findOne(filter);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.email,
                pass: process.env.password
            }
        });
        const output = emails.failedPayementEmail(student.Name)
        let mailOptionsStudent = {
            from: process.env.email,
            to: student.Email,
            subject: 'Payment Failure',
            // html: `<h1>Welcome</h1><p><a href=${link}>Click here to verify</a></p>`
            html: output
        };
        transporter.sendMail(mailOptionsStudent, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return res.status(200).json({
            message: "payment failure"
        });
    } catch (error) {
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}

const failedPaymentAssignment = async(req, res) => {
    try {
        //all data in req.body
        console.log(req.body);
        const filter = {_id: req.body.userId};
        const student = await Student.findOne(filter);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.email,
                pass: process.env.password
            }
        });
        const output = emails.failedPayementEmail(student.Name)
        let mailOptionsStudent = {
            from: process.env.email,
            to: student.Email,
            subject: 'Your Subscription Payment Couldn’t be Completed - CFS',
            // html: `<h1>Welcome</h1><p><a href=${link}>Click here to verify</a></p>`
            html: output
        };
        transporter.sendMail(mailOptionsStudent, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return res.status(200).json({
            message: "payment failure"
        });
    } catch (error) {
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}

const saveTransactionAssignment = async(req, res) => {
    try {
        const filter = {_id: req.body.assignmentId};
        let assign = await Assignment.findOne(filter);
        if(assign.payment_status == "paid-full"){
            return res.status(409).json({
                message: "already paid in full"
            });
        }
        const data = {
            order_id: req.body.order_id, 
            payment_id: req.body.payment_id,
            type: "assignment",
            OrderDate: Date.now(),
        }
        
        const transaction = await Assignment.findOneAndUpdate(filter,{$set: { transactions : data } });
        if(transaction){
            const filter1 = {_id: req.body.assignmentId, user_id: req.body.userId};
            let assignment = null;
            if(assign.payment_status == "unpaid"){
                assignment = await Assignment.findOneAndUpdate(filter1, {payment_status: "half-paid"});
            }else if(assign.payment_status == "half-paid"){
                assignment = await Assignment.findOneAndUpdate(filter1, {payment_status: "paid-full",assignment_status: "pending"});
            }
            return res.status(200).json({
                data: assignment
            });
        }
    } catch (error) {
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}

module.exports = {
    createSubscription,
    cancelSubscription,
    saveTransaction,
    saveTransactionAssignment,
    createCustomer,
    createOrder,
    failedPaymentSubscription,
    failedPaymentAssignment,
}