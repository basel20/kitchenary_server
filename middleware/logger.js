const logger = (req, res, next) => {
    const today = new Date();
    console.log("========================== Request Information ==============================".bgYellow);
    console.log(`Time: + ${today.toString()}`.bgWhite);
    console.log(`Endpoint: ${req.path}`.bgWhite);
    console.log(`Method: ${req.method}`.bgWhite);
    next();
  };
  
  module.exports = logger;