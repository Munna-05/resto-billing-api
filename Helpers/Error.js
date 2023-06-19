export const createError =(status ,errorMessage) =>{
    const err = new Error()
    err.status = status
    err.message = errorMessage
    return err
}