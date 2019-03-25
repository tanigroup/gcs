# GCS

The easy way to use `@google-cloud/storage` lib, wrapped in class

## API

| Function            | Params                      | Description                                                                                                                         |
| ------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **upload**          | source, destination         | Upload new File to GCS<br>source -> path of file,<br>destination -> path to destination                                             |
| **checkExists**     | filename                    | Check if file exist or not<br>filename -> file name with path                                                                       |
| **getSignedUrl**    | fileName, expires(optional) | Generate signed URL of file with expiration time<br>filename -> file name with path<br>expires -> expiration time, default : 1 hour |
| **downloadToLocal** | uri                         | download file to local uri -> file url                                                                                              |

## Examples

```js
import GCS from 'gcs'

const gcs = new GCS('test', 'test')

gcs.upload('./test.xlsx', '/upload') // store test.xlsx to upload folder
gcs.checkExists('/upload/test.xlsx') // return true
gcs.getSignedUrl('/upload/test.xlsx') // get link with 1 hour expiration time
gcs.downloadToLocal('http://file-link') // download file link
```
