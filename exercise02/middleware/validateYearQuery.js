const validateYearQuery = (req, res, next) => {
    const { year } = req.query;
  
    // Skip if not present
    if (year === undefined) {
      return next();
    }
  
    const parsedYear = Number(year);
    const currentYear = new Date().getFullYear();
  
    // Check if valid number
    if (Number.isNaN(parsedYear)) {
      return res.status(400).json({
        error: "Invalid year: must be a number"
      });
    }
  
    // Check range
    if (parsedYear < 1000 || parsedYear > currentYear) {
      return res.status(400).json({
        error: `Year must be between 1000 and ${currentYear}`
      });
    }
  
    next();
  };
  
  export default validateYearQuery;