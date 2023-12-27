const pointModel = require('../model/pointsSchema');
const lineModel = require('../model/lineSchema');

const addPoint = async (req, res) => {
    const {type, coordinates, properties} = req.body;
    console.log(type, coordinates, properties);

    try {
        if(!type || !Array.isArray(coordinates) || coordinates.length !== 2){
            return res.status(400).json({
                success: false,
                messaage: "Point coordinates not saved! Please try again"
            })
        }

        const pointInfo = pointModel(req.body);
        const result = await pointInfo.save();

        return res.status(200).json({
            success: true,
            message: `Point data added sucessfully: ${result}`
        });
    } catch (error) {
        return res.status(400).json({
            success:false,
            message: `Error occured: ${error}`
        });
    }
}


const addLine = async (req, res) => {
    const {type, coordinates, properties} = req.body;

    try {
        if (!type || !coordinates){
            return res.status(400).json({
                success: false,
                message: `Line Data not saved! Please try again`
            })
        }
        const lineData = lineModel(req.body);
        const result = await lineData.save();

        return res.status(200).json({
            success: true,
            messaage: `Line data saved sucessfully: ${result}`
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            messaage: `Error occurred: ${error}`
        })
    }

};
const getlinedata=async(req,res)=>{
    try{
        const linedata=await lineModel.find({});
        console.log(linedata);
        res.status(200).json({linedata});
    }catch(error){
        res.status(400).json({
            success:false,
            message:"Failed to get lines data"
        })
    }
}
const getData = async (req, res) => {
    try {
        const pointsData = await pointModel.find({});
        console.log(pointsData);
        res.status(200).json({
            pointsData
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to get points data."
        })
    }
};

module.exports = {addPoint, getData, addLine,getlinedata};