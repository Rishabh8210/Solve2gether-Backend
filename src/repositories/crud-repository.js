class CRUDRepository {
    constructor(model){
        this.model = model;
    }
    create = async(data) => {
        try{
            const response = await this.model.create(data);
            return response;
        }catch(error){
            console.log("Something went wrong inside CRUD Repository");
            throw error
        }
    }
}
module.exports = CRUDRepository