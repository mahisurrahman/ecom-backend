const productServices = require("../../core/services/productServices/productServices");
const statusCode = require("../../core/status/statusCode");

const getAllProductsControllers = async (req, res) => {
  try {
    let response = await productServices.getAllProductSrvc();
    return res.status(response.status).send(response);
  } catch (error) {
    console.log(error);
    return res.send({
      status: statusCode.internalServerError,
      error: true,
      message: "Get All Products Controller Failed",
      data: error,
    });
  }
};

const createProductController = async (req, res) => {
  try {
    let response = await productServices.createProductSrvc(req);
    return res.status(response.status).send(response);
  } catch (error) {
    console.log(error);
    return res.send({
      status: statusCode.internalServerError,
      error: true,
      message: "Get All Products Controller Failed",
      data: error,
    });
  };

};

const idealGetAllProds = async(req, res)=>{
  try{
    let response = await productServices.getAllProductsIdealService();
    return res.status(response.status).send(response);
  }catch (error) {
    console.log(error);
    return res.send({
      status: statusCode.internalServerError,
      error: true,
      message: "Ideal: Get All Products Controller Failed",
      data: error,
    });
  };
};

const showSingleProdController = async(req, res) =>{
  try{
    let response = await productServices.showSingleProductService(req.params);
    return res.status(response.status).send(response);
  }catch (error) {
    console.log(error);
    return res.send({
      status: statusCode.internalServerError,
      error: true,
      message: "Show Single Products Controller Failed",
      data: error,
    });
  };
}


const productDeleteController = async(req, res)=>{
  try{
    let response = await productServices.deleteProductService(req.params);
    return res.status(response.status).send(response);
  }catch (error) {
    console.log(error);
    return res.send({
      status: statusCode.internalServerError,
      error: true,
      message: "Delete Single Products Controller Failed",
      data: error,
    });
  };
};

const productUpdateController = async(req, res)=>{
  try{
    let response = await productServices.updateProductInfoService(req.body, req.params);
    return res.status(response.status).send(response);
  }catch (error) {
    console.log(error);
    return res.send({
      status: statusCode.internalServerError,
      error: true,
      message: "Update Single Product Controller Failed",
      data: error,
    });
  };
}




module.exports = { getAllProductsControllers, createProductController, idealGetAllProds, showSingleProdController, productDeleteController, productUpdateController };
