class Requests {
    static requestParams(item, itemType, itemDescription){
        return {
            type: 'object',
            properties: {
                item: item = {
                    type: itemType,
                    description: itemDescription
                }
            }
        }
    }


    static requestBody(itemInterface, requiredValues ) {
        return {
            type: 'object',
            additionalProperties: false,
            properties: itemInterface,
            required: requiredValues         
        }
    }
    
}

export default Requests;