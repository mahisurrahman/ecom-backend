const productModel = require("../../../models/productModels/productModels.js");
const discountModel = require("../../../models/discountModels/discountModels.js");

module.exports = {
  async createDiscountService(body, params) {
    try {
      let productId = params.id;
      let discountNumber = body.discountNumber;

      const checkProdExists = await productModel.findOne({
        _id: productId,
        isDeleted: false,
      });
      if (!checkProdExists) {
        return {
          status: 404,
          error: true,
          message: "Product Doesn't Exists",
          data: null,
        };
      }

      const checkProdExistInDiscount = await discountModel.findOne({
        productId: productId,
        isDeleted: false,
      });
      if (checkProdExistInDiscount) {
        return {
          status: 400,
          error: true,
          message: "Already Applied discount to this product",
          data: null,
        };
      }

      const createProdDiscount = await discountModel.create({
        productId: productId,
        discountNumber: discountNumber,
      });

      if (createProdDiscount) {
        const getOldProdSellingPrice = await productModel.findOne({
          _id: productId,
          isDeleted: false,
        });
        if (getOldProdSellingPrice) {
          console.log(getOldProdSellingPrice, "Get Old Prod Selling Price");
          const oldPrice = getOldProdSellingPrice.sellingPrice;
          const percntDerive = discountNumber / 100;
          const discountAmnt = percntDerive * oldPrice;
          const finalAmnt = oldPrice - discountAmnt;

          const updateProductSellingPrice = await productModel.findOneAndUpdate(
            { _id: productId },
            {
              sellingPrice: finalAmnt.toFixed(2),
              discount: discountNumber,
            },
            { new: true }
          );
          if(updateProductSellingPrice){
            return {
                status: 200,
                error: false,
                message: "Successfully Added the Discount",
                data: updateProductSellingPrice
            }
          }
        }
      } else {
        return {
          status: 400,
          error: true,
          message: "Failed to Create the Discount for this Product",
          data: null,
        };
      }
    } catch (error) {
      console.log("Create Discount Service Error", error);
      return {
        status: 400,
        error: true,
        data: null,
        message: "Failed On Create Discount Service",
      };
    }
  },

  async getSingleDiscountService(params) {
    try {
        const productId = params.id;
        const checkProductExists = await productModel.findOne({_id: productId, isDeleted: false});
        if(!checkProductExists){
            return{
                status: 400,
                error: true,
                message: "Product Doesn't Exist",
                data:null,
            }
        }

        const getDiscountedItem = await discountModel.findOne({productId: productId, isDeleted: false});
        if(getDiscountedItem){
            return{
                status: 200,
                error: false,
                message:" Here is your discounted product",
                data: getDiscountedItem
            }
        }else{
            return {
                status: 404,
                error: true,
                message: "This product has not discounted yet",
                data: null,
            }
        }
    } catch (error) {
      console.log("Get Single Discount Service Error", error);
      return {
        status: 400,
        error: true,
        data: null,
        message: "Failed On Get Single Discount Service",
      };
    }
  },

  async getAllDiscountService() {
    try {
        const getAllDiscountedProducts = await discountModel.find({isDeleted: false, discountNumber: { $gt: 0 }});
        if(getAllDiscountedProducts){
            return {
                status: 200,
                error: false,
                data: getAllDiscountedProducts,
                message: 'Successfull'
            }
        }else{
            return{
                status: 200,
                error: false,
                data: null,
                message: "NO Discounted Products Found"
            }
        }

    } catch (error) {
      console.log("Get All Discount Service Error", error);
      return {
        status: 400,
        error: true,
        data: null,
        message: "Failed On Get All Discount Service",
      };
    }
  },

  async updateDiscountService(body, params) {
    try {
        const productId = params.id;
        const updatedDiscountNumber = body.updatedDiscountNumber;

        const updateDiscountModel = await discountModel.findOneAndUpdate(
            {productId: productId},
            {
                discountNumber: updatedDiscountNumber,
            },
            {new: true},
        );

        if(updateDiscountModel){
            return{
                status: 200,
                error: false,
                data: updateDiscountModel,
                message: "SUccessfull",
            }
        }else{
            return {
                status: 400,
                error: true,
                data: null,
                message: "Failed to update discounted Price"
            }
        }
    } catch (error) {
      console.log("Update Discount Service Error", error);
      return {
        status: 400,
        error: true,
        data: null,
        message: "Failed On Update Discount Service",
      };
    }
  },

  async removeDiscountService(params) {
    try {
        const productId = params.id;
        const removeDscnt = await discountModel.findOneAndUpdate(
            {productId: productId, isDeleted: false},
            {
                isActive: false, isDeleted: true, discountNumber: 0
            },
            {new: true},
        );

        if(removeDscnt){
            return{
                status: 200,
                error: false,
                message: "Successfully removed the discount",
                data:removeDscnt
            }
        }else{
            return {
                status: 400,
                error: true,
                message: "Failed to Remove the Discount",
                data: null,
            }
        }
    } catch (error) {
      console.log("Remove Discount Service Error", error);
      return {
        status: 400,
        error: true,
        data: null,
        message: "Failed On Remove Discount Service",
      };
    }
  },
};
