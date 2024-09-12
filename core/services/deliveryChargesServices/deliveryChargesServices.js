const deliveryModels = require("../../../models/deliveryModels/deliveryModels")

module.exports = {
    async createDeliveryChargesServices (data){
        try{

        }catch(error){
            console.log(error);
            return {
                status: 400,
                error :true,
                message: "Failed to Create Delivery Charges from the Services",
                data: null,
            }
        }
    },
    async getAllDeliveryChargesServices (data){
        try{

        }catch(error){
            console.log(error);
            return {
                status: 400,
                error :true,
                message: "Failed to Create Delivery Charges from the Services",
                data: null,
            }
        }
    }
}