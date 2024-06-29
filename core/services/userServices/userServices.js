const userModels = require("../../../models/userModels/userModels.js");
const bcrypt = require("bcrypt");
const TOKENS = require("../../helpers/userServiceHelpers/tokens.js");
const customerModel = require("../../../models/customerModels/customerModel.js");
const sellerModel = require("../../../models/SellerModels/sellerModel.js");

//declaring global options
const options = {
  httpOnly: true,
  secure: true,
};
module.exports = {
  async createUserSrvc(data, filePath) {
    try {
      if (data.userType === "2") {
        let {
          userName,
          userEmail,
          userType,
          userPass,
          gender,
          userFullName,
          phoneNumber,
          shippingCountry,
          shippingState,
          shippingAddress,
          shippingPostalCode,
        } = data;

        if (!userName || userName === "" || userName === null) {
          return {
            status: 404,
            error: true,
            message: "User Email Feild Missing",
            data: null,
          };
        }

        if (!userType || userType === "" || userType === null) {
          return {
            status: 404,
            error: true,
            message: "User Type Feild Missing",
            data: null,
          };
        }

        if (!phoneNumber || phoneNumber === "" || phoneNumber === null) {
          return {
            status: 404,
            error: true,
            message: "Phone Number Feild Missing",
            data: null,
          };
        }

        if (!userPass || userPass === "" || userPass === null) {
          return {
            status: 404,
            error: true,
            message: "User Pass Feild Missing",
            data: null,
          };
        }

        if (!gender || gender === "" || gender === null) {
          return {
            status: 404,
            error: true,
            message: "User Gender Feild Missing",
            data: null,
          };
        }

        if (!userFullName || userFullName === "" || userFullName === null) {
          return {
            status: 404,
            error: true,
            message: "User Full Name Feild Missing",
            data: null,
          };
        }

        const emailExists = await userModels.findOne({ userEmail: userEmail });
        if (emailExists) {
          return {
            status: 409,
            error: true,
            message: "Email Already Exists",
            data: null,
          };
        }
        const phoneNumberExists = await userModels.findOne({
          phoneNumber: phoneNumber,
        });
        if (phoneNumberExists) {
          return {
            status: 409,
            error: true,
            message: "Phone Number Already Exists",
            data: null,
          };
        }

        const userNameExists = await userModels.findOne({ userName: userName });
        if (userNameExists) {
          return {
            status: 409,
            error: true,
            message: "User Name Already Exists",
          };
        }

        //Encrypting the Password with BCrypt//
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(userPass, salt);

        let imageName = null;
        if (filePath.path) {
          imageName = filePath.path.split("images/")[1];
        }

        const userCreation = await userModels.create({
          userName: userName.toLowerCase(),
          userEmail,
          userType,
          userPass: hash,
          userImg: imageName,
          gender: gender,
          phoneNumber: phoneNumber,
          userFullName: userFullName,
        });

        if (userCreation?.isActive) {
          const customerDetails = await customerModel.create({
            userId: userCreation._id,
            shippingCountry,
            shippingState,
            shippingAddress,
            shippingPostalCode,
          });

          if (!userCreation || !customerDetails) {
            return {
              status: 500,
              error: true,
              message: "Cannot Create Customer (from user Services)",
              data: null,
            };
          } else {
            return {
              status: 200,
              error: false,
              message: "Created Customer",
              data: { userCreation, customerDetails },
            };
          }
        }
      } else if (data.userType === "1") {
        let {
          userName,
          userEmail,
          userType,
          userPass,
          gender,
          userFullName,
          phoneNumber,
          initialSalary,
        } = data;

        console.log();
        if (!userName || userName === "" || userName === null) {
          return {
            status: 404,
            error: true,
            message: "UserName Feild Missing",
            data: null,
          };
        }

        if (!userEmail || userEmail === "" || userEmail === null) {
          return {
            status: 404,
            error: true,
            message: "User Email Feild Missing",
            data: null,
          };
        }

        if (!userType || userType === "" || userType === null) {
          return {
            status: 404,
            error: true,
            message: "User Type Feild Missing",
            data: null,
          };
        }

        if (!phoneNumber || phoneNumber === "" || phoneNumber === null) {
          return {
            status: 404,
            error: true,
            message: "Phone Number Feild Missing",
            data: null,
          };
        }

        if (!userPass || userPass === "" || userPass === null) {
          return {
            status: 404,
            error: true,
            message: "User Pass Feild Missing",
            data: null,
          };
        }

        if (!gender || gender === "" || gender === null) {
          return {
            status: 404,
            error: true,
            message: "User Gender Feild Missing",
            data: null,
          };
        }

        if (!userFullName || userFullName === "" || userFullName === null) {
          return {
            status: 404,
            error: true,
            message: "User Full Name Feild Missing",
            data: null,
          };
        }

        if (!initialSalary || initialSalary === "" || initialSalary === null) {
          return {
            status: 404,
            error: true,
            message: "Initial Feild Missing",
            data: null,
          };
        }

        const emailExists = await userModels.findOne({ userEmail: userEmail });
        if (emailExists) {
          return {
            status: 409,
            error: true,
            message: "Email Already Exists",
            data: null,
          };
        }
        userEmail;
        const phoneNumberExists = await userModels.findOne({
          phoneNumber: phoneNumber,
        });
        if (phoneNumberExists) {
          return {
            status: 409,
            error: true,
            message: "Phone Number Already Exists",
            data: null,
          };
        }

        const userNameExists = await userModels.findOne({ userName: userName });
        if (userNameExists) {
          return {
            status: 409,
            error: true,
            message: "User Name Already Exists",
          };
        }

        //Encrypting the Password with BCrypt//
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(userPass, salt);

        let imageName = null;
        // console.log(filePath.path, "filePath");
        if (filePath.path) {
          imageName = filePath.path.split("images/")[1];

          // console.log(imageName, "Image Name");
        }

        const userCreation = await userModels.create({
          userName: userName.toLowerCase(),
          userEmail,
          userType,
          userPass: hash,
          userImg: imageName,
          gender: gender,
          phoneNumber: phoneNumber,
          userFullName: userFullName,
        });

        // console.log(userCreation);
        if (userCreation?.isActive === true) {
          let initialSalaryNumber = parseInt(initialSalary);
          const sellerDetails = await sellerModel.create({
            userId: userCreation._id,
            initialSalary: initialSalaryNumber,
          });

          // console.log(customerDetails);

          if (!userCreation || !sellerDetails) {
            return {
              status: 500,
              error: true,
              message: "Cannot Create Seller (from user Services)",
              data: null,
            };
          } else {
            return {
              status: 200,
              error: false,
              message: "Created Seller",
              data: null,
            };
          }
        }
      }

      return {
        status: 409,
        error: true,
        message: "Failed to create User Details",
        data: null,
      };
    } catch (error) {
      console.log("Create User Service Error", error);
      return {
        status: 500,
        error: true,
        message: "Create User Service Error",
        data: error,
      };
    }
  },

  async loginUserSrvc(data) {
    try {
      const { email, password } = data;
      // console.log(email, "email");
      if (!email || !password) {
        return {
          status: 404,
          error: true,
          data: null,
          message: "input feild missing",
        };
      }

      // console.log(email,password,"print");
      const user = await userModels.findOne({ userEmail: email });
      // console.log(user, "hit or not");
      if (!user) {
        return {
          status: 404,
          error: true,
          data: null,
          message: "user does not exist",
        };
      }

      const match = await bcrypt.compare(password, user.userPass);
      // console.log(match, "match results");
      if (!match) {
        return {
          status: 401,
          error: true,
          data: null,
          message: "invalid user Credential",
        };
      }

      //  console.log(email,"with what ")
      const { accessToken, refreshToken, userInstance } =
        await TOKENS.generateAccessAndRefreshToknes(email);
      // console.log(accessToken, "actokens");
      // console.log(refreshToken, "retokens");
      // console.log(userInstance, "logged in");
      let modifiedUser = {
        ...userInstance,
        accessToken,
      };
      // console.log(modifiedUser, "modified user");

      let response = { options, modifiedUser };

      return {
        status: 200,
        error: false,
        message: "List of all the Users",
        data: response,
      };
    } catch (error) {
      console.log("Create User Service Error", error);
      return {
        status: 500,
        error: true,
        message: "login User Service Error",
        data: error,
      };
    }
  },

  async getAllUsers() {
    try {
      let response = await userModels.find({ isDeleted: false });
      return {
        status: 200,
        error: false,
        message: "List of all the Users",
        data: response,
      };
    } catch (error) {
      console.log("Create User Service Error", error);
      return {
        status: 500,
        error: true,
        message: "Create User Service Error",
        data: error,
      };
    }
  },

  async getAllUsersIdeal() {
    try {
      const allUserDetails = await userModels.find();
      if (allUserDetails) {
        return {
          status: 200,
          error: false,
          message: "Here are all the lists of Users",
          data: allUserDetails,
        };
      } else {
        return {
          status: 404,
          error: true,
          message: "Failed to load all the list of users",
          data: null,
        };
      }
    } catch (error) {
      console.log("Get All USers Ideal Service Error", error);
      return {
        status: 500,
        error: true,
        message: "Get All Users Ideal Service Error",
        data: error,
      };
    }
  },

  async getSingleUser(data) {
    try {
      let userId = data.id;
      const userDetails = await userModels.findOne({
        _id: userId,
      });
      if (userDetails) {
        return {
          status: 200,
          error: false,
          message: "Here is the Details of the User...",
          data: userDetails,
        };
      } else {
        return {
          status: 404,
          error: true,
          message: "Failed to Load Single User (from get single user service)",
          data: null,
        };
      }
    } catch (error) {
      console.log("Get Single Users Ideal Service Error", error);
      return {
        status: 500,
        error: true,
        message: "Get SIngle Users Ideal Service Error",
        data: error,
      };
    }
  },

  async removeUserServices(data) {
    try {
      let userId = data.id;

      let userExists = await userModels.findOne({ _id: userId });
      if (!userExists) {
        return {
          status: 404,
          error: true,
          message: "No User Found",
          data: null,
        };
      }

      let prevResponse = await userModels.findOne({
        _id: userId,
        isDeleted: true,
      });
      if (prevResponse) {
        return {
          status: 500,
          error: true,
          message: "User is already having {isDeleted: true}",
          data: null,
        };
      }

      let response = await userModels.findOneAndUpdate(
        { _id: userId },
        {
          isDeleted: true,
          isActive: false,
          deletedDate: Date.now(),
        },
        { new: true }
      );

      if (!response) {
        return {
          status: 409,
          error: true,
          message: "Failed to Remove User",
          data: null,
        };
      }

      if (response.userType === 2) {
        let removeCustomer = await customerModel.findOneAndUpdate(
          { userId: response._id },
          {
            isDeleted: true,
            isActive: false,
            deletedDate: Date.now(),
          },
          { new: true }
        );

        if (removeCustomer) {
          return {
            status: 200,
            error: false,
            message: "Removed User and Customer(Using Remove User Services)",
            data: response,
          };
        } else {
          return {
            status: 409,
            error: true,
            message: "Failed to Remove the Customer",
            data: null,
          };
        }
      } else if (response.userType === 1) {
        let removeSeller = await sellerModel.findOneAndUpdate(
          { userId: response._id },
          {
            isDeleted: true,
            isActive: false,
            deletedDate: Date.now(),
          },
          { new: true }
        );

        if (removeSeller) {
          return {
            status: 200,
            error: false,
            message: "Removed User and Seller(Using Remove User Services)",
            data: response,
          };
        } else {
          return {
            status: 409,
            error: true,
            message: "Failed to Remove the Seller",
            data: null,
          };
        }
      }
      return {
        status: 409,
        error: true,
        message: "Conflict on Removing User",
        data: null,
      };
    } catch (error) {
      console.log("Remove User Service Error", error);
      return {
        status: 500,
        error: true,
        message: "Remove User Service Error",
        data: error,
      };
    }
  },

  async updateUserInformation(body, params) {
    try {
      // console.log(body, "Updated DATA");
      // console.log(params.id, "User Id");
      let userId = params.id;
      let updateInfo = body;
      let findUsers = null;

      findUsers = await userModels.findOne({ _id: userId, isDeleted: false });
      // console.log(findUsers);

      if (findUsers) {
        if (updateInfo.userName) {
          // console.log("Hit");
          const result = await userModels.updateOne(
            { _id: userId },
            { userName: updateInfo.userName },
            { new: true }
          );
          if (result) {
            return {
              status: 200,
              error: false,
              message: "Username Changed",
              data: result,
            };
          } else {
            return {
              status: 409,
              error: true,
              message: "Username didn't Changed",
              data: null,
            };
          }
        }

        if (updateInfo.userEmail) {
          const result = await userModels.updateOne(
            { _id: userId },
            { userEmail: updateInfo.userEmail },
            { new: true }
          );
          if (result) {
            return {
              status: 200,
              error: false,
              message: "User email Changed",
              data: result,
            };
          } else {
            return {
              status: 409,
              error: true,
              message: "User Email didn't Changed",
              data: null,
            };
          }
        }

        if (updateInfo.userImg) {
          const result = await userModels.updateOne(
            { _id: userId },
            { userImg: updateInfo.userImg },
            { new: true }
          );
          if (result) {
            return {
              status: 200,
              error: false,
              message: "User Image Changed",
              data: result,
            };
          } else {
            return {
              status: 409,
              error: true,
              message: "User Image didn't Changed",
              data: null,
            };
          }
        }

        if (updateInfo.userType) {
          const result = await userModels.updateOne(
            { _id: userId },
            { userType: updateInfo.userType },
            { new: true }
          );
          if (result) {
            return {
              status: 200,
              error: false,
              message: "User Type:(Admin/User) Changed",
              data: result,
            };
          } else {
            return {
              status: 409,
              error: true,
              message: "User Type didn't Changed",
              data: null,
            };
          }
        }

        if (updateInfo.gender) {
          const result = await userModels.updateOne(
            { _id: userId },
            { gender: updateInfo.gender },
            { new: true }
          );
          if (result) {
            return {
              status: 200,
              error: false,
              message: "User Gender Changed",
              data: result,
            };
          } else {
            return {
              status: 409,
              error: true,
              message: "User Gender didn't Changed",
              data: null,
            };
          }
        }

        if (updateInfo.userFullName) {
          const result = await userModels.updateOne(
            { _id: userId },
            { userFullName: updateInfo.userFullName },
            { new: true }
          );
          if (result) {
            return {
              status: 200,
              error: false,
              message: "User Full Name Changed",
              data: result,
            };
          } else {
            return {
              status: 409,
              error: true,
              message: "User Full Name didn't Changed",
              data: null,
            };
          }
        }

        if (updateInfo.userNumber) {
          const result = await userModels.updateOne(
            { _id: userId },
            { phoneNumber: updateInfo.userNumber },
            { new: true }
          );
          if (result) {
            return {
              status: 200,
              error: false,
              message: "User Phone Number Changed",
              data: result,
            };
          } else {
            return {
              status: 409,
              error: true,
              message: "User Phone Number didn't Changed",
              data: null,
            };
          }
        }
      }
    } catch (error) {
      console.log("User Information Update Service Error", error);
      return {
        status: 500,
        error: true,
        message: "User Information Update Service Error",
        data: error,
      };
    }
  },

  async getAllCustomers() {
    try {
      const allCustomers = await customerModel.find({ isDeleted: false });
      if (allCustomers) {
        return {
          status: 200,
          error: false,
          message: "Here are the List of All the Customers",
          data: allCustomers,
        };
      } else {
        return {
          status: 404,
          error: true,
          message: "All Customer Details Failed to Find",
          data: null,
        };
      }
    } catch (error) {
      console.log("Get All Customers Service Error", error);
      return {
        status: 500,
        error: true,
        message: "Get All Customer Service Error",
        data: error,
      };
    }
  },

  async getAllCustomersIdeal() {
    try {
      const allUserDetails = await customerModel.find();
      if (allUserDetails) {
        return {
          status: 200,
          error: false,
          message: "Here are all the lists of Customers",
          data: allUserDetails,
        };
      } else {
        return {
          status: 404,
          error: true,
          message: "Failed to load all the list of Customers",
          data: null,
        };
      }
    } catch (error) {
      console.log("Get All Customers Ideal Service Error", error);
      return {
        status: 500,
        error: true,
        message: "Get All Customers Ideal Service Error",
        data: error,
      };
    }
  },

  async getSingleCustomer(data) {
    try {
      let userId = data.id;
      let userDetails = await userModels.findOne({
        _id: userId,
        isDeleted: false,
      });
      const initId = userDetails._id;
      let userStringId = initId.toString();
      if (userDetails) {
        let customerDetails = await customerModel.findOne({
          userId: userStringId,
          isDeleted: false,
        });

        if (userDetails && customerDetails) {
          return {
            status: 200,
            error: false,
            message: "here are the user details",
            data: { userDetails, customerDetails },
          };
        } else {
          return {
            status: 404,
            error: true,
            message: "Failed to Find the Customer Details",
            data: null,
          };
        }
      } else {
        return {
          status: 404,
          error: true,
          message: "Failed to Find Initial Details",
          data: null,
        };
      }
    } catch (error) {
      console.log("Get Single User Service Error", error);
      return {
        status: 500,
        error: true,
        message: "Get Single User Service Error",
        data: error,
      };
    }
  },

  async getAllSellers() {
    try {
      const allCustomers = await sellerModel.find({ isDeleted: false });
      if (allCustomers) {
        return {
          status: 200,
          error: false,
          message: "Here are the List of All the Sellers",
          data: allCustomers,
        };
      } else {
        return {
          status: 404,
          error: true,
          message: "All Seller Details Failed to Find",
          data: null,
        };
      }
    } catch (error) {
      console.log("Get All Sellers Service Error", error);
      return {
        status: 500,
        error: true,
        message: "Get All Sellers Service Error",
        data: error,
      };
    }
  },

  async getAllSellersIdeal() {
    try {
      const allUserDetails = await sellerModel.find();
      if (allUserDetails) {
        return {
          status: 200,
          error: false,
          message: "Here are all the lists of Customers",
          data: allUserDetails,
        };
      } else {
        return {
          status: 404,
          error: true,
          message: "Failed to load all the list of Customers",
          data: null,
        };
      }
    } catch (error) {
      console.log("Get All Customers Ideal Service Error", error);
      return {
        status: 500,
        error: true,
        message: "Get All Customers Ideal Service Error",
        data: error,
      };
    }
  },

  async getSingleSeller(data) {
    try {
      let userId = data.id;
      let userDetails = await userModels.findOne({
        _id: userId,
        isDeleted: false,
      });
      const initId = userDetails._id;
      let userStringId = initId.toString();
      if (userDetails) {
        let sellerDetails = await sellerModel.findOne({
          userId: userStringId,
          isDeleted: false,
        });

        if (userDetails && sellerDetails) {
          return {
            status: 200,
            error: false,
            message: "here are the seller details",
            data: { userDetails, sellerDetails },
          };
        } else {
          return {
            status: 404,
            error: true,
            message: "Failed to Find the Seller Details",
            data: null,
          };
        }
      } else {
        return {
          status: 404,
          error: true,
          message: "Failed to Find Initial Details",
          data: null,
        };
      }
    } catch (error) {
      console.log("Get Single Seller Service Error", error);
      return {
        status: 500,
        error: true,
        message: "Get Single Seler Service Error",
        data: error,
      };
    }
  },
};
