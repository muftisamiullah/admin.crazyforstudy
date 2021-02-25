const Permission = require('../../models/admin/Permission.js');

const CreatePermission = async (req, res) => {
    const body = req.body;
    try {
        const newPermission = new Permission(body);
        await newPermission.save();
        return res.status(200).json({ 
            message: "Permission created sucessfully"
        });
    } catch (error) {
        res.status(502).json({
            message : error.message
        })
    }
}
const UpdatePermission = async (req, res) =>{
    try {
        await Permission.findByIdAndUpdate({_id: req.params.id},req.body)
                .then(response => {
                    return res.status(202).json({
                        message: "permission, Updated successfully"
                    })
                })
                .catch(error => {
                    return res.status(500).json({
                        message: "Error Found",
                        errors: error.message
                    })
                });

    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
}
const ViewPermission = async (req, res) => {
    try{
        const PermissionData = await Permission.findOne({_id: req.params.id},{__v: 0});
        return res.status(200).json({ 
            data: PermissionData
        });    
    } catch(error){
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}
const ViewAllPermission = async (req, res) => {
    try{
        const AllPermissions = await Permission.find({},{__v: 0});
        return res.status(200).json({ 
            total: AllPermissions.length,
            data: AllPermissions 
        });    
    } catch(error){
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}
const DeletePermission = async (req, res) =>{
    const id = req.params.id;
    try {
        await Permission.deleteOne({_id: id}).then( response => {
            return res.status(201).json({
                message: "Permission, deleted successfully"
              })
        });
    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
};
const DeleteAllPermission = async (req, res) =>{
    const ids = req.params.id;
    try {
        await Permission.deleteMany({_id: { $in: [ids]}}).then( response => {
            return res.status(201).json({
                message: "Selected Permissions, deleted successfully"
              })
        });
    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
};


module.exports = {
    CreatePermission,
    UpdatePermission,
    ViewPermission,
    ViewAllPermission,
    DeletePermission,
    DeleteAllPermission
}