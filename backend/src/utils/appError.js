class AppError extends Error{
constructor(messange,statusCode){
    super(messange);
    this.statusCode= statusCode;
    this.isOperational= true;
}

}

export default AppError;