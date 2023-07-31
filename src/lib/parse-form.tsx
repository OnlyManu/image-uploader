import formidable from "formidable";
import type { NextApiRequest } from "next";
import path from "path"

interface IFormData {
    fields: formidable.Fields,
    files: formidable.Files
}


export const parseForm = async (req: NextApiRequest): Promise<IFormData> => {
    const options: formidable.Options = {}
    options.uploadDir = path.join(process.cwd() + "/public/images")
    options.filename = (name, ext, path, form) => {
        let newName = Date.now().toString() + "_" + path.originalFilename
        newName = newName.replace(" ", "")
        return newName
    }
    
    const form = formidable(options)

    return new Promise(async (resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err)
            resolve({fields, files})
        })
    })
}