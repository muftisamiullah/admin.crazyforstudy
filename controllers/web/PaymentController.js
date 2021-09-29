const Student = require('../../models/student/Student.js');
const Assignment = require('../../models/admin/Assignment.js');

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
            await Student.findOneAndUpdate(filter, {$set: { transactions : dataUpdate, Subscribe: false } });
        }
        return res.status(200).json({
            message: 'Subscripion cancelled'
        });
    } catch (error) {
        res.status(409).json({
            message: "Error occured",
            errors: error
        });
    }
}

const createOrder = async(req, res) => {
    console.log(req.body.amt)
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
                assignment = await Assignment.findOneAndUpdate(filter1, {payment_status: "paid-full"});
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
}