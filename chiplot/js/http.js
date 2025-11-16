
class Http{
    constructor() {
    }
    get(uri){
        return new Promise((resolve, reject) => {

            axios.get(uri).then(response => {
                console.log(response);


                resolve(response.data)


            }).catch( (error) => {
                let {status,statusText} = error.response

                reject({status:status,statusText:statusText})

            });
        })
    }
    post(uri,param,config){

        return new Promise((resolve, reject)=>{

            axios.post(uri, param, config).then(response=>{
                console.log(response)

                resolve(response.data)
            }).catch( (error) => {
                console.log(error)
                let {status,statusText} = error.response

                reject({status:status,statusText:statusText})

            });


        })

    }
}

export {Http}