1. Default resource-type when uploading to cloudinary is 'image'.
2. PDF and ZIP file option needs to be enabled in cloudinary settings. otherwise it will fail when download.
    In Cloudinary dashboard ==> settings ==> security ==> PDF and ZIP files delivery: (tick) Allow delivery of PDF and ZIP files.
3. The folder structure is not stored in the Cloudinary, only in db. The extra credit(not implemented), thought it should be using the signed url generated via cloudinary api, like private_download_url(publicId, format, { resourceType: "iamge", expires_at: Date.now().addTenDays() }) etc, then this url can be shared to others, this only works for the authenticated upload files.

await cloudinary.uploader.upload(filePath, { resource_type: "raw", type: "authenticated" })