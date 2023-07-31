// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import fs from "fs/promises"

import {parseForm} from "../../src/lib/parse-form"

type Data = {
  data: { filename: string | string[] } | null,
  error: string | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    res.status(405).json({
      data: null,
      error: "Method  not Allowed"
    })
    return
  }

  try {
    await fs.readdir(path.join(process.cwd()+ "/public", "/images"))
  } catch (error) {
    await fs.mkdir(path.join(process.cwd()+ "/public", "/images"))
  }

  const { fields, files } = await parseForm(req)
  const file = files.media
  let filename = Array.isArray(file) ? file.map((f) => f.newFilename) : file.newFilename

  res.status(200).json({
    data: {
      filename,
    },
    error: null
  })
}

export const config = {
  api: {
    bodyParser: false,
  }
}