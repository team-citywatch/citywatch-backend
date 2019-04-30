import * as constants from "./constants";
import * as AWS from "aws-sdk";
const thumb = require("image-thumbnail");
const S3_URL = "https://s3-us-west-2.amazonaws.com/f8-citywatch/";

export class S3Helper {
    private s3: AWS.S3;

    constructor() {
        AWS.config.update({
            region: "us-west-2",
            credentials: new AWS.Credentials(
                constants.AWS_ACCESS_KEY,
                constants.AWS_SECRET_KEY
            )
        });
        this.s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            params: {Bucket: "f8-citywatch"}
        });
    }

    public putImage = (key: string, image: AWS.S3.Body) => {
        this.s3.upload({
            Key: key,
            Body: image,
            ACL: 'public-read',
            Bucket: "f8-citywatch"
        }, (err, data) => {
            if (err) {
                console.log("Error has occurred during uploading image to S3");
            } else {
                console.log("Succeed to uploading image to S3");
            }
        });
        const thumbnail = thumb(S3_URL + key);
        this.s3.upload({
            Key: "thumbnail_" + key,
            Body: thumbnail,
            ACL: 'public-read',
            Bucket: "f8-citywatch"
        }, (err: any, data: any) => {
            if (err) {
                console.log("Error has occurred during uploading thumbnail to S3");
            } else {
                console.log("Succeed to uploading thumbnail to S3");
            }
        });
    }
}

let s3: S3Helper;

export function getS3Instance () {
    if (!s3) {
        s3 = new S3Helper();
    }
    return s3;
} 