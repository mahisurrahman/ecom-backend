import statusCode from "../../core/status/statusCode"
import deliveryChargesServices from "../../core/services/deliveryChargesServices/deliveryChargesServices";

module.exports = {
    async createDeliveryChargesController (req, res) {
        try {
          let response = await deliveryChargesServices.createDeliveryChargesServices(req.body);
          return res.status(response.status).send(response);
        } catch (error) {
          console.log(error);
          return res.send({
            status: statusCode.internalServerError,
            error: true,
            message: "Create Delivery Charges Controller Failed",
            data: error,
          });
        }
      },

      async getAllDeliveryChargesController (req, res) {
        try {
          let response = await deliveryChargesServices.getAllDeliveryChargesServices();
          return res.status(response.status).send(response);
        } catch (error) {
          console.log(error);
          return res.send({
            status: statusCode.internalServerError,
            error: true,
            message: "Get All Delivery Charges Controller Failed",
            data: error,
          });
        }
      },
}