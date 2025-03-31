class ApiRespose {

    constructor(status,data,message = "success"){
        this.status=status
        this.data=data
        this.message=message
    }
}


export {ApiRespose}