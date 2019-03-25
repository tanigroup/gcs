import download from 'download'
import * as moment from 'moment'
import path from 'path'
import { Storage } from '@google-cloud/storage'

const oneHour = moment()
  .add(1, 'hours')
  .format()

class GCS {
  constructor(projectId, bucketName, localPath = './') {
    const storage = new Storage({ projectId })
    this.myBucket = storage.bucket(bucketName)
    this.tempPath = path.join(localPath, 'temp')
  }

  async downloadToLocal(uri = '') {
    try {
      await download(uri, this.tempPath)
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
    }
    return path.join(this.tempPath, path.basename(uri))
  }

  async checkExists(filename) {
    try {
      const exist = await this.myBucket.file(filename).exists()
      return exist[0]
    } catch (e) {
      // eslint-disable-next-line
      console.log(e)
    }

    return false
  }

  async getSignedUrl(filename, expires = oneHour) {
    try {
      const file = await this.myBucket.file(filename).getSignedUrl({
        action: 'read',
        expires,
      })

      return file[0]
    } catch (e) {
      // eslint-disable-next-line
      console.log(e)
    }

    return false
  }

  async upload(source, destination) {
    try {
      const result = await this.myBucket.upload(source, {
        destination,
        metadata: {
          contentDisposition: `attachment; filename="${path.basename(destination)}"`,
        },
      })
      return result
    } catch (e) {
      // eslint-disable-next-line
      console.log(e)
    }

    return false
  }
}

export default GCS
