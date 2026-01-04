const errorMiddleware = (err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        error: true,
        message: err.message || "Backend error"
    });
};

export default errorMiddleware;
