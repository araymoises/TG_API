import { Request, Response, NextFunction } from "express"
import ThreeDObject from "../../models/Object"
import ThreeDObjectResource from "../../models/Resource"

export const getObjects = async (req: Request | any, res: Response) => {

  try {
    const models = await ThreeDObject.find({ status: true })
      .populate({
        path: 'resources',
        match: { status: true }
      })

    if (!models.length)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Objetos 3D no encontrados.',
        content: null
      })

    return res.status(201).send({
      success: true,
      code: 201,
      message: 'Objetos 3D encontrados!',
      content: models
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Alumnos no encontrados.',
      error: err.message,
      content: null
    })
  }
}

export const getObjectById = async (req: Request | any, res: Response) => {
  const { id } = req.params

  try {
    const model = await ThreeDObject.findOne({ _id: id, status: true })
      .populate({
        path: 'resources',
        match: { status: true }
      })

    if (!model)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Objeto 3D no encontrado.',
        content: null
      })

    return res.status(201).send({
      success: true,
      code: 201,
      message: 'Objeto 3D encontrado!',
      content: model
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Objeto 3D no encontrado.',
      error: err.message,
      content: null
    })
  }
}

export const saveObject = async (req: Request | any, res: Response) => {
  const { name, code, sourcePath, type, scale, position, rotationPivot, resources } = req.body

  try {
    let model: any = new ThreeDObject({
      name,
      code,
      sourcePath,
      type,
      scale,
      position,
      rotationPivot
    })

    try {
      model = await model.save()

      let resourceModel: any;

      await resources.map(async (resource: any) => {
        resourceModel = new ThreeDObjectResource({
          object: model._id,
          path: resource.path
        })

        resourceModel = await resourceModel.save()

        return resourceModel
      })

      const modelResult = await ThreeDObject.findOne({ _id: model._id, status: true })
        .populate({
          path: 'resources',
          match: { status: true }
        })

      return res.status(201).send({
        success: true,
        code: 201,
        message: 'Objeto 3D creado exitosamente!',
        content: modelResult
      })
    } catch (err) {
      console.log(err)
      return res.status(500).send({
        success: false,
        code: 500,
        message: 'No se pudo crear el objeto 3D.',
        content: null
      })
    }
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'No se pudo crear el objeto 3D.',
      error: err.message,
      content: null
    })
  }
}

export const updateObjectById = async (req: Request | any, res: Response) => {
  const { name, code, sourcePath, type, scale, position, rotationPivot } = req.body
  const { id } = req.params

  try {
    let fields = await ThreeDObject.findOne({ _id: id, status: true })

    if (!fields)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Objeto 3D no encontrado.',
        content: null
      })

    if (name) {
      fields.name = name
    }
    if (code) {
      fields.code = code
    }
    if (sourcePath) {
      fields.sourcePath = sourcePath
    }
    if (type) {
      fields.type = type
    }
    if (scale) {
      fields.scale = scale
    }
    if (position) {
      fields.position = position
    }
    if (rotationPivot) {
      fields.rotationPivot = rotationPivot
    }

    await ThreeDObject.updateOne({ _id: id, status: true }, fields)
      .populate({
        path: 'resources',
        match: { status: true }
      })

    return res.status(200).send({
      success: true,
      code: 200,
      message: 'Objeto 3D actualizado correctamente!',
      content: fields
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Objeto 3D no pudo ser actualizado.',
      error: err.message,
      content: null
    })
  }
}

export const deleteObject = async (req: Request | any, res: Response) => {
  const { id } = req.params

  try {
    let fields = await ThreeDObject.findOne({ _id: id, status: true })
    // let resources = await ThreeDObjectResource.find({ object: id, status: true })

    if (!fields)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Objeto 3D no encontrado.',
        content: null
      })

    fields.status = false
    await ThreeDObject.updateOne({ _id: id, status: true }, fields)

    // resources.map(async (resource: any) => {
    //   resource.status = false
    //   await ThreeDObjectResource.updateOne({ object: id, status: true }, resource);
    // })

    return res.status(200).send({
      success: true,
      code: 200,
      message: 'Objeto 3D eliminado correctamente!',
      content: fields
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Objeto 3D no pudo ser eliminado.',
      error: err.message,
      content: null
    })
  }
}
