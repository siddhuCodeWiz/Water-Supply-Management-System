const ConnectionModel = require('../model/connections');

async function ranNum() {
  var isPresent = true;

  while (isPresent) {
    var randomNumber = Math.floor(Math.random() * 10);
    var str = "";

    while (str.length < 8) {
      str = str + Math.floor(Math.random() * 10);
    }

    // Assuming ConnectionModel is a Mongoose model, use findOne on its prototype
    isPresent = await ConnectionModel.findOne({
      can: str
    });

    if (!isPresent) {
      isPresent = false;
      return str;
    }
  }
}

const addConnection = async (req, res) => {
  const { name, address, city, pincode } = req.body;

  try {
    const connection = new ConnectionModel({
      name: name,
      address: address,
      city: city,
      pincode: pincode,
      can: Number(await ranNum()), // Use await here
    });

    const result = await connection.save();

    return res.status(200).json({
      success: true,
      message: connection,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Connection not saved: ${error}`,
    });
  }
};


const searchConnection = async (req, res) => {
    const { name } = req.body;
  
    try {
        const result = await ConnectionModel.findOne({
            name: name,
        });
        
        if (!result) {
            res.status(201).json({
            success: false,
            message: "No connections found for user",
            data:result,
            });
        } else {
            // Handle the case where 'result' is found
            res.status(200).json({
            success: true,
            message: "Connections found for user",
            data: result,
            });
        }
        } catch (error) {
        console.error('Error finding connections:', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
      
  };


module.exports = { addConnection, searchConnection };
